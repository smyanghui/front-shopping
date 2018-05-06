webpackJsonp([0],[
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
module.exports = __webpack_require__(17);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate = __webpack_require__(16);

var _validate2 = _interopRequireDefault(_validate);

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
      this.isSending = false;
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this3 = this;

      var _this = this;
      // 发送短信验证码
      $("#smsYzm").click(function () {
        return _this3.sendSms();
      });
      // 登录提交
      $("#submitLogin").click(function () {
        return _this3.submitLogin();
      });
    }

    // 发送短信验证码

  }, {
    key: 'sendSms',
    value: function sendSms() {
      var _this4 = this;

      if (this.isSending) return;
      var telNum = this.checkMobile();
      if (!telNum) return;
      var params = {
        mobile: telNum,
        system_id: 1,
        business_id: '10002',
        token: ''
      };
      _controller2.default.ajax({
        url: '/sms/send',
        type: 'POST',
        cache: false,
        data: params
      }, function (res) {
        _this4.isSending = true;
        // 倒计时
        var secondNum = 5;
        var downTime = null;
        downTime = setInterval(function () {
          if (secondNum <= 0) {
            _this4.isSending = false;
            clearInterval(downTime);
            return;
          }
          secondNum--;
          var smsHtml = secondNum <= 0 ? '重新发送' : secondNum + '秒后重新发送';
          $("#smsYzm").text(smsHtml);
        }, 1000);
      });
    }

    // 校验手机号码

  }, {
    key: 'checkMobile',
    value: function checkMobile() {
      var telNum = $.trim($("#loginTelNum").val());
      if (_validate2.default.isBlank(telNum)) {
        _controller2.default.showMessage("手机号码不能为空！");
        return false;
      }
      if (!_validate2.default.isMobile(telNum)) {
        _controller2.default.showMessage("手机号码格式不正确！");
        return false;
      }
      return telNum;
    }

    // 登录

  }, {
    key: 'submitLogin',
    value: function submitLogin() {
      var telNum = this.checkMobile();
      if (!telNum) return;
      var smsYzm = $.trim($("#loginSmsYzm").val());
      if (_validate2.default.isBlank(smsYzm)) {
        return _controller2.default.showMessage("请输入验证码！");
      }
      var params = {
        account: telNum,
        login_type: 2,
        pwd: smsYzm
      };
      _controller2.default.ajax({
        url: '/login/mobile',
        type: 'POST',
        data: params
      }, function (res) {
        _controller2.default.setCookie('token', res.data.token || '');
        window.history.go(-1);
      });
    }
  }]);

  return Page;
}(_controller2.default);

new Page();

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[14]);