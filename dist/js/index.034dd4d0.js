webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modal = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tips = new _modal.Tips();
var loading = new _modal.Loading();

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  // 提示信息，默认为提示错误信息


  _createClass(Controller, null, [{
    key: 'showMessage',
    value: function showMessage(msg) {
      var err = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      tips.show(msg, err);
    }
  }, {
    key: 'hideMessage',
    value: function hideMessage() {
      tips.hide();
    }

    // 加载中

  }, {
    key: 'showLoading',
    value: function showLoading() {
      loading.show();
    }
  }, {
    key: 'hideLoading',
    value: function hideLoading() {
      loading.hide();
    }

    // // 提示信息
    // static showMessage(...data) {
    //  if (!this.message) {
    //    this.message = new Message();
    //  }
    //  this.message.show(...data);
    // }
    // static hideMessage() {
    //  this.message.hide();
    // }

    // 获取表单值

  }, {
    key: 'getFormData',
    value: function getFormData(selector) {
      selector = selector || 'input, select, textarea';
      var data = {};
      $(selector).each(function (index, el) {
        if (el.value.trim().length) data[el.name] = el.value;
      });
      return data;
    }

    // ajax封装

  }, {
    key: 'ajax',
    value: function ajax(options, success) {
      Controller.showLoading();
      options.success = options.success || function (data) {
        Controller.hideLoading();
        if (data.code == 0) {
          success(data);
        } else {
          if (data.code == 100008) {
            // Controller.showMessage('登录超时，请重新登录！');
            window.location.href = '/login.html';
          } else {
            Controller.showMessage(data.msg);
          }
        }
      };
      options.error = options.error || function (data) {
        Controller.hideLoading();
        Controller.showMessage('网络异常，请稍后重试');
      };
      options.url = 'http://devapi.nfangbian.com' + options.url;

      $.ajax(options);
    }

    // 获取cookie

  }, {
    key: 'getCookie',
    value: function getCookie(name) {
      var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
      var m = document.cookie.match(r);
      return !m ? "" : decodeURIComponent(m[2]);
    }

    // 设置cookie

  }, {
    key: 'setCookie',
    value: function setCookie(name, v, path, expire, domain) {
      var s = name + "=" + encodeURIComponent(v) + "; path=" + (path || '/') + (domain ? "; domain=" + domain : '');
      if (expire > 0) {
        var d = new Date();
        d.setTime(d.getTime() + expire * 1000);
        s += ";expires=" + d.toGMTString();
      }
      document.cookie = s;
    }

    // 删除cookie

  }, {
    key: 'delCookie',
    value: function delCookie(name, path, domain) {
      if (arguments.length == 2) {
        domain = path;
        path = "/";
      }
      document.cookie = name + "=;path=" + path + ";" + (domain ? "domain=" + domain + ";" : '') + "expires=Thu, 01-Jan-70 00:00:01 GMT";
    }

    // 获取url指定参数的值

  }, {
    key: 'getQuery',
    value: function getQuery(key) {
      return this.getQueryParams()[key];
    }

    // 获取url参数对象

  }, {
    key: 'getQueryParams',
    value: function getQueryParams() {
      var params = {};

      if (location.search.length == 0) return params;

      var keyValPairs = location.search.substr(1).split('&'),
          tempArr = void 0;

      for (var i = 0; i < keyValPairs.length; i++) {
        tempArr = keyValPairs[i].split('=');
        params[tempArr[0]] = decodeURIComponent(tempArr[1] || '');
      }

      return params;
    }
  }]);

  return Controller;
}();

exports.default = Controller;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = exports.Tips = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 弹窗提示
var Tips = function () {
  function Tips() {
    _classCallCheck(this, Tips);

    this.createHtml();
  }

  _createClass(Tips, [{
    key: 'createHtml',
    value: function createHtml() {
      var _this = this;

      this.curTips = (0, _jquery2.default)('<div class="ui-message">');
      this.curTips.appendTo('body');
      this.curTips.on('click', function () {
        return _this.curTips.hide();
      });
      this.timeTips = null;
    }
  }, {
    key: 'show',
    value: function show(msg, msgType) {
      var _this2 = this;

      var contentBox = (0, _jquery2.default)('<div class="message-box">');

      // 错误/成功提示
      var tipsIcon = !!msgType ? 'icon-success' : 'icon-error';
      var contentHtml = '<span class="tips-box"><i class="iconfont ' + tipsIcon + '"></i> ' + msg + '</span>';
      clearTimeout(this.timeTips);
      this.timeTips = setTimeout(function () {
        _this2.curTips.hide();
      }, 3000);

      // 显示输出
      contentBox.append(contentHtml);
      this.curTips.html(contentBox).show();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.curTips.hide();
    }
  }]);

  return Tips;
}();

// loading加载


var Loading = function () {
  function Loading() {
    _classCallCheck(this, Loading);

    this.createHtml();
  }

  _createClass(Loading, [{
    key: 'createHtml',
    value: function createHtml() {
      this.loadingBox = (0, _jquery2.default)('<div class="ui-loading">');
      this.loadingBox.appendTo('body');
    }
  }, {
    key: 'show',
    value: function show() {
      this.loadingBox.show();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.loadingBox.hide();
    }
  }]);

  return Loading;
}();

exports.Tips = Tips;
exports.Loading = Loading;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = window.$;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 4 */
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
        },
        21: {
          name: '精品生日水果蛋糕11',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        },
        22: {
          name: '精品生日水果蛋糕12',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        },
        23: {
          name: '精品生日水果蛋糕13',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        },
        31: {
          name: '精品生日水果蛋糕11',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        },
        32: {
          name: '精品生日水果蛋糕12',
          num: 0,
          imgUrl: '/src/images/item.png',
          text: '送蜡烛10支，每个账号限买一个',
          price: '100.00'
        },
        33: {
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

      // 移入/移出商品
      $("#itemBox").on('click', ".J_item_choice i", function () {
        var isAdd = $(this).hasClass("icon-add");
        var curId = $(this).closest('li').data('itemid');
        _this.changeCart(curId, isAdd);
      });

      // 选规格
      $("#itemBox").on('click', "img", function () {
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
          _this4.arrSort[listArr[i].category_id] = { name: listArr[i].category_name };
          for (var j in listArr[i].items) {
            var itemsArr = listArr[i].items[j];
            _this4.arrItem[listArr[i].category_id] = {
              name: itemsArr.goods_name,
              num: 0,
              imgUrl: '/src/images/item.png', // itemsArr.goods_logo
              text: '送蜡烛10支，每个账号限买一个', // itemsArr.goods_desc
              price: itemsArr.goods_price
            };
          }
        }
        _this4.renderSort();
        _this4.renderItem();
        new IScroll('#iScrollMenu');
        new IScroll('#iScrollItem');
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

  return Page;
}(_controller2.default);

new Page();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[3]);