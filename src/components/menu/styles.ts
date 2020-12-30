import styled from 'styled-components'

export const SiteName = styled.div`
  display: flex;
  align-items: center;
`
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  user-select: none;
  position: relative;
  margin: 0 auto;
  padding: 0 ${props => props.theme.layout.gap};
  height: 60px;
`

export const NavFill = styled.div`
  width: 0px;
  height: 0px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  background-color: ${props => props.theme.palette.background};

  &.active {
    height: 48px;
    visibility: visible;
  }
`

export const FixableNav = styled.nav`
  position: relative;
  width: 100%;
  height: 48px;
  background-color: ${props => props.theme.palette.background};

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: ${props => props.theme.palette.background};
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 15px 0;
  }
`

export const Sticker = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:before {
    position: absolute;
    content: '';
    height: 1px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.palette.border};
  }
`

export const Inner = styled.div`
  max-width: ${props => props.theme.layout.pageWidth};
  padding: 0 ${props => props.theme.layout.gap};
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 100%;
  overflow: auto;
  z-index: 900;
  margin: 0 auto;

  && {
    .content {
      display: none;
    }

    .tabs,
    header {
      height: 100%;
      border: none;
    }

    .tab {
      height: calc(100% - 2px);
      padding-top: 0;
      padding-bottom: 0;
      color: ${props => props.theme.palette.accents_5};
      font-size: 0.875rem;

      &:hover {
        color: ${props => props.theme.palette.foreground};
      }
    }

    .active {
      color: ${props => props.theme.palette.foreground};
    }
  }
`
