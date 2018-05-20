webpackJsonp([3],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(5);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = __webpack_require__(0);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_Controller) {
  _inherits(Page, _Controller);

  function Page() {
    _classCallCheck(this, Page);

    var _this2 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

    _this2.init();
    _this2.bindEvent();
    return _this2;
  }

  _createClass(Page, [{
    key: 'init',
    value: function init() {
      this.token = window.TOKEN;

      // 分类数据
      this.arrSort = {
        11: { name: '优惠' },
        12: { name: '招牌' },
        13: { name: '吃货最爱' },
        14: { name: '卡通生日蛋糕' },
        21: { name: '优惠' },
        22: { name: '招牌' },
        23: { name: '吃货最爱' },
        24: { name: '卡通生日蛋糕' },
        31: { name: '优惠' },
        32: { name: '招牌' },
        33: { name: '吃货最爱' },
        34: { name: '卡通生日蛋糕' }
      };

      // 商品数据
      this.arrItem = {
        11: [{
          itemId: 12,
          name: '精品生日水果蛋糕12',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: []
        }, {
          itemId: 13,
          name: '精品生日水果蛋糕13',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 1,
          groupId: '', // 只存放在this.curSpec中
          selectSpec: [{ id: '12,14', price: '123', num: 2, specTxt: '12寸/咸味' }, { id: '11,14', price: '120', num: 1, specTxt: '13寸/甜味' }],
          spec: [{
            "spec_group_id": 11,
            "spec_group_name": "尺寸",
            "spec_group_beizhu": "蛋糕尺寸",
            "spec_group_list": [{ "spec_id": "13", "spec_name": "8寸" }, { "spec_id": "12", "spec_name": "6寸" }, { "spec_id": "14", "spec_name": "10寸" }, { "spec_id": "15", "spec_name": "12寸" }]
          }],
          group: {
            13: { "skuid": 1, "price": 112 },
            12: { "skuid": 1, "price": 113 },
            14: { "skuid": 1, "price": 116 }
          }
        }],
        21: [{
          itemId: 22,
          name: '精品生日水果蛋糕22',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: []
        }, {
          itemId: 23,
          name: '精品生日水果蛋糕23',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: []
        }],
        31: [{
          itemId: 32,
          name: '精品生日水果蛋糕32',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: []
        }, {
          itemId: 33,
          name: '精品生日水果蛋糕33',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00',
          isSpec: 0,
          spec: []
        }]
      };

      // 购物车数据
      this.arrCart = {};

      // 当前规格商品
      this.curSpec = null;

      // return;

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
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this3 = this;

      var _this = this;

      $("#viewCart").click(function () {
        _this.renderCart();
        $("#cartMask").show();
        $("#cartOutBox").css("bottom", 45);
      });

      // 点击空白隐藏购物车
      $("#cartMask").click(function (e) {
        $(this).hide();
        $("#cartOutBox").css("bottom", '-80%');
      });

      // 滚动
      $("#iScrollSort").on('click', 'li', function () {
        var sid = $(this).data("sortid");
        _this.iScrollItem.scrollToElement("#itemarr_" + sid, 500);
      });

      // 加减商品
      $("#iScrollItem").on('click', ".J_item_choice i", function () {
        var isAdd = $(this).hasClass("icon-add");
        var curLi = $(this).closest('li');
        _this.changeCart(curLi.data('sortid'), curLi.data('itemid'), isAdd);
      });

      // 打开选规格
      $("#iScrollItem").on('click', ".J_item_choice span", function () {
        var curLi = $(this).closest('li');
        _this.openSpec(curLi.data('sortid'), curLi.data('itemid'));
      });

      // 选择规格
      $("#specBox").on('click', "span", function () {
        if ($(this).hasClass("cur")) return;
        $(this).addClass('cur').siblings('span').removeClass();
        _this.curChoiseSpec();
      });

      // 确认选择规格
      $("#choiceSpecOK").click(function () {
        return _this3.choiceSpecSave();
      });

      // 修改购物车数量
      $("#cartItemBox").on('click', '.J_cart_choice i', function () {
        var isAdd = $(this).hasClass("icon-add");
        var curLi = $(this).closest('li');
        _this.updateCart(curLi.data('sortid'), curLi.data('itemid'), isAdd);
      });

      // 清空购物车
      $("#cleanCart").click(function () {
        return _this3.cleanCart();
      });
    }

    // 获取商品数据

  }, {
    key: 'rItems',
    value: function rItems() {
      var _this4 = this;

      _controller2.default.ajax({
        url: '/index/goods',
        type: 'GET'
      }, function (res) {
        var listArr = res.data.goods || [];
        _this4.formatItems(listArr);
      });
    }

    // 获取购物车数据

  }, {
    key: 'rCart',
    value: function rCart() {
      var _this5 = this;

      var param = {
        token: TOKEN,
        shopid: '',
        is_check: ''
      };
      _controller2.default.ajax({
        url: '/cart/list',
        type: 'POST',
        data: param
      }, function (res) {
        _this5.renderCart();
      });
    }

    // 格式化数据

  }, {
    key: 'formatItems',
    value: function formatItems(listArr) {
      for (var i in listArr) {
        var items = listArr[i].items || [];
        if (items.length == 0) continue;
        this.arrSort[listArr[i].category_id] = { name: listArr[i].category_name };
        var arrItem = [];
        for (var j in items) {
          var itemsList = items[j];
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
          var group = {};
          for (var k in itemsList.goods_skuid) {
            var sku = itemsList.goods_skuid[k];
            var groupId = sku.spec_ids_ary.join(',');
            group[groupId] = { skuid: sku.skuid, price: sku.goods_price };
          }
          arrItem.push({
            itemId: itemsList.id,
            name: itemsList.goods_name,
            num: 0,
            imgUrl: itemsList.goods_logo || '/src/images/item.png',
            text: itemsList.goods_desc || '送蜡烛10支，每个账号限买一个',
            price: itemsList.goods_price,
            isSpec: itemsList.is_spec,
            spec: itemsList.spec_group_info,
            selectSpec: [],
            group: group
          });
        }
        this.arrItem[listArr[i].category_id] = arrItem;
      }
      this.saveSession();
      this.renderSort();
      this.renderItem();
    }

    // 获取选中的规格

  }, {
    key: 'curChoiseSpec',
    value: function curChoiseSpec() {
      var specIds = [];
      $("#specBox span.cur").map(function () {
        var specid = $(this).data('specid');
        specIds.push(specid);
      });
      // 获取组合价格
      var groupId = specIds.join(',');
      this.curSpec['groupId'] = groupId;
      var group = this.curSpec.group[groupId];
      var groupPrice = '缺货';
      if (group) groupPrice = _controller2.default.formatMoney(group.price);
      $("#choiceSpecPrice").html('<i>\uFFE5</i>' + groupPrice);
    }

    // 渲染分类

  }, {
    key: 'renderSort',
    value: function renderSort() {
      var _this6 = this;

      var itemHTML = '';
      for (var i in this.arrSort) {
        var item = this.arrSort[i];
        itemHTML += '<li data-sortid="' + i + '" id="sort_' + i + '"><p>' + item.name + '</p></li>';
      }
      $("#sortBox").html(itemHTML);
      setTimeout(function () {
        _this6.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
      }, 200);
    }

    // 渲染商品

  }, {
    key: 'renderItem',
    value: function renderItem() {
      var _this7 = this;

      var itemHTML = '';
      for (var i in this.arrItem) {
        var arrItem = this.arrItem[i] || [];
        if (arrItem.length == 0) continue;
        itemHTML += '<ul id="itemarr_' + i + '" data-itemarrid="' + i + '">';
        for (var j in arrItem) {
          var item = arrItem[j];
          // 格式价格
          var price = _controller2.default.formatMoney(item.price);
          var priceHtml = '<i>\uFFE5</i>' + price;
          if (item.isSpec == 1) priceHtml += '<i>起</i>';
          // 是否需要选规格
          var choiceHtml = '<i class="iconfont icon-minus"></i><strong>' + item.num + '</strong><i class="iconfont icon-add"></i>';
          if (item.isSpec == 1) choiceHtml = '<span>选规格</span>';
          itemHTML += '<li id="item_' + item.itemId + '" data-sortid="' + i + '" data-itemid="' + item.itemId + '">\n          <p class="item_img_box">\n            <a href="detail.html"><img src="' + item.imgUrl + '" /></a>\n          </p>\n          <div class="item_infor_box">\n            <p class="item_name">' + item.name + '</p>\n            <div class="item_remark">' + item.text + '</div>\n            <div class="price_box">\n              <p class="item_choice J_item_choice">' + choiceHtml + '</p>\n              <p class="item_price">' + priceHtml + '</p>\n            </div>\n          </div>\n        </li>';
        }
        itemHTML += '</ul>';
      }
      $("#itemBox").html(itemHTML);
      setTimeout(function () {
        _this7.iScrollItem = new IScroll('#iScrollItem', { disableMouse: true, click: true, tap: true });
      }, 200);
    }

    // 渲染购物车

  }, {
    key: 'renderCart',
    value: function renderCart() {
      // 规格组合商品提到外层
      var cartList = [];
      for (var i in this.arrCart) {
        var item = this.arrCart[i];
        if (!item) continue;
        if (item.isSpec == 1) {
          for (var j in item.selectSpec) {
            var select = item.selectSpec[j];
            if (select.num > 0) {
              item.price = select.price || '0';
              item.smTxt = select.price || 'aaa';
              cartList.push(item);
            }
          }
        } else {
          cartList.push(item);
        }
      }
      // 渲染列表
      var itemHTML = '';
      for (var _i in cartList) {
        var _item = cartList[_i];
        itemHTML += '<li data-sortid="' + _item.sortId + '" id="cart_' + _i + '" data-itemid="' + _i + '">\n        <div class="cart_item">\n          <p class="cart_item_tit">' + _item.name + '</p>\n          <p class="cart_item_sm">' + _item.price + '</p>\n        </div>\n        <div class="cart_choice J_cart_choice">\n          <i class="iconfont icon-minus"></i>\n          <strong>' + _item.num + '</strong>\n          <i class="iconfont icon-add"></i>\n        </div>\n      </li>';
      }
      if (itemHTML == '') itemHTML = '<li>空空如也！</li>';
      $("#cartItemBox").html(itemHTML);
    }

    // 加入/移出购物车

  }, {
    key: 'changeCart',
    value: function changeCart(aid, cid, isadd) {
      var arrItem = this.arrItem[aid];
      var curNum = 0;
      var arrItemIndex = 0;
      for (var i in arrItem) {
        if (arrItem[i].itemId == cid) {
          curNum = parseInt(arrItem[i].num);
          arrItemIndex = i;
          break;
        }
      }
      var resNum = isadd ? ++curNum : --curNum;
      if (resNum < 0 || resNum > 99) return;
      this.arrItem[aid][arrItemIndex].num = resNum;
      // 更新加入购物车
      var arrCart = this.arrCart;
      if (resNum > 0) {
        arrCart[cid] = this.arrItem[aid][arrItemIndex];
        arrCart[cid].sortId = aid;
      } else {
        arrCart[cid] = null;
      }
      this.saveSession();
      $("#item_" + cid).find("strong").text(resNum);
    }

    // 打开选规格

  }, {
    key: 'openSpec',
    value: function openSpec(sortid, itemid) {
      var arrItem = this.arrItem[sortid];
      for (var i in arrItem) {
        if (arrItem[i].itemId == itemid) {
          this.curSpec = arrItem[i];
          break;
        }
      }
      this.curSpec['sortId'] = sortid;
      var specHTML = '';
      for (var _i2 in this.curSpec.spec) {
        var spec = this.curSpec.spec[_i2];
        specHTML += '<p>' + spec.spec_group_name + '</p>';
        specHTML += '<p>';
        for (var j in spec.spec_group_list) {
          var specSku = spec.spec_group_list[j];
          // specHTML += `<span data-specid="${arrSpec[i].id}" data-specprice="${arrSpec[i].price}">${arrSpec[i].name}</span>`;
          specHTML += '<span data-specid="' + specSku.spec_id + '"' + (j == 0 ? ' class="cur"' : '') + '>' + specSku.spec_name + '</span>';
        }
        specHTML += '</p>';
      }
      $("#specTit").text(this.curSpec.name);
      $("#specBox").html(specHTML);
      this.curChoiseSpec();
      $("#choiceSpec").show();
    }

    // 确认规格

  }, {
    key: 'choiceSpecSave',
    value: function choiceSpecSave() {
      var curSpec = this.curSpec;
      // 更新当前规格商品信息
      var selectIndex = -1;
      for (var i in curSpec.selectSpec) {
        if (curSpec.selectSpec[i].id == curSpec.groupId) selectIndex = i;
      }
      var groupInfo = curSpec.group[curSpec.groupId];
      if (selectIndex == -1) {
        this.curSpec.selectSpec.push({ id: curSpec.groupId, price: groupInfo.price || '0', num: 1, specTxt: groupInfo.name || '未命名' });
      } else {
        this.curSpec.selectSpec[selectIndex].num++;
      }
      // 更新购物车和商品列表信息
      var arrItem = this.arrItem[curSpec.sortId];
      for (var _i3 in arrItem) {
        if (arrItem[_i3].itemId == curSpec.itemId) {
          this.arrItem[curSpec.sortId][_i3] = this.curSpec;
          break;
        }
      }
      this.arrCart[curSpec.itemId] = this.curSpec;
      this.saveSession();
      $("#choiceSpec").hide();
    }

    // 修改购物车

  }, {
    key: 'updateCart',
    value: function updateCart(aid, cid, isadd) {
      var curNum = parseInt(this.arrCart[cid].num);
      var resNum = isadd ? ++curNum : --curNum;
      if (resNum == 0) {
        var isDel = confirm('是否从购物车中删除？');
        if (!isDel) return;
        this.arrCart[cid] = null;
        $("#item_" + cid).find("strong").text(resNum);
        this.renderCart();
      } else {
        var itemIndex = -1,
            specIndex = -1;
        for (var i in this.arrItem[aid]) {
          var itemList = this.arrItem[aid][i];
          if (itemList.itemId == cid) itemIndex = i;
          // 查找规格商品
          if (itemList.itemId == cid && itemList.isSpec == 1) {
            for (var j in itemList.selectSpec) {
              if (itemList.selectSpec[j].id == itemList.groupId) specIndex = j;
            }
            this.arrItem[aid][itemIndex].selectSpec[specIndex].num = resNum;
          }
        }
        this.arrCart[cid].num = this.arrItem[aid][itemIndex].num = resNum;
        $("#cart_" + cid + ", #item_" + cid).find("strong").text(resNum);
      }
      this.saveSession();
    }

    // 清空购物车

  }, {
    key: 'cleanCart',
    value: function cleanCart() {
      var isDel = confirm('是否清空购物车？');
      if (!isDel) return;
      for (var i in this.arrCart) {
        for (var j in this.arrItem[i]) {
          var item = this.arrItem[i][j];
          if (item.isSpec == 1) item.selectSpec = [];
          item.num = 0;
          $("#item_" + item.itemId).find("strong").text('0');
        }
      }
      this.arrCart = {};
      // this.renderItem();
      this.saveSession();
      $("#cartMask").hide();
      $("#cartOutBox").css("bottom", '-80%');

      // 登录状态更新服务端数据
      if (!this.token) return;
      _controller2.default.ajax({
        url: '/cart/clearall',
        type: 'POST',
        data: { token: this.token, shopid: '' }
      }, function (res) {
        console.log(res);
      });
    }

    // 暂存数据

  }, {
    key: 'saveSession',
    value: function saveSession() {
      sessionStorage.arrSort = JSON.stringify(this.arrSort);
      sessionStorage.arrItem = JSON.stringify(this.arrItem);
      sessionStorage.arrCart = JSON.stringify(this.arrCart);
      // $.isEmptyObject(aa); 判断是否为空对象
    }
  }]);

  return Page;
}(_controller2.default);

new Page();

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[1]);