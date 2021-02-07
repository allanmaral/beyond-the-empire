import styled, { keyframes } from 'styled-components'
import { breakpoints } from '../../styles/utils'

const tooltipFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Container = styled.div<{ dots?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.theme.palette.link};
  ${props => (props.dots ? 'border-bottom: 1px dotted' : '')};
  position: relative;

  @media (hover: hover) {
    &:hover {
      .tooltip-dropdown {
        animation: ${tooltipFadeIn} 0.15s;
        display: block;
      }
    }
  }
`

export const Reference = styled.div<{ help?: boolean }>`
  &:before {
    content: '';
    display: flex;
    ${props => (props.help ? 'cursor: help' : '')};
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
`

export const TooltipDropdown = styled.div.attrs<{ visible: boolean }>(
  props => ({
    className: `tooltip-dropdown${props.visible ? ' tooltip-open' : ''}`
  })
)<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  padding-top: 32px;

  &.tooltip-dropdown {
    display: none;
  }

  &.tooltip-open {
    display: block;
    animation: ${tooltipFadeIn} 0.15s;
  }
`

export const TooltipContent = styled.div`
  color: ${props => props.theme.palette.foreground};
  background-color: ${props => props.theme.palette.background};
  border-radius: ${props => props.theme.layout.radius};
  box-shadow: ${props => props.theme.expressiveness.shadowMedium};
  padding: ${props => props.theme.layout.gap};
  max-width: 90vw;
  text-align: left;

  min-width: 400px;
  ${breakpoints.mobile} {
    width: 100vw;
    min-width: calc(100vw - 3rem);
  }
`
