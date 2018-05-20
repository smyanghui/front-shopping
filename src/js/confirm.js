
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    // this.init();
    // this.bindEvent();
  }

  init() {

    // this.getItems();
    // this.iScrollMenu = new IScroll('#iScrollDetail', { disableMouse: true, click: true, tap: true });
  }

  bindEvent() {
    const _this = this;


  }

  // 获取商品数据
  getItems() {
    Controller.ajax({
      url: '/index/goods',
      type: 'POST',
    }, (res) => {
      const listArr = res.data.goods || [];
      for (let i in listArr) {
        const items = listArr[i].items || [];
        if (items.length == 0) continue;
        this.arrSort[listArr[i].category_id] = {name: listArr[i].category_name};
        let arrItem = [];
        for (let j in items) {
          let itemsArr = items[j];
          arrItem.push({
            itemId: 23,
            name: itemsArr.goods_name,
            num: 0,
            imgUrl: '/src/images/item.png', // itemsArr.goods_logo
            text: '送蜡烛10支，每个账号限买一个', // itemsArr.goods_desc
            price: itemsArr.goods_price,
          });
        }
        this.arrItem[listArr[i].category_id] = arrItem;
      }

      this.renderSort();

      // setTimeout()

      // this.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
      // this.iScrollItem = new IScroll('#iScrollItem', { disableMouse: true, click: true, tap: true });

      
    });
  }

  // 渲染分类
  renderSort() {
    let itemHTML = '';
    for (let i in this.arrSort) {
      let item = this.arrSort[i];
      itemHTML += `<li data-sortid="${i}" id="sort_${i}"><p>${item.name}</p></li>`;
    }
    $("#sortBox").html(itemHTML);
  }


}

new Page();
