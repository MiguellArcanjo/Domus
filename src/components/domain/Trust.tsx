import { AvatarStack } from '@/components/ui/Avatar'
import s from './domain.module.css'

/** Selo de confiança com avatares (referência Property Finder, "Trusted clients"). */
export function TrustBadge({ children }: { children: React.ReactNode }) {
  return <span className={s.trust}><AvatarStack iniciais={['JB', 'AL', 'RC']} />{children}</span>
}

/** Prova social (referência Event Discovery, "12 attending"). */
export function SocialProof({ children }: { children: React.ReactNode }) {
  return <div className={s.proof}><AvatarStack iniciais={['MS', 'AL', 'RC']} /><span>{children}</span></div>
}
