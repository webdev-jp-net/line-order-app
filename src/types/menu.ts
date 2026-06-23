// メニューデータの形の定義（取り込み後の src/data/menu.json の項目）

export type MenuCategory = {
  id: string
  name: string
}

export type MenuImage = {
  url: string
  width: number
  height: number
}

export type MenuItem = {
  id: string
  name: string
  price: number
  category: MenuCategory
  mainImage?: MenuImage
  /** 商品説明。HTMLタグを含む文章 */
  description?: string
}
