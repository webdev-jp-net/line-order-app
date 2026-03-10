import { createSlice } from '@reduxjs/toolkit'
import sourceData from 'data/source.json'

type State = {
  contactUrl: string
  website: {
    url: string
    image: string
  }
  tweetUrl: string
  exHuntersVillage: {
    url: string
    keyword: string
  }
  accessMapImage: string
  modelRouteImage: string
  systemSupport: string
  playGuide: typeof sourceData.playGuide
  award: typeof sourceData.award
}

const initialState: State = {
  contactUrl: sourceData.contactUrl ?? '',
  website: {
    url: sourceData.website?.url ?? '',
    image: sourceData.website?.image ?? '',
  },
  tweetUrl: sourceData.tweetUrl ?? '',
  exHuntersVillage: {
    url: sourceData.exHuntersVillage?.url ?? '',
    keyword: sourceData.exHuntersVillage?.keyword ?? '',
  },
  accessMapImage: sourceData.accessMapImage ?? '',
  modelRouteImage: sourceData.modelRouteImage ?? '',
  systemSupport: sourceData.systemSupport ?? '',
  playGuide: sourceData.playGuide ?? [],
  award: sourceData.award ?? [],
}

const external = createSlice({
  name: 'external',
  initialState,
  reducers: {},
})

export default external.reducer
