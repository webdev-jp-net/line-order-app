import { useSelector } from 'react-redux'

import liff from '@line/liff'
import { RootState } from 'store'

export const useMenuSupport = () => {
  const { lineUserId } = useSelector((state: RootState) => state.liffUser)
  const systemSupport = useSelector((state: RootState) => state.external.systemSupport)

  const os = liff.getOS()
  const lineVersion = liff.getLineVersion()
  const userAgent = navigator.userAgent

  const browsingCondition = [
    {
      label: 'USER ID:',
      value: lineUserId || 'N/A',
    },
    {
      label: 'OS:',
      value: os || 'N/A',
    },
    {
      label: 'LINE:',
      value: lineVersion !== null
        ? `ver.${lineVersion}`
        : 'ブラウザからの表示',
    },
    {
      label: 'userAgent:',
      value: userAgent || 'N/A',
    },
  ]

  // サポート情報のテキストを生成
  const supportInfoText = browsingCondition.map(item => `${item.label} ${item.value}`).join('\n')
  const fullSupportText = `システム情報\n${supportInfoText}`

  return {
    browsingCondition,
    systemSupport,
    fullSupportText,
  }
}
