/**
 * Birleşik API + WebSocket sunucusu
 * json-server REST API + gerçek zamanlı olay yayını
 */
import { createServer } from 'node:http'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { WebSocketServer } from 'ws'
import { watch } from 'chokidar'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { createApp } from 'json-server/lib/app.js'
import { Observer } from 'json-server/lib/observer.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DB_FILE = join(ROOT, 'db.json')
const PORT = parseInt(process.env.PORT || '3001', 10)

if (!existsSync(DB_FILE)) {
  console.error('db.json bulunamadı:', DB_FILE)
  process.exit(1)
}

if (readFileSync(DB_FILE, 'utf-8').trim() === '') {
  writeFileSync(DB_FILE, '{}')
}

const adapter = new JSONFile(DB_FILE)
const observer = new Observer(adapter)
const db = new Low(adapter, {})
await db.read()

const dbApp = createApp(db)
const clients = new Set()

function broadcast(type, payload = {}) {
  const message = JSON.stringify({ type, payload, timestamp: Date.now() })
  for (const client of clients) {
    if (client.readyState === 1) client.send(message)
  }
}

function resolveEvent(resource, method, body) {
  if (resource === 'orders') {
    if (method === 'POST') return { type: 'ORDER_CREATED', payload: body }
    return { type: 'ORDER_UPDATED', payload: body }
  }
  if (resource === 'tables') return { type: 'TABLE_UPDATED', payload: body }
  if (resource === 'payments') return { type: 'PAYMENT_COMPLETED', payload: body }
  if (resource === 'serviceCalls') return { type: 'CALL_WAITER', payload: body }
  if (resource === 'reservations') return { type: 'RESERVATION_NEW', payload: body }
  if (resource === 'inventory') return { type: 'STOCK_ALERT', payload: body }
  return { type: 'DATA_CHANGED', payload: { resource, method } }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  const parts = url.pathname.split('/').filter(Boolean)
  const resource = parts[0] || ''
  const method = req.method || 'GET'

  // Yanıt gövdesini yakala (broadcast için)
  let responseBody = null
  const originalEnd = res.end.bind(res)
  res.end = function (chunk, ...args) {
    if (chunk && res.statusCode >= 200 && res.statusCode < 300) {
      try {
        responseBody = JSON.parse(chunk.toString())
      } catch { /* ignore */ }
    }
    return originalEnd(chunk, ...args)
  }

  await dbApp.handler(req, res)

  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method) && resource) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const { type, payload } = resolveEvent(resource, method, responseBody || {})
      broadcast(type, payload)
    }
  }
})

const wss = new WebSocketServer({ server, path: '/ws' })

wss.on('connection', (ws) => {
  clients.add(ws)
  ws.send(JSON.stringify({
    type: 'CONNECTED',
    payload: { message: 'Akıllı Garson canlı bağlantı aktif' },
  }))
  ws.on('close', () => clients.delete(ws))
  ws.on('error', () => clients.delete(ws))
})

server.listen(PORT, () => {
  console.log('')
  console.log('  Akıllı Garson API Sunucusu')
  console.log('  ─────────────────────────────')
  console.log(`  REST  → http://localhost:${PORT}`)
  console.log(`  WS    → ws://localhost:${PORT}/ws`)
  console.log('')
  console.log('  Endpoints:')
  Object.keys(db.data || {}).forEach((key) => {
    console.log(`    http://localhost:${PORT}/${key}`)
  })
  console.log('')
})

// Dosya değişikliklerini izle
let writing = false
observer.onWriteStart = () => { writing = true }
observer.onWriteEnd = () => { writing = false }

watch(DB_FILE).on('change', () => {
  if (!writing) {
    db.read().catch(() => {})
  }
})
