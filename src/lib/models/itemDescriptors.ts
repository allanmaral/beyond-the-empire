import enUsItemDescriptors from '../data/en-us/itemDescriptors.json'
import Utils from './utils'

import { ItemDescriptor } from '../types/itemDescriptors'

const itemDescriptors: { [key: string]: ItemDescriptor[] } = {
  en: enUsItemDescriptors as ItemDescriptor[]
}

interface ItemDescriptorDictionary {
  [key: string]: ItemDescriptor
}

const dictionaries = Object.keys(itemDescriptors).reduce<{
  [key: string]: ItemDescriptorDictionary
}>(
  (result, locale) => ({
    ...result,
    [locale]: Utils.getDictionary(locale, itemDescriptors)
  }),
  {}
)

const getByKey = (key: string, locale: string): ItemDescriptor | null => {
  const itemDescriptorList = dictionaries[locale]
  return itemDescriptorList[key] || null
}

const getByName = (name: string, locale: string): ItemDescriptor | null => {
  const itemDescriptorList = itemDescriptors[locale] || []
  return itemDescriptorList.find(s => s.name === name) || null
}

const getKeyDictionary = (
  locale: string
): { [key: string]: ItemDescriptor } => {
  return dictionaries[locale]
}

export default {
  getByKey,
  getByName,
  getKeyDictionary
}
