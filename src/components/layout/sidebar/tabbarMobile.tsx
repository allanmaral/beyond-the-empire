import Router from 'next/router'
import { Button } from '@geist-ui/react'
import SlidersIcon from '@geist-ui/react-icons/sliders'

import LogoIcon from '../../logo'

import { Tabbar } from './styles'

interface TabbarMobileProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  fixed: boolean
}

const TabbarMobile: React.FC<TabbarMobileProps> = ({ onClick, fixed }) => {
  // TODO: Review use locale
  const goHome = () => {
    Router.push('/')
  }

  return (
    <Tabbar className={fixed ? 'fixed' : ''}>
      <Button className="toggle" auto type="abort" onClick={onClick}>
        <SlidersIcon size={16} />
      </Button>
      {!fixed && (
        <span title="Go Home" onClick={goHome}>
          <LogoIcon />
        </span>
      )}
    </Tabbar>
  )
}

export default TabbarMobile
