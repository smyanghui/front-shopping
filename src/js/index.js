
import Controller from './utils/controller';

class Page extends Controller {

  constructor() {
    super();
    this.init();
    this.bindEvent();
  }

  init() {
    this.token = window.TOKEN;

    // 分类数据
    this.arrSort = {
      11: {name: '优惠'},
      12: {name: '招牌'},
      13: {name: '吃货最爱'},
      14: {name: '卡通生日蛋糕'},
      21: {name: '优惠'},
      22: {name: '招牌'},
      23: {name: '吃货最爱'},
      24: {name: '卡通生日蛋糕'},
      31: {name: '优惠'},
      32: {name: '招牌'},
      33: {name: '吃货最爱'},
      34: {name: '卡通生日蛋糕'},
    };

    // 商品数据
    this.arrItem = {
      11: [
        {
          itemId: 12,
          name: '精品生日水果蛋糕12',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: [],
        },
        {
          itemId: 13,
          name: '精品生日水果蛋糕13',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 1,
          spec: [{
            "spec_group_id": 11,
            "spec_group_name": "尺寸",
            "spec_group_beizhu": "蛋糕尺寸",
            "spec_group_list": [
              {"spec_id": "13", "spec_name": "8寸"},
              {"spec_id": "12", "spec_name": "6寸"},
              {"spec_id": "14", "spec_name": "10寸"},
              {"spec_id": "15", "spec_name": "12寸"}
            ]
          }],
          group: {
            13: {"skuid": 1, "price": 112},
            12: {"skuid": 1, "price": 113},
            14: {"skuid": 1, "price": 116},
          },
        },
      ],
      21: [
        {
          itemId: 22,
          name: '精品生日水果蛋糕22',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: [],
        },
        {
          itemId: 23,
          name: '精品生日水果蛋糕23',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: [],
        },
      ],
      31: [
        {
          itemId: 32,
          name: '精品生日水果蛋糕32',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: [],
        },
        {
          itemId: 33,
          name: '精品生日水果蛋糕33',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: [],
        },
      ],
    };

    // 购物车数据
    this.arrCart = {};

    // 当前规格商品
    this.curSpec = null;

    // 初始化数据
    if (sessionStorage.arrItem) {
      this.arrSort = JSON.parse(sessionStorage.arrSort) || {};
      this.arrItem = JSON.parse(sessionStorage.arrItem) || {};
      this.arrCart = JSON.parse(sessionStorage.arrCart) || {};
      this.renderSort();
      this.renderItem();
    } else {
      this.rItems();
    }
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

    // 滚动
    $("#iScrollSort").on('click', 'li', function(){
      const sid = $(this).data("sortid");
      _this.iScrollItem.scrollToElement("#itemarr_"+ sid, 500);
    });

    // 加减商品
    $("#iScrollItem").on('click', ".J_item_choice i", function(){
      const isAdd = $(this).hasClass("icon-add");
      const curLi = $(this).closest('li');
      _this.changeCart(curLi.data('sortid'), curLi.data('itemid'), isAdd);
    });

    // 打开选规格
    $("#iScrollItem").on('click', ".J_item_choice span", function(){
      const curLi = $(this).closest('li');
      _this.openSpec(curLi.data('sortid'), curLi.data('itemid'));
    });

    // 选择规格
    $("#choiceSpec").on('click', ".J_spec_choice span", function(){
      if ($(this).hasClass("cur")) return;
      $(this).addClass('cur').siblings('span').removeClass();
      // 渲染规格商品价格
      let price = $(this).data('specprice');
      $("#choiceSpecPrice").html(`<i>￥</i>${price}`);
      _this.curSpec['choiceId'] = $(this).data('specid');
    });

    // 确认选择规格
    $("#choiceSpecOK").click(() => this.choiceSpecSave());

    // 修改购物车数量
    $("#cartItemBox").on('click', '.J_cart_choice i', function(){
      const isAdd = $(this).hasClass("icon-add");
      const curLi = $(this).closest('li');
      _this.updateCart(curLi.data('sortid'), curLi.data('itemid'), isAdd);
    });

    // 清空购物车
    $("#cleanCart").click(() => this.cleanCart());

  }

