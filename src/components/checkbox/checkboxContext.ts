import { createContext, useContext } from 'react'

export interface CheckboxConfig {
  updateState?: (value: string, checked: boolean) => void
  disabledAll: boolean
  values: string[]
  inGroup: boolean
}

const defaultContext = {
  disabledAll: false,
  inGroup: false,
  values: []
}

export const CheckboxContext = createContext<CheckboxConfig>(defaultContext)

export const useCheckbox = (): CheckboxConfig =>
  useContext<CheckboxConfig>(CheckboxContext)
