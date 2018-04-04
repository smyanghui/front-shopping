webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports) {

module.exports = window.$;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(11);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ipage = __webpack_require__(10);

var _ipage2 = _interopRequireDefault(_ipage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function Page() {
  _classCallCheck(this, Page);
};

var myPage = null;
myPage = new _ipage2.default({
  'dom': "#tablePageBox",
  'pageTotal': 5, //总页数
  'perPage': 10, //显示几页
  'currentPage': 1, //当前页码
  'callback': function callback(num) {
    console.log(num);
  }
});

/***/ }),
/* 10 */
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

// 翻页
var Ipage = function () {
    function Ipage(options) {
        _classCallCheck(this, Ipage);

        // 初始化
        this.options = _jquery2.default.extend({
            'dom': null,
            'pageTotal': 0, //总页数
            'perPage': 10, //显示几页
            'currentPage': 1, //当前页码
            'callback': null
        }, options || {});

        this.init();
    }

    _createClass(Ipage, [{
        key: 'init',
        value: function init() {

            // 只有一页return
            if (this.options.pageTotal < 2) return;
            if (!this.options.dom) return;

            this.container = (0, _jquery2.default)('<ul class="ui_ipage">');
            (0, _jquery2.default)(this.options.dom).html(this.container);

            this.index = parseInt(this.options.currentPage);
            this.createPage();
            this.bindEvent();
        }
    }, {
        key: 'createPage',
        value: function createPage() {

            var sPage = '',
                arr = this.pageResult();
            this.container.empty();

            for (var i in arr) {
                var _0 = arr[i][0],
                    _1 = arr[i][1];
                if (!_1) {
                    sPage += '<li class="pointpage">' + _0 + '</li>';
                } else if (_1 == this.index) {
                    sPage += '<li class="curpage">' + _1 + '</li>';
                } else {
                    sPage += '<li data-ipage="' + _1 + '">' + _0 + '</li>';
                }
            }

            this.container.append(sPage);
        }
    }, {
        key: 'pageResult',
        value: function pageResult() {

            var total = parseInt(this.options.pageTotal),
                per = parseInt(this.options.perPage),
                index = this.index,
                start = 0,
                end = 0,
                middle = Math.ceil(per / 2);

            if (total <= per) {
                start = 1;
                end = total;
            } else {
                if (index <= middle) {
                    start = 1;
                    end = per;
                } else {
                    if (index + middle <= total) {
                        start = index - middle + 1;
                        end = index + parseInt(per / 2);
                    } else {
                        start = total - per + 1;
                        end = total;
                    }
                }
            }

            var arr = [];

            if (index > 1) arr.push(['&lt;', index - 1]);

            if (start == 2) arr.push(['1', 1]);
            if (start > 2) {
                arr.push(['1', 1]);
                arr.push(['']);
            }

            var i = start;
            while (i <= end) {
                arr.push([i, i++]);
            }if (end == total - 1) arr.push([total, total]);
            if (end < total - 1) {
                arr.push(['']);
                arr.push([total, total]);
            }

            if (index < total) arr.push(['&gt;', index + 1]);

            return arr;
        }
    }, {
        key: 'pageTo',
        value: function pageTo(i) {
            var options = this.options;

            this.index = i ? parseInt(i < 1 ? 1 : i > options.pageTotal ? options.pageTotal : i) : this.index;
            options.callback && options.callback.call(this, this.index);
            this.createPage();
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var _this = this;

            _this.container.delegate('li', 'click', function () {
                var ipage = (0, _jquery2.default)(this).data('ipage');
                if (!ipage) return;
                _this.pageTo(ipage);
            });
        }
    }]);

    return Ipage;
}();

exports.default = Ipage;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[8]);