/**
 * 売上一覧 レイアウト選択ダイアログ ラッパー
 * app/webroot/js/react/src/SaleLayoutSelectorDialogWrapper.tsx
 *
 * jQuery 側の bulkPrint() から window.saleLayoutSelectorDialog.open() で呼び出される。
 * components/LayoutSelectorDialog と theme は同ディレクトリの既存資産（本フィクスチャでは省略）。
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import LayoutSelectorDialog from "./components/LayoutSelectorDialog";

type SelectCallback = (layoutId: number) => void;

interface WrapperState {
  open: boolean;
  reportGroupCd: string;
  onSelect: SelectCallback | null;
}

class SaleLayoutSelectorDialogWrapper {
  private mountNode: HTMLElement;
  private state: WrapperState = {
    open: false,
    reportGroupCd: "sale",
    onSelect: null,
  };

  constructor() {
    this.mountNode = document.createElement("div");
    this.mountNode.id = "sale-layout-selector-dialog-root";
    document.body.appendChild(this.mountNode);
    this.render();
  }

  /** jQuery 側から呼ばれるエントリポイント */
  public open(reportGroupCd: string, onSelect: SelectCallback): void {
    this.state = { open: true, reportGroupCd: reportGroupCd || "sale", onSelect };
    this.render();
  }

  private close = (): void => {
    this.state = { ...this.state, open: false, onSelect: null };
    this.render();
  };

  private handleSelect = (layoutId: number): void => {
    const cb = this.state.onSelect;
    this.close();
    if (cb) {
      cb(layoutId);
    }
  };

  private render(): void {
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <LayoutSelectorDialog
          open={this.state.open}
          reportGroupCd={this.state.reportGroupCd}
          onSelect={this.handleSelect}
          onClose={this.close}
        />
      </MuiThemeProvider>,
      this.mountNode
    );
  }
}

declare global {
  interface Window {
    saleLayoutSelectorDialog: SaleLayoutSelectorDialogWrapper;
  }
}

window.saleLayoutSelectorDialog = new SaleLayoutSelectorDialogWrapper();

export default SaleLayoutSelectorDialogWrapper;
