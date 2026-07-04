import { Activity, Database, Server, Wifi, RefreshCw } from 'lucide-react'
import { useSystemHealth } from '../../hooks/useSystemHealth'
import styles from './SystemHealthPanel.module.css'

const STATUS_LABELS = {
  healthy: 'Sağlıklı',
  unhealthy: 'Kesinti',
  connected: 'Bağlı',
  disconnected: 'Bağlantı Yok',
  degraded: 'Kısıtlı',
  unknown: 'Bilinmiyor',
}

function StatusDot({ status }) {
  const tone =
    status === 'healthy' || status === 'connected'
      ? styles.dotOk
      : status === 'degraded' || status === 'unknown'
        ? styles.dotWarn
        : styles.dotErr

  return <span className={`${styles.dot} ${tone}`} />
}

function HealthRow({ icon: Icon, label, status, detail }) {
  return (
    <div className={styles.row}>
      <div className={styles.rowLeft}>
        <div className={styles.rowIcon}>
          <Icon size={16} />
        </div>
        <div>
          <div className={styles.rowLabel}>{label}</div>
          {detail && <div className={styles.rowDetail}>{detail}</div>}
        </div>
      </div>
      <div className={styles.rowStatus}>
        <StatusDot status={status} />
        <span>{STATUS_LABELS[status] || status}</span>
      </div>
    </div>
  )
}

export default function SystemHealthPanel({ compact = false, onRefresh }) {
  const { health, isLoading, isFetching, refetch } = useSystemHealth()

  const handleRefresh = () => {
    refetch()
    onRefresh?.()
  }

  if (isLoading && !health) {
    return (
      <div className={`${styles.panel} ${compact ? styles.compact : ''}`}>
        <div className={styles.skeleton}>Sistem durumu kontrol ediliyor…</div>
      </div>
    )
  }

  const data = health || {
    api: 'unhealthy',
    database: 'unknown',
    websocket: 'disconnected',
    apiLatencyMs: 0,
  }

  return (
    <div className={`${styles.panel} ${compact ? styles.compact : ''}`}>
      <div className={styles.panelHeader}>
        <div className={styles.panelTitle}>
          <Activity size={18} />
          <h3>Restoran Altyapısı</h3>
        </div>
        <button
          type="button"
          className={`${styles.refreshBtn} ${isFetching ? styles.spinning : ''}`}
          onClick={handleRefresh}
          aria-label="Yenile"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className={styles.rows}>
        <HealthRow
          icon={Server}
          label="API Sunucusu"
          status={data.api}
          detail={data.apiLatencyMs ? `${data.apiLatencyMs} ms yanıt` : null}
        />
        <HealthRow
          icon={Database}
          label="Veritabanı"
          status={data.database}
        />
        <HealthRow
          icon={Wifi}
          label="WebSocket"
          status={data.websocket}
          detail="Gerçek zamanlı sipariş güncellemeleri"
        />
      </div>
    </div>
  )
}
