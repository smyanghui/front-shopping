
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
