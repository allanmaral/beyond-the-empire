import { GeistUIThemes } from '@geist-ui/react'
import { DeepPartial } from '../../types/utils'
export { default as light } from './light'
export { default as dark } from './dark'
export type Theme = GeistUIThemes
export type PartialTheme = DeepPartial<Theme>
