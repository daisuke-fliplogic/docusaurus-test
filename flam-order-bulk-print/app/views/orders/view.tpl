{* 受注一覧 - app/views/orders/view.tpl *}
{include file='common/header.tpl'}

<div id="contents" class="orders-view">
  <h1 class="page-title">受注一覧</h1>

  {* 検索条件 *}
  <div class="search-box">
    <form id="search_form" method="get" action="/orders/view">
      <input type="text" name="keyword" value="{$keyword|escape}" placeholder="顧客名・件名で検索" />
      <select name="status">
        <option value="">すべて</option>
        {foreach from=$statusList key=cd item=label}
          <option value="{$cd}"{if $status == $cd} selected{/if}>{$label|escape}</option>
        {/foreach}
      </select>
      <button type="submit" class="btn btn-search">検索</button>
    </form>
  </div>

  {* 一括操作ボタン *}
  <div class="bulk-actions">
    <button type="button" id="btn_bulk_copy" class="btn">一括引当</button>
    <button type="button" id="btn_bulk_create" class="btn">一括発注</button>
    <button type="button" id="btn_print" class="btn">注文請書印刷</button>
    <button type="button" id="btn_download" class="btn">CSVダウンロード</button>
  </div>

  {* 受注明細テーブル（一括印刷のため form で囲む） *}
  <form id="orders">
  <table id="order_list" class="list-table">
    <thead>
      <tr>
        <th class="col-print">
          印刷<br />
          <input type="checkbox" id="select_all_print" />
        </th>
        <th class="col-copy">
          引当<br />
          <input type="checkbox" id="select_all_bulk_copy" />
        </th>
        <th class="col-create">
          発注<br />
          <input type="checkbox" id="select_all_bulk_create" />
        </th>
        <th>受注番号</th>
        <th>受注日</th>
        <th>顧客名</th>
        <th>件名</th>
        <th class="col-amount">金額</th>
        <th>ステータス</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      {foreach from=$orders item=order}
        <tr data-order-id="{$order.Order.id}">
          <td class="col-print">
            <input type="checkbox" class="checkbox-item-print" name="print_ids[]" value="{$order.Order.id}" />
          </td>
          <td class="col-copy">
            <input type="checkbox" class="checkbox-item" name="copy_ids[]" value="{$order.Order.id}" />
          </td>
          <td class="col-create">
            <input type="checkbox" class="checkbox-item-bulkcreate" name="create_ids[]" value="{$order.Order.id}" />
          </td>
          <td>{$order.Order.order_no|escape}</td>
          <td>{$order.Order.order_date|date_format:"%Y/%m/%d"}</td>
          <td>{$order.Customer.name|escape}</td>
          <td>{$order.Order.subject|escape}</td>
          <td class="col-amount">{$order.Order.total_amount|number_format}円</td>
          <td>{$statusList[$order.Order.status]|escape}</td>
          <td>
            <a href="/orders/detail/{$order.Order.id}" class="btn btn-sm">詳細</a>
          </td>
        </tr>
      {foreachelse}
        <tr>
          <td colspan="10" class="no-data">受注データがありません。</td>
        </tr>
      {/foreach}
    </tbody>
  </table>
  </form>

  {include file='common/pagination.tpl'}
</div>

{include file='common/footer.tpl'}
