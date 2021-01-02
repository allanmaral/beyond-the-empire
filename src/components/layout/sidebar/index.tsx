import { memo, useEffect, useMemo, useRef } from 'react'
import { Router } from 'next/router'

import SideItem from './sideItem'
import useConfig from '../../hooks/useConfig'
import useLocale from '../../hooks/useLocale'

import Metadatas, { Sides } from '../../../lib/data'
import { SidebarContainer } from './styles'

export type SideChildren = Sides | Array<Sides>

const SideGroup: React.FC<{ sides?: SideChildren }> = memo(({ sides }) => {
  if (!sides) return null
  sides = Array.isArray(sides) ? sides : [sides]
  return (
    <SideItem sides={sides}>
      <SideGroup />
    </SideItem>
  )
})

const Sidebar: React.FC = memo(() => {
  const boxRef = useRef<HTMLDivElement>(null)
  const { sidebarScrollHeight, updateSidebarScrollHeight } = useConfig()
  const { locale, tabbar } = useLocale()

  const tabbarData = useMemo(() => {
    const allSides = Metadatas[locale]
    const currentSide = allSides.filter(side => side.name === tabbar)[0]

    return (currentSide.children || []) as Array<Sides>
  }, [tabbar, locale])

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      if (!boxRef.current) return
      updateSidebarScrollHeight(boxRef.current.scrollTop || 0)
    })
  }, [])

  useEffect(() => {
    if (!boxRef.current) return
    boxRef.current.scrollTo({ top: sidebarScrollHeight })
  }, [boxRef.current, sidebarScrollHeight])

  return (
    <SidebarContainer ref={boxRef}>
      <SideItem sides={tabbarData}>
        <SideGroup />
      </SideItem>
    </SidebarContainer>
  )
})

export default Sidebar
