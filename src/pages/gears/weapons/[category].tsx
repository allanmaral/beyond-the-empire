import { GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'
import { Link, Text } from '@geist-ui/react'

import Weapons from '../../../lib/models/weapons'
import { WeaponTableEntry } from '../../../lib/types/weapon'

import { Layout } from '../../../components/layout'
import Table, { FilterOptions } from '../../../components/table'
import { useMemo } from 'react'

interface WeaponListPageProps {
  name: string
  weapons: WeaponTableEntry[]
  filters: FilterOptions
}

const WeaponsListPage: React.FC<WeaponListPageProps> = ({
  name,
  weapons,
  filters
}) => {
  const data = useMemo(() => {
    return weapons.map(w => ({
      ...w,
      _name: (
        <NextLink href={`../weapon/${w.slug}`}>
          <Link color underline>
            {w.name}
          </Link>
        </NextLink>
      )
    }))
  }, [weapons])

  return (
    <Layout meta={{ title: name }}>
      <Text h1>{name}</Text>
      <Table data={data} searchable filter={filters}>
        <Table.Column prop="_name" label="name" width={120} />
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

export const getStaticProps: GetStaticProps<WeaponListPageProps> = async context => {
  const tableData = Weapons.getTableData(
    context.params.category as string,
    context.locale
  )
  return {
    props: {
      name: tableData.name,
      filters: tableData.filters,
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

export default WeaponsListPage
