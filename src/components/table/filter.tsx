import { useCallback, useMemo, useState } from 'react'
import {
  Popover,
  AutoComplete,
  Select,
  Input,
  Spacer,
  Button
} from '@geist-ui/react'
import SearchIcon from '@geist-ui/react-icons/search'
import FilterIcon from '@geist-ui/react-icons/filter'

import Checkbox from '../checkbox'
import {
  FilterContainer,
  FilterFieldContainer,
  FilterLabel,
  SearchBar,
  SearchContainer
} from './styles'

export type FilterType = 'autocomplete' | 'checkbox' | 'select' | 'multiselect'

export interface FilterConfig {
  label: string
  type: FilterType
  options?: {
    label: string
    value: string
  }[]
}

type FilterValue = string | number | boolean

export interface FilterOptions {
  [prop: string]: FilterConfig
}

export interface FilterValues {
  [prop: string]: FilterValue | FilterValue[]
}

export interface FilterPopoverProps {
  value: FilterValues
  onChange: (value: FilterValues) => void
  options: FilterOptions
}

const getDefaultFilterValue = (
  value: FilterValue | FilterValue[] | undefined,
  type: FilterType
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

const FilterPopover: React.FC<FilterPopoverProps> = ({
  options,
  value,
  onChange
}) => {
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

interface FilterProps {
  options?: FilterOptions
  searchable?: boolean
  value?: FilterValues
  onChange?: (value: FilterValues & { _search?: string }) => void
}

const Filter: React.FC<FilterProps> = ({
  searchable,
  options,
  value,
  onChange
}) => {
  const [search, setSearch] = useState<string>('')
  const [filterValue, setFilterValue] = useState<FilterValues>(value || {})
  const [showPopover, setShowPopover] = useState<boolean>(false)

  const togglePopover = useCallback(() => setShowPopover(!showPopover), [
    showPopover
  ])

  const handleChange = useCallback(
    (v: FilterValues) => {
      setFilterValue(v)
      onChange && onChange({ ...v, _search: search })
    },
    [onChange, search]
  )

  const handleSearch = useCallback(
    (s: string) => {
      setSearch(s)
      onChange && onChange({ ...filterValue, _search: s })
    },
    [filterValue, onChange]
  )

  return (
    <SearchBar>
      {searchable && (
        <SearchContainer>
          <Input
            value={search}
            onChange={e => handleSearch(e.target.value)}
            width="100%"
            iconRight={<SearchIcon />}
            placeholder="Search..."
          />
        </SearchContainer>
      )}
      {options && (
        <>
          <Spacer x={0.75} />
          <Popover
            content={() => (
              <FilterPopover
                value={value}
                onChange={value => handleChange(value)}
                options={options}
              />
            )}
            visible={showPopover}
            onVisibleChange={visible => setShowPopover(visible)}
            placement="bottomEnd"
          >
            <Button
              icon={<FilterIcon />}
              auto
              size="small"
              onClick={togglePopover}
            />
          </Popover>
        </>
      )}
    </SearchBar>
  )
}

export default Filter
