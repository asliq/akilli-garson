import { motion } from 'framer-motion'
import { Map, Layers, CheckCircle2, Info } from 'lucide-react'
import { DEMO_EDITION } from '../../config/modules'
import styles from './RoadmapModule.module.css'

export default function RoadmapModule({ module }) {
  if (!module) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>Modül bilgisi bulunamadı.</p>
      </div>
    )
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className={styles.hero}>
        <div className={styles.heroIcon}>
          <Layers size={28} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.editionBadge}>{DEMO_EDITION.name}</span>
          <h1 className={styles.title}>{module.title}</h1>
          <p className={styles.description}>{module.description}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <Map size={18} />
            <h2>Mevcut Durum</h2>
          </div>
          <div className={styles.statusBlock}>
            <span className={styles.phaseBadge}>{module.phase}</span>
            <p className={styles.phaseLabel}>Yol Haritası Aşaması</p>
            {module.phaseDetail && (
              <p className={styles.phaseDetail}>{module.phaseDetail}</p>
            )}
          </div>
          {module.architectureNote && (
            <div className={styles.note}>
              <Info size={16} />
              <p>{module.architectureNote}</p>
            </div>
          )}
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <CheckCircle2 size={18} />
            <h2>Planlanan Yetenekler</h2>
          </div>
          <ul className={styles.capabilityList}>
            {module.capabilities.map((cap) => (
              <li key={cap}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>
          Bu modül, <strong>{DEMO_EDITION.name}</strong> kapsamında bilinçli olarak devre dışıdır.
          Canlı modüller sidebar üzerinden erişilebilir.
        </p>
      </footer>
    </motion.div>
  )
}
