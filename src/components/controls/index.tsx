import { memo, useMemo } from 'react'
import { Button, Select, Spacer, useTheme } from '@geist-ui/react'

import SunIcon from '@geist-ui/react-icons/sun'
import MoonIcon from '@geist-ui/react-icons/moon'

import useConfig from '../hooks/useConfig'
import { Container, Tools, SelectContent } from './styles'

const Controls: React.FC = memo(() => {
  const theme = useTheme()
  const { updateTheme } = useConfig()
  const isDark = useMemo(() => theme.type === 'dark', [theme.type])

  const switchThemes = (type: string | string[]) => {
    const themeName = type as 'light' | 'dark'
    updateTheme({ type: themeName })
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.setItem('theme', themeName)
  }

  const redirectGithub = () => {
    if (typeof window !== 'undefined') {
      window.open('https://github.com/allanmaral/beyond-the-empire')
    }
  }

  return (
    <Container>
      <Tools>
        <Button
          auto
          type="abort"
          size="small"
          onClick={redirectGithub}
          title="Github Repository"
        >
          Github
        </Button>
        <Spacer x={0.75} />
        <Select
          pure
          size="small"
          onChange={switchThemes}
          value={isDark ? 'dark' : 'light'}
          title="Switch Themes"
        >
          <Select.Option value="light">
            <SelectContent>
              <SunIcon size={14} /> Light
            </SelectContent>
          </Select.Option>
          <Select.Option value="dark">
            <SelectContent>
              <MoonIcon size={14} /> Dark
            </SelectContent>
          </Select.Option>
        </Select>
      </Tools>
    </Container>
  )
})

export default Controls
