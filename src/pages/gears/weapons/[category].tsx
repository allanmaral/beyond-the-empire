import { GetStaticPaths, GetStaticProps } from 'next'
import { Table, Text, Input, Button, Spacer, Popover } from '@geist-ui/react'
import SearchIcon from '@geist-ui/react-icons/search'
import FilterIcon from '@geist-ui/react-icons/filter'

import { Layout } from '../../../components/layout'

import Weapons, { WeaponTableEntry } from '../../../lib/models/weapons'
import styled from 'styled-components'
import { breakpoints } from '../../../styles/utils'
import { useCallback, useMemo, useState } from 'react'

interface WeaponPageProps {
  name: string
  weapons: WeaponTableEntry[]
}

const SearchBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${props => props.theme.layout.gap} 0;

  && {
    .btn {
      height: 100%;
    }

    .tooltip {
      height: auto;
    }
  }
`

const SearchContainer = styled.div`
  max-width: 50%;
  width: 250px;

  ${breakpoints.mobile} {
    max-width: unset;
    width: 100%;
  }
`
/// //////////////////////////////////////////////////////

export const FilterContainer = styled.div`
  min-width: 400px;
`

const Filter: React.FC = () => (
  <FilterContainer>
    <Popover.Item title>
      <span>Filters</span>
    </Popover.Item>
  </FilterContainer>
)

/// //////////////////////////////////////////////////////

const WeaponsPage: React.FC<WeaponPageProps> = ({ name, weapons }) => {
  const [search, setSearch] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const data = useMemo(() => weapons.filter(w => w.name.includes(search)), [
    weapons,
    search
  ])

  const toggleFilter = useCallback(() => setShowFilter(!showFilter), [
    showFilter
  ])

  return (
    <Layout meta={{ title: name }}>
      <Text h1>{name}</Text>
      <SearchBar>
        <SearchContainer>
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            width="100%"
            iconRight={<SearchIcon />}
            placeholder="Search..."
          />
        </SearchContainer>
        <Spacer x={0.75} />
        <Popover
          content={Filter}
          visible={showFilter}
          onVisibleChange={visible => setShowFilter(visible)}
          placement="bottomEnd"
        >
          <Button
            icon={<FilterIcon />}
            auto
            size="small"
            onClick={toggleFilter}
          />
        </Popover>
      </SearchBar>
      <Table data={data}>
        <Table.Column prop="name" label="name" width={120} />
        <Table.Column prop="skill" label="skill" width={130} />
        <Table.Column prop="damage" label="dam" />
        <Table.Column prop="critical" label="crit" />
        <Table.Column prop="range" label="range" />
        <Table.Column prop="encumbrance" label="encum" />
        <Table.Column prop="hp" label="hp" />
        <Table.Column prop="price" label="price" />
        <Table.Column prop="rarity" label="rarity" />
        <Table.Column prop="special" label="special" width={120} />
      </Table>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<WeaponPageProps> = async context => {
  console.log(context)
  const tableData = Weapons.getTableData(
    context.params.category as string,
    context.locale
  )
  return {
    props: {
      name: tableData.name,
      weapons: tableData.tableEntries
    }
  }
}

export const getStaticPaths: GetStaticPaths = async context => {
  const paths = Weapons.getCategories(context.locales)
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export default WeaponsPage
