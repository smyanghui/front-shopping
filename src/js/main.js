
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
  }

  init() {
    this.menuTop = [
      {num: '10', text: '选蛋糕', url: '/index.html'},
      {num: '11', text: '我的订单', url: '/order.html'},
      {num: '12', text: '商家详情', url: '/detail.html'},
    ];
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
      headerHTML += `<li><a href="${menu.url}"${menu.num == num ? ' class="cur"' : ''}>${menu.text}</a></li>`;
    }
    $("#headerBox").html(headerHTML);
  }


}

new Page();
