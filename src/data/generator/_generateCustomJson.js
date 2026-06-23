// 取ってきた元データを、画面用のメニュー一覧(menu.json)に整える。
// あわせて、画像をまとめてダウンロードするための小さなスクリプト(getMedia.sh)も作る。

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

// アプリに含める画像の最大幅（px）
const IMAGE_MAX_WIDTH = 800

const RAW_FILE = 'src/data/_raw/menu.json'
const DATA_FILE = 'src/data/menu.json'
const MEDIA_SCRIPT = 'src/data/getMedia.sh'

const write = async (path, text) => {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, text)
}

const raw = JSON.parse(await readFile(RAW_FILE, 'utf8'))

// 各メニューを画面用に整える。画像はアプリ内に置いたパスへ差し替え、
// ダウンロード対象（元画像URL → 保存先）も集める。日時などの余分な項目は落とす。
const items = []
const media = []
for (const item of raw.contents) {
  let mainImage
  if (item.mainImage?.url) {
    const { url, width, height } = item.mainImage
    const newWidth = Math.min(IMAGE_MAX_WIDTH, width)
    const newHeight = Math.round((newWidth * height) / width)
    mainImage = { url: `/menu/${item.id}.webp`, width: newWidth, height: newHeight }
    // 軽い形式(WebP)・指定幅にして受け取るURL
    media.push({
      source: `${url}?fm=webp&w=${IMAGE_MAX_WIDTH}&q=80`,
      dest: `public/menu/${item.id}.webp`,
    })
  }

  items.push({
    id: item.id,
    name: item.name,
    price: item.price,
    category: { id: item.category.id, name: item.category.name },
    ...(mainImage ? { mainImage } : {}),
    ...(item.description ? { description: item.description } : {}),
  })
}

await write(DATA_FILE, `${JSON.stringify(items, null, 2)}\n`)

// 画像をダウンロードするスクリプトを書き出す
const script = [
  '#!/bin/sh',
  '# 自動生成: メニュー画像をダウンロードする',
  'set -e',
  'mkdir -p public/menu',
  ...media.map(m => `curl -s -L "${m.source}" -o "${m.dest}"`),
  `echo "画像 ${media.length} 件をダウンロードしました。"`,
  '',
].join('\n')
await write(MEDIA_SCRIPT, script)

console.log(`メニュー ${items.length} 件を整形しました（画像 ${media.length} 件）。`)
