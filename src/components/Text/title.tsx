import { useMemo } from 'react'
import { Text } from '@geist-ui/react'

import { SubtitleText } from './styles'

export interface TitleProps {
  text: string
}

const Title: React.FC<TitleProps> = ({ text }) => {
  const [, title, subtitle] = useMemo(() => text.match(/([^(]+)(\([^)]+\))?/), [
    text
  ])

  return (
    <>
      <Text h1>{title}</Text>
      {subtitle && <SubtitleText h2>{subtitle}</SubtitleText>}
    </>
  )
}

export default Title
