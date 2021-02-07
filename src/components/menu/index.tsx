import { useEffect, useState } from 'react'

import MenuLinks from './menuLinks'
import MenuSticker from './menuSticker'

import { MenuContainer } from './styles'

const Menu: React.FC = () => {
  const [showAfterRender, setShowAfterRender] = useState<boolean>(false)
  useEffect(() => setShowAfterRender(true), [])

  if (!showAfterRender) return null
  return (
    <MenuContainer>
      <MenuLinks />
      <MenuSticker />
    </MenuContainer>
  )
}

export default Menu
