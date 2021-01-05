/* eslint-disable prettier/prettier */

const getDictionary = <
  T extends { key: string },
  L extends { [key: string]: T[] }
>(
    locale: string,
    items: L
  ): { [key: string]: T } => {
  const itemList = items[locale] || []
  return itemList.reduce((result, item) => {
    result[item.key] = item
    return result
  }, {})
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
  prepareSerialize,
  format,
  getOptionsFromTable
}
