/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MergeObject {
  [key: string]: any
}

export const isObject = (target: any): boolean =>
  target && typeof target === 'object'

export const deepMergeObject = <T extends MergeObject, U extends MergeObject>(
  source: T,
  target: U
): T => {
  if (!isObject(target) || !isObject(source)) return source

  const sourceKeys = Object.keys(source) as Array<keyof T>
  const result = {} as MergeObject
  for (const k of sourceKeys) {
    const key = k as string
    const sourceValue = source[key]
    const targetValue = target[key]

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      result[key] = targetValue.concat(sourceValue)
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = deepMergeObject(sourceValue, { ...targetValue })
    } else if (targetValue) {
      result[key] = targetValue
    } else {
      result[key] = sourceValue
    }
  }
  return result as T
}
