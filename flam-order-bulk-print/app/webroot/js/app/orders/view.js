/**
 * 受注一覧用スクリプト
 * app/webroot/js/app/orders/view.js
 */
$(function () {
  // 引当: 全選択トグル
  $("#select_all_bulk_copy").on("change", function () {
    $(".checkbox-item").prop("checked", $(this).prop("checked"));
  });

  // 発注: 全選択トグル
  $("#select_all_bulk_create").on("change", function () {
    $(".checkbox-item-bulkcreate").prop("checked", $(this).prop("checked"));
  });

  // 印刷チェックの選択状態に応じてCSVダウンロードボタンを制御
  function updatePrintDownloadState() {
    if ($(".checkbox-item-print:checked").length > 0) {
      btnDisabled("#btn_download");
    } else {
      btnEnabled("#btn_download");
    }
  }

  // 印刷: 全選択トグル
  $("#select_all_print").on("change", function () {
    $(".checkbox-item-print").prop("checked", $(this).prop("checked"));
    updatePrintDownloadState();
  });

  // 印刷: 個別チェック変更時
  $(".checkbox-item-print").on("change", updatePrintDownloadState);

  // 一括引当
  $("#btn_bulk_copy").on("click", function () {
    var ids = $(".checkbox-item:checked").map(function () {
      return $(this).val();
    }).get();

    if (ids.length === 0) {
      alert("引当する明細を選択してください。");
      return;
    }

    $.ajax({
      url: "/orders/bulkCopy",
      type: "POST",
      data: { ids: ids },
      success: function () {
        location.reload();
      },
      error: function () {
        alert("引当処理に失敗しました。");
      }
    });
  });

  // 一括発注
  $("#btn_bulk_create").on("click", function () {
    var ids = $(".checkbox-item-bulkcreate:checked").map(function () {
      return $(this).val();
    }).get();

    if (ids.length === 0) {
      alert("発注する明細を選択してください。");
      return;
    }

    $.ajax({
      url: "/orders/bulkCreate",
      type: "POST",
      data: { ids: ids },
      success: function () {
        location.reload();
      },
      error: function () {
        alert("発注処理に失敗しました。");
      }
    });
  });

  // 注文請書 一括印刷
  // レイアウト選択ダイアログ(React)を読み込んでから、
  // common-1.1.js のデフォルト #btn_print ハンドラを解除して差し替える
  $.getScript("/js/react/dist/orderLayoutSelectorDialog.js", function () {
    $("#btn_print")
      .off("click")
      .on("click", function () {
        bulkPrint(
          "orders",
          "order",
          "Order",
          window.orderLayoutSelectorDialog,
          this,
          ".checkbox-item-print:checked"
        );
      });
  });
});
