import React from 'react'

const withDefaults = <P, DP>(
  component: React.ComponentType<P>,
  defaultProps: DP
): React.ComponentType<Partial<DP> & Omit<P, keyof DP>> => {
  type Props = Partial<DP> & Omit<P, keyof DP>
  component.defaultProps = defaultProps
  return (component as unknown) as React.ComponentType<Props>
}

export default withDefaults
