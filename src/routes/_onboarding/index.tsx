import { RouteObject, Navigate } from 'react-router-dom'

import { Profile } from 'pages/Profile'
import { StoryArticle } from 'pages/StoryArticle'

import { OnboardingGuard } from './guard'

/**
 * オンボーディング完了前コンテンツ
 */
export const onboardingRouter: RouteObject = {
  element: <OnboardingGuard />,
  children: [
    { index: true, element: <Navigate to="/story/opening" replace /> },
    { path: 'profile', element: <Profile /> },
    { path: 'story/opening', element: <StoryArticle /> },
  ],
}
