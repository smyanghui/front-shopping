
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    // this.bindEvent();
  }

  init() {
    this.menuTop = [
      ['选蛋糕', '/index.html'],
      ['我的订单', '/order.html'],
      ['商家详情', '/seller.html'],
    ];
    this.renderHeader();
    this.isLogin();
  }

  bindEvent() {
    const _this = this;
  }

  // 检查是否登录
  isLogin() {
    window.TOKEN = Controller.getCookie('token');
    if (TOKEN == '') return;
    Controller.ajax({
      url: `/check/token?token=${TOKEN}`,
      type: 'GET',
    }, (res) => {
      if (res.data.islogin == 0) window.TOKEN = '';
    });
  }

  // 渲染顶部导航
  renderHeader() {
    let headerHTML = '';
    let pathName = window.location.pathname;
    pathName = pathName == '/' ? '/index.html' : pathName
    for (let i in this.menuTop) {
      const menu = this.menuTop[i];
      const isCurUrl = pathName == menu[1];
      headerHTML += `<li${isCurUrl ? ' class="cur"' : ''}><a href="${isCurUrl ? 'javascript:;': menu[1]}">${menu[0]}</a></li>`;
    }
    $("#headerBox").html(headerHTML);
  }


}

new Page();
