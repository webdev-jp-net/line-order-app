#!/bin/sh
# メニュー管理サービス(microCMS)から、メニューの元データを取ってきてファイルに保存する
set -e

# 鍵は .env か、デプロイ環境にあらかじめ入れた値から読む
[ -f .env ] && . ./.env

: "${MICROCMS_SERVICE:?MICROCMS_SERVICE を設定してください}"
: "${MICROCMS_SERVICE_KEY:?MICROCMS_SERVICE_KEY を設定してください}"

mkdir -p src/data/_raw
curl -s -H "X-MICROCMS-API-KEY: ${MICROCMS_SERVICE_KEY}" \
  "https://${MICROCMS_SERVICE}.microcms.io/api/v1/menu?limit=100" \
  -o src/data/_raw/menu.json

echo "メニュー生データを取得しました。"
