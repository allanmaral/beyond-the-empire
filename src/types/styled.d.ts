/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components'
import { GeistUIThemes } from '@geist-ui/react'

type Theme = GeistUIThemes
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
