
class Index {

  constructor() {
    this.init();
    this.bindEvent();
  }

  init() {

    // 分类数据
    this.arrSort = {
      11: {name: '优惠'},
      12: {name: '招牌'},
      13: {name: '吃货最爱'},
      14: {name: '卡通生日蛋糕'},
    };

    // 商品数据
    this.arrItem = {
      11: {
        name: '精品生日水果蛋糕11',
        num: 0,
        imgUrl: '/src/images/item.png',
        text: '送蜡烛10支，每个账号限买一个',
        price: '100.00',
      },
      12: {
        name: '精品生日水果蛋糕12',
        num: 0,
        imgUrl: '/src/images/item.png',
        text: '送蜡烛10支，每个账号限买一个',
        price: '100.00',
      },
      13: {
        name: '精品生日水果蛋糕13',
        num: 0,
        imgUrl: '/src/images/item.png',
        text: '送蜡烛10支，每个账号限买一个',
        price: '100.00',
      },
    };

    // 购物车数据
    this.arrCart = {
      11: null,
      12: null,
      13: null,
    };

    this.renderSort();
    this.renderItem();
    this.renderCart();
    this.listScroll = new IScroll('#iScrollItem');
  }

  bindEvent() {
    const _this = this;

    $("#viewCart").click(function(){
      _this.renderCart();
      $("#cartMask").show();
      $("#cartOutBox").css("bottom", 45);
    });

    // 点击空白隐藏购物车
    $("#cartMask").click(function(e){
      $(this).hide();
      $("#cartOutBox").css("bottom", '-80%');
    });

    // 移入/移出商品
    $(".J_item_choice i").click(function(){
      const isAdd = $(this).hasClass("icon-add");
      const curId = $(this).closest('li').data('itemid');
      _this.changeCart(curId, isAdd);
    });

    // 修改购物车数量
    $("#cartItemBox").on('click', '.J_cart_choice i', function(){
      const isAdd = $(this).hasClass("icon-add");
      const curId = $(this).closest('li').data('itemid');
      _this.updateCart(curId, isAdd);
    });

    // 清空购物车
    $("#cleanCart").click( () => {
      for (let i in this.arrCart) {
        if (this.arrItem[i].num == 0) continue;
        this.arrItem[i].num = 0;
        $("#item_"+ i).find("strong").text('0');
      }
      this.arrCart = {};
      this.renderCart();
    })

  }

  // 渲染商品
  renderSort() {
    let itemHTML = '';
    for (let i in this.arrSort) {
      let item = this.arrSort[i];
      itemHTML += `<li id="sort_${i}"><p>${item.name}</p></li>`;
    }
    $("#sortBox").html(itemHTML);
  }

  // 渲染商品
  renderItem() {
    let itemHTML = '';
    for (let i in this.arrItem) {
      let item = this.arrItem[i];
      itemHTML += `<li id="item_${i}" data-itemid="${i}">
        <p class="image_box"><img src="${item.imgUrl}" /></p>
        <div class="text_box">
          <a href="detail.html" class="item_tit">${item.name}</a>
          <div class="item_remark">
            <p>${item.text}</p>
          </div>
          <div class="price_box">
            <p class="item_price">￥${item.price}</p>
            <p class="item_choice J_item_choice">
              <i class="iconfont icon-minus"></i>
              <strong>${item.num}</strong>
              <i class="iconfont icon-add"></i>
            </p>
          </div>
        </div>
      </li>`;
    }
    $("#itemBox").html(itemHTML);
  }

  // 渲染购物车
  renderCart() {
    let itemHTML = '';
    for (let i in this.arrCart) {
      let item = this.arrCart[i];
      if (!item) continue;
      itemHTML += `<li id="cart_${i}" data-itemid="${i}">
        <div class="cart_item">
            <p class="cart_item_tit">${item.name}</p>
            <p class="cart_item_sm">${item.price}</p>
        </div>
        <div class="cart_choice J_cart_choice">
          <i class="iconfont icon-minus"></i>
          <strong>${item.num}</strong>
          <i class="iconfont icon-add"></i>
        </div>
      </li>`;
    }
    if (itemHTML == '') itemHTML = '<li>空空如也！</li>';
    $("#cartItemBox").html(itemHTML);
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
    this.saveSession();
    $("#item_"+ cid).find("strong").text(resNum);
  }

  // 修改购物车
  updateCart(cid, isadd) {
    let curNum = parseInt(this.arrCart[cid].num);
    let resNum = isadd ? ++curNum : --curNum;
    this.arrCart[cid].num = this.arrItem[cid].num = resNum;
    this.saveSession();
    $("#cart_"+ cid +", #item_"+ cid).find("strong").text(resNum);
  }

  // 暂存数据
  saveSession() {
    sessionStorage.arrItem = this.arrItem;
    sessionStorage.arrCart = this.arrCart;
    // $.isEmptyObject(aa); 判断是否为空对象
  }

}


new Index();
