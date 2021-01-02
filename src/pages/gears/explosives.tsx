import { GetStaticProps } from 'next'
import { Table, Text } from '@geist-ui/react'

import { Layout } from '../../components/layout'

import Weapons, { WeaponTableEntry } from '../../lib/models/weapons'

interface WeaponPageProps {
  weapons: WeaponTableEntry[]
}

const WeaponsPage: React.FC<WeaponPageProps> = ({ weapons }) => {
  return (
    <Layout meta={{ title: 'Explosives' }}>
      <Text h1>Explosives / Others</Text>
      <Table data={weapons}>
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
  return {
    props: {
      weapons: Weapons.getTable(context.locale, ['Explosives/Other'])
    }
  }
}
export default WeaponsPage
