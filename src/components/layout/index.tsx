import useConfig from '../hooks/useConfig'
import useAwaitForRender from '../hooks/useAwaitForRender'
import { memo, useCallback, useState } from 'react'
import { useBodyScroll } from '@geist-ui/react'

import PageHeader from '../header'
import TabbarMobile from './sidebar/tabbarMobile'

import { Aside, Container, EmptySection, SideShadow, Main } from './styles'
import Sidebar from './sidebar'

export interface Meta {
  title: string
}

export interface LayoutProps {
  children: React.ReactNode
  meta: Meta
  getStaticProps?: unknown
}

export const Layout: React.FC<LayoutProps> = memo(({ children, meta }) => {
  const pageRendered = useAwaitForRender()
  const { tabbarFixed } = useConfig()
  const [, setBodyScroll] = useBodyScroll()
  const [expanded, setExpanded] = useState<boolean>(false)
  const mobileTabbarCliHandler = useCallback(() => {
    setExpanded(!expanded)
    setBodyScroll(!expanded)
  }, [expanded])

  if (!pageRendered) {
    return (
      <EmptySection>
        <PageHeader meta={meta} />
        {children}
      </EmptySection>
    )
  }

  return (
    <Container>
      <PageHeader meta={meta} />
      <TabbarMobile onClick={mobileTabbarCliHandler} />
      <Aside expanded={expanded} fixed={tabbarFixed}>
        <Sidebar />
      </Aside>
      <SideShadow />
      <Main>
        <div>{children}</div>
      </Main>
    </Container>
  )
})
