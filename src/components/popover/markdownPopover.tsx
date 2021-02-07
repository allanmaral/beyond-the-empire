import { useMemo } from 'react'
import Popover from './popover'
import Markdown from '../markdown'

export interface MarkdownPopoverProps {
  content: string
  children: React.ReactNode
  help?: boolean
  dots?: boolean
}

export const MarkdownPopover: React.FC<MarkdownPopoverProps> = ({
  content,
  children,
  help,
  dots
}) => {
  const mkContent = useMemo(() => <Markdown text={content} />, [content])
  return (
    <Popover content={mkContent} help={help} dots={dots}>
      {children}
    </Popover>
  )
}

export default MarkdownPopover
