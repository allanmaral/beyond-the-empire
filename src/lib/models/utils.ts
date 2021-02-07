/* eslint-disable prettier/prettier */
import GithubSlugger from 'github-slugger'

const getDictionary = <
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends object,
  L extends { [key: string]: T[] }
>(
    locale: string,
    items: L,
    key: keyof T = 'key' as keyof T
  ): { [key: string]: T } => {
  const itemList = items[locale] || []
  return itemList.reduce((result, item) => {
    result[item[key] as unknown as string] = item
    return result
  }, {})
}

const getSlugDictionary = <
  T extends { name: string },
  L extends { [key: string]: T[] }
>(
    locale: string,
    items: L
  ): { [key: string]: T } => {
  const slugger = new GithubSlugger()
  const itemList = items[locale] || []
  return itemList.reduce((result, item) => {
    result[slugger.slug(item.name)] = item
    return result
  }, {})
}

const slugifyList = <T extends { slug: string }>(list: T[], key: keyof T): T[] => {
  const slugger = new GithubSlugger()
  return list.map(i => ({ ...i, slug: slugger.slug(i[key] as unknown as string) }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareSerialize = <T extends { [key: string]: any }>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj)) as T
}

const format = (str: string, ...args: unknown[]): string => {
  return str.replace(/{(\d+)}/g, (match, number) =>
    typeof args[number] !== 'undefined' ? String(args[number]) : match
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
const getOptionsFromTable = <T extends object, F extends keyof T>(
  table: T[],
  field: F,
  compare: (a: T[F], b: T[F]) => boolean = (a, b) => a === b,
  compose: (accum: T[F][], item: T[F]) => T[F][] = (acc, i) => [...acc, i]
): T[F][] =>
    table.reduce<T[F][]>(
      (options, entry) =>
        options.find(opt => compare(opt, entry[field]))
          ? options
          : compose(options, entry[field]),
      []
    )

export default {
  getDictionary,
  getSlugDictionary,
  prepareSerialize,
  format,
  getOptionsFromTable,
  slugifyList
}