  // 获取商品数据
  rItems() {
    Controller.ajax({
      url: '/index/goods',
      type: 'GET',
    }, (res) => {
      const listArr = res.data.goods || [];
      this.formatItems(listArr);
    });
  }

  // 获取购物车数据
  rCart() {
    let param = {
      token: TOKEN,
      shopid: '',
      is_check: '',
    };
    Controller.ajax({
      url: '/cart/list',
      type: 'POST',
      data: param,
    }, (res) => {
      this.renderCart();
    });
  }

  // 格式化数据
  formatItems(listArr) {
    for (let i in listArr) {
      const items = listArr[i].items || [];
      if (items.length == 0) continue;
      this.arrSort[listArr[i].category_id] = {name: listArr[i].category_name};
      let arrItem = [];
      for (let j in items) {
        let itemsList = items[j];
        // if (itemsList.is_spec == 1) {
        //   for (let k in itemsList.goods_spec_data) {
        //     let specData = itemsList.goods_spec_data[k];
        //     let specItems = [];
        //     for (let l in specData.spec_group_items) {
        //       let sItem = specData.spec_group_items[l];
        //       specItems.push({id: sItem.spec_id, name: sItem.spec_name, price: sItem.goods_price})
        //     }
        //     arrSpec.push({ id: specData.spec_group_id, specName: specData.spec_group_name, specItems: specItems})
        //   }
        // }
        let group = {};
        for (let k in itemsList.goods_skuid) {
          let sku = itemsList.goods_skuid[k];
          let groupId = sku.spec_ids_ary.join(',');
          group[groupId] = {skuid: sku.skuid, price: sku.goods_price};
        }
        arrItem.push({
          itemId: itemsList.id,
          name: itemsList.goods_name,
          num: 0,
          imgUrl: itemsList.goods_logo || '/src/images/item.png',
          text: itemsList.goods_desc || '送蜡烛10支，每个账号限买一个',
          price: itemsList.goods_price/100,
          isSpec: itemsList.is_spec,
          spec: itemsList.spec_group_info,
          group: group
        });
      }
      this.arrItem[listArr[i].category_id] = arrItem;
    }
    this.saveSession();
    this.renderSort();
    this.renderItem();
  }

  // 渲染分类
  renderSort() {
    let itemHTML = '';
    for (let i in this.arrSort) {
      let item = this.arrSort[i];
      itemHTML += `<li data-sortid="${i}" id="sort_${i}"><p>${item.name}</p></li>`;
    }
    $("#sortBox").html(itemHTML);
    setTimeout(() => {
      this.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
    }, 200);
  }

  // 渲染商品
  renderItem() {
    let itemHTML = '';
    for (let i in this.arrItem) {
      const arrItem = this.arrItem[i] || [];
      if (arrItem.length == 0) continue;
      itemHTML += `<ul id="itemarr_${i}" data-itemarrid="${i}">`;
      for (let j in arrItem) {
        let item = arrItem[j];
        // 格式价格
        let priceHtml = `<i>￥</i>${item.price}`;
        if (item.isSpec == 1) priceHtml += '<i>起</i>';
        // 是否需要选规格
        let choiceHtml = `<i class="iconfont icon-minus"></i><strong>${item.num}</strong><i class="iconfont icon-add"></i>`;
        if (item.isSpec == 1) choiceHtml = '<span>选规格</span>';
        itemHTML += `<li id="item_${item.itemId}" data-sortid="${i}" data-itemid="${item.itemId}">
          <p class="item_img_box">
            <a href="detail.html"><img src="${item.imgUrl}" /></a>
          </p>
          <div class="item_infor_box">
            <p class="item_name">${item.name}</p>
            <div class="item_remark">${item.text}</div>
            <div class="price_box">
              <p class="item_choice J_item_choice">${choiceHtml}</p>
              <p class="item_price">${priceHtml}</p>
            </div>
          </div>
        </li>`;
      }
      itemHTML += '</ul>';
    }
    $("#itemBox").html(itemHTML);
    setTimeout(() => {
      this.iScrollItem = new IScroll('#iScrollItem', { disableMouse: true, click: true, tap: true });
    }, 200);
  }

