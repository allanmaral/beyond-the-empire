import { useEffect, useMemo } from 'react'
import { Tabs, useCurrentState } from '@geist-ui/react'
import Router from 'next/router'

import Metadatas from '../../lib/data'
import useConfig from '../hooks/useConfig'
import useLocale from '../hooks/useLocale'

import { FixableNav, Inner, Sticker, NavFill } from './styles'

const MenuSticker: React.FC = () => {
  const { updateTabbarFixed } = useConfig()
  const [tabValue, setTabVale, tabValueRef] = useCurrentState<string>('')
  const [fixed, setFixed, fixedRef] = useCurrentState<boolean>(false)
  // TODO: REVIEW LOCALE
  const { tabbar: currentUrlTabValue, locale } = useLocale()

  const tabbarData = useMemo(() => Metadatas[locale], [locale])

  useEffect(() => updateTabbarFixed(fixed), [fixed])
  useEffect(() => setTabVale(currentUrlTabValue), [currentUrlTabValue])
  useEffect(() => {
    const scrollHandler = () => {
      const shouldFix = document.documentElement.scrollTop > 60
      if (shouldFix === fixedRef.current) return
      setFixed(shouldFix)
    }
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])
  useEffect(() => {
    const shouldRedirectPage = currentUrlTabValue !== tabValueRef.current
    if (!shouldRedirectPage) return
    if (tabValueRef.current === 'home') Router.push('/')
    else Router.push(`/${tabValueRef.current}`)
  }, [tabValue, currentUrlTabValue])

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
