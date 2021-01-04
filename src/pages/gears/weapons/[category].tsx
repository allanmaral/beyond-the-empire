import { GetStaticPaths, GetStaticProps } from 'next'
import { Text } from '@geist-ui/react'

import Weapons from '../../../lib/models/weapons'
import { WeaponTableEntry } from '../../../lib/types/weapon'

import { Layout } from '../../../components/layout'
import Table, { FilterOptions } from '../../../components/table'

interface WeaponPageProps {
  name: string
  weapons: WeaponTableEntry[]
  filters: FilterOptions
}

const WeaponsPage: React.FC<WeaponPageProps> = ({ name, weapons, filters }) => {
  return (
    <Layout meta={{ title: name }}>
      <Text h1>{name}</Text>
      <Table data={weapons} searchable filter={filters}>
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

export default WeaponsPage
