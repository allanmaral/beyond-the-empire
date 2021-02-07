import styled from 'styled-components'
import { Text } from '@geist-ui/react'
import { breakpoints } from '../../styles/utils'

// ## Filter Components
// #####################

export const FilterContainer = styled.div`
  min-width: 400px;

  ${breakpoints.mobile} {
    min-width: calc(100vw - 3rem);
  }
`

export const FilterFieldContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const FilterLabel = styled(Text)`
  margin-bottom: ${props => props.theme.layout.gapHalf};
`

// ## Search
// ##########

export const SearchBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${props => props.theme.layout.gap} 0;

  && {
    .btn {
      height: 100%;
    }

    .tooltip {
      height: auto;
    }
  }
`

export const SearchContainer = styled.div`
  max-width: 50%;
  width: 250px;

  ${breakpoints.mobile} {
    max-width: unset;
    width: 100%;
  }

  .input-wrapper {
    background: ${props => props.theme.palette.background};
  }
`