  // 渲染购物车
  renderCart() {
    let itemHTML = '';
    for (let i in this.arrCart) {
      let item = this.arrCart[i];
      if (!item) continue;
      itemHTML += `<li data-sortid="${item.sortId}" id="cart_${i}" data-itemid="${i}">
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
  changeCart(aid, cid, isadd) {
    const arrItem = this.arrItem[aid];
    let curNum = 0;
    let arrItemIndex = 0;
    for (let i in arrItem) {
      if (arrItem[i].itemId == cid) {
        curNum = parseInt(arrItem[i].num);
        arrItemIndex = i;
        break;
      }
    }
    let resNum = isadd ? ++curNum : --curNum;
    if (resNum < 0 || resNum > 99) return;
    this.arrItem[aid][arrItemIndex].num = resNum;
    // 更新加入购物车
    let arrCart = this.arrCart;
    if (resNum > 0) {
      arrCart[cid] = this.arrItem[aid][arrItemIndex];
      arrCart[cid].sortId = aid;
    } else {
      arrCart[cid] = null;
    }
    this.saveSession();
    $("#item_"+ cid).find("strong").text(resNum);
  }

  // 打开选规格
  openSpec(sortid, itemid) {
    const arrItem = this.arrItem[sortid];
    for (let i in arrItem) {
      if (arrItem[i].itemId == itemid) {
        this.curSpec = arrItem[i];
        break;
      }
    }
    this.curSpec['sortId'] = sortid;
    let specHTML = '';
    for (let i in this.curSpec.spec) {
      let spec = this.curSpec.spec[i];
      specHTML += `<p>${spec.spec_group_name}</p>`;
      specHTML += '<p>';
      for (let j in spec.spec_group_list) {
        let specSku = spec.spec_group_list[j];
        // specHTML += `<span data-specid="${arrSpec[i].id}" data-specprice="${arrSpec[i].price}">${arrSpec[i].name}</span>`;
        specHTML += `<span data-specid="${specSku.spec_id}"${j == 0 ? ' class="cur"' : ''}>${specSku.spec_name}</span>`;
      }
      specHTML += '</p>';
    }
    $("#specBox").html(specHTML);
    $("#choiceSpec").show();
  }

  // 确认规格
  choiceSpecSave() {
    const curSpec = this.curSpec;
    let arrSpec = curSpec.spec[0].specItems;
    for (let i in arrSpec) {
      if (arrSpec[i].id == curSpec.choiceId) arrSpec[i].num += 1;
    }
    let arrCart = this.arrCart;
    arrCart[curSpec.sortId] = curSpec;
    // arrCart[itemid].sortId = sortid;
    this.saveSession();
    $("#choiceSpec").hide();
  }

  // 修改购物车
  updateCart(aid, cid, isadd) {
    let curNum = parseInt(this.arrCart[cid].num);
    let resNum = isadd ? ++curNum : --curNum;
    for (let i in this.arrItem[aid]) {
      let itemList = this.arrItem[aid][i];
      if (itemList.itemId == cid) {
        this.arrCart[cid].num = this.arrItem[aid][i].num = resNum;
        break;
      }
    }
    this.saveSession();
    $("#cart_"+ cid +", #item_"+ cid).find("strong").text(resNum);
  }

  // 清空购物车
  cleanCart() {
    for (let i in this.arrCart) {
      for (let j in this.arrCart[i]) {
        let itemList = this.arrCart[i][j];
        if (itemList.num == 0) continue;
        this.arrCart[i][j].num = 0;
        // $("#item_"+ itemList.itemId).find("strong").text('0');
      }
    }
    this.arrCart = {};
    this.renderCart();
    this.renderItem();
    this.saveSession();

    // let param = {
    //   token: this.token,
    //   shopid: '',
    // };
    // Controller.ajax({
    //   url: '/cart/clearall',
    //   type: 'POST',
    //   data: param,
    // }, (res) => {
    //   // const listArr = res.data.goods || [];
    //   // this.formatItems(listArr);
    // });
  }

  // 暂存数据
  saveSession() {
    sessionStorage.arrSort = JSON.stringify(this.arrSort);
    sessionStorage.arrItem = JSON.stringify(this.arrItem);
    sessionStorage.arrCart = JSON.stringify(this.arrCart);
    // $.isEmptyObject(aa); 判断是否为空对象
  }

}

new Page();
