import { useEffect, useMemo } from 'react'

import { useAppDispatch } from 'store'
import {
  useLazyGetProgressQuery,
  useLazyGetProfileQuery,
  useLazyGetAwardsQuery,
  useLazyGetSurveysQuery,
} from 'store/_apiClient'
import { setError, setErrorMessage } from 'store/layout'
import { setProfile, setProfileDraft, setAwards, setSurveys, setProgress } from 'store/player'

import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * RTK Queryエラーから特定のHTTPステータスを取得する
 */
const getErrorStatus = (
  error: FetchBaseQueryError | SerializedError | undefined
): number | null => {
  if (!error) return null
  if ('status' in error) {
    // FetchBaseQueryErrorの場合
    if (typeof error.status === 'number') {
      return error.status
    }
    if (error.status === 'PARSING_ERROR' && 'originalStatus' in error) {
      return error.originalStatus
    }
  }
  return null
}

/**
 * アプリ起動時に必要なデータをAPIから取得し、RTKストアに保存するフック
 * - Progress (進捗状況)
 * - Profile (プロフィール)
 * - Awards (受け取り済み賞品)
 * - Surveys (回答済みアンケート)
 */
export const useLoader = ({ userToken }: { userToken?: string | null } = {}) => {
  const dispatch = useAppDispatch()
  const [triggerProgress, progressState] = useLazyGetProgressQuery()
  const [triggerProfile, profileState] = useLazyGetProfileQuery()
  const [triggerAwards, awardsState] = useLazyGetAwardsQuery()
  const [triggerSurveys, surveysState] = useLazyGetSurveysQuery()

  // API呼び出しを並列実行（userTokenがある場合のみ）
  useEffect(() => {
    if (!userToken) return

    triggerProgress()
    triggerProfile()
    triggerAwards()
    triggerSurveys()
  }, [userToken, triggerProgress, triggerProfile, triggerAwards, triggerSurveys, dispatch])

  // 進捗データの取得と保存
  useEffect(() => {
    if (progressState.isSuccess && progressState.data) {
      dispatch(setProgress(progressState.data))
    }
    if (progressState.isError) {
      const status = getErrorStatus(progressState.error)
      // 401エラーはinitApi.tsで一元管理されるため、ここでは処理しない
      if (status !== 401) {
        dispatch(setErrorMessage('ゲームの進捗状態の取得に失敗しました'))
        dispatch(setError(true))
      }
    }
  }, [progressState, dispatch])

  // プロフィールデータの取得と保存
  useEffect(() => {
    if (profileState.isSuccess && profileState.data) {
      dispatch(setProfile(profileState.data))
      dispatch(setProfileDraft(profileState.data))
    }
    if (profileState.isError) {
      const status = getErrorStatus(profileState.error)
      // 404エラーは初回ユーザーの正常なケース（プロフィール未登録）なのでエラー扱いしない
      // 401エラーはinitApi.tsで一元管理されるため、ここでは処理しない
      if (status === 404) {
        // プロフィール未登録の場合はnullを設定
        dispatch(setProfile(null))
      } else if (status !== 401) {
        // その他のエラーの場合はエラーダイアログを表示
        dispatch(setErrorMessage('プロフィールの取得に失敗しました'))
        dispatch(setError(true))
      }
    }
  }, [profileState, dispatch])

  // 賞品受け取り状況の取得と保存
  useEffect(() => {
    if (awardsState.isSuccess && awardsState.data) {
      dispatch(setAwards(awardsState.data.awardList ?? []))
    }
    if (awardsState.isError) {
      const status = getErrorStatus(awardsState.error)
      // 404エラーは初回ユーザーの正常なケース（賞品データ未作成）なのでエラー扱いしない
      // 401エラーはinitApi.tsで一元管理されるため、ここでは処理しない
      if (status === 404) {
        // 賞品データが存在しない場合は空配列を設定
        dispatch(setAwards([]))
      } else if (status !== 401) {
        // その他のエラーの場合はエラーダイアログを表示
        dispatch(setErrorMessage('プレゼント受け取り状態の取得に失敗しました'))
        dispatch(setError(true))
      }
    }
  }, [awardsState, dispatch])

  // アンケート回答状況の取得と保存
  useEffect(() => {
    if (surveysState.isSuccess && surveysState.data) {
      dispatch(setSurveys(surveysState.data.surveyList ?? []))
    }
    if (surveysState.isError) {
      const status = getErrorStatus(surveysState.error)
      // 404エラーは初回ユーザーの正常なケース（アンケートデータ未作成）なのでエラー扱いしない
      // 401エラーはinitApi.tsで一元管理されるため、ここでは処理しない
      if (status === 404) {
        // アンケートデータが存在しない場合は空配列を設定
        dispatch(setSurveys([]))
      } else if (status !== 401) {
        // その他のエラーの場合はエラーダイアログを表示
        dispatch(setErrorMessage('アンケートの取得に失敗しました'))
        dispatch(setError(true))
      }
    }
  }, [surveysState, dispatch])

  const isLoading = useMemo(
    () =>
      progressState.isLoading ||
      profileState.isLoading ||
      awardsState.isLoading ||
      surveysState.isLoading,
    [progressState.isLoading, profileState.isLoading, awardsState.isLoading, surveysState.isLoading]
  )

  return {
    isLoading,
    progressData: progressState.data,
  }
}
