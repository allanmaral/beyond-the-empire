import styled from 'styled-components'
import { breakpoints } from '../../styles/utils'

export const Container = styled.div`
  height: 100%;
  display: flex;
  margin: 0;
  position: relative;

  .select {
    width: min-content !important;
    min-width: unset !important;
  }

  ${breakpoints.mobile} {
    display: none;
    pointer-events: none;
    visibility: hidden;
  }
`
export const Tools = styled.div`
  display: flex;
  height: 2.5rem;
  box-sizing: border-box;
  align-items: center;
`
export const SelectContent = styled.div`
  width: auto;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`
