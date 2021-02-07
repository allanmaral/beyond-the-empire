import { useCallback, useEffect, useRef, useState } from 'react'
import { breakpoints } from '../../styles/themes/light'

import { Container, Reference, TooltipDropdown, TooltipContent } from './styles'

export interface PopoverProps {
  content: React.ReactNode
  children: React.ReactNode
  help?: boolean
  dots?: boolean
}

const mobileMaxWidth = Number(breakpoints.md.max.replace('px', ''))

const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  help,
  dots = true
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const reference = useRef<HTMLDivElement>(null)
  const dropdown = useRef<HTMLDivElement>(null)

  const dismisTooltip = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleDropdownPosition = useCallback(() => {
    if (reference.current && dropdown.current) {
      const screenPadding =
        window.innerWidth <= mobileMaxWidth
          ? window.innerWidth * 0.03
          : 21.250356

      const referenceRect = reference.current.getBoundingClientRect()
      const dropdownRect = dropdown.current.getBoundingClientRect()

      const dropdownRightX = dropdownRect.x + dropdownRect.width
      const referenceRightX = referenceRect.x + referenceRect.width

      if (dropdownRect.x <= screenPadding) {
        dropdown.current.style.left = '0'
        dropdown.current.style.right = 'auto'
        dropdown.current.style.transform = `translateX(${
          -referenceRect.x + screenPadding
        }px)`
      } else if (dropdownRightX > window.innerWidth - screenPadding) {
        dropdown.current.style.left = 'auto'
        dropdown.current.style.right = '0'
        dropdown.current.style.transform = `translateX(${
          window.innerWidth - referenceRightX - screenPadding
        }px)`
      }
    }
  }, [])

  const handleToggle = useCallback(() => {
    if (!isVisible) {
      handleDropdownPosition()
    }
    setIsVisible(!isVisible)
  }, [isVisible])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('touchstart', dismisTooltip)
      return () => {
        document.removeEventListener('touchstart', dismisTooltip)
      }
    }
  }, [dismisTooltip])

  return (
    <Container dots={dots}>
      <Reference
        ref={reference}
        help={help}
        onMouseOver={handleDropdownPosition}
        onTouchStart={e => {
          e.stopPropagation()
          handleToggle()
        }}
      >
        {children}
      </Reference>
      <TooltipDropdown
        ref={dropdown}
        visible={isVisible}
        onTouchStart={e => {
          e.stopPropagation()
        }}
      >
        <TooltipContent>{content}</TooltipContent>
      </TooltipDropdown>
    </Container>
  )
}

export default Popover
