import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'
import Icon, { iconDictionary } from './icon'

export interface MarkdownProps {
  text: string
}

const icons = Object.keys(iconDictionary)
const TextWithIcons: React.FC<{ text: string }> = ({ text }) => {
  const iconMatch = text.match(/\[([^\]]+)]/)
  if (iconMatch && icons.includes(iconMatch[1])) {
    return <Icon name={iconMatch[1]} />
  }
  return <>{text}</>
}

const renderers: ReactMarkdownProps['renderers'] = {
  // Parse the markdow text to find icons to insert
  text: props => {
    const sections = props.value.split(/(\[[^\]]+])/g) as string[]
    return (
      <>
        {sections.map((str, index) => (
          <TextWithIcons key={`${props.nodeKey}_s_${index}`} text={str} />
        ))}
      </>
    )
  }
}

const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  return <ReactMarkdown renderers={renderers} children={text} />
}

export default Markdown
