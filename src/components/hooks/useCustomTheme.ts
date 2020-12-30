import { useEffect, useState } from 'react'
import { light, PartialTheme, Theme } from '../../styles/themes'
import { getTheme } from '../../styles/utils'

const useCustomTheme = (): [Theme, (theme: PartialTheme) => void] => {
  const [customTheme, setCustomTheme] = useState<Theme>(light)
  const themeChangeHandle = (theme: PartialTheme) => {
    setCustomTheme(getTheme(theme.type))
  }

  useEffect(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme !== 'dark') return
    themeChangeHandle({ type: 'dark' })
  }, [])

  return [customTheme, themeChangeHandle]
}

export default useCustomTheme
