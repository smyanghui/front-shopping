webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INTEGER = /^\d+$/; // 是否0/正整数
var MONEY = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/; // 金额
var MOBILE = /^1\d{10}$/; // 手机号码
var EMAIL = /^([\w-\.])+@([\w-])+(\.[a-zA-Z]{2,4}){1,2}$/; // 邮箱
var ORGANIZATION = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/; // 织机构代码
var UNISOCIALCRECODE = /^[a-zA-Z0-9]{18}$/; // 统一社会信用代码
var ENGNUM = /^[0-9a-zA-Z]+$/; // 数字和英文
var USERNAME = /^[^~!@#$%^*+|}{"?/'\\=`]*$/; // 用户姓名（非特殊字符）
var CHINESE = /^[\u4e00-\u9fa5\s]+$/; // 中文（含空格）
var IDCARD = /(^\d{15})|(^\d{17}(\d|X|x)$)/; // 身份证
var URL = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; // 网址

var trim = function trim(val) {
  return String.prototype.trim ? val.trim() : val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

var Validate = function () {
  function Validate() {
    _classCallCheck(this, Validate);
  }

  _createClass(Validate, null, [{
    key: 'isBlank',


    // 是否为空
    value: function isBlank(val) {
      if (val == undefined || val == '' || val == null) return true;
      return trim(val + '') == '';
    }

    // 是否是数值(正负0小数)

  }, {
    key: 'isNumber',
    value: function isNumber(val) {
      return val != null && !isNaN(val);
    }
  }, {
    key: 'isInteger',
    value: function isInteger(val) {
      return INTEGER.test(val);
    }
  }, {
    key: 'isMoney',
    value: function isMoney(val) {
      return MONEY.test(val);
    }
  }, {
    key: 'isMobile',
    value: function isMobile(val) {
      return MOBILE.test(val);
    }
  }, {
    key: 'isEmail',
    value: function isEmail(val) {
      return EMAIL.test(val);
    }
  }, {
    key: 'isOrganizationCode',
    value: function isOrganizationCode(val) {
      return ORGANIZATION.test(val);
    }
  }, {
    key: 'isUniSocialCreCode',
    value: function isUniSocialCreCode(val) {
      return UNISOCIALCRECODE.test(val);
    }
  }, {
    key: 'isEngNum',
    value: function isEngNum(val) {
      return ENGNUM.test(val);
    }
  }, {
    key: 'isName',
    value: function isName(val) {
      return USERNAME.test(val);
    }
  }, {
    key: 'isChinese',
    value: function isChinese(val) {
      return CHINESE.test(val);
    }
  }, {
    key: 'isIdCardSimple',
    value: function isIdCardSimple(val) {
      return IDCARD.test(val);
    }
  }, {
    key: 'isUrl',
    value: function isUrl(val) {
      return URL.test(val);
    }

    // 身份证校验

  }, {
    key: 'isIdCard',
    value: function isIdCard(val) {
      var num = val.toUpperCase();
      switch (num.length) {
        case 15:
          if (!this.isInteger(num)) return false;

          var re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
          var arrSplit = num.match(re);

          //检查生日日期是否正确
          var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);

          var bGoodDay = false;
          bGoodDay = dtmBirth.getYear() == Number(arrSplit[2]) && dtmBirth.getMonth() + 1 == Number(arrSplit[3]) && dtmBirth.getDate() == Number(arrSplit[4]);
          return bGoodDay;

        case 18:
          if (!this.isInteger(num.substr(0, 17))) return false;

          var arrInt = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']; //加权因子
          var code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2', '1']; //效验码

          var checknum = 0;
          for (var i = 0; i < 17; i++) {
            checknum += num.substr(i, 1) * arrInt[i];
          }
          return code[checknum % 11] == num.substr(17, 1);

        default:
          return false;
      }
    }
  }]);

  return Validate;
}();

exports.default = Validate;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
module.exports = __webpack_require__(9);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = __webpack_require__(0);

var _controller2 = _interopRequireDefault(_controller);

var _validate = __webpack_require__(1);

var _validate2 = _interopRequireDefault(_validate);

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
    _controller2.default.isLogin(function () {
      _this2.rCart();
      _this2.rUser();
    });
    return _this2;
  }

  _createClass(Page, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this3 = this;

      var _this = this;
      $("#orderSubmit").click(function () {
        return _this3.orderSubmit();
      });
    }

    // 获取购物车确认数据

  }, {
    key: 'rCart',
    value: function rCart() {
      var _this4 = this;

      _controller2.default.ajax({
        url: '/cart/list',
        type: 'POST',
        data: {
          token: window.Token,
          shopid: '',
          is_check: 1
        }
      }, function (res) {
        _this4.renderItem(res.data || {});
      });
    }

    // 获取用户信息

  }, {
    key: 'rUser',
    value: function rUser() {
      var _this5 = this;

      _controller2.default.ajax({
        url: '/user/info',
        type: 'POST',
        data: {
          token: window.Token
        }
      }, function (res) {
        _this5.renderUser(res.data || {});
      });
    }

    // 提交订单

  }, {
    key: 'orderSubmit',
    value: function orderSubmit() {
      var param = this.checkData();
      if (!param) return;
      _controller2.default.ajax({
        url: '/order/add',
        type: 'POST',
        data: param
      }, function (res) {
        window.location.href = './order.html';
        // this.rPay(res.data.id, param.pay_type);
      });
    }

    // 去支付

  }, {
    key: 'rPay',
    value: function rPay(id, ptype) {
      _controller2.default.ajax({
        url: '/pay/index',
        type: 'POST',
        data: { token: window.Token, orderid: id, pay_type: ptype }
      }, function (res) {
        console.log(res);
      });
    }

    // 数据验证

  }, {
    key: 'checkData',
    value: function checkData() {
      var receiverName = $("#receiverName").val();
      if (_validate2.default.isBlank(receiverName)) {
        _controller2.default.showMessage("收货人姓名不能为空！");
        return false;
      }
      if (!_validate2.default.isName(receiverName)) {
        _controller2.default.showMessage("收货人姓名格式不正确！");
        return false;
      }
      var receiverMobile = $("#receiverMobile").val();
      if (_validate2.default.isBlank(receiverMobile)) {
        _controller2.default.showMessage("收货人手机号码不能为空！");
        return false;
      }
      if (!_validate2.default.isMobile(receiverMobile)) {
        _controller2.default.showMessage("收货人手机号码格式不正确！");
        return false;
      }
      var receiverAddress = $("#receiverAddress").val();
      if (_validate2.default.isBlank(receiverAddress)) {
        _controller2.default.showMessage("收货人地址不能为空！");
        return false;
      }
      var remarks = $("#remarks").val();
      var payType = $("#payType").val();
      return {
        token: window.Token,
        cart_ids: this.cartIds.join(','),
        receiver_name: receiverName,
        receiver_mobile: receiverMobile,
        receiver_address: receiverAddress,
        receiver_zip: '', // 邮编
        beizhu: remarks, // 客户备注
        wallet_price: '', // 选择余额支付金额
        pay_type: payType, // 支付方式
        is_invoice: '', // 是否需要发票
        invoice_info: '' // 发票信息
      };
    }

    // 初始化商品信息

  }, {
    key: 'renderItem',
    value: function renderItem(data) {
      var itemHTML = '';
      this.cartIds = [];
      for (var i in data.items) {
        var item = data.items[i];
        this.cartIds.push(item.id);
        var price = _controller2.default.formatMoney(item.goods_price);
        itemHTML += '<li>\n        <p class="item_img"><img src="' + item.goods_logo + '" /></p>\n        <div class="item_text">\n          <p class="item_name">' + item.goods_name + '</p>\n          <p class="item_sm">' + item.cart_num + '</p>\n        </div>\n        <p class="item_num">x' + item.cart_num + '</p>\n        <p class="item_price"><i>\uFFE5</i>' + price + '</p>\n      </li>';
      }
      $("#itemList").html(itemHTML);
      var totalPrice = _controller2.default.formatMoney(data.total_pirce);
      $("#itemTotal").html('<i>\uFFE5</i>' + totalPrice);
      $("#orderPrice").html('<i>\uFFE5</i>' + totalPrice);
    }

    // 初始化用户信息

  }, {
    key: 'renderUser',
    value: function renderUser(data) {
      if (data.nickname) $("#receiverName").val(data.nickname);
      if (data.mobile) $("#receiverMobile").val(data.mobile);
    }
  }]);

  return Page;
}(_controller2.default);

new Page();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[7]);