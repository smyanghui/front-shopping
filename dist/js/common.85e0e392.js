/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		5: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modal = __webpack_require__(3);

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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
module.exports = __webpack_require__(21);


/***/ }),

/***/ 20:
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
      this.menuTop = [{ num: '10', text: '选蛋糕', url: '/index.html' }, { num: '11', text: '我的订单', url: '/order.html' }, { num: '12', text: '商家详情', url: '/detail.html' }];
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this = this;
    }

    // 获取商品数据

  }, {
    key: 'getItems',
    value: function getItems() {
      _controller2.default.ajax({
        url: '/index/goods',
        type: 'POST'
      }, function (res) {
        //aa
      });
    }

    // 渲染顶部导航

  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var headerHTML = '';
      for (var i in this.menuTop) {
        var menu = this.menuTop[i];
        headerHTML += '<li><a href="' + menu.url + '"' + (menu.num == num ? ' class="cur"' : '') + '>' + menu.text + '</a></li>';
      }
      $("#headerBox").html(headerHTML);
    }
  }]);

  return Page;
}(_controller2.default);

new Page();

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = exports.Tips = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(4);

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

/***/ 4:
/***/ (function(module, exports) {

module.exports = window.$;

/***/ })

/******/ });