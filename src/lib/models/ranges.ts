import enUsRanges from '../data/en-us/ranges.json'
import Utils from './utils'

import { Range } from '../types/range'

const ranges: { [key: string]: Range[] } = {
  en: enUsRanges as Range[]
}

interface RangeDictionary {
  [key: string]: Range
}

const dictionaries = Object.keys(ranges).reduce<{
  [key: string]: RangeDictionary
}>(
  (result, locale) => ({
    ...result,
    [locale]: Utils.getDictionary(locale, ranges)
  }),
  {}
)

const getByKey = (key: string, locale: string): Range | null => {
  const rangeList = dictionaries[locale]
  return rangeList[key] || null
}

const getByName = (name: string, locale: string): Range | null => {
  const rangeList = ranges[locale] || []
  return rangeList.find(s => s.name === name) || null
}

const getKeyDictionary = (locale: string): { [key: string]: Range } => {
  return dictionaries[locale]
}

export default {
  getByKey,
  getByName,
  getKeyDictionary
}
