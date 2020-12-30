import { GeistUIThemes } from '@geist-ui/react'
import { ThemedStyledProps } from 'styled-components'
import { light, dark } from './themes'

export const mapTheme = (theme: GeistUIThemes): { [key: string]: string } => {
  if (!theme) return
  return {
    '--pallete-accent-1': theme.palette.accents_1 || '',
    '--pallete-accent-2': theme.palette.accents_2 || '',
    '--pallete-accent-3': theme.palette.accents_3 || '',
    '--pallete-accent-4': theme.palette.accents_4 || '',
    '--pallete-accent-5': theme.palette.accents_5 || '',
    '--pallete-accent-6': theme.palette.accents_6 || '',
    '--pallete-accent-7': theme.palette.accents_7 || '',
    '--pallete-accent-8': theme.palette.accents_8 || '',
    '--pallete-background': theme.palette.background || '',
    '--pallete-foreground': theme.palette.foreground || '',
    '--pallete-selection': theme.palette.selection || '',
    '--pallete-secondary': theme.palette.secondary || '',
    '--pallete-code': theme.palette.code || '',
    '--pallete-border': theme.palette.border || '',
    '--pallete-success': theme.palette.success || '',
    '--pallete-successLighter': theme.palette.successLighter || '',
    '--pallete-successLight': theme.palette.successLight || '',
    '--pallete-successDark': theme.palette.successDark || '',
    '--pallete-error': theme.palette.error || '',
    '--pallete-errorLighter': theme.palette.errorLighter || '',
    '--pallete-errorLight': theme.palette.errorLight || '',
    '--pallete-errorDark': theme.palette.errorDark || '',
    '--pallete-warning': theme.palette.warning || '',
    '--pallete-warningLighter': theme.palette.warningLighter || '',
    '--pallete-warningLight': theme.palette.warningLight || '',
    '--pallete-warningDark': theme.palette.warningDark || '',
    '--pallete-cyan': theme.palette.cyan || '',
    '--pallete-cyanLighter': theme.palette.cyanLighter || '',
    '--pallete-cyanLight': theme.palette.cyanLight || '',
    '--pallete-cyanDark': theme.palette.cyanDark || '',
    '--pallete-violet': theme.palette.violet || '',
    '--pallete-violetLighter': theme.palette.violetLighter || '',
    '--pallete-violetLight': theme.palette.violetLight || '',
    '--pallete-violetDark': theme.palette.violetDark || '',
    '--pallete-link': theme.palette.link || '',
    '--pallete-purple': theme.palette.purple || '',
    '--pallete-magenta': theme.palette.magenta || '',
    '--pallete-alert': theme.palette.alert || '',

    // expressiveness
    '--expre-linkStyle': theme.expressiveness.linkStyle || '',
    '--expre-linkHoverStyle': theme.expressiveness.linkHoverStyle || '',
    '--expre-dropdownBoxShadow': theme.expressiveness.dropdownBoxShadow || '',
    '--expre-scrollerStart': theme.expressiveness.scrollerStart || '',
    '--expre-scrollerEnd': theme.expressiveness.scrollerEnd || '',
    '--expre-shadowSmall': theme.expressiveness.shadowSmall || '',
    '--expre-shadowMedium': theme.expressiveness.shadowMedium || '',
    '--expre-shadowLarge': theme.expressiveness.shadowLarge || '',
    '--expre-portalOpacity': String(theme.expressiveness.portalOpacity) || '',

    // Layout
    '--layout-gap': theme.layout.gap || '',
    '--layout-gapNegative': theme.layout.gapNegative || '',
    '--layout-gapHalf': theme.layout.gapHalf || '',
    '--layout-gapHalfNegative': theme.layout.gapHalfNegative || '',
    '--layout-gapQuarter': theme.layout.gapQuarter || '',
    '--layout-gapQuarterNegative': theme.layout.gapQuarterNegative || '',
    '--layout-pageMargin': theme.layout.pageMargin || '',
    '--layout-pageWidth': theme.layout.pageWidth || '',
    '--layout-pageWidthWithMargin': theme.layout.pageWidthWithMargin || '',
    '--layout-breakpointMobile': theme.layout.breakpointMobile || '',
    '--layout-breakpointTablet': theme.layout.breakpointTablet || '',
    '--layout-radius': theme.layout.radius || '',

    // Breaking points
    '--bkpt-xs-min': theme.breakpoints.xs.min,
    '--bkpt-xs-max': theme.breakpoints.xs.max,
    '--bkpt-sm-min': theme.breakpoints.sm.min,
    '--bkpt-sm-max': theme.breakpoints.sm.max,
    '--bkpt-md-min': theme.breakpoints.md.min,
    '--bkpt-md-max': theme.breakpoints.md.max,
    '--bkpt-lg-min': theme.breakpoints.lg.min,
    '--bkpt-lg-max': theme.breakpoints.lg.max,
    '--bkpt-xl-min': theme.breakpoints.xl.min,
    '--bkpt-xl-max': theme.breakpoints.xl.max
  }
}

const themes = {
  light,
  dark
}

export const getTheme = (theme?: string): GeistUIThemes => {
  return themes[theme || ''] || themes.light
}

export const applyTheme = (theme?: string): void => {
  const mappedTheme = mapTheme(getTheme(theme))
  if (!mappedTheme) {
    return
  }

  const root =
    typeof document !== 'undefined' ? document.documentElement : undefined
  if (!root) {
    return
  }

  Object.keys(mappedTheme).forEach(property => {
    root.style.setProperty(property, mappedTheme[property])
  })
}

type BaseThemedProp = ThemedStyledProps<Record<string, unknown>, GeistUIThemes>
type BreakpointKey = keyof GeistUIThemes['breakpoints']

export const breakpoints = {
  up: (key: BreakpointKey) => (props: BaseThemedProp): string => {
    return `@media (min-width:${props.theme.breakpoints[key].min})`
  },
  down: (key: BreakpointKey) => (props: BaseThemedProp): string => {
    const maxWidth =
      Number(props.theme.breakpoints[key].max.replace('px', '')) - 0.05
    return `@media (max-width:${maxWidth}px)`
  },
  only: (key: BreakpointKey) => (props: BaseThemedProp): string => {
    const bk = props.theme.breakpoints[key]
    const maxWidth = Number(bk.max.replace('px', '')) - 0.05
    return `"@media (min-width:${bk.min}) and (max-width:${maxWidth})"`
  },
  between: (start: BreakpointKey, end: BreakpointKey) => (
    props: BaseThemedProp
  ): string => {
    const bkS = props.theme.breakpoints[start]
    const bkE = props.theme.breakpoints[end]
    const maxWidth = Number(bkE.max.replace('px', '')) - 0.05
    return `"@media (min-width:${bkS.min}) and (max-width:${maxWidth})"`
  },
  mobile: (props: BaseThemedProp): string => {
    const maxWidth =
      Number(props.theme.layout.breakpointMobile.replace('px', '')) - 0.05
    return `@media (max-width:${maxWidth}px)`
  },
  tablet: (props: BaseThemedProp): string => {
    const maxWidth =
      Number(props.theme.layout.breakpointTablet.replace('px', '')) - 0.05
    return `@media (max-width:${maxWidth}px)`
  },
  tabletAndUp: (props: BaseThemedProp): string => {
    return `@media (min-width:${props.theme.breakpoints.sm.min})`
  }
}
