import Frame from './frame'

import { CharacteristicsContainer } from './styles'

export interface CharacteristicsProps {
  characteristics: {
    name: React.ReactNode
    value: React.ReactNode
  }[]
}

const Characteristics: React.FC<CharacteristicsProps> = ({
  characteristics
}) => {
  return (
    <>
      <CharacteristicsContainer>
        {characteristics.map((characteristic, index) => (
          <div key={`characteristic_${characteristic.name}_${index}`}>
            <Frame name={characteristic.name} value={characteristic.value} />
          </div>
        ))}
      </CharacteristicsContainer>
    </>
  )
}

export default Characteristics
