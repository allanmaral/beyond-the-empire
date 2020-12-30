import { Button } from '@geist-ui/react'
import SlidersIcon from '@geist-ui/react-icons/sliders'

import { Tabbar } from './styles'

interface TabbarMobileProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const TabbarMobile: React.FC<TabbarMobileProps> = ({ onClick }) => {
  return (
    <Tabbar>
      <Button className="toggle" auto type="abort" onClick={onClick}>
        <SlidersIcon size={16} />
      </Button>
      <span>Beyond the Empire</span>
    </Tabbar>
  )
}

export default TabbarMobile
