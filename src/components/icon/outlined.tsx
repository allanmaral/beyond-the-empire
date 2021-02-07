import { memo } from 'react'

const iconData = {
  d8: {
    outline: 'M158 98L98 18L38 98L98 178L158 98Z',
    fill: 'M148.4 98.8L98.0001 31.6L47.6001 98.8L98.0001 165.2L148.4 98.8Z'
  },
  d6: {
    outline: 'M18 178H178V18H18V178Z',
    fill: 'M28 167.2H167.2V28H28V167.2Z'
  },
  d12: {
    outline: 'M178 98L138 28.4H58L18 98L58 167.6H138L178 98Z',
    fill:
      'M133.2 158.8L168.4 98.0001L133.2 37.2001H62.8001L27.6001 98.0001L62.8001 158.8H133.2Z'
  },
  force: {
    outline:
      'M171.6 129.2C175.6 118.8 178 108.4 178 98C178 87.6 175.6 77.2 171.6 66.8C167.6 57.2 162 48.4 154.8 41.2C147.6 34 138.8 28.4 129.2 24.4C119.6 20.4 109.2 18 98 18C86.8 18 76.4 20.4 66.8 24.4C57.2 28.4 48.4 34 41.2 41.2C34 48.4 28.4 57.2 24.4 66.8C20.4 77.2 18 87.6 18 98C18 109.2 20.4 119.6 24.4 129.2C28.4 138.8 34 147.6 41.2 154.8C48.4 162 57.2 167.6 66.8 171.6C76.4 175.6 86.8 178 98 178C109.2 178 119.6 175.6 129.2 171.6C138.8 167.6 147.6 162 154.8 154.8C162 147.6 167.6 138.8 171.6 129.2Z',
    fill:
      'M168.4 98C168.4 88.4 166.8 79.6 162.8 70.8C158.8 62 153.2 54.8 147.6 48.4C141.2 42 134 37.2 125.2 33.2C116.4 29.2 107.6 27.6 98.0001 27.6C88.4001 27.6 79.6001 29.2 70.8001 33.2C62.0001 37.2 54.8001 42 48.4001 48.4C42.0001 54.8 37.2001 62 33.2001 70.8C29.2001 79.6 27.6001 88.4 27.6001 98C27.6001 107.6 29.2001 116.4 33.2001 125.2C37.2001 134 42.0001 141.2 48.4001 147.6C54.8001 154 62.0001 158.8 70.8001 162.8C79.6001 166.8 88.4001 168.4 98.0001 168.4C107.6 168.4 116.4 166.8 125.2 162.8C134 158.8 141.2 154 147.6 147.6C154 141.2 158.8 134 162.8 125.2C166.8 116.4 168.4 107.6 168.4 98Z'
  }
}

export interface OutlinedIconProps {
  color: string
  name: keyof typeof iconData
}

const OutlinedIcon: React.FC<OutlinedIconProps> = memo(({ color, name }) => (
  <svg
    style={{
      height: '1.3em',
      fontSize: '0.9em',
      position: 'relative',
      top: '0.25em'
    }}
    viewBox="0 0 196 196"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={iconData[name].outline} fill="currentColor" />
    <path d={iconData[name].fill} fill={color} />
  </svg>
))

export default OutlinedIcon