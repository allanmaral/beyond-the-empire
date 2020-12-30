import { useEffect, useState } from 'react'

import MenuLinks from './menuLinks'
import MenuSticker from './menuSticker'

const Menu: React.FC = () => {
  const [showAfterRender, setShowAfterRender] = useState<boolean>(false)
  useEffect(() => setShowAfterRender(true), [])

  if (!showAfterRender) return null
  return (
    <div>
      <MenuLinks />
      <MenuSticker />
    </div>
  )
}

export default Menu
