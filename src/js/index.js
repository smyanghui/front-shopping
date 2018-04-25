
class Index {

  constructor() {
    this.init();
    this.bindEvent();
  }

  init() {
    this.arrItem = [
      {
        code: 'xiangcai',
        name: '湘菜',
        list:[
          {
            imgUrl: 'adfasdf',
            name: 'adf',
            text: 'asdfasdf',
          }
        ]
      },
    ];
    // this.renderItem();
    this.listScroll = new IScroll('#iScrollItem');
  }

  bindEvent() {

    $("#viewCart").click(function(){
      $("#pageMask, #cartBox").show();
    });

    // 点击空白隐藏购物车
    $("#pageMask").click(function(){
      $(this).hide();
      $("#cartBox").hide();
    });

  }

  // 渲染商品
  renderItem() {

    let sortHTML = '';
    let itemHTML = '';
    for (let i in this.arrItem) {
      let items = this.arrItem[i];
      sortHTML += `<li id="${items.code}"><p>${items.name}</p></li>`;

      let listHTML = '<ul>';
      for (let j in items.list) {
        let list = items.list[j];
        listHTML += `<li>${list.name}</li>`;
      }
      listHTML += '</ul>';
      itemHTML += listHTML;
    }

    console.log(sortHTML, itemHTML);
  }

}

new Index();
