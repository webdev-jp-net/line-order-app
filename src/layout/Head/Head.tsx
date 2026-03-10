import { FC } from 'react'

import { Helmet } from '@dr.pogodin/react-helmet'

type HeadProps = {
  pageTitle?: string
  type?: 'website' | 'article'
  children?: React.ReactNode
}

/**
 * メタタグのタイトルを定義するコンポーネント
 */
export const Head: FC<HeadProps> = ({ pageTitle, type, children }) => {
  const defaultMeta = {
    title: 'LINE Quest Game',
    type: 'article',
  }

  const title = pageTitle ? `${pageTitle}` : defaultMeta.title

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type || defaultMeta.type} />
      {children}
    </Helmet>
  )
}
