import { AppProps } from 'next/app'
import { CssBaseline, GeistProvider } from '@geist-ui/react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../styles/global'

import { ConfigProvider } from '../components/hooks/useConfig'
import useDomClean from '../components/hooks/useDomClean'
import useCustomTheme from '../components/hooks/useCustomTheme'
import Menu from '../components/menu'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useCustomTheme()
  useDomClean()

  return (
    <GeistProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <ConfigProvider onThemeChange={setTheme}>
          <Menu />
          <Component {...pageProps} />
        </ConfigProvider>
      </ThemeProvider>
    </GeistProvider>
  )
}

export default App
