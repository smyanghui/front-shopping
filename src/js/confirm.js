
import Controller from './utils/controller';
import Validate from './utils/validate';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
    Controller.isLogin(() => {
      this.rCart();
      this.rUser();
    });
  }

  init() {}

  bindEvent() {
    const _this = this;
    $("#orderSubmit").click(() => this.orderSubmit());
  }

  // 获取购物车确认数据
  rCart() {
    Controller.ajax({
      url: '/cart/list',
      type: 'POST',
      data: {
        token: window.Token,
        shopid: '',
        is_check: 1,
      },
    }, (res) => {
      this.renderItem(res.data || {});
    });
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
      this.renderUser(res.data || {});
    });
  }

  // 提交订单
  orderSubmit() {
    let param = this.checkData();
    if (!param) return;
    Controller.ajax({
      url: '/order/add',
      type: 'POST',
      data: param,
    }, (res) => {
      window.location.href = './order.html';
      // this.rPay(res.data.id, param.pay_type);
    });
  }

  // 去支付
  rPay(id, ptype) {
    Controller.ajax({
      url: '/pay/index',
      type: 'POST',
      data: {token: window.Token, orderid: id, pay_type: ptype},
    }, (res) => {
      console.log(res);
    });
  }

  // 数据验证
  checkData() {
    const receiverName = $("#receiverName").val();
    if (Validate.isBlank(receiverName)) {
      Controller.showMessage("收货人姓名不能为空！");
      return false;
    }
    if (!Validate.isName(receiverName)) {
      Controller.showMessage("收货人姓名格式不正确！");
      return false;
    }
    const receiverMobile = $("#receiverMobile").val();
    if (Validate.isBlank(receiverMobile)) {
      Controller.showMessage("收货人手机号码不能为空！");
      return false;
    }
    if (!Validate.isMobile(receiverMobile)) {
      Controller.showMessage("收货人手机号码格式不正确！");
      return false;
    }
    const receiverAddress = $("#receiverAddress").val();
    if (Validate.isBlank(receiverAddress)) {
      Controller.showMessage("收货人地址不能为空！");
      return false;
    }
    const remarks = $("#remarks").val();
    const payType = $("#payType").val();
    return {
      token: window.Token,
      cart_ids: this.cartIds.join(','),
      receiver_name: receiverName,
      receiver_mobile: receiverMobile,
      receiver_address: receiverAddress,
      receiver_zip: '', // 邮编
      beizhu: remarks, // 客户备注
      wallet_price: '', // 选择余额支付金额
      pay_type: payType, // 支付方式
      is_invoice: '', // 是否需要发票
      invoice_info: '' // 发票信息
    }
  }

  // 初始化商品信息
  renderItem(data) {
    let itemHTML = '';
    this.cartIds = [];
    for (let i in data.items) {
      let item = data.items[i];
      this.cartIds.push(item.id);
      let price = Controller.formatMoney(item.goods_price);
      itemHTML += `<li>
        <p class="item_img"><img src="${item.goods_logo}" /></p>
        <div class="item_text">
          <p class="item_name">${item.goods_name}</p>
          <p class="item_sm">${item.cart_num}</p>
        </div>
        <p class="item_num">x${item.cart_num}</p>
        <p class="item_price"><i>￥</i>${price}</p>
      </li>`;
    }
    $("#itemList").html(itemHTML);
    let totalPrice = Controller.formatMoney(data.total_pirce);
    $("#itemTotal").html(`总计：<i>￥</i>${totalPrice}`);
    $("#orderPrice").html(`<i>￥</i>${totalPrice}`);
  }

  // 初始化用户信息
  renderUser(data) {
    if (data.nickname) $("#receiverName").val(data.nickname);
    if (data.mobile) $("#receiverMobile").val(data.mobile);
  }

}

new Page();
