import { useMemo } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Description, Card } from '@geist-ui/react'

import Weapons, { WeaponDetailData } from '../../../lib/models/weapons'

import { Layout } from '../../../components/layout'
import Markdown from '../../../components/markdown'
import { MarkdownPopover } from '../../../components/popover'
import Characteristics from '../../../components/characteristics'
import { Title } from '../../../components/Text'

interface WeaponListPageProps {
  weapon: WeaponDetailData
}

const WeaponsListPage: React.FC<WeaponListPageProps> = ({ weapon }) => {
  const characteristics = useMemo(
    () => [
      { name: 'damage', value: weapon.damage },
      { name: 'critical', value: weapon.critical },
      { name: 'encumbrance', value: weapon.encumbrance },
      { name: 'hard points', value: weapon.hp },
      { name: 'rarity', value: weapon.rarity }
    ],
    [weapon]
  )

  const details = useMemo(
    () => [
      { name: 'category', value: weapon.type },
      { name: 'skill', value: weapon.skill },
      { name: 'range', value: weapon.range },
      { name: 'price', value: weapon.price }
    ],
    [weapon]
  )

  return (
    <Layout meta={{ title: weapon.name }}>
      <Title text={weapon.name} />
      <Characteristics characteristics={characteristics} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {details.map((detail, index) => (
          <Card
            key={`detail_${detail.name}_${index}`}
            style={{
              display: 'inline-block',
              minWidth: 150,
              margin: 5,
              flex: 1
            }}
          >
            <Description title={detail.name} content={detail.value} />
          </Card>
        ))}
      </div>
      {weapon.special && weapon.special.length > 0 && (
        <div style={{ display: 'flex' }}>
          <Card style={{ margin: 5 }}>
            <Description
              title="special"
              content={weapon.special.map((span, index) => (
                <span key={`special_${index}`}>
                  <MarkdownPopover help content={span.description}>
                    {span.text}
                  </MarkdownPopover>
                  {index < weapon.special.length - 1 ? (
                    <span style={{ marginRight: 4 }}>,</span>
                  ) : (
                    ''
                  )}
                </span>
              ))}
            />
          </Card>
        </div>
      )}

      <Markdown text={weapon.description} />
      <br />
      {weapon.sources && weapon.sources.length > 0 && (
        <Description
          title="Sources"
          content={
            <ul>
              {weapon.sources.map((source, index) => (
                <li key={`source_${index}`}>
                  {source.book} pg. {source.page}
                </li>
              ))}
            </ul>
          }
        />
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<WeaponListPageProps> = async context => {
  const weaponData = Weapons.getWeaponData(
    context.params.weapon as string,
    context.locale
  )
  return {
    props: {
      weapon: weaponData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async context => {
  const paths = Weapons.getWeapons(context.locales)
  // console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export default WeaponsListPage
