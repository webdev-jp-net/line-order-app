import { initApi as api } from './initApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getUserToken: build.query<GetUserTokenApiResponse, GetUserTokenApiArg>({
      query: () => ({ url: `/user-token` }),
    }),
    getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
      query: () => ({ url: `/profile` }),
    }),
    putProfile: build.mutation<PutProfileApiResponse, PutProfileApiArg>({
      query: queryArg => ({ url: `/profile`, method: 'PUT', body: queryArg.userProfile }),
    }),
    getProgress: build.query<GetProgressApiResponse, GetProgressApiArg>({
      query: () => ({ url: `/progress` }),
    }),
    postAnswerById: build.mutation<PostAnswerByIdApiResponse, PostAnswerByIdApiArg>({
      query: queryArg => ({ url: `/answer/${queryArg.id}`, method: 'POST', body: queryArg.body }),
    }),
    getAwards: build.query<GetAwardsApiResponse, GetAwardsApiArg>({
      query: () => ({ url: `/awards` }),
    }),
    postAwards: build.mutation<PostAwardsApiResponse, PostAwardsApiArg>({
      query: queryArg => ({
        url: `/awards`,
        method: 'POST',
        params: {
          id: queryArg.id,
        },
      }),
    }),
    getSurveys: build.query<GetSurveysApiResponse, GetSurveysApiArg>({
      query: () => ({ url: `/surveys` }),
    }),
    postSurveys: build.mutation<PostSurveysApiResponse, PostSurveysApiArg>({
      query: queryArg => ({
        url: `/surveys`,
        method: 'POST',
        params: {
          id: queryArg.id,
        },
      }),
    }),
    postCompleteOnboarding: build.mutation<
      PostCompleteOnboardingApiResponse,
      PostCompleteOnboardingApiArg
    >({
      query: () => ({ url: `/complete-onboarding`, method: 'POST' }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as apiClient }
export type GetUserTokenApiResponse = /** status 200 OK */ {
  /** ユーザトークン */
  userToken?: string
  /** LINEユーザーID */
  lineUserId?: string
}
export type GetUserTokenApiArg = void
export type GetProfileApiResponse = /** status 200 OK */ UserProfile
export type GetProfileApiArg = void
export type PutProfileApiResponse = /** status 200 OK */ UserProfile
export type PutProfileApiArg = {
  userProfile: UserProfile
}
export type GetProgressApiResponse = /** status 200 OK */ Progress
export type GetProgressApiArg = void
export type PostAnswerByIdApiResponse = /** status 200 OK */ {
  /** 答えの正誤判定結果 */
  result?: boolean
  progress?: Progress
}
export type PostAnswerByIdApiArg = {
  /** 対象の謎ID（mission1-4:通常謎、grandMission:大謎） */
  id: MissionId
  body: {
    /** 謎の答え */
    answer: string
  }
}
export type GetAwardsApiResponse = /** status 200 OK */ {
  /** 受け取り済みプレゼントIDの一覧 */
  awardList?: AwardId[]
}
export type GetAwardsApiArg = void
export type PostAwardsApiResponse = /** status 200 OK */ {
  /** 受け取り済みプレゼントIDの一覧 */
  awardList?: AwardId[]
}
export type PostAwardsApiArg = {
  /** プレゼントID */
  id: AwardId
}
export type GetSurveysApiResponse = /** status 200 OK */ {
  /** 回答済みアンケートIDの一覧 */
  surveyList?: SurveyId[]
}
export type GetSurveysApiArg = void
export type PostSurveysApiResponse = /** status 200 OK */ {
  /** 回答済みアンケートIDの一覧 */
  surveyList?: SurveyId[]
}
export type PostSurveysApiArg = {
  /** アンケートID */
  id: SurveyId
}
export type PostCompleteOnboardingApiResponse = /** status 200 OK */ Progress
export type PostCompleteOnboardingApiArg = void
export type UnauthorizedError = {
  message: string
}
export type InternalServerError = {
  message: string
}
export type UserProfile = {
  /** LINEユーザーID */
  lineUserId?: string
  /** 性別（0:女性, 1:男性, 2:無回答） */
  gender: 0 | 1 | 2
  /** 年代（0:10代以下, 1:20代, 2:30代, 3:40代, 4:50代, 5:60代, 6:70代以上） */
  ageGroup: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** 居住地（都道府県コード） */
  residence: string
  /** 交通手段（0:車, 1:電車, 2:バス, 3:自転車, 4:徒歩） */
  transportation?: 0 | 1 | 2 | 3 | 4
}
export type NotFoundError = {}
export type BadRequestError = {
  message: string
  /** 不正があるリクエスト項目の一覧 */
  errorParams?: string[]
}
export type MissionId = 'mission1' | 'mission2' | 'mission3' | 'mission4' | 'grandMission'
export type Progress = {
  /** オンボーディングの完了状態 */
  isOnboardingCompleted: boolean
  /** 解いた謎IDの一覧（mission1-4:通常謎、grandMission:大謎） */
  completedMissionList: MissionId[]
}
export type AwardId = 'ex' | 'complete'
export type SurveyId = 'ex' | 'complete'
export const {
  useGetUserTokenQuery,
  useLazyGetUserTokenQuery,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  usePutProfileMutation,
  useGetProgressQuery,
  useLazyGetProgressQuery,
  usePostAnswerByIdMutation,
  useGetAwardsQuery,
  useLazyGetAwardsQuery,
  usePostAwardsMutation,
  useGetSurveysQuery,
  useLazyGetSurveysQuery,
  usePostSurveysMutation,
  usePostCompleteOnboardingMutation,
} = injectedRtkApi
