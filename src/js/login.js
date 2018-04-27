
import Validata from './utils/validate';
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
  }

  init() {
    this.arrItem = '';
    // this.renderItem();
  }

  bindEvent() {

    let _this = this;

    // 去登录
    $("#goLogin").click(function(){
      $("#regBox").hide();
      $("#loginBox").show();
    });

    // 去注册
    $("#goReg").click(function(){
      $("#loginBox").hide();
      $("#regBox").show();
    });

    // 注册提交
    $("#submitReg").click(function(){
      _this.submitReg();
    });

  }

  // 注册
  submitReg() {
    
    let telNum = $("#telNum").val();
    let smsYzm = $("#smsYzm").val();

    let params = {
      account: telNum,
      sms_yzm: smsYzm,
    };

    Controller.ajax({
      url: '/reg/mobile',
      type: 'POST',
      // cache: false,
      data: params
    }, (res) => {
      console.log(res);
    });

  }

}

new Page();
