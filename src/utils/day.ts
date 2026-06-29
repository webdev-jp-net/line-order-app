import dayjs from 'dayjs'

/**
 * 日付をYYYY年M月D日の形式に変換
 * @param date 日付
 * @returns 変換後の日付
 */
export const formatDate = (date: string) => {
  if (!date) return ''
  return dayjs(date).format('YYYY年M月D日')
}

/**
 * 時刻をHH:mmの形式に変換
 * @param date 日付
 * @returns 変換後の時刻
 */
export const formatTime = (date: string) => {
  if (!date) return ''
  return dayjs(date).format('HH:mm')
}
