
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    // this.bindEvent();
  }

  init() {
    this.token = Controller.getCookie('token');
    if (this.token == '') {
      window.location.href= './login.html';
      return;
    }
    this.rOrder();
  }

  bindEvent() {
    const _this = this;


  }

  // 获取订单列表
  rOrder() {
    let param = {
      page: '',
      perpage: '',
      id: '',
      token: this.token,
    };
    Controller.ajax({
      url: '/order/list',
      type: 'POST',
      data: param,
    }, (res) => {
      // this.renderOrder();
    });
  }

  // 渲染订单列表
  renderOrder() {
    let itemHTML = '';
    for (let i in this.arrSort) {
      let item = this.arrSort[i];
      itemHTML += `<li data-sortid="${i}" id="sort_${i}"><p>${item.name}</p></li>`;
    }
    $("#sortBox").html(itemHTML);
    // setTimeout(() => {
    //   this.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
    // }, 200);
  }


}

new Page();
