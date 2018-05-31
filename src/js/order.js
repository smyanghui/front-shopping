
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    // this.bindEvent();
    Controller.isLogin(() => {
      this.rOrder();
    }, () => {
      window.location.href = '/login.html';
    });
  }

  init() {}

  bindEvent() {
    const _this = this;

  }

  // 获取订单列表
  rOrder() {
    Controller.ajax({
      url: '/order/list',
      type: 'POST',
      data: {token: window.Token},
    }, (res) => {
      this.renderOrder(res.data);
    });
  }

  // 渲染订单列表
  renderOrder(data) {
    let orderHTML = '';
    for (let i in data.items) {
      let order = data.items[i];
      orderHTML += `<ul>
        <li><span>订单号：</span>${order.orderno}</li>
        <li><span>订单状态：</span><i class="end">订单已完成</i></li>
        <li><span>下单时间：</span>2018-05-01 12:01:01</li>
        <li><span>提货时间：</span>2018-05-01 13:01:01</li>
        <li><span>结算金额：</span><i class="price">￥${order.wallet_price}</i></li>
      </ul>`;
    }
    $("#orderList").html(orderHTML);
    setTimeout(() => {
      new IScroll('#iScrollOrder', { disableMouse: true, click: true, tap: true });
    }, 200);
  }


}

new Page();
