import styled from 'styled-components'
import { breakpoints } from '../../../styles/utils'

export const Tabbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 950;
  height: 3.7rem;
  background-color: ${props => props.theme.palette.background};
  display: flex;
  padding: 0 1rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.palette.border};

  && {
    .toggle {
      width: 40px;
      height: 40px;
      padding: 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: ${props => props.theme.palette.accents_6};
    }
  }

  span {
    color: ${props => props.theme.palette.accents_7};
    font-size: 0.75rem;
    display: inline-flex;
    text-transform: capitalize;
  }

  ${breakpoints.desktop} {
    display: none;
    visibility: hidden;
    top: -1000px;
  }

  &.fixed {
    border-bottom: none;
    background-color: transparent;
  }
`
export const Item = styled.div`
  width: 100%;
`

export const Children = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  position: relative;
  margin-top: 0.5rem;
`

export const CatalogSpan = styled.span`
  font-size: 0.8125rem;
  transition: all 0.2s ease;
  color: ${props => props.theme.palette.accents_4};
  text-transform: uppercase;
  letter-spacing: 1.3px;

  &.active {
    color: ${props => props.theme.palette.foreground};
  }
`

export const LinkContainer = styled.div`
  width: 100%;
  color: ${props => props.theme.palette.accents_5};
  display: flex;
  height: 2.25rem;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  text-transform: capitalize;

  a {
    color: ${props => props.theme.palette.accents_7};
    font-size: 1rem;
    transition: all 200ms ease;
    font-weight: 400;
    display: inline-flex;
    align-items: baseline;
  }

  a.active {
    color: ${props => props.theme.palette.success};
    font-weight: 600;

    span {
      color: ${props => props.theme.palette.successLight};
    }
  }

  span {
    font-size: 0.75rem;
    color: ${props => props.theme.palette.accents_4};
    font-weight: 400;
  }
`
export const SidebarContainer = styled.div`
  width: 100%;
  padding-bottom: ${props => props.theme.layout.gap};

  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }

  & > div {
    margin-bottom: ${props => props.theme.layout.gap};
  }

  ${breakpoints.tablet} {
    padding: calc(3.5 * ${props => props.theme.layout.gap})
      calc(2 * ${props => props.theme.layout.gap});
    width: 100vw;
    height: 100%;
  }
`
