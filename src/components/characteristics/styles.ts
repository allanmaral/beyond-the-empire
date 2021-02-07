/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import { Card as GeistCard, Text as GeistText } from '@geist-ui/react'
import { breakpoints, flexContainerWrapItems } from '../../styles/utils'

export const CharacteristicsContainer = styled.div`
  justify-content: center;
  ${props => flexContainerWrapItems(125, Number(props.theme.breakpoints.md.max.replace('px', '')))};
  & > * {
    padding: 5px;
  }

  ${breakpoints.desktop} {
    && {
      & > * {
        max-width: 140px;
      }
    }
  }
`
export const CharacteristicsCard = styled(GeistCard)`
  && {
    && {
      display: inline-block;
    }
  }
`
// export const CharacteristicsCard = styled(GeistCard)`
//   && {
//     && {
//       display: inline-block;
//       min-width: 130px;
//       max-width: 130px;
//       margin: 5px;
//       flex: 1 1 0px;
//       padding: 0;

//       ${breakpoints.mobile} {
//         min-width: 136px;
//         max-width: 181px;
//       }
//     }
//   }
// `

export const CharacteristicsName = styled(GeistText)`
  text-align: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${props => props.color || props.theme.palette.accents_5} !important;
  font-weight: 500;
`

export const CharacteristicsValue = styled(GeistText)`
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${props => props.color || props.theme.palette.accents_5} !important;
  font-weight: 500;
  margin-bottom: 1.275rem;
`

export const FrameContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 104%;
`

export const FrameBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

export const FrameBackgroundSmall = styled.div<{ color: string }>`
  height: 17%;
  background: ${props => props.color};
  border-radius: 10px;
  margin-bottom: 2%;
`

export const FrameBackgroundBig = styled.div<{ color: string }>`
  height: 43%;
  background: ${props => props.color};
  border-radius: 10px;
  margin-bottom: 2%;
`

export const FrameForeground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`

export const FrameScoreContainer = styled.div<{ color: string; outline: string }>`
  width: 70%;
  height: 70%;
  background: ${props => props.color};
  padding: 8%;

  border: 3px solid ${props => props.outline};
  border-radius: 18px;
  box-sizing: border-box;
`

export const FrameScoreInner = styled.div<{ outline: string }>`
  width: 100%;
  height: 100%;
  padding-top: 0.25em;

  border: 2px solid ${props => props.outline};
  border-radius: 18px;
  box-sizing: border-box;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const FrameValueContainer = styled.div<{ color: string }>`
  width: 92%;
  height: 17%;
  margin-bottom: 2%;
  background: ${props => props.color};

  border-radius: 7px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`
