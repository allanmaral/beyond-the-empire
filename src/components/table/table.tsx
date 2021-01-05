import { useState, useMemo, useEffect } from 'react'
import { Table as GeistTable } from '@geist-ui/react'
import { TableProps as GeistTableProps } from '@geist-ui/react/dist/table/table'
import Filter, { FilterOptions, FilterValues } from './filter'

declare type NativeAttrs = Omit<
  React.TableHTMLAttributes<unknown>,
  keyof GeistTableProps
>

type BaseTableProps = Partial<Omit<GeistTableProps, 'data'>> & {
  data: GeistTableProps['data']
} & NativeAttrs

export interface TableProps extends BaseTableProps {
  filter?: FilterOptions
  searchable?: boolean
}

const Table: React.FC<TableProps> = ({
  children,
  searchable,
  filter,
  data,
  ...props
}) => {
  const [filterValue, setFilter] = useState<FilterValues>({})
  useEffect(() => setFilter({}), [data])
  const dataset = useMemo(() => {
    const { _search, ...filters } = filterValue || {}
    const search = _search as string

    let filteredData = Object.entries(filters).reduce((result, [key, v]) => {
      const type = filter[key].type
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
    }, data)

    if (search) {
      filteredData = filteredData.filter(w => w.name.includes(search))
    }

    return filteredData
  }, [filterValue, data, filter])

  return (
    <>
      <Filter
        searchable={searchable}
        options={filter}
        value={filterValue}
        onChange={setFilter}
      />
      <GeistTable data={dataset} {...props}>
        {children}
      </GeistTable>
    </>
  )
}

type TableComponent = React.FC<TableProps> & {
  Column: typeof GeistTable.Column
}

export default Table as TableComponent
