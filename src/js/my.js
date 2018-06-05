
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    // this.bindEvent();
    Controller.isLogin(() => {
      // this.rOrderDetail();
    }, () => {
      window.location.href = '/login.html';
    });
  }

  init() {}

  bindEvent() {
    const _this = this;

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
