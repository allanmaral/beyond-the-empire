import styled from 'styled-components'

export const SVG = styled.svg<{ disabled?: boolean }>`
  display: inline-flex;
  width: calc(0.86 * var(--checkbox-size));
  height: calc(0.86 * var(--checkbox-size));
  user-select: none;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`

export const Label = styled.label<{ fontSize: string; disabled?: boolean }>`
  --checkbox-size: ${props => props.fontSize};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.75 : 1)};
  height: var(--checkbox-size);
  line-height: var(--checkbox-size);
`

export const Text = styled.span<{ disabled?: boolean }>`
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
  padding-left: calc(var(--checkbox-size) * 0.57);
  user-select: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`

export const Input = styled.input`
  opacity: 0;
  outline: none;
  position: absolute;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  z-index: -1;
  background-color: transparent;
`
