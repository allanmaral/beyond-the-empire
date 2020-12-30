import { useEffect, useState } from 'react'

const useAwaitForRender = (): boolean => {
  const [pageRendered, setPageRendered] = useState<boolean>(false)
  useEffect(() => {
    setPageRendered(true)
  }, [pageRendered])

  return pageRendered
}

export default useAwaitForRender
