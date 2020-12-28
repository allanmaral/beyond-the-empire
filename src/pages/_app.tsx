import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../styles/global'
import { light } from '../styles/themes'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
