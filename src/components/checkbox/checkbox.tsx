import { NormalSizes } from '@geist-ui/react/dist/utils/prop-types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCheckbox } from './checkboxContext'
import CheckboxGroup, { getCheckboxSize } from './checkboxGroup'
import CheckboxIcon from './checkboxIcon'

import { Label, Text, Input } from './styles'

interface CheckboxEventTarget {
  checked: boolean
}

export interface CheckboxEvent {
  target: CheckboxEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent
}

interface Props {
  checked?: boolean
  disabled?: boolean
  initialChecked?: boolean
  onChange?: (e: CheckboxEvent) => void
  size?: NormalSizes
  className?: string
  value?: string
  allowNull?: boolean
}

const defaultProps = {
  disabled: false,
  initialChecked: false,
  size: 'small' as NormalSizes,
  className: '',
  value: '',
  allowNull: false
}

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>
export type CheckboxProps = Props & typeof defaultProps & NativeAttrs

const toggleCheck = (
  value: boolean | undefined,
  allowNull = false
): boolean | undefined => {
  if (!allowNull) return !value
  if (value === null) return true
  if (value === true) return false
  return null
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  initialChecked,
  allowNull,
  disabled,
  onChange,
  className,
  children,
  size,
  value,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState<boolean>(
    allowNull ? checked : initialChecked
  )
  const { updateState, inGroup, disabledAll, values } = useCheckbox()
  const el = useRef(null)
  const isDisabled = inGroup ? disabledAll || disabled : disabled

  if (inGroup && checked) {
    console.warn(
      'Remove props "checked" when [Checkbox] component is in the group.',
      'Checkbox'
    )
  }
  if (inGroup) {
    useEffect(() => {
      const next = values.includes(value)
      if (next === selfChecked) return
      setSelfChecked(next)
    }, [values.join(',')])
  }

  const fontSize = useMemo(() => getCheckboxSize(size), [size])
  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
      if (isDisabled) return
      const newChecked = toggleCheck(selfChecked, allowNull && !inGroup)
      const selfEvent: CheckboxEvent = {
        target: {
          checked: newChecked
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev
      }
      if (inGroup && updateState) {
        updateState && updateState(value, newChecked)
      }

      setSelfChecked(newChecked)
      onChange && onChange(selfEvent)
    },
    [updateState, onChange, isDisabled, selfChecked]
  )

  useEffect(() => {
    if (checked === undefined && (inGroup || !allowNull)) return
    setSelfChecked(checked)
    if (el.current) {
      el.current.checked = checked === true
      el.current.indeterminate = typeof checked !== 'boolean'
    }
  }, [checked])

  return (
    <Label disabled={isDisabled} fontSize={fontSize} className={`${className}`}>
      <CheckboxIcon disabled={isDisabled} checked={selfChecked} />
      <Input
        ref={el}
        type="checkbox"
        disabled={isDisabled}
        onChange={changeHandle}
        {...props}
      />
      <Text>{children}</Text>
    </Label>
  )
}

Checkbox.defaultProps = defaultProps

// eslint-disable-next-line @typescript-eslint/ban-types
type CheckboxComponent<P = {}> = React.FC<P> & {
  Group: typeof CheckboxGroup
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

export default Checkbox as CheckboxComponent<ComponentProps>
