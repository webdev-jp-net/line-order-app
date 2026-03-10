/**
 * player.ts - ゲーム進捗とプロフィール管理用のReduxスライス
 *
 * 使用例:
 *
 * // スプラッシュ画面での進捗取得
 * const { data } = useGetProgressQuery()
 * const dispatch = useAppDispatch()
 * useEffect(() => {
 *   if (data) dispatch(setProgress(data))
 * }, [data])
 *
 * // 謎正解時の進捗更新
 * const [postAnswer] = usePostAnswerByIdMutation()
 * const handleAnswer = async (answer: string) => {
 *   const result = await postAnswer({ id: 'mission1', body: { answer } })
 *   if (result.data?.progress) {
 *     dispatch(updateProgress(result.data.progress))
 *   }
 * }
 *
 * // 進捗の確認
 * const isCompleted = useAppSelector(selectIsMissionCompleted('mission1'))
 * const allCompleted = useAppSelector(selectIsAllMissionsCompleted)
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

import type { UserProfile, Progress, AwardId, SurveyId } from './_apiClient'

// 初期進捗状態
const initialProgress: Progress = {
  isOnboardingCompleted: false,
  completedMissionList: [],
}

const initialProfileDraft: Partial<UserProfile> = {}

// ProfileDraftの部分更新用の型
type PartialUserProfile = Partial<UserProfile>

type State = {
  // DBに保存されているプロフィールデータ
  profile?: UserProfile | null
  // フォームに送信する前のプロフィール入力値
  profileDraft: Partial<UserProfile>
  // APIから取得したゲーム進捗状況
  progress: Progress | null
  // 受け取り済み賞品IDの一覧
  awards: AwardId[]
  // 回答済みアンケートIDの一覧
  surveys: SurveyId[]
  // エラー状態
  error: string | null
}

const initialState: State = {
  profileDraft: initialProfileDraft,
  progress: null,
  awards: [],
  surveys: [],
  error: null,
}

const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // プロフィールを更新
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload
    },
    // フォームに送信する前のプロフィール入力値を保存（部分的な更新可能）
    setProfileDraft: (state, action: PayloadAction<PartialUserProfile>) => {
      // 受け取ったデータで部分的に更新
      state.profileDraft = {
        ...state.profileDraft,
        ...action.payload,
      }
    },
    // プロフィール下書きをクリア
    clearProfileDraft: state => {
      state.profileDraft = initialProfileDraft
    },
    // APIから取得した進捗状況をセット
    setProgress: (state, action: PayloadAction<Progress>) => {
      state.progress = action.payload
      state.error = null
    },
    // 進捗状況を更新（謎正解時など）
    updateProgress: (state, action: PayloadAction<Progress>) => {
      state.progress = action.payload
    },
    // 受け取り済み賞品を設定
    setAwards: (state, action: PayloadAction<AwardId[]>) => {
      state.awards = action.payload
      state.error = null
    },
    // 受け取り済み賞品を追加
    addAward: (state, action: PayloadAction<AwardId>) => {
      if (!state.awards.includes(action.payload)) state.awards.push(action.payload)
    },
    // 回答済みアンケートを設定
    setSurveys: (state, action: PayloadAction<SurveyId[]>) => {
      state.surveys = action.payload
      state.error = null
    },
    // 回答済みアンケートを追加
    addSurvey: (state, action: PayloadAction<SurveyId>) => {
      if (!state.surveys.includes(action.payload)) state.surveys.push(action.payload)
    },
    // オンボーディング完了状態を設定
    setOnboardingCompleted: state => {
      if (state.progress) {
        state.progress.isOnboardingCompleted = true
      }
    },
    // 進捗状況をリセット
    resetProgress: state => {
      state.progress = initialProgress
    },
    // エラー状態を設定
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

// Action Creator
export const {
  setProfile,
  setProfileDraft,
  clearProfileDraft,
  setProgress,
  updateProgress,
  setOnboardingCompleted,
  resetProgress,
  setAwards,
  addAward,
  setSurveys,
  addSurvey,
  setError,
} = player.actions
// Reducer
export default player.reducer

// LocalStorageに保存する設定
export const playerPersistConfig = {
  key: 'player',
  storage,
  whitelist: ['progress', 'profile', 'awards', 'surveys'], // 進捗・プロフィール・賞品・アンケートを永続化
}

// セレクター
export const selectProgress = (state: { player: State }) => state.player.progress
export const selectProfile = (state: { player: State }) => state.player.profile
export const selectProfileDraft = (state: { player: State }) => state.player.profileDraft
export const selectError = (state: { player: State }) => state.player.error
export const selectAwards = (state: { player: State }) => state.player.awards
export const selectSurveys = (state: { player: State }) => state.player.surveys

// 便利なセレクター
export const selectIsOnboardingCompleted = (state: { player: State }) =>
  state.player.progress?.isOnboardingCompleted ?? false

export const selectCompletedMissions = (state: { player: State }) =>
  state.player.progress?.completedMissionList ?? []

export const selectIsMissionCompleted = (missionId: string) => (state: { player: State }) => {
  const completedList = state.player.progress?.completedMissionList ?? []
  // MissionId型にキャストして確認
  return completedList.some(id => id === missionId)
}

export const selectIsAllMissionsCompleted = (state: { player: State }) => {
  const completedList = state.player.progress?.completedMissionList ?? []
  return (
    completedList.includes('mission1') &&
    completedList.includes('mission2') &&
    completedList.includes('mission3') &&
    completedList.includes('mission4')
  )
}

export const selectIsGameCompleted = (state: { player: State }) => {
  const completedList = state.player.progress?.completedMissionList ?? []
  return completedList.includes('grandMission')
}
