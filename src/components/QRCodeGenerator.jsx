import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { Download, Printer, X } from 'lucide-react'
import styles from './QRCodeGenerator.module.css'

export function QRCodeGenerator({ tableId, tableNumber, onClose }) {
  const canvasRef = useRef(null)
  const url = `${window.location.origin}/customer?table=${tableId}`

  useEffect(() => {
    if (!canvasRef.current) return

    QRCode.toCanvas(canvasRef.current, url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#1a1a2e',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    }).catch(err => console.error('QR kod oluşturulamadı:', err))
  }, [url])

  const handleDownload = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `masa-${tableNumber}-qr.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const handlePrint = () => {
    const canvas = canvasRef.current
    const printWindow = window.open('', '', 'width=600,height=700')
    printWindow.document.write(`
      <html>
        <head>
          <title>Masa ${tableNumber} QR Kod</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px;
              font-family: Arial, sans-serif;
              background: #fff;
            }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
            .subtitle { font-size: 14px; color: #666; margin-bottom: 24px; }
            img { border: 2px solid #eee; padding: 10px; border-radius: 8px; }
            .url { margin-top: 16px; font-size: 11px; color: #999; word-break: break-all; max-width: 240px; text-align: center; }
            .hint { margin-top: 12px; font-size: 13px; color: #555; }
          </style>
        </head>
        <body>
          <div class="title">Masa ${tableNumber}</div>
          <div class="subtitle">Lezzet Durağı</div>
          <img src="${canvas.toDataURL()}" width="200" height="200" />
          <div class="hint">Menüyü görmek için QR kodu okutun</div>
          <div class="url">${url}</div>
        </body>
      </html>
    `)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  return (
    <div className={styles.qrGenerator}>
      <div className={styles.qrCard}>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        )}
        <div className={styles.qrHeader}>
          <h3>Masa {tableNumber}</h3>
          <span className={styles.qrSubtitle}>Menü QR Kodu</span>
        </div>
        <div className={styles.qrCanvas}>
          <canvas ref={canvasRef} />
        </div>
        <div className={styles.qrUrl}>{url}</div>
        <div className={styles.qrActions}>
          <button className={styles.downloadBtn} onClick={handleDownload}>
            <Download size={18} />
            İndir
          </button>
          <button className={styles.printBtn} onClick={handlePrint}>
            <Printer size={18} />
            Yazdır
          </button>
        </div>
      </div>
    </div>
  )
}
