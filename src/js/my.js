
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    // this.bindEvent();
  }

  init() {
    Controller.isLogin(() => {
      this.rUser();
    }, () => {
      window.location.href = '/login.html';
    });
    setTimeout(() => {
      new IScroll('#iScrollMy', { disableMouse: true, click: true, tap: true });
    }, 200);
  }

  bindEvent() {
    const _this = this;
  }


  // 获取用户信息
  rUser() {
    Controller.ajax({
      url: '/user/info',
      type: 'POST',
      data: {
        token: window.Token
      },
    }, (res) => {
      console.log(res.data);
      // $("#userName").val(data.nickname);
    });
  }

  // 获取订单列表
  rOrderDetail() {
    Controller.ajax({
      url: '/order/list',
      type: 'POST',
      data: {token: window.Token},
    }, (res) => {
      this.renderOrder(res.data);
    });
  }


}

new Page();
