# 受注一覧 一括印刷 — 現状コード（PRマージ前スナップショット）

このセットは、添付PR「受注一覧チェックボックス追加・注文請書一括印刷」の
**変更後**記述から逆算した、**PRマージ前（=現状）** のコードファイル一式です。
AIにdiffを与えてヘルプを更新する仕組みの入力フィクスチャを想定しています。

## PR変更ファイルとの対応

| PRで変更 / 追加 | 本セットの現状ファイル | 状態 |
| --- | --- | --- |
| `orders/view.tpl` | `app/views/orders/view.tpl` | form#orders 無し・印刷チェック列無し（引当/発注列は既存） |
| `view.js`（`bulkPrint`に第6引数追加） | `app/webroot/js/app/view.js` | `bulkPrint(formId, reportGroupCd, modelName, daialog, self)`（checkedSelector無し） |
| `orders/view.js` | `app/webroot/js/app/orders/view.js` | 引当/発注のトグル・一括処理のみ。印刷バインド・getScript無し |
| `OrderLayoutSelectorDialogWrapper.tsx`（新規） | （現状では未存在） | 参照元の `SaleLayoutSelectorDialogWrapper.tsx` を同梱 |
| `webpack.config.js` | `webpack.config.js` | `orderLayoutSelectorDialog` エントリ無し |
| `js/min/app/view.js` | `app/webroot/js/min/app/view.js` | dev版を terser でミニファイした派生物 |
| `js/min/app/orders/view.js` | `app/webroot/js/min/app/orders/view.js` | 同上 |

## 想定スタック

CakePHP + Smarty(.tpl) / jQuery / React + TypeScript + Material-UI / webpack / gulp(uglify)

## 備考

- `SaleLayoutSelectorDialogWrapper.tsx` が import する `./theme` と
  `./components/LayoutSelectorDialog` はリポジトリ既存資産のため省略しています。
- min版は dev版から `npx terser -c -m` で生成（PR記載の `gulp uglify` 相当）。
