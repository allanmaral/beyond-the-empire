import { Text, Card } from '@geist-ui/react'
import { Page } from '../components'
import PageHeader from '../components/header'

const Home: React.FC = () => {
  return (
    <>
      <PageHeader />
      <Page>
        <Text h1>
          Welcome to the <a href="#">Edge</a>
        </Text>
        <Card>
          This is a fan made web-app to help you search the contents of the
          awesome line of books{' '}
          <a href="https://www.fantasyflightgames.com/en/products/star-wars-edge-of-the-empire/">
            Edge of the Empire
          </a>
          ,{' '}
          <a href="https://www.fantasyflightgames.com/en/products/star-wars-age-of-rebellion/">
            Age of Rebellion
          </a>
          , and{' '}
          <a href="https://www.fantasyflightgames.com/en/products/star-wars-force-and-destiny/">
            Force and Destiny
          </a>{' '}
          made by Fantasy Flight Games.
        </Card>
      </Page>
    </>
  )
}

export default Home
