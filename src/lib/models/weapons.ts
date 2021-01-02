import enUsWeapons from '../data/en-us/weapons.json'
import enUsWeaponTypes from '../data/en-us/weaponTypes.json'
import Skills from './skills'
import Ranges from './ranges'
import Descriptors from './itemDescriptors'
import Utils from './utils'
import { Weapon, WeaponQuality, WeaponType } from '../types/weapon'

interface WeaponsDictionary {
  [key: string]: Weapon
}

interface WeaponTypeDictionary {
  [key: string]: WeaponType
}

const weapons: { [key: string]: Weapon[] } = {
  en: enUsWeapons as Weapon[]
}

const weaponTypes: { [key: string]: WeaponType[] } = {
  en: enUsWeaponTypes as WeaponType[]
}

const weaponsDictionaries = Object.keys(weapons).reduce<{
  [key: string]: WeaponsDictionary
}>(
  (result, locale) => ({
    ...result,
    [locale]: Utils.getDictionary(locale, weapons)
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

export interface WeaponTableEntry {
  name: string
  skill?: string
  damage?: string
  critical?: string
  range?: string
  encumbrance: string
  hp: string
  price?: string
  rarity: string
  special: unknown
  type: string
}

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
      damage:
        typeof w.damageAdd !== 'undefined' &&
        (typeof w.damage === 'undefined' || w.damage === 0)
          ? `+${w.damageAdd}`
          : String(w.damage),
      critical: w.crit ? String(w.crit) : '-',
      range: w.range || rangeDictionary[w.rangeValue]?.name,
      encumbrance: String(w.encumbrance || 0),
      hp: String(w.hp || 0),
      restricted: w.restricted,
      price: `${w.price}${w.restricted ? ' (R)' : ''}`,
      rarity: `${w.rarity}`,
      // TODO: This is a mess
      special: mapQuality(w.qualities), // w.qualities
      type: weaponTypeDictionary[w.type].name
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return Utils.prepareSerialize(mappedWeapons)
}

const getDictionary = (locale: string): WeaponsDictionary => {
  return weaponsDictionaries[locale]
}

export default {
  getTable,
  getDictionary
}
