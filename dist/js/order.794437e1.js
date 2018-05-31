webpackJsonp([3],{

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
module.exports = __webpack_require__(15);


/***/ }),

/***/ 14:
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
    // this.bindEvent();
    _controller2.default.isLogin(function () {
      _this2.rOrder();
    }, function () {
      window.location.href = '/login.html';
    });
    return _this2;
  }

  _createClass(Page, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this = this;
    }

    // 获取订单列表

  }, {
    key: 'rOrder',
    value: function rOrder() {
      var _this3 = this;

      _controller2.default.ajax({
        url: '/order/list',
        type: 'POST',
        data: { token: window.Token }
      }, function (res) {
        _this3.renderOrder(res.data);
      });
    }

    // 渲染订单列表

  }, {
    key: 'renderOrder',
    value: function renderOrder(data) {
      var orderHTML = '';
      for (var i in data.items) {
        var order = data.items[i];
        orderHTML += '<ul>\n        <li><span>\u8BA2\u5355\u53F7\uFF1A</span>' + order.orderno + '</li>\n        <li><span>\u8BA2\u5355\u72B6\u6001\uFF1A</span><i class="end">\u8BA2\u5355\u5DF2\u5B8C\u6210</i></li>\n        <li><span>\u4E0B\u5355\u65F6\u95F4\uFF1A</span>2018-05-01 12:01:01</li>\n        <li><span>\u63D0\u8D27\u65F6\u95F4\uFF1A</span>2018-05-01 13:01:01</li>\n        <li><span>\u7ED3\u7B97\u91D1\u989D\uFF1A</span><i class="price">\uFFE5' + order.wallet_price + '</i></li>\n      </ul>';
      }
      $("#orderList").html(orderHTML);
      setTimeout(function () {
        new IScroll('#iScrollOrder', { disableMouse: true, click: true, tap: true });
      }, 200);
    }
  }]);

  return Page;
}(_controller2.default);

new Page();

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[13]);