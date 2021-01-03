/* eslint-disable no-use-before-define */

export interface WeaponList {
  weapons: Weapon[]
}

export interface Weapon {
  key: string
  name: string
  description: string
  sources: Source[]
  custom: Custom
  skillKey: SkillKey
  damage?: number
  crit?: number
  rangeValue?: RangeValue
  encumbrance?: number
  hp?: number
  price?: number
  rarity?: number
  type: Type
  categories?: string[]
  qualities?: WeaponQuality[]
  restricted?: boolean
  baseMods?: BaseMod[]
  damageAdd?: number
  sizeLow?: number
  sizeHigh?: number
  weaponModifiers?: WeaponModifier[]
  range?: Range
  noMelee?: boolean
  scale?: string
  hands?: Hands
  attachCostMult?: number
  ordnance?: boolean
  vehicleNoReplace?: boolean
}

export interface BaseMod {
  miscDesc?: string[]
  count?: number
  index?: number
  key?: string
  dieModifiers?: DieModifier[]
}

export interface DieModifier {
  skillKey: string
  boostCount: number
}

export interface WeaponQuality {
  key: Key
  count?: number
  index?: number
}

export interface Source {
  book: string
  page?: string
}

export interface WeaponModifier {
  unarmedName: string
  skillKey: SkillKey
  damageAdd: number
  crit: number
  qualities: WeaponModifierQuality[]
  rangeValue: RangeValue
  hands?: Hands
}

export interface WeaponModifierQuality {
  key: Key
  count?: number
}

export enum Custom {
  AddedItem = 'AddedItem',
  DescOnly = 'DescOnly'
}

export enum Hands {
  WhNone = 'whNone',
  WhTwoHanded = 'whTwoHanded'
}

export enum Key {
  Accurate = 'ACCURATE',
  Autofire = 'AUTOFIRE',
  Blast = 'BLAST',
  Breach = 'BREACH',
  Burn = 'BURN',
  Concussive = 'CONCUSSIVE',
  Cortosis = 'CORTOSIS',
  Cumbersome = 'CUMBERSOME',
  Defensive = 'DEFENSIVE',
  Deflection = 'DEFLECTION',
  Disorient = 'DISORIENT',
  Ensnare = 'ENSNARE',
  Guided = 'GUIDED',
  Inaccurate = 'INACCURATE',
  Inacurate = 'INACURATE',
  Inferior = 'INFERIOR',
  Ion = 'ION',
  Knockdown = 'KNOCKDOWN',
  Limitedammo = 'LIMITEDAMMO',
  Linked = 'LINKED',
  Pierce = 'PIERCE',
  Prepare = 'PREPARE',
  Slowfiring = 'SLOWFIRING',
  Stun = 'STUN',
  Stundamage = 'STUNDAMAGE',
  Stundamagedroid = 'STUNDAMAGEDROID',
  Stunsetting = 'STUNSETTING',
  Sunder = 'SUNDER',
  Superior = 'SUPERIOR',
  Tractor = 'TRACTOR',
  Unwieldy = 'UNWIELDY',
  Vicious = 'VICIOUS',
  Viciousdroid = 'VICIOUSDROID'
}

export enum Range {
  Close = 'Close',
  Engaged = 'Engaged',
  Extreme = 'Extreme',
  Long = 'Long',
  Medium = 'Medium',
  None = 'None',
  Short = 'Short'
}

export enum RangeValue {
  WrClose = 'wrClose',
  WrEngaged = 'wrEngaged',
  WrExtreme = 'wrExtreme',
  WrLong = 'wrLong',
  WrMedium = 'wrMedium',
  WrNoRange = 'wrNoRange',
  WrShort = 'wrShort'
}

export enum SkillKey {
  Brawl = 'BRAWL',
  Gunn = 'GUNN',
  Ltsaber = 'LTSABER',
  Mech = 'MECH',
  Melee = 'MELEE',
  Ranghvy = 'RANGHVY',
  Ranglt = 'RANGLT',
  Skul = 'SKUL'
}

export enum Type {
  Brawling = 'Brawling',
  EnergyWeapon = 'Energy Weapon',
  ExplosivesOther = 'Explosives/Other',
  Lightsaber = 'Lightsaber',
  Lightwhip = 'Lightwhip',
  Melee = 'Melee',
  Slugthrower = 'Slugthrower',
  Thrown = 'Thrown',
  Tool = 'Tool',
  Vehicle = 'Vehicle'
}

export interface WeaponType {
  key: Type
  name: string
  category?: boolean
  types?: Type[]
  slug?: string
}

interface WeaponsDictionary {
  [key: string]: Weapon
}

interface WeaponTypeDictionary {
  [key: string]: WeaponType
}

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
  restricted: boolean
  special: unknown
  type: string
}

interface WeaponTableData {
  name: string
  filters: {
    [prop: string]: {
      label: string
      type: string
      options?: { value: string; label: string }[]
    }
  }
  tableEntries: WeaponTableEntry[]
}
