
class Page {

  constructor() {
    this.init();
    this.bindEvent();
  }

  init() {
    this.arrItem = '';
    // this.renderItem();
  }

  bindEvent() {

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

  }

  // 渲染商品
  renderItem() {

  }

}

new Page();
