import enUsWeapons from '../data/en-us/weapons.json'
import enUsWeaponTypes from '../data/en-us/weaponTypes.json'
import Skills from './skills'
import Ranges from './ranges'
import Descriptors from './itemDescriptors'
import Utils from './utils'
import {
  Weapon,
  WeaponQuality,
  WeaponsDictionary,
  WeaponTableData,
  WeaponTableEntry,
  WeaponType,
  WeaponTypeDictionary
} from '../types/weapon'
import { FilterOptions } from '../../components/table'

const weapons: { [key: string]: Weapon[] } = {
  en: Utils.slugifyList(enUsWeapons as Weapon[], 'name')
}

const weaponTypes: { [key: string]: WeaponType[] } = {
  en: enUsWeaponTypes as WeaponType[]
}

const weaponsDictionaries = Object.keys(weapons).reduce<{
  [key: string]: WeaponsDictionary
}>(
  (result, locale) => ({
    ...result,
    [locale]: Utils.getDictionary(locale, weapons, 'slug')
  }),
  {}
)

const weaponTypeDictionaries = Object.keys(weaponTypes).reduce<{
  [key: string]: WeaponTypeDictionary
}>(
  (result, locale) => ({
    ...result,
    [locale]: Utils.getDictionary(locale, weaponTypes)
  }),
  {}
)

const getDamage = (weapon: Weapon) =>
  typeof weapon.damageAdd !== 'undefined' &&
  (typeof weapon.damage === 'undefined' || weapon.damage === 0)
    ? `+${weapon.damageAdd}`
    : String(weapon.damage)

const getTable = (
  locale: string,
  weaponType?: string[]
): WeaponTableEntry[] => {
  const weaponList = weapons[locale] || []
  const weaponTypeDictionary = weaponTypeDictionaries[locale]
  const skillsDictionary = Skills.getKeyDictionary(locale)
  const rangeDictionary = Ranges.getKeyDictionary(locale)
  const descriptorDictionary = Descriptors.getKeyDictionary(locale)

  const qualitiesUsed: { [key: string]: string } = {}
  const mapQuality = (qualities?: WeaponQuality[]): string => {
    if (!qualities) return undefined
    return qualities
      .map(quality => {
        const descriptor = descriptorDictionary[quality.key]
        if (!descriptor) console.error(quality.key)
        qualitiesUsed[descriptor.key] = descriptor.description
        return Utils.format(descriptor.qualDesc, quality.count)
      })
      .join(', ')
  }

  const mappedWeapons = (weaponType
    ? weaponList.filter(w => weaponType.includes(w.type))
    : weaponList
  )
    .map<WeaponTableEntry>(w => ({
      name: w.name,
      skill: skillsDictionary[w.skillKey]?.name,
      damage: getDamage(w),
      critical: w.crit ? String(w.crit) : '-',
      range: w.range || rangeDictionary[w.rangeValue]?.name,
      encumbrance: String(w.encumbrance || 0),
      hp: String(w.hp || 0),
      restricted: w.restricted || false,
      price: `${w.price}${w.restricted ? ' (R)' : ''}`,
      rarity: `${w.rarity}`,
      special: mapQuality(w.qualities), // w.qualities
      type: weaponTypeDictionary[w.type].name,
      slug: w.slug,
      sources: w.sources
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return Utils.prepareSerialize(mappedWeapons)
}

const getTableData = (category: string, locale: string): WeaponTableData => {
  const weaponType = weaponTypes[locale].find(t => t.slug === category)
  const types = weaponType.types || [weaponType.key]
  const tableEntries = getTable(locale, types)
  const filters: FilterOptions = {
    skill: {
      label: 'Skill',
      type: 'multiselect',
      options: Utils.getOptionsFromTable(tableEntries, 'skill')
        .sort((a, b) => a.localeCompare(b))
        .map(opt => ({
          value: opt,
          label: opt
        }))
    },
    range: {
      label: 'Range',
      type: 'multiselect',
      options: Utils.getOptionsFromTable(tableEntries, 'range')
        .sort((a, b) => a.localeCompare(b))
        .map(opt => ({
          value: opt,
          label: opt
        }))
    },
    restricted: {
      label: 'Restricted',
      type: 'checkbox'
    }
  }
  return {
    name: weaponType.name,
    filters: filters,
    tableEntries: getTable(locale, types)
  }
}

export interface WeaponDetailData {
  name: string
  description: string
  skill: string
  damage: string
  critical: number
  range: string
  encumbrance: number
  hp: number
  restricted: boolean
  price: number
  rarity: number
  special: {
    text: string
    name: string
    description: string
  }[]
  type: string
  sources: Weapon['sources']
}

const getWeaponData = (slug: string, locale: string): WeaponDetailData => {
  const weapon = weaponsDictionaries[locale][slug]
  const weaponTypeDictionary = weaponTypeDictionaries[locale]
  const skillsDictionary = Skills.getKeyDictionary(locale)
  const rangeDictionary = Ranges.getKeyDictionary(locale)
  const descriptorDictionary = Descriptors.getKeyDictionary(locale)

  const mapQuality = (qualities?: WeaponQuality[]) => {
    if (!qualities) return []
    return qualities.map(quality => {
      const descriptor = descriptorDictionary[quality.key]
      if (!descriptor) console.error(quality.key)
      if (!descriptor.name) console.error(weapon.name)
      if (!descriptor.description) {
        console.error(weapon.name, weapon.description)
      }
      return {
        text: Utils.format(descriptor.qualDesc, quality.count),
        name: descriptor.name,
        description: `### ${descriptor.name}\n` + descriptor.description
      }
    })
  }

  const weaponData: WeaponDetailData = {
    name: weapon.name,
    description: weapon.description,
    skill: skillsDictionary[weapon.skillKey]?.name,
    damage: getDamage(weapon),
    critical: weapon.crit,
    range: weapon.range || rangeDictionary[weapon.rangeValue]?.name,
    encumbrance: weapon.encumbrance || 0,
    hp: weapon.hp || 0,
    restricted: weapon.restricted || false,
    price: weapon.price,
    rarity: weapon.rarity,
    special: mapQuality(weapon.qualities),
    type: weaponTypeDictionary[weapon.type].name,
    sources: weapon.sources
  }

  return Utils.prepareSerialize(weaponData)
}

const getDictionary = (locale: string): WeaponsDictionary => {
  return weaponsDictionaries[locale]
}

export interface WeaponCategoryStaticPath {
  params: {
    category: string
  }
  locale: string
}

const getCategories = (locales: string[]): WeaponCategoryStaticPath[] => {
  return locales.reduce<WeaponCategoryStaticPath[]>(
    (result, lc) => [
      ...result,
      ...Object.entries(weaponTypeDictionaries[lc])
        .filter(([, wType]) => wType.category)
        .map(([, wType]) => ({
          params: {
            category: wType.slug
          },
          locale: lc
        }))
    ],
    []
  )
}

export interface WeaponStaticPath {
  params: {
    weapon: string
  }
  locale: string
}

const getWeapons = (locales: string[]): WeaponStaticPath[] => {
  return locales.reduce(
    (result, lc) => [
      ...result,
      ...Object.entries(weaponsDictionaries[lc]).map(([key]) => ({
        params: {
          weapon: key
        },
        locale: lc
      }))
    ],
    []
  )
}

export default {
  getTable,
  getTableData,
  getWeaponData,
  getDictionary,
  getCategories,
  getWeapons
}
