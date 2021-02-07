import {
  GeistUIThemes,
  GeistUIThemesPalette,
  GeistUIThemesExpressiveness
} from '@geist-ui/react'
import { defaultFont, defaultBreakpoints, defaultLayout } from './shared'

export const palette: GeistUIThemesPalette = {
  accents_1: '#fafafa',
  accents_2: '#eaeaea',
  accents_3: '#999999',
  accents_4: '#888888',
  accents_5: '#666666',
  accents_6: '#444444',
  accents_7: '#333333',
  accents_8: '#111111',
  background: '#ffffff',
  foreground: '#000000',
  selection: '#79ffe1',
  secondary: '#666666',
  code: '#f81ce5',
  border: '#eaeaea',
  error: '#ee0000',
  errorLight: '#ff1a1a',
  errorLighter: '#f7d4d6',
  errorDark: '#c50000',
  success: '#0070f3',
  successLight: '#3291ff',
  successLighter: '#d3e5ff',
  successDark: '#0761d1',
  warning: '#f5a623',
  warningLight: '#f7b955',
  warningLighter: '#ffefcf',
  warningDark: '#ab570a',
  cyan: '#50e3c2',
  cyanLighter: '#aaffec',
  cyanLight: '#79ffe1',
  cyanDark: '#29bc9b',
  violet: '#7928ca',
  violetLighter: '#e3d7fc',
  violetLight: '#8a63d2',
  violetDark: '#4c2889',
  purple: '#f81ce5',
  alert: '#ff0080',
  magenta: '#eb367f',
  link: '#741415',
  link_hover: '#741415',

  primary: '#52634a',
  accent: '#741415',
  accent2: '#876d2b'
}

export const expressiveness: GeistUIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
  shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
  shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
  portalOpacity: 0.25
}

export const font = defaultFont

export const breakpoints = defaultBreakpoints

export const layout = defaultLayout

export const themes: GeistUIThemes = {
  type: 'light',
  font,
  layout,
  palette,
  breakpoints,
  expressiveness
}

export default themes
