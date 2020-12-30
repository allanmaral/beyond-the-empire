import { CssBaseline } from '@geist-ui/react'
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  NextScript,
  Head
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const baselineStyles = CssBaseline.flush()
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {baselineStyles}
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if (!window.localStorage) return;
                  if (window.localStorage.getItem('theme') === 'dark') {
                    document.documentElement.style.background = '#000';
                    document.body.style.background = '#000';
                  };
                })()
              `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
