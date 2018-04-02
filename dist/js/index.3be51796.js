webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

module.exports = window.$;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(7);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate = __webpack_require__(3);

var _validate2 = _interopRequireDefault(_validate);

var _controller = __webpack_require__(4);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(123);
function aa() {
  alert(123);
}
var abc = function abc() {
  console.log(456);
  var acc = _validate2.default.isNumber(123);
  console.log(acc);
};

var Page = function () {
  function Page() {
    _classCallCheck(this, Page);

    console('abc');
  }

  _createClass(Page, [{
    key: 'loadList',
    value: function loadList() {
      var testa = {
        url: '/api/member/policy/employeePolicyList',
        data: {
          page: this.pageInfo.page
        }
      };
    }
  }]);

  return Page;
}();

$(function () {
  $("#successBtn").click(function () {
    _controller2.default.tips("123adfasdf");
  });

  $("#loadingBtn").click(function () {
    _controller2.default.loadingShow();
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOBILE_REG = /^1\d{10}$/,
    EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
    CHINESE_REG = /^[\u4e00-\u9fa5]+$/,
    CHIENG_REG = /^[\u4e00-\u9fa5a-zA-Z]+$/,
    IDCARD_REG = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;

var validate = function () {
  function validate() {
    _classCallCheck(this, validate);
  }

  _createClass(validate, null, [{
    key: "isNumber",


    // 是否数值
    value: function isNumber(val) {
      return !isNaN(val);
    }

    // 是否为手机号码

  }, {
    key: "isMobile",
    value: function isMobile(val) {
      return MOBILE_REG.test(val);
    }

    // 是否为邮箱

  }, {
    key: "isEmail",
    value: function isEmail(val) {
      return EMAIL_REG.test(val);
    }

    // 是否为身份证

  }, {
    key: "isIdCard",
    value: function isIdCard(val) {
      return IDCARD_REG.test(val);
    }

    // 是否为金额

  }, {
    key: "isMoney",
    value: function isMoney(val) {
      return MONEY_REG.test(val);
    }

    // 中英文字符

  }, {
    key: "isChiEng",
    value: function isChiEng(val) {
      return CHIENG_REG.test(val);
    }

    // 是否为中文

  }, {
    key: "isChinese",
    value: function isChinese(val) {
      return CHINESE_REG.test(val);
    }
  }]);

  return validate;
}();

exports.default = validate;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//import { Message, Loading, Toast } from 'js/components';


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _tips2 = __webpack_require__(5);

var _tips3 = _interopRequireDefault(_tips2);

var _loading = __webpack_require__(6);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  // 加载效果
  // static showLoading(msg) {
  //  newLoading.show();
  // }
  // static hideLoading() {
  //  newLoading.hide();
  // }

  // 提示信息
  // static showMessage(msg) {
  //  newTips.show(msg, 1);
  // }
  // static hideMessage() {
  //  newTips.hide();
  // }

  _createClass(Controller, null, [{
    key: 'tips',
    value: function tips(msg) {
      var mType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warning';
      var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

      _tips3.default.show(msg, mType, t);
    }

    // 定时提示
    // static showToast(msg) {
    //  newTips.show(msg, 0);
    // }
    // static hideToast() {
    //  newTips.hide();
    // }

  }, {
    key: 'loadingShow',
    value: function loadingShow() {
      _loading2.default.show();
    }

    // // 加载效果
    // static showLoading(...data) {
    //  if (!this.loading) {
    //    this.loading = new Loading();
    //  }
    //  this.loading.show(...data);
    // }
    // static hideLoading() {
    //  if (this.loading) this.loading.hide();
    // }

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

    // // 定时提示
    // static showToast(...data) {
    //  if (!this.Toast) {
    //    this.Toast = new Toast();
    //  }
    //  this.Toast.show(...data);
    // }

    // static hideToast() {
    //  this.Toast.hide();
    // }

    // 获取表单值

  }, {
    key: 'getFormData',
    value: function getFormData(selector) {
      selector = selector || 'input, select, textarea';
      var data = {};
      (0, _jquery2.default)(selector).each(function (index, el) {
        if (el.value.trim().length) data[el.name] = el.value;
      });
      return data;
    }

    // ajax

  }, {
    key: 'ajax',
    value: function ajax(options, success, error) {

      options.success = options.success || function (data) {
        Controller.hideLoading();
        if (parseInt(data.code) >= 20000) {
          // 请求超时刷新页面
          if (parseInt(data.code) == 20002) {
            //Controller.showMessage(data.message);
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
          console.log(data);
          Controller.showMessage(data.message);
        } else {
          success(data);
        }
      };

      options.error = options.error || function (data) {
        console.log(data);
        //Controller.hideLoading();
        Controller.showMessage('网络异常，请稍后重试');
      };

      _jquery2.default.ajax(options);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 弹层提示信息
var Tips = function () {
    function Tips() {
        _classCallCheck(this, Tips);

        this.createHtml();
    }

    _createClass(Tips, [{
        key: 'createHtml',
        value: function createHtml() {
            this.curTips = (0, _jquery2.default)('<div class="ui_tips">');
            this.tipsBox = (0, _jquery2.default)('<div class="ui_tips_box">'); // flex方便居中
            this.curTips.appendTo('body');
            this.tipsBox.appendTo(this.curTips);
            this.timeTips = null;
        }
    }, {
        key: 'show',
        value: function show(msg, mType, t) {
            var _this = this;

            // 提示内容
            var contentBox = (0, _jquery2.default)('<div class="ui_tips_content">');

            // 关闭按钮
            // let closeBtn = $('<i class="mask-close">');
            // contentBox.append(closeBtn);
            // closeBtn.on('click', () => { this.curTips.hide(); });

            //

            // 默认警告
            var iconType = '<i class="iconfont icon-browser"></i>';

            // 错误提示
            if (mType == 'wrong') iconType = '<i class="iconfont icon-browser"></i>';

            // 成功提示
            if (mType == 'success') iconType = '<i class="iconfont icon-browser"></i>';

            var contentHtml = '<p class="ui_tips_txt">' + iconType + msg + '</p>';
            // if (msgType) {

            //   contentHtml += '<p class="aa"></p>';

            // } else {

            //   contentHtml += '<p class="tips-icon icon3"></p>';

            // 不显示关闭按钮
            // closeBtn.hide();

            // 倒计时关闭和点击空白关闭
            clearTimeout(this.timeTips);
            this.timeTips = setTimeout(function () {
                _this.curTips.hide();
            }, t * 1000);
            this.curTips.on('click', function () {
                _this.curTips.hide();
            });

            //}


            // 显示输出
            contentBox.html(contentHtml);
            this.tipsBox.html(contentBox);
            this.curTips.show();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.curTips.hide();
        }
    }]);

    return Tips;
}();

exports.default = new Tips();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// loading加载
var Loading = function () {
  function Loading() {
    _classCallCheck(this, Loading);

    this.createHtml();
  }

  _createClass(Loading, [{
    key: 'createHtml',
    value: function createHtml() {

      this.loadingBox = (0, _jquery2.default)('<div class="ui_tips">');

      var loadingContent = '<div class="ui_loading">';

      // 显示输出
      this.loadingBox.append(loadingContent).appendTo('body');
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

//var newLoading = ;

exports.default = new Loading();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[1]);