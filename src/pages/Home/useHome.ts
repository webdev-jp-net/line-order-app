import { useSelector } from 'react-redux'

import { RootState } from 'store'

export const useHome = () => {
  const officialWebSiteUrl = useSelector((state: RootState) => state.external.website.url)
  return {
    officialWebSiteUrl,
  }
}
