import { initApi as api } from './initApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getUserToken: build.query<GetUserTokenApiResponse, GetUserTokenApiArg>({
      query: () => ({ url: `/user-token` }),
    }),
    postOrders: build.mutation<PostOrdersApiResponse, PostOrdersApiArg>({
      query: queryArg => ({ url: `/orders`, method: 'POST', body: queryArg.body }),
    }),
    getOrderHistory: build.query<GetOrderHistoryApiResponse, GetOrderHistoryApiArg>({
      query: () => ({ url: `/orders/history` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as apiClient }
export type GetUserTokenApiResponse = /** status 200 OK */ {
  /** ユーザートークン（JWT） */
  userToken?: string
  /** LINEユーザーID */
  lineUserId?: string
}
export type GetUserTokenApiArg = void
export type PostOrdersApiResponse = /** status 200 OK */ {
  orderId?: string
  status?: OrderStatus
}
export type PostOrdersApiArg = {
  body: {
    orderList: OrderItem[]
    /** サービス通知トークン発行に使う LIFF アクセストークン */
    liffAccessToken: string
  }
}
export type GetOrderHistoryApiResponse = /** status 200 OK */ {
  orderList?: OrderHistoryItem[]
}
export type GetOrderHistoryApiArg = void
export type UnauthorizedError = {
  message?: string
}
export type OrderStatus = 'open' | 'done' | 'closed'
export type BadRequestError = {
  message?: string
  /** 不正があるリクエスト項目の一覧 */
  errorParams?: string[]
}
export type InternalServerError = {
  message?: string
}
export type OrderItem = {
  /** microCMS のメニューID */
  productId: string
  /** メニュー名 */
  name: string
  /** 数量 */
  qty: number
  /** 単価（円） */
  price: number
}
export type OrderHistoryItem = {
  orderId?: string
  status?: OrderStatus
  orderList?: OrderItem[]
  createdAt?: string
}
export const {
  useGetUserTokenQuery,
  useLazyGetUserTokenQuery,
  usePostOrdersMutation,
  useGetOrderHistoryQuery,
  useLazyGetOrderHistoryQuery,
} = injectedRtkApi
