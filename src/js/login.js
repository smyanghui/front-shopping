
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

    const GOLOGIN = $("#goLogin");
    const GOREG = $("#goReg");
    const REGBOX = $("#regBox");
    const LOGINBOX = $("#loginBox");

    // 去登录
    GOLOGIN.click( () => { REGBOX.hide(); LOGINBOX.show(); });

    // 去注册
    GOREG.click( () => { LOGINBOX.hide(); REGBOX.show(); });

    // 注册提交
    $("#submitReg").click( () => this.submitReg() );

    // 登录提交
    $("#submitLogin").click( () => this.submitLogin() );

  }

  // 注册
  submitReg() {
    
    const telNum = $.trim($("#regTelNum").val());
    const smsYzm = $.trim($("#regSmsYzm").val());

    // 验证手机号码
    if (Validata.isBlank(telNum)) {
      return Controller.showMessage("手机号码不能为空！");
    }
    if (!Validata.isMobile(telNum)) {
      return Controller.showMessage("手机号码格式不正确！");
    }
    if (Validata.isBlank(smsYzm)) {
      return Controller.showMessage("请输入验证码！");
    }

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


  // 登录
  submitLogin() {
    
    const telNum = $.trim($("#loginTelNum").val());
    const smsYzm = $.trim($("#loginSmsYzm").val());

    // 验证手机号码
    if (Validata.isBlank(telNum)) {
      return Controller.showMessage("手机号码不能为空！");
    }
    if (!Validata.isMobile(telNum)) {
      return Controller.showMessage("手机号码格式不正确！");
    }
    if (Validata.isBlank(smsYzm)) {
      return Controller.showMessage("请输入验证码！");
    }

    let params = {
      account: telNum,
      login_type: 2,
      pwd: smsYzm,
    };

    Controller.ajax({
      url: '/login/mobile',
      type: 'POST',
      // cache: false,
      data: params
    }, (res) => {
      console.log(res);
    });

  }

}

new Page();
