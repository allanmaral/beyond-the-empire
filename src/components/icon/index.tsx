import Simple from './simple'
import Double from './double'
import Outlined from './outlined'

export const iconDictionary = {
  // Dices
  PR: <Outlined name="d12" color="#FEE800" />,
  AB: <Outlined name="d8" color="#52B849" />,
  BO: <Outlined name="d6" color="#A0D9F5" />,
  CH: <Outlined name="d12" color="#E21D37" />,
  DI: <Outlined name="d8" color="#512c7d" />,
  SE: <Outlined name="d6" color="#413C42" />,

  // Force
  FP: <Double name="force-split" color1="#000000" color2="#FFFFFF" />,
  LI: <Outlined name="force" color="#FFFFFF" />,
  DA: <Outlined name="force" color="#000000" />,

  // Dice results
  SU: <Simple name="success" />,
  AD: <Simple name="advantage" />,
  TR: <Simple name="triumph" />,
  FA: <Simple name="failure" />,
  TH: <Simple name="threat" />,
  DE: <Simple name="dispair" />
}

export interface IconProps {
  name: string
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const icon = iconDictionary[name]
  if (icon) return icon
  else return name
}

export default Icon
