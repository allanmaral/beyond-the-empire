import Router from 'next/router'

import Controls from '../controls'
import LogoIcon from '../logo'

import { Nav } from './styles'

const MenuLinks: React.FC = () => {
  // TODO: Review LOCALE
  const goHome = () => {
    Router.push('/')
  }

  return (
    <Nav>
      <span title="Go Home" onClick={goHome}>
        <LogoIcon />
      </span>
      <div>
        <Controls />
      </div>
    </Nav>
  )
}

export default MenuLinks
