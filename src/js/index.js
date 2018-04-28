
class Index {

  constructor() {
    this.init();
    this.bindEvent();
  }

  init() {
    this.arrItem = {
      11: {
        code: 'xiangcai',
        name: '湘菜',
        num: 0,
        list:[
          {
            imgUrl: 'adfasdf',
            name: 'adf',
            text: 'asdfasdf',
          }
        ]
      },
    };
    this.arrCart = {
      11: {num: 2},
      12: {num: 1},
      13: null,
    };
    // this.renderItem();
    this.listScroll = new IScroll('#iScrollItem');
  }

  bindEvent() {
    const _this = this;

    $("#viewCart").click(function(){
      $("#pageMask, #cartBox").show();
    });

    // 点击空白隐藏购物车
    $("#pageMask").click(function(){
      $(this).hide();
      $("#cartBox").hide();
    });

    // 移入/移出商品
    $(".J_item_choice i").click(function(){
      const isAdd = $(this).hasClass("icon-add");
      const curId = $(this).closest('li').data('itemid');
      _this.changeCart(curId, isAdd);
    });

    // 修改购物车数量
    $(".J_cart_choice i").click(function(){
      const isAdd = $(this).hasClass("icon-add");
      const curId = $(this).closest('li').data('itemid');
      _this.updateCart(curId, isAdd);
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

  // 移入/移出购物车
  changeCart(cid, isadd) {
    let curNum = parseInt(this.arrItem[cid].num);
    let resNum = isadd ? ++curNum : --curNum;

    this.arrItem[cid].num = resNum;
    // 更新加入购物车
    let arrCart = this.arrCart;
    if (arrCart[cid]) {
      if (resNum > 0) {
        arrCart[cid].num = resNum;
      } else {
        arrCart[cid] = null;
      }
    } else {
      if (resNum > 0) arrCart[cid] = this.arrItem[cid];
    }

    $("#item_"+ cid).find("strong").text(resNum);

//   window.sessionStorage['aa'] = aa;
//   window.sessionStorage['cartArr'] = cartArr;
  }

  // 修改购物车
  updateCart(cid, isadd) {
    let curNum = parseInt(this.arrCart[cid].num);
    let resNum = isadd ? ++curNum : --curNum;

    this.arrCart[cid].num = resNum;
    //= this.arrItem[cid].num

    $("#cart_"+ cid).find("strong").text(resNum);

    //   
//   arra[curId].num = resNum;
//   $("#id").find('b').text();
  }

}


new Index();
