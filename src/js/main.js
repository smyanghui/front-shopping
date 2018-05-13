
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
  }

  init() {
    this.menuTop = [
      ['选蛋糕', '/index.html'],
      ['我的订单', '/order.html'],
      ['商家详情', '/detail.html'],
    ];
    this.renderHeader();
  }

  bindEvent() {
    const _this = this;
  }

  // 获取商品数据
  getItems() {
    Controller.ajax({
      url: '/index/goods',
      type: 'POST',
    }, (res) => {
        //aa
    });
  }

  // 渲染顶部导航
  renderHeader() {
    let headerHTML = '';
    for (let i in this.menuTop) {
      const menu = this.menuTop[i];
      const isCurUrl = window.location.pathname == menu[1];
      headerHTML += `<li${isCurUrl ? ' class="cur"' : ''}><a href="${isCurUrl ? 'javascript:;': menu[1]}">${menu[0]}</a></li>`;
    }
    $("#headerBox").html(headerHTML);
  }


}

new Page();
