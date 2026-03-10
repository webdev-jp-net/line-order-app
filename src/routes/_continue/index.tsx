import { RouteObject } from 'react-router-dom'

import { Celebration } from 'pages/Celebration'
import { GrandMission } from 'pages/GrandMission'
import { Menu } from 'pages/Menu'
import { MenuSupport } from 'pages/MenuSupport'
import { MissionArticle } from 'pages/MissionArticle'
import { Prize } from 'pages/Prize'
import { PrizeExchange } from 'pages/PrizeExchange'
import { StoryArticle } from 'pages/StoryArticle'

import { ContinueGuard } from './guard'

/**
 * オンボーディング完了後のコンテンツ（Homeを除く）
 */
export const continueRouter: RouteObject = {
  element: <ContinueGuard />,
  children: [
    { path: 'mission/:id', element: <MissionArticle /> },
    { path: 'grand-mission', element: <GrandMission /> },
    { path: 'celebration', element: <Celebration /> },
    { path: 'story/ending', element: <StoryArticle /> },
    { path: 'menu', element: <Menu /> },
    { path: 'menu/story/opening', element: <StoryArticle /> },
    { path: 'menu/story/ending', element: <StoryArticle /> },
    { path: 'menu/support', element: <MenuSupport /> },
    { path: 'prize', element: <Prize /> },
    { path: 'prize/exchange', element: <PrizeExchange /> },
  ],
}
