import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'

export interface RedirectProps {
  metaRedirect?: boolean
}

const redirect = (destination: string): NextPage<RedirectProps> => {
  const Redirect: NextPage<RedirectProps> = ({ metaRedirect }) => {
    if (!metaRedirect) return null
    return (
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      </Head>
    )
  }

  Redirect.getInitialProps = async ({ res }): Promise<RedirectProps> => {
    if (res) {
      res.writeHead(302, { Location: destination })
      res.end()
      return {}
    } else {
      await Router.push(destination)
    }

    return { metaRedirect: true }
  }

  return Redirect
}

export default redirect
