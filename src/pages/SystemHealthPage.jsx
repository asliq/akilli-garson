import SystemHealthPanel from '../components/SystemHealth/SystemHealthPanel'
import { DEMO_EDITION } from '../config/modules'
import styles from './SystemHealthPage.module.css'

export default function SystemHealthPage() {
  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <span className={styles.badge}>{DEMO_EDITION.name}</span>
        <h1>Sistem Sağlığı</h1>
        <p>
          Canlı altyapı bileşenlerinin durumu. Tüm kontroller gerçek API uç noktalarına
          yapılır; simüle edilmiş veri kullanılmaz.
        </p>
      </div>

      <SystemHealthPanel />

      <section className={styles.info}>
        <h2>İzlenen Bileşenler</h2>
        <ul>
          <li><strong>API Sunucusu</strong> — NestJS uygulama canlılık kontrolü (<code>/health/live</code>)</li>
          <li><strong>Veritabanı</strong> — PostgreSQL hazırlık kontrolü (<code>/health/ready</code>)</li>
          <li><strong>WebSocket</strong> — Gerçek zamanlı sipariş kanalı bağlantı durumu</li>
        </ul>
      </section>
    </div>
  )
}
