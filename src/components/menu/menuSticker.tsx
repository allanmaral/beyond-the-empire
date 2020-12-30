import { Tabs, useCurrentState } from '@geist-ui/react'
import { useEffect, useMemo } from 'react'
import useConfig from '../hooks/useConfig'

import { FixableNav, Inner, Sticker, NavFill } from './styles'

const MenuSticker: React.FC = () => {
  const { updateTabbarFixed } = useConfig()
  const [tabValue, setTabVale] = useCurrentState<string>('')
  const [fixed, setFixed, fixedRef] = useCurrentState<boolean>(false)

  const tabbarData = useMemo(
    () => [{ name: 'weapons', localeName: 'Weapons' }],
    []
  )

  useEffect(() => updateTabbarFixed(fixed), [fixed])
  useEffect(() => {
    const scrollHandler = () => {
      const shouldFix = document.documentElement.scrollTop > 60
      if (shouldFix === fixedRef.current) return
      setFixed(shouldFix)
    }
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <>
      <NavFill className={fixed ? 'active' : ''} />
      <FixableNav className={fixed ? 'fixed' : ''}>
        <Sticker>
          <Inner>
            <Tabs value={tabValue} onChange={val => setTabVale(val)}>
              {tabbarData
                ? tabbarData.map((tab, index) => (
                    <Tabs.Item
                      label={tab.localeName || tab.name}
                      value={tab.name}
                      key={`${tab.localeName || tab.name}-${index}`}
                    />
                  ))
                : null}
            </Tabs>
          </Inner>
        </Sticker>
      </FixableNav>
    </>
  )
}

export default MenuSticker
