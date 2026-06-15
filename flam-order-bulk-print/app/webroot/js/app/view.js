/**
 * 共通ビュー用スクリプト
 * app/webroot/js/app/view.js
 */

// 一覧の全選択チェックボックス共通処理
$(function () {
  $("#select_all").on("change", function () {
    var checked = $(this).prop("checked");
    $(".checkbox-item", $(this).closest("form")).prop("checked", checked);
  });
});

/**
 * 選択行を一括印刷する共通関数。
 *
 * @param {string} formId         対象フォームのID
 * @param {string} reportGroupCd  帳票グループコード（例: "sale", "order"）
 * @param {string} modelName      モデル名（例: "Sale", "Order"）
 * @param {object} daialog        レイアウト選択ダイアログのインスタンス
 * @param {object} self           呼び出し元ボタン要素
 * @param {string} checkedSelector 対象チェックボックスのセレクタ（省略時は従来挙動）
 */
bulkPrint = function (formId, reportGroupCd, modelName, daialog, self, checkedSelector) {
  checkedSelector = checkedSelector || ":checked:not(#select_all)";
  var form = $("#" + formId);

  if ($(checkedSelector, form).length > 0) {
    // レイアウト選択ダイアログを開き、選択後に帳票出力を実行
    daialog.open(reportGroupCd, function (layoutId) {
      var $form = $("<form>", {
        method: "post",
        action: "/reports/output",
        target: "_blank"
      });

      $(checkedSelector, form).each(function () {
        $form.append($("<input>", {
          type: "hidden",
          name: "ids[]",
          value: $(this).val()
        }));
      });

      $form.append($("<input>", { type: "hidden", name: "report_group_cd", value: reportGroupCd }));
      $form.append($("<input>", { type: "hidden", name: "model", value: modelName }));
      $form.append($("<input>", { type: "hidden", name: "layout_id", value: layoutId }));

      $form.appendTo("body").submit().remove();
    });
  } else {
    alert("印刷する明細を選択してください。");
  }
};
