import { memo } from 'react'

import { NoBorderRadiusImage } from './styles'

interface LogoIconProps {
  isDark?: boolean
}

export const LogoIcon: React.FC<LogoIconProps> = ({ isDark, ...props }) => {
  return (
    <>
      <NoBorderRadiusImage
        src={isDark ? '/images/logo_dark.svg' : '/images/logo_light.svg'}
        {...props}
        width={100}
        draggable={false}
        title="Home"
        style={{ cursor: 'pointer', borderRadius: 0 }}
      />
    </>
  )
}

export default memo(LogoIcon)
