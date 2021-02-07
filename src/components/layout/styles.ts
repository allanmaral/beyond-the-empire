import styled from 'styled-components'
import { breakpoints } from '../../styles/utils'

const sidebarWidth = 160

export const Container = styled.div`
  min-height: calc(100vh - 108px);
  max-width: ${props => props.theme.layout.pageWidthWithMargin};
  margin: 0 auto;
  padding: 0 ${props => props.theme.layout.gap};
  display: flex;
  box-sizing: border-box;

  ${breakpoints.tablet} {
    max-width: calc(100vw - 3rem);
    width: 100vw;
    padding: 2rem 0;
  }
`

export const Aside = styled.aside<{ fixed?: boolean; expanded?: boolean }>`
  width: ${sidebarWidth - 20}px;
  margin-right: 20px;
  --webkit-overflow-scrolling: touch;
  flex-shrink: 0;
  height: calc(100% - 2rem - 140px + ${props => (props.fixed ? '60px' : 0)});
  position: fixed;
  top: 140px;
  bottom: 2rem;
  transform: translateY(${props => (props.fixed ? '-60px' : 0)});
  transition: transform 200ms ease-out;
  z-index: 100;

  ${breakpoints.tablet} {
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    width: 100vw;
    height: ${props => (props.expanded ? '100vh' : 0)};
    background-color: ${props => props.theme.palette.background};
    padding: 0;
    overflow: hidden;
    transition: height 250ms ease;
  }
`

export const SideShadow = styled.div`
  width: ${sidebarWidth}px;
  flex-shrink: 0;
  height: 100%;

  ${breakpoints.tablet} {
    display: none;
    visibility: hidden;
  }
`

export const Main = styled.main`
  display: flex;
  max-width: calc(100% - ${sidebarWidth}px);
  flex-direction: column;
  padding-left: 20px;
  flex: 0 0 100%;
  padding-bottom: 150px;

  ${breakpoints.tablet} {
    width: 100%;
    max-width: unset;
    padding: 0;
  }
`

export const EmptySection = styled.section`
  display: none;
  opacity: 0;
`
