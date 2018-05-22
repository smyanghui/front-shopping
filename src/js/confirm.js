
import Controller from './utils/controller';
import Validate from './utils/validate';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
  }

  init() {
    this.token = window.TOKEN;

  }

  bindEvent() {
    const _this = this;
    $("#orderSubmit").click(() => this.orderSubmit());
  }

  // 获取订单详情
  rOrder() {
    Controller.ajax({
      url: '/order/view',
      type: 'GET',
    }, (res) => {
      this.renderOrder(res.result);
    });
  }

  // 提交订单
  orderSubmit() {
    let param = this.checkData;
    if (!param) return;
    Controller.ajax({
      url: '/order/add',
      type: 'POST',
      data: param,
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
    return {
      token: this.token,
      cart_ids: '',
      receiver_name: receiverName,
      receiver_mobile: receiverMobile,
      receiver_address: receiverAddress,
      receiver_zip: '', // 邮编
      beizhu: remarks, // 客户备注
      wallet_price: '', // 选择余额支付金额
      pay_type: '', // 支付方式
      is_invoice: '', // 是否需要发票
      invoice_info: '' // 发票信息
    }
  }

  // 初始化订单信息
  renderOrder() {
    let itemHTML = '';
    for (let i in this.arrSort) {
      let item = this.arrSort[i];
      itemHTML += `<li data-sortid="${i}" id="sort_${i}"><p>${item.name}</p></li>`;
    }
    $("#sortBox").html(itemHTML);
  }


}

new Page();
