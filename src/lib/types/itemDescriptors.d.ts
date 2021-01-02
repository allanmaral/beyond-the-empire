/* eslint-disable no-use-before-define */
export interface ItemDescriptor {
  key: string
  name: string
  type?: Type
  modDesc: string
  qualDesc: string
  isBase?: boolean
  chooseItemsForStorage?: boolean
  itemsForStorage?: ItemsForStorage
  description?: string
  isBoolean?: boolean
  chooseDefZone?: boolean
  forCrafting?: boolean
  chooseVehicleWeapon?: boolean
  chooseExistingVehicleWeapon?: boolean
  weaponUpgrades?: WeaponUpgrade[]
  sources?: Source[]
  custom?: Custom
  isQuality?: boolean
  isActiveQuality?: boolean
  chooseActiveQuality?: boolean
}

export enum Custom {
  DescOnly = 'DescOnly'
}

export interface ItemsForStorage {
  encLimit?: number
  typeLimit?: TypeLimit
  skillLimit?: string[]
  addlEnc?: number
}

export interface TypeLimit {
  type: Type
}

export interface Source {
  book: string
}

export interface WeaponUpgrade {
  weapKey: string
  replacementIndex: number
  properties: Properties
}

export interface Properties {
  location: string
  qualities: Quality[]
}

export interface Quality {
  key: string
  count: number
}

export enum Type {
  Armor = 'Armor',
  Gear = 'Gear',
  Vehicle = 'Vehicle',
  Weapon = 'Weapon'
}
