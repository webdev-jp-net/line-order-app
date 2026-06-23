# 🤖 マルチエージェント運用ガイド

## このドキュメントの役割
- Gemini CLI / Codex CLI など複数エージェントの共通エントリーポイント
- すべての作業は `_document/_llm-rules/` 以下の正式ルールに従うこと
- 仕様・ルールの正本は line-order-document（`_document/` に subtree 同期）
- ルールチェーン: `AGENTS.md` → `session_control.md` → 専門ルール → `core_rules.md`

## セッション開始フロー（必ず順番どおりに実施）
1. `git status && git branch --show-current` でブランチと作業ツリーの健全性を確認
2. `_document/_llm-rules/session_control.md` を全文読了
3. `_document/_llm-rules/core_rules.md` と `_document/_llm-rules/implementation_principles.md` を読み込み、原則を再確認
4. `_document/_llm-docs/project.md` を参照し、プロジェクトの背景と要求を把握
5. タスク種類を分析し、該当する専門ルールを選択して読む
6. ルールに沿って作業を開始。疑問点や仕様の空白は必ずユーザーに確認

## エージェント別の追加指針
### Claude Code
- `CLAUDE.md` を必ず参照し、記載された手順を優先
- MCPツールはユーザーが具体的なコマンドを指示した場合のみ実行
- 仕様書は要約せず、書かれている通りに実装

### Codex CLI（本エージェント）
- シェル実行時は必ず `shell` ツールを使用し、`["bash","-lc",<command>]` 形式で渡す
- すべての `shell` 呼び出しで `workdir` を指定する。`cd` に頼らない
- ファイル検索は `rg` / `rg --files` を優先し、`cat` や `sed` で必要部分のみ確認
- ファイル編集時はASCIIを基本とし、既存ドキュメントが日本語を含む場合のみ適宜使用
- 未承認の状態で既存の変更を戻さない。予期しない変更を検知したら速やかにユーザーへ報告

## 作業完了後に必ず行う記録
- `_document/_llm-memories/learned.md` など、`session_control.md` の `UPDATE_ACTION` セクションで指定された全ファイルをテーブル形式で更新
- 記録は客観的事実と再現可能な学びを中心に記載

## 禁止事項・注意点
- ルールファイルを読まずに推測で作業を進めない
- 不明点を一般論で補完しない。必ずユーザーへ確認
- 仕様に従わない実装、命名規則違反のブランチ作成をしない
- MCPツールの「親切な自動実行」を行わない

---

**⚠️ このファイルはすべての AI エージェントのスタート地点です。詳細ロジックは `_document/_llm-rules/` 配下にあります。**
