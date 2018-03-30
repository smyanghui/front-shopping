import $ from 'jquery';

// 弹层提示信息
class Tips {

  constructor() {
    this.createHtml();
  }

  createHtml(){
    this.curTips = $('<div class="ui_tips">');
    this.tipsBox = $('<div class="ui_tips_box">'); // flex方便居中
    this.curTips.appendTo('body');
    this.tipsBox.appendTo(this.curTips);
    this.timeTips = null;
  }

  show(msg, mType, t){

    // 提示内容
    let contentBox = $('<div class="ui_tips_content">');

    // 关闭按钮
    // let closeBtn = $('<i class="mask-close">');
    // contentBox.append(closeBtn);
    // closeBtn.on('click', () => { this.curTips.hide(); });

    //

    // 默认警告
    let iconType = '<i class="iconfont icon-browser"></i>';

    // 错误提示
    if (mType == 'wrong') iconType = '<i class="iconfont icon-browser"></i>';

    // 成功提示
    if (mType == 'success') iconType = '<i class="iconfont icon-browser"></i>';

    let contentHtml = `<p class="ui_tips_txt">${iconType}${msg}</p>`;
    // if (msgType) {

    //   contentHtml += '<p class="aa"></p>';

    // } else {

    //   contentHtml += '<p class="tips-icon icon3"></p>';

      // 不显示关闭按钮
      // closeBtn.hide();

    // 倒计时关闭和点击空白关闭
    clearTimeout(this.timeTips);
    this.timeTips = setTimeout(() => { this.curTips.hide(); }, t * 1000);
    this.curTips.on('click', () => { this.curTips.hide(); });
      
    //}


    // 显示输出
    contentBox.html(contentHtml);
    this.tipsBox.html(contentBox);
    this.curTips.show();

  }

  hide(){
    this.curTips.hide();
  }

}

export default new Tips();
