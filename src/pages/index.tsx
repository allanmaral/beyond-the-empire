import { Text, Card, Note, Code, Spacer } from '@geist-ui/react'
import { Layout } from '../components/layout'

const Home: React.FC = () => {
  return (
    <Layout meta={{ title: 'Weapons' }}>
      <Text h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </Text>
      <Card>
        hello, world. I am using <Code>@geist-ui/react</Code> !
      </Card>
      <Spacer y={1.5} />
      <Card shadow>
        <Note type="success">This note details something important.</Note>
      </Card>
    </Layout>
  )
}

export default Home
