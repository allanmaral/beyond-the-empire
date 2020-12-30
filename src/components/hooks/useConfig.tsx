/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, memo, useContext, useMemo, useState } from 'react'
import { useCurrentState } from '@geist-ui/react'
import { useTheme } from 'styled-components'

import { deepMergeObject } from '../../lib/utils'
import { light, PartialTheme, Theme } from '../../styles/themes'

export interface Configs {
  sidebarScrollHeight: number
  updateSidebarScrollHeight: (scrollHeight: number) => void

  tabbarFixed: boolean
  updateTabbarFixed: (tabbarFixed: boolean) => void

  theme: Theme
  updateTheme: (theme: PartialTheme) => void
  onThemeChange?: (theme: PartialTheme) => void
}

const initialConfig: Configs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},

  tabbarFixed: false,
  updateTabbarFixed: () => {},

  theme: light,
  updateTheme: () => {},
  onThemeChange: () => {}
}

const ConfigContext = createContext<Configs>(initialConfig)
interface ConfigProviderProps {
  children: React.ReactNode
  onThemeChange?: (theme: PartialTheme) => void
}

export const ConfigProvider: React.FC<ConfigProviderProps> = memo(
  ({ onThemeChange, children }) => {
    const theme = useTheme()
    const [scrollHeight, setScrollHeight] = useState<number>(0)
    const [tabbarFixed, setTabbarFixed] = useState<boolean>(false)
    const [
      customTheme,
      setCustomTheme,
      customThemeRef
    ] = useCurrentState<Theme>(theme)

    const updateSidebarScrollHeight = (height: number) =>
      setScrollHeight(height)
    const updateTabbarFixed = (state: boolean) => setTabbarFixed(state)
    const updateCustomTheme = (nextTheme: PartialTheme) => {
      const mergedTheme = deepMergeObject(customThemeRef.current, nextTheme)
      setCustomTheme(mergedTheme)
      onThemeChange && onThemeChange(mergedTheme)
    }

    const initialValue = useMemo<Configs>(
      () => ({
        onThemeChange,
        theme: customTheme,
        updateTheme: updateCustomTheme,
        tabbarFixed,
        updateTabbarFixed,
        sidebarScrollHeight: scrollHeight,
        updateSidebarScrollHeight
      }),
      [onThemeChange, scrollHeight, tabbarFixed]
    )

    return (
      <ConfigContext.Provider value={initialValue}>
        {children}
      </ConfigContext.Provider>
    )
  }
)

const useConfig = (): Configs => useContext(ConfigContext)

export default useConfig
