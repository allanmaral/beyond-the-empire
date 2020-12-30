import { memo } from 'react'
import { useRouter } from 'next/router'

import { CatalogSpan } from './styles'

export interface ActiveCatalogProps {
  name: string
  localeName?: string
}

const ActiveCatalog: React.FC<ActiveCatalogProps> = memo(
  ({ name, localeName, ...props }) => {
    const { pathname } = useRouter()
    const isActive = pathname.includes(`/${name}/`)

    return (
      <CatalogSpan {...props} className={isActive ? 'active' : ''}>
        {localeName || name}
      </CatalogSpan>
    )
  }
)

export default ActiveCatalog
