webpackJsonp([0],[
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
      this.arrItem = [{
        code: 'xiangcai',
        name: '湘菜',
        list: [{
          imgUrl: 'adfasdf',
          name: 'adf',
          text: 'asdfasdf'
        }]
      }];
      this.renderItem();
      this.listScroll = new IScroll('#iScrollItem');
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {}
    //aa


    // 渲染商品

  }, {
    key: 'renderItem',
    value: function renderItem() {

      var sortHTML = '';
      var itemHTML = '';
      for (var i in this.arrItem) {
        var items = this.arrItem[i];
        sortHTML += '<li id="' + items.code + '"><p>' + items.name + '</p></li>';

        var listHTML = '<ul>';
        for (var j in items.list) {
          var list = items.list[j];
          listHTML += '<li>' + list.name + '</li>';
        }
        listHTML += '</ul>';
        itemHTML += listHTML;
      }

      console.log(sortHTML, itemHTML);
    }
  }]);

  return Index;
}();

// new Index();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[0]);