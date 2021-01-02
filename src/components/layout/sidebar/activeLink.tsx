import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useMemo } from 'react'

import { LinkContainer } from './styles'

export interface ActiveLinkProps {
  onAcitve?: () => void
  href: string
  text: string
}

const ActiveLink: React.FC<ActiveLinkProps> = memo(({ href, text }) => {
  const { pathname } = useRouter()
  const [title, subtitle] = useMemo(() => {
    if (!/[\u4E00-\u9FA5]/.test(text)) return [text, null]
    return [
      text.replace(/[^\u4E00-\u9FA5]/g, ''),
      text.replace(/[^a-zA-Z]/g, '')
    ]
  }, [text])
  const isActive = pathname === href

  return (
    <LinkContainer>
      <Link href={href}>
        <a className={isActive ? 'active' : ''}>
          {title}
          {subtitle && <span>&nbsp;{subtitle}</span>}
        </a>
      </Link>
    </LinkContainer>
  )
})

export default ActiveLink
