import { GetStaticPaths, GetStaticProps } from 'next'
import {
  Table,
  Text,
  Input,
  Button,
  Spacer,
  Popover,
  AutoComplete,
  Select
} from '@geist-ui/react'
import SearchIcon from '@geist-ui/react-icons/search'
import FilterIcon from '@geist-ui/react-icons/filter'

import { Layout } from '../../../components/layout'
import Checkbox from '../../../components/checkbox'

import Weapons from '../../../lib/models/weapons'
import styled from 'styled-components'
import { breakpoints } from '../../../styles/utils'
import { useCallback, useMemo, useState } from 'react'

import { WeaponTableEntry } from '../../../lib/types/weapon'

interface WeaponPageProps {
  name: string
  weapons: WeaponTableEntry[]
  filters: {
    [prop: string]: {
      label: string
      type: 'autocomplete' | 'checkbox' | 'select' | 'multiselect'
      options?: {
        label: string
        value: string
      }[]
    }
  }
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

export interface FilterElement {
  label: string
  type: 'autocomplete' | 'checkbox' | 'select' | 'multiselect'
  options?: {
    label: string
    value: string
  }[]
}
export interface FilterOptions {
  [prop: string]: FilterElement
}
type FilterValue = string | number | boolean
export interface FilterValues {
  [prop: string]: FilterValue | FilterValue[]
}
export interface FilterProps {
  value: FilterValues
  onChange: (value: FilterValues) => void
  options: FilterOptions
}

export const FilterFieldContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const FilterLabel = styled(Text)`
  margin-bottom: ${props => props.theme.layout.gapHalf};
`

const getDefaultFilterValue = (
  value: FilterValue | FilterValue[] | undefined,
  type: FilterElement['type']
) => {
  let valueOrDefault: typeof value
  switch (type) {
    case 'checkbox':
      valueOrDefault = value === undefined ? null : value
      break
    case 'multiselect':
      valueOrDefault = value || []
      break
    case 'select':
      valueOrDefault = value || undefined
      break
    case 'autocomplete':
    default:
      valueOrDefault = value || ''
  }

  return valueOrDefault
}

const Filter: React.FC<FilterProps> = ({ options, value, onChange }) => {
  const columnEntries = useMemo(() => Object.entries(options), [options])

  const handleChange = useCallback(
    (field: string, val: boolean | string | string[]) =>
      onChange({ ...value, [field]: val }),
    [value]
  )

  return (
    <FilterContainer>
      <Popover.Item title>
        <span>Filters</span>
      </Popover.Item>
      {columnEntries.map(([key, column]) => (
        <Popover.Item key={key}>
          <FilterFieldContainer>
            {column.type === 'autocomplete' && (
              <>
                <FilterLabel small>{column.label}</FilterLabel>
                <AutoComplete width="100%" options={column.options} />
              </>
            )}
            {(column.type === 'select' || column.type === 'multiselect') && (
              <>
                <FilterLabel small>{column.label}</FilterLabel>
                <Select
                  width="100%"
                  clearable
                  multiple={column.type === 'multiselect'}
                  value={
                    getDefaultFilterValue(value[key], column.type) as
                      | string
                      | string[]
                  }
                  onChange={val => handleChange(key, val)}
                >
                  {(column.options || []).map(opt => (
                    <Select.Option
                      key={`select_${column.label}_opt_${opt.value}`}
                      value={opt.value}
                    >
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
            {column.type === 'checkbox' && (
              <FilterLabel>
                <Checkbox
                  allowNull
                  checked={
                    getDefaultFilterValue(value[key], column.type) as boolean
                  }
                  onChange={e => handleChange(key, e.target.checked)}
                >
                  {column.label}
                </Checkbox>
              </FilterLabel>
            )}
            {/* <Input width="100%">{column.label}</Input> */}
          </FilterFieldContainer>
        </Popover.Item>
      ))}
    </FilterContainer>
  )
}

/// //////////////////////////////////////////////////////

const WeaponsPage: React.FC<WeaponPageProps> = ({ name, weapons, filters }) => {
  const [search, setSearch] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<FilterValues>({})

  const data = useMemo(() => {
    const filteredData = Object.entries(filter).reduce((result, [key, v]) => {
      const type = filters[key].type
      switch (type) {
        case 'checkbox':
          return typeof v === 'boolean'
            ? result.filter(e => e[key] === v)
            : result
        case 'autocomplete':
        case 'select':
          return v ? result.filter(e => e[key] === v) : result
        case 'multiselect':
          return v && (v as string[]).length > 0
            ? result.filter(e => (v as string[]).includes(e[key]))
            : result
        default:
          return result
      }
    }, weapons)
    const nData = filteredData.filter(w => w.name.includes(search))
    console.log(nData.length, weapons.length)
    return nData
  }, [weapons, search, filter])

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
          content={() => (
            <Filter
              value={filter}
              onChange={value => setFilter(value)}
              options={filters}
            />
          )}
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
  const tableData = Weapons.getTableData(
    context.params.category as string,
    context.locale
  )
  return {
    props: {
      name: tableData.name,
      filters: tableData.filters as FilterProps['options'],
      weapons: tableData.tableEntries
    }
  }
}

export const getStaticPaths: GetStaticPaths = async context => {
  const paths = Weapons.getCategories(context.locales)
  return {
    paths,
    fallback: false
  }
}

export default WeaponsPage
