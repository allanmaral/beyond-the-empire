import enUS from './metadata-en-us.json'

export type Sides = {
  name: string
  url?: string
  localeName?: string
  children?: Sides | Array<Sides>
}

export interface MultilLocaleMetaInformation {
  [key: string]: Sides[]
}

const Metadatas: MultilLocaleMetaInformation = {
  en: enUS
}

export default Metadatas
