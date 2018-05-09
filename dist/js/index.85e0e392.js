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
          price: '100.00'
        }, {
          itemId: 13,
          name: '精品生日水果蛋糕13',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        }],
        21: [{
          itemId: 22,
          name: '精品生日水果蛋糕22',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        }, {
          itemId: 23,
          name: '精品生日水果蛋糕23',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        }],
        31: [{
          itemId: 32,
          name: '精品生日水果蛋糕32',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        }, {
          itemId: 33,
          name: '精品生日水果蛋糕33',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        }]
      };

      // 购物车数据
      this.arrCart = {
        11: null,
        12: null,
        13: null
      };

      this.getItems();
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
        var curArrId = $(this).closest('ul').data('itemarrid');
        var curId = $(this).closest('li').data('itemid');
        _this.changeCart(curArrId, curId, isAdd);
      });

      // 选规格
      $("#iScrollItem").on('click', ".J_item_choice span", function () {
        $("#choiceSize").show();
      });

      // 修改购物车数量
      $("#cartItemBox").on('click', '.J_cart_choice i', function () {
        var isAdd = $(this).hasClass("icon-add");
        var curId = $(this).closest('li').data('itemid');
        _this.updateCart(curId, isAdd);
      });

      // 清空购物车
      $("#cleanCart").click(function () {
        for (var i in _this3.arrCart) {
          if (_this3.arrItem[i].num == 0) continue;
          _this3.arrItem[i].num = 0;
          $("#item_" + i).find("strong").text('0');
        }
        _this3.arrCart = {};
        _this3.renderCart();
      });
    }

    // 获取商品数据

  }, {
    key: 'getItems',
    value: function getItems() {
      var _this4 = this;

      _controller2.default.ajax({
        url: '/index/goods',
        type: 'POST'
      }, function (res) {
        var listArr = res.data.goods || [];
        for (var i in listArr) {
          var items = listArr[i].items || [];
          if (items.length == 0) continue;
          _this4.arrSort[listArr[i].category_id] = { name: listArr[i].category_name };
          var arrItem = [];
          for (var j in items) {
            var itemsArr = items[j];
            arrItem.push({
              itemId: itemsArr.id,
              name: itemsArr.goods_name,
              num: 0,
              imgUrl: '/src/images/item.png', // itemsArr.goods_logo
              text: '送蜡烛10支，每个账号限买一个', // itemsArr.goods_desc
              price: itemsArr.goods_price
            });
          }
          _this4.arrItem[listArr[i].category_id] = arrItem;
        }

        _this4.renderSort();
        _this4.renderItem();

        // setTimeout()

        _this4.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
        _this4.iScrollItem = new IScroll('#iScrollItem', { disableMouse: true, click: true, tap: true });
      });
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
          itemHTML += '<li id="item_' + item.itemId + '" data-itemid="' + item.itemId + '">\n          <p class="item_img_box">\n            <a href="detail.html"><img src="' + item.imgUrl + '" /></a>\n          </p>\n          <div class="item_infor_box">\n            <p class="item_name">\n              <a href="detail.html">' + item.name + '</a>\n            </p>\n            <div class="item_remark">\n              <p>' + item.text + '</p>\n            </div>\n            <div class="price_box">\n              <p class="item_price"><i>\uFFE5</i>' + item.price + '</p>\n              <p class="item_choice J_item_choice">\n                <i class="iconfont icon-minus"></i>\n                <strong>' + item.num + '</strong>\n                <i class="iconfont icon-add"></i>\n              </p>\n            </div>\n          </div>\n        </li>';
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
        itemHTML += '<li id="cart_' + i + '" data-itemid="' + i + '">\n        <div class="cart_item">\n            <p class="cart_item_tit">' + item.name + '</p>\n            <p class="cart_item_sm">' + item.price + '</p>\n        </div>\n        <div class="cart_choice J_cart_choice">\n          <i class="iconfont icon-minus"></i>\n          <strong>' + item.num + '</strong>\n          <i class="iconfont icon-add"></i>\n        </div>\n      </li>';
      }
      if (itemHTML == '') itemHTML = '<li>空空如也！</li>';
      $("#cartItemBox").html(itemHTML);
    }

    // 移入/移出购物车

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
      if (arrCart[cid]) {
        if (resNum > 0) {
          arrCart[cid].num = resNum;
        } else {
          arrCart[cid] = null;
        }
      } else {
        if (resNum > 0) arrCart[cid] = this.arrItem[aid][arrItemIndex];
      }
      this.saveSession();
      $("#item_" + cid).find("strong").text(resNum);
    }

    // 修改购物车

  }, {
    key: 'updateCart',
    value: function updateCart(cid, isadd) {
      var curNum = parseInt(this.arrCart[cid].num);
      var resNum = isadd ? ++curNum : --curNum;
      this.arrCart[cid].num = this.arrItem[cid].num = resNum;
      this.saveSession();
      $("#cart_" + cid + ", #item_" + cid).find("strong").text(resNum);
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