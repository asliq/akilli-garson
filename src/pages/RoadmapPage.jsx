import { Navigate } from 'react-router-dom'
import { getRoadmapModule } from '../config/modules'
import RoadmapModule from '../components/RoadmapModule/RoadmapModule'

export default function RoadmapPage({ moduleId }) {
  const module = getRoadmapModule(moduleId)

  if (!module) {
    return <Navigate to="/" replace />
  }

  return <RoadmapModule module={module} />
}
