
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
  }

  init() {

    // this.getItems();
    this.iScrollMenu = new IScroll('#iScrollDetail', { disableMouse: true, click: true, tap: true });
  }

  bindEvent() {
    const _this = this;


  }

}

new Page();
