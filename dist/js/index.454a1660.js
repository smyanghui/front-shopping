webpackJsonp([3],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Index = function () {
  function Index() {
    _classCallCheck(this, Index);

    this.init();
    this.bindEvent();
  }

  _createClass(Index, [{
    key: 'init',
    value: function init() {

      // 分类数据
      this.arrSort = {
        11: { name: '优惠' },
        12: { name: '招牌' },
        13: { name: '吃货最爱' },
        14: { name: '卡通生日蛋糕' }
      };

      // 商品数据
      this.arrItem = {
        11: {
          name: '精品生日水果蛋糕11',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        },
        12: {
          name: '精品生日水果蛋糕12',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        },
        13: {
          name: '精品生日水果蛋糕13',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        }
      };

      // 购物车数据
      this.arrCart = {
        11: null,
        12: null,
        13: null
      };

      this.renderSort();
      this.renderItem();
      this.renderCart();
      this.listScroll = new IScroll('#iScrollItem');
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this2 = this;

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

      // 移入/移出商品
      $(".J_item_choice i").click(function () {
        var isAdd = $(this).hasClass("icon-add");
        var curId = $(this).closest('li').data('itemid');
        _this.changeCart(curId, isAdd);
      });

      // 修改购物车数量
      $("#cartItemBox").on('click', '.J_cart_choice i', function () {
        var isAdd = $(this).hasClass("icon-add");
        var curId = $(this).closest('li').data('itemid');
        _this.updateCart(curId, isAdd);
      });

      // 清空购物车
      $("#cleanCart").click(function () {
        for (var i in _this2.arrCart) {
          if (_this2.arrItem[i].num == 0) continue;
          _this2.arrItem[i].num = 0;
          $("#item_" + i).find("strong").text('0');
        }
        _this2.arrCart = {};
        _this2.renderCart();
      });
    }

    // 渲染商品

  }, {
    key: 'renderSort',
    value: function renderSort() {
      var itemHTML = '';
      for (var i in this.arrSort) {
        var item = this.arrSort[i];
        itemHTML += '<li id="sort_' + i + '"><p>' + item.name + '</p></li>';
      }
      $("#sortBox").html(itemHTML);
    }

    // 渲染商品

  }, {
    key: 'renderItem',
    value: function renderItem() {
      var itemHTML = '';
      for (var i in this.arrItem) {
        var item = this.arrItem[i];
        itemHTML += '<li id="item_' + i + '" data-itemid="' + i + '">\n        <p class="image_box"><img src="' + item.imgUrl + '" /></p>\n        <div class="text_box">\n          <a href="detail.html" class="item_tit">' + item.name + '</a>\n          <div class="item_remark">\n            <p>' + item.text + '</p>\n          </div>\n          <div class="price_box">\n            <p class="item_price">\uFFE5' + item.price + '</p>\n            <p class="item_choice J_item_choice">\n              <i class="iconfont icon-minus"></i>\n              <strong>' + item.num + '</strong>\n              <i class="iconfont icon-add"></i>\n            </p>\n          </div>\n        </div>\n      </li>';
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
    value: function changeCart(cid, isadd) {
      var curNum = parseInt(this.arrItem[cid].num);
      var resNum = isadd ? ++curNum : --curNum;
      this.arrItem[cid].num = resNum;
      // 更新加入购物车
      var arrCart = this.arrCart;
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

  return Index;
}();

new Index();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[0]);