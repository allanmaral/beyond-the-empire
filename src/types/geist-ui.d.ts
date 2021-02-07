/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-empty-interface */
import '@geist-ui/react'
import type { GeistUIThemesPalette as Palette } from '@geist-ui/react'

declare module '@geist-ui/react' {
  export interface GeistUIThemesPalette extends Palette {
    link_hover: string
    primary: string
    accent: string
    accent2: string
  }
}
