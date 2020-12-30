import { useTheme } from '@geist-ui/react'
import Router from 'next/router'

import Controls from '../controls'
import LogoIcon from '../logo'

import { Nav } from './styles'

const MenuLinks: React.FC = () => {
  const theme = useTheme()

  const goHome = () => {
    Router.push('/')
  }

  return (
    <Nav>
      <span title="Go Home" onClick={goHome}>
        <LogoIcon isDark={theme.type === 'dark'} />
      </span>
      <div>
        <Controls />
      </div>
    </Nav>
  )
}

export default MenuLinks
