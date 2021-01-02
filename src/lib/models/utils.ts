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
    typeof args[number] !== 'undefined'
      ? String(args[number])
      : match
  )
}

export default {
  getDictionary,
  prepareSerialize,
  format
}
