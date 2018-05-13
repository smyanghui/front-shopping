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
      this.token = _controller2.default.getCookie('token');

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
          spec: [{
            id: 101,
            specName: "规格",
            specItems: [{ id: 10011, name: "3寸", price: 110 }, { id: 10012, name: "5寸", price: 150 }, { id: 10013, name: "9寸", price: 180 }]
          }]
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
          isSpec: 1,
          spec: [{
            id: 100,
            specName: "规格",
            specItems: [{ id: 10001, name: "6寸", price: 110 }, { id: 10002, name: "8寸", price: 150 }, { id: 10003, name: "12寸", price: 180 }]
          }]
        }]
      };

      // 购物车数据
      this.arrCart = {
        11: null,
        12: null,
        13: null
      };

      this.rItems();
      this.rCart();
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
        var itemId = $(this).closest('li').data('itemid');
        _this.cartAdd(isAdd, itemId);
      });

      // 选规格
      $("#iScrollItem").on('click', ".J_item_choice span", function () {
        var curLi = $(this).closest('li');
        _this.choiceSpec(curLi.data('sortid'), curLi.data('itemid'));
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
        type: 'POST'
      }, function (res) {
        var listArr = res.data.goods || [];
        _this4.formatItems(listArr);
      });
    }

    // 获取购物车数据

  }, {
    key: 'rCart',
    value: function rCart() {
      var param = {
        token: this.token,
        shopid: '',
        is_check: ''
      };
      _controller2.default.ajax({
        url: '/cart/list',
        type: 'POST',
        data: param
      }, function (res) {
        // const listArr = res.data.goods || [];
        // this.formatItems(listArr);
      });
    }

    // 加入购物车

  }, {
    key: 'cartAdd',
    value: function cartAdd(isadd, itemid) {
      var _this5 = this;

      var itemDom = $("#item_" + itemid).find("strong");
      var curNum = parseInt(itemDom.text());
      var relNum = isadd ? ++curNum : --curNum;
      var param = {
        token: this.token,
        goods_id: itemid,
        spec_ids: '',
        cart_num: relNum
      };
      _controller2.default.ajax({
        url: '/cart/add',
        type: 'POST',
        data: param
      }, function (res) {
        itemDom.text(relNum);
        _this5.rCart();
      });
    }

    // 格式化数据

  }, {
    key: 'formatItems',
    value: function formatItems(listArr) {
      var _this6 = this;

      for (var i in listArr) {
        var items = listArr[i].items || [];
        if (items.length == 0) continue;
        this.arrSort[listArr[i].category_id] = { name: listArr[i].category_name };
        var arrItem = [];
        var arrSpec = [];
        for (var j in items) {
          var itemsList = items[j];
          if (itemsList.is_spec == 1) {
            for (var k in itemsList.goods_spec_data) {
              var specData = itemsList.goods_spec_data[k];
              var specItems = [];
              for (var l in specData.spec_group_items) {
                var sItem = specData.spec_group_items[l];
                specItems.push({ id: sItem.spec_id, name: sItem.spec_name, price: sItem.goods_price });
              }
              arrSpec.push({ id: specData.spec_group_id, specName: specData.spec_group_name, specItems: specItems });
            }
          }
          arrItem.push({
            itemId: itemsList.id,
            name: itemsList.goods_name,
            num: itemsList.goods_num,
            imgUrl: '/src/images/item.png', // itemsList.goods_logo
            text: '送蜡烛10支，每个账号限买一个', // itemsList.goods_desc
            price: itemsList.goods_price,
            isSpec: itemsList.is_spec,
            spec: arrSpec
          });
        }
        this.arrItem[listArr[i].category_id] = arrItem;
      }
      this.renderSort();
      this.renderItem();
      setTimeout(function () {
        _this6.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
        _this6.iScrollItem = new IScroll('#iScrollItem', { disableMouse: true, click: true, tap: true });
      }, 200);
      this.saveSession();
    }

    // 渲染分类

  }, {
    key: 'renderSort',
    value: function renderSort() {
      var itemHTML = '';
      for (var i in this.arrSort) {
        var item = this.arrSort[i];
        itemHTML += '<li data-sortid="' + i + '" id="sort_' + i + '"><p>' + item.name + '</p></li>';
      }
      $("#sortBox").html(itemHTML);
    }

    // 渲染商品

  }, {
    key: 'renderItem',
    value: function renderItem() {
      var itemHTML = '';
      for (var i in this.arrItem) {
        var arrItem = this.arrItem[i] || [];
        if (arrItem.length == 0) continue;
        itemHTML += '<ul id="itemarr_' + i + '" data-itemarrid="' + i + '">';
        for (var j in arrItem) {
          var item = arrItem[j];
          // 格式价格
          var priceHtml = '<i>\uFFE5</i>' + item.price;
          if (item.isSpec == 1) priceHtml += '<i>起</i>';
          // 是否需要选规格
          var choiceHtml = '<i class="iconfont icon-minus"></i><strong>' + item.num + '</strong><i class="iconfont icon-add"></i>';
          if (item.isSpec == 1) choiceHtml = '<span>选规格</span>';
          itemHTML += '<li id="item_' + item.itemId + '" data-sortid="' + i + '" data-itemid="' + item.itemId + '">\n          <p class="item_img_box">\n            <a href="detail.html"><img src="' + item.imgUrl + '" /></a>\n          </p>\n          <div class="item_infor_box">\n            <p class="item_name">' + item.name + '</p>\n            <div class="item_remark">' + item.text + '</div>\n            <div class="price_box">\n              <p class="item_choice J_item_choice">' + choiceHtml + '</p>\n              <p class="item_price">' + priceHtml + '</p>\n            </div>\n          </div>\n        </li>';
        }
        itemHTML += '</ul>';
      }
      $("#itemBox").html(itemHTML);
    }

    // 渲染购物车

  }, {
    key: 'renderCart',
    value: function renderCart() {
      var itemHTML = '';
      for (var i in this.arrCart) {
        var item = this.arrCart[i];
        if (!item) continue;
        itemHTML += '<li data-sortid="' + item.sortId + '" id="cart_' + i + '" data-itemid="' + i + '">\n        <div class="cart_item">\n            <p class="cart_item_tit">' + item.name + '</p>\n            <p class="cart_item_sm">' + item.price + '</p>\n        </div>\n        <div class="cart_choice J_cart_choice">\n          <i class="iconfont icon-minus"></i>\n          <strong>' + item.num + '</strong>\n          <i class="iconfont icon-add"></i>\n        </div>\n      </li>';
      }
      if (itemHTML == '') itemHTML = '<li>空空如也！</li>';
      $("#cartItemBox").html(itemHTML);
    }

    // 选规格

  }, {
    key: 'choiceSpec',
    value: function choiceSpec(aid, cid) {
      console.log(aid, cid);
      $("#choiceSize").show();
    }

    // 修改购物车

  }, {
    key: 'updateCart',
    value: function updateCart(aid, cid, isadd) {
      var curNum = parseInt(this.arrCart[cid].num);
      var resNum = isadd ? ++curNum : --curNum;
      for (var i in this.arrItem[aid]) {
        var itemList = this.arrItem[aid][i];
        if (itemList.itemId == cid) {
          this.arrCart[cid].num = this.arrItem[aid][i].num = resNum;
          break;
        }
      }
      this.saveSession();
      $("#cart_" + cid + ", #item_" + cid).find("strong").text(resNum);
    }

    // 清空购物车

  }, {
    key: 'cleanCart',
    value: function cleanCart() {
      for (var i in this.arrCart) {
        for (var j in this.arrCart[i]) {
          var itemList = this.arrCart[i][j];
          if (itemList.num == 0) continue;
          this.arrCart[i][j].num = 0;
          // $("#item_"+ itemList.itemId).find("strong").text('0');
        }
      }
      this.arrCart = {};
      this.renderCart();
      this.renderItem();
      this.saveSession();
    }

    // 暂存数据

  }, {
    key: 'saveSession',
    value: function saveSession() {
      sessionStorage.arrItem = this.arrItem;
      sessionStorage.arrCart = this.arrCart;
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