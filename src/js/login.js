
import Validata from './utils/validate';
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
  }

  init() {
    this.isSending = false;
  }

  bindEvent() {
    let _this = this;
    // 发送短信验证码
    $("#smsYzm").click( () => this.sendSms() );
    // 登录提交
    $("#submitLogin").click( () => this.submitLogin() );
  }

  // 发送短信验证码
  sendSms() {
    if (this.isSending) return;
    const telNum = this.checkMobile();
    if (!telNum) return;
    let params = {
      mobile: telNum,
      system_id: 1,
      business_id: '10002',
      token: '',
    };
    Controller.ajax({
      url: '/sms/send',
      type: 'POST',
      cache: false,
      data: params
    }, (res) => {
      this.isSending = true;
      // 倒计时
      let secondNum = 5;
      let downTime = null;
      downTime = setInterval(() => {
        if (secondNum <= 0) {
          this.isSending = false;
          clearInterval(downTime);
          return;
        }
        secondNum--;
        let smsHtml = secondNum <= 0 ? '重新发送' : secondNum +'秒后重新发送';
        $("#smsYzm").text(smsHtml);
      }, 1000);
    });
  }

  // 校验手机号码
  checkMobile() {
    const telNum = $.trim($("#loginTelNum").val());
    if (Validata.isBlank(telNum)) {
      Controller.showMessage("手机号码不能为空！");
      return false;
    }
    if (!Validata.isMobile(telNum)) {
      Controller.showMessage("手机号码格式不正确！");
      return false;
    }
    return telNum;
  }

  // 登录
  submitLogin() {
    const telNum = this.checkMobile();
    if (!telNum) return;
    const smsYzm = $.trim($("#loginSmsYzm").val());
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
      data: params
    }, (res) => {
      Controller.setCookie('token', res.data.token || '');
      window.history.go(-1);
    });
  }

}

new Page();
