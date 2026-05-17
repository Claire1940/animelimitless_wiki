import type { LucideIcon } from 'lucide-react'
import { BookOpen, Gift, BarChart3, Flame, Swords, Shield, Trophy, Clapperboard } from 'lucide-react'

export interface NavigationItem {
  key: string
  path: string
  icon: LucideIcon
  isContentType: boolean
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
  { key: 'codes', path: '/codes', icon: Gift, isContentType: true },
  { key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
  { key: 'stats', path: '/stats', icon: BarChart3, isContentType: true },
  { key: 'souls', path: '/souls', icon: Flame, isContentType: true },
  { key: 'bosses', path: '/bosses', icon: Swords, isContentType: true },
  { key: 'haki', path: '/haki', icon: Shield, isContentType: true },
  { key: 'rewards', path: '/rewards', icon: Trophy, isContentType: true },
  { key: 'showcase', path: '/showcase', icon: Clapperboard, isContentType: true },
]

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
  (item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

export function isValidContentType(type: string): type is ContentType {
  return CONTENT_TYPES.includes(type as ContentType)
}
