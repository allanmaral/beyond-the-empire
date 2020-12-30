import { cloneElement, memo } from 'react'

import ActiveCatalog from './activeCatalog'
import ActiveLink from './activeLink'
import { Sides } from '../../../data'

import { Children, Item } from './styles'

export interface SideItemProps {
  children: React.ReactNode
  sides: Array<Sides>
}

const SideItem: React.FC<SideItemProps> = memo(({ children, sides }) => {
  return (
    <>
      {sides.map((side, index) => {
        const showChildren = side.children && children
        return (
          <Item key={`${side.localeName || side.name}-${index}`}>
            {!side.url && (
              <ActiveCatalog name={side.name} localeName={side.localeName} />
            )}
            {side.url && <ActiveLink href={side.url} text={side.name} />}
            {showChildren && (
              <Children>
                {cloneElement(children as React.ReactElement, {
                  sides: side.children
                })}
              </Children>
            )}
          </Item>
        )
      })}
    </>
  )
})

export default SideItem
