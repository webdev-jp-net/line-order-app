import { useCallback, useState, useEffect, ReactNode } from 'react';

interface useCopyToClipboardProps {
  text: string;
  successMessage?: ReactNode;
  errorMessage?: string;
}

export const useCopyToClipboard = ({
  text,
  successMessage = 'コピーしました',
  errorMessage = 'コピーに失敗しました',
}: useCopyToClipboardProps) => {
  const [availableClipboard, setAvailableClipboard] = useState(false);

  // ダイアログの表示状態
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  // ダイアログのメッセージ
  const [message, setMessage] = useState<ReactNode>('');

  useEffect(() => {
    // クリップボードへのコピーが可能かどうか判定
    if (!navigator.clipboard) return;
    setAvailableClipboard(true);
  }, []);

  // テキストをクリップボードへコピー
  const handleCopyText = useCallback(() => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(
      () => {
        setMessage(successMessage);
        setOpenDialog(true);
      },
      () => {
        setMessage(errorMessage);
        setOpenDialog(true);
      }
    );
  }, [text, successMessage, errorMessage]);

  return {
    availableClipboard,
    handleCopyText,
    openDialog,
    setOpenDialog,
    message,
  };
};
