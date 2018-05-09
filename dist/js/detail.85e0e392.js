webpackJsonp([4],{

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),

/***/ 7:
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

      // this.getItems();
      this.iScrollMenu = new IScroll('#iScrollDetail', { disableMouse: true, click: true, tap: true });
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
      var _this3 = this;

      _controller2.default.ajax({
        url: '/index/goods',
        type: 'POST'
      }, function (res) {
        var listArr = res.data.goods || [];
        for (var i in listArr) {
          var items = listArr[i].items || [];
          if (items.length == 0) continue;
          _this3.arrSort[listArr[i].category_id] = { name: listArr[i].category_name };
          var arrItem = [];
          for (var j in items) {
            var itemsArr = items[j];
            arrItem.push({
              itemId: 23,
              name: itemsArr.goods_name,
              num: 0,
              imgUrl: '/src/images/item.png', // itemsArr.goods_logo
              text: '送蜡烛10支，每个账号限买一个', // itemsArr.goods_desc
              price: itemsArr.goods_price
            });
          }
          _this3.arrItem[listArr[i].category_id] = arrItem;
        }

        _this3.renderSort();

        // setTimeout()

        // this.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
        // this.iScrollItem = new IScroll('#iScrollItem', { disableMouse: true, click: true, tap: true });

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
  }]);

  return Page;
}(_controller2.default);

new Page();

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[6]);