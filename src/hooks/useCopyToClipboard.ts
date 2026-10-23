import { useCallback, useState, ReactNode } from 'react'

interface useCopyToClipboardProps {
  text: string
  successMessage?: ReactNode
  errorMessage?: string
}

export const useCopyToClipboard = ({
  text,
  successMessage = 'コピーしました',
  errorMessage = 'コピーに失敗しました',
}: useCopyToClipboardProps) => {
  // クリップボードへのコピーが可能かどうか判定
  const [availableClipboard] = useState(() => Boolean(navigator.clipboard))

  // ダイアログの表示状態
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  // ダイアログのメッセージ
  const [message, setMessage] = useState<ReactNode>('')

  // テキストをクリップボードへコピー
  const handleCopyText = useCallback(() => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(text).then(
      () => {
        setMessage(successMessage)
        setOpenDialog(true)
      },
      () => {
        setMessage(errorMessage)
        setOpenDialog(true)
      }
    )
  }, [text, successMessage, errorMessage])

  return {
    availableClipboard,
    handleCopyText,
    openDialog,
    setOpenDialog,
    message,
  }
}
