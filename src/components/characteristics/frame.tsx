import {
  FrameContainer,
  FrameBackground,
  FrameBackgroundSmall,
  FrameBackgroundBig,
  FrameScoreContainer,
  FrameScoreInner,
  FrameForeground,
  FrameValueContainer,
  CharacteristicsValue,
  CharacteristicsName
} from './styles'

export interface FrameProps {
  value: React.ReactNode
  name: React.ReactNode
}

const Frame: React.FC<FrameProps> = ({ value, name }) => {
  const background = '#083910'
  const foreground = '#00741E'
  const scoreBackground = '#ffffff'
  const outline = '#000000'

  return (
    <FrameContainer>
      <FrameBackground>
        <FrameBackgroundSmall color={background} />
        <FrameBackgroundSmall color={background} />
        <FrameBackgroundSmall color={background} />
        <FrameBackgroundBig color={background} />
      </FrameBackground>
      <FrameForeground>
        <FrameScoreContainer color={scoreBackground} outline={outline}>
          <FrameScoreInner outline={outline}>
            <CharacteristicsValue color={outline}>{value}</CharacteristicsValue>
          </FrameScoreInner>
        </FrameScoreContainer>
        <FrameValueContainer color={foreground}>
          <CharacteristicsName color={scoreBackground} span>
            {name}
          </CharacteristicsName>
        </FrameValueContainer>
      </FrameForeground>
    </FrameContainer>
  )
}

export default Frame
