import Head from 'next/head'

export interface Meta {
  title: string
}

const toCapitalize = (name: string) => {
  const first = name[0]
  const rest = name.slice(1)
  return `${first.toUpperCase()}${rest}`
}

const PageHeader: React.FC<{ meta: Meta }> = ({ meta }) => (
  <Head>
    <title>
      {meta.title ? `${toCapitalize(meta.title)} | ` : ''}Beyond the Empire
    </title>
  </Head>
)

export default PageHeader
