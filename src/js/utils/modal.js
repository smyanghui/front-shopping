import $ from 'jquery';

// 弹窗提示
class Tips {

  constructor() {
    this.createHtml();
  }

  createHtml() {
    this.curTips = $('<div class="ui-message">');
    this.curTips.appendTo('body');
    this.curTips.on('click', () => this.curTips.hide() );
    this.timeTips = null;
  }

  show(msg, msgType) {

    let contentBox = $('<div class="message-box">');

    // 错误/成功提示
    let tipsIcon = !!msgType ? 'icon-success' : 'icon-error';
    let contentHtml = `<span class="tips-box"><i class="iconfont ${tipsIcon}"></i> ${msg}</span>`;
    clearTimeout(this.timeTips);
    this.timeTips = setTimeout(() => { this.curTips.hide() }, 3000);

    // 显示输出
    contentBox.append(contentHtml);
    this.curTips.html(contentBox).show();

  }

  hide() {
    this.curTips.hide();
  }

}



// loading加载
class Loading {

  constructor() {
    this.createHtml();
  }

  createHtml() {
    this.loadingBox = $('<div class="ui-loading">');
    this.loadingBox.appendTo('body');
  }

  show() { this.loadingBox.show(); }

  hide() { this.loadingBox.hide(); }

}


export { Tips, Loading };
