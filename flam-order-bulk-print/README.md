# 受注一覧 一括印刷 — 変更後コード（PRマージ後スナップショット）

添付PR「受注一覧チェックボックス追加・注文請書一括印刷」の変更を、
現状（マージ前）コードに適用した**変更後（=マージ後）**の状態です。
現状版とこのセットを diff すると、PRの実差分が得られます。

## PRで適用した変更

| ファイル | 変更内容 |
| --- | --- |
| `app/views/orders/view.tpl` | テーブルを `<form id="orders">` で囲み、最前列に印刷列（`#select_all_print` / `.checkbox-item-print`）を追加。no-data の colspan を 9→10 |
| `app/webroot/js/app/view.js` | `bulkPrint` に第6引数 `checkedSelector` を追加（省略時 `":checked:not(#select_all)"` で後方互換維持） |
| `app/webroot/js/app/orders/view.js` | `#select_all_print` トグル、`.checkbox-item-print` change での `#btn_download` 抑制（`btnDisabled`/`btnEnabled`）、`$.getScript` で `orderLayoutSelectorDialog.js` を読み込み、`#btn_print` を `.off("click")` 後に `bulkPrint('orders','order','Order',...,'.checkbox-item-print:checked')` でバインド |
| `app/webroot/js/react/src/OrderLayoutSelectorDialogWrapper.tsx` | **新規**。Sale版と同パターンで `reportGroupCd="order"` |
| `webpack.config.js` | `orderLayoutSelectorDialog` エントリを追加 |
| `app/webroot/js/min/app/view.js` | dev版を terser でミニファイし再生成 |
| `app/webroot/js/min/app/orders/view.js` | 同上 |

## 備考

- `SaleLayoutSelectorDialogWrapper.tsx` は本PRでは変更なし（参照のため同梱）。
- min版は dev版から `npx terser -c -m` で生成（PR記載の `gulp uglify` 相当）。
