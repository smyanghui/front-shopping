webpackJsonp([4],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(6);


/***/ }),
/* 3 */
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
      this.token = window.TOKEN;

      // 分类数据
      this.arrSort = {
        // 11: {name: '优惠'},
        // 12: {name: '招牌'},
      };

      // 商品数据
      this.arrItem = {
        // // key为分类ID
        // 11: [
        //   {
        //     itemId: 13,
        //     name: '精品生日水果蛋糕13',
        //     num: 0,
        //     imgUrl: '/src/images/item.png',
        //     text: '送蜡烛10支，每个账号限买一个',
        //     price: '100.00',
        //     isSpec: 1,
        //     groupId: '', // 只存放在this.curSpec中
        //     selectSpec: [
        //       {id: '12,14', price: '123', num: 2, specTxt: '12寸/咸味'},
        //       {id: '11,14', price: '120', num: 1, specTxt: '13寸/甜味'},
        //     ],
        //     spec: [{
        //       "spec_group_id": 11,
        //       "spec_group_name": "尺寸",
        //       "spec_group_beizhu": "蛋糕尺寸",
        //       "spec_group_list": [
        //         {"spec_id": "13", "spec_name": "8寸"},
        //         {"spec_id": "12", "spec_name": "6寸"},
        //         {"spec_id": "14", "spec_name": "10寸"},
        //         {"spec_id": "15", "spec_name": "12寸"}
        //       ]
        //     }],
        //     group: {
        //       '13': {"skuid": 1, "price": 112},
        //       '12': {"skuid": 1, "price": 113},
        //       '14,16': {"skuid": 1, "price": 116},
        //     },
        //   }
        // ],
      };

      // 购物车数据
      this.arrCart = {};

      // 当前规格商品
      this.curSpec = null;

      // 初始化数据
      this.arrSort = JSON.parse(sessionStorage.arrSort || '{}');
      this.arrItem = JSON.parse(sessionStorage.arrItem || '{}');
      this.arrCart = JSON.parse(sessionStorage.arrCart || '{}');
      // 为空去获取数据，有数据则直接渲染
      if ($.isEmptyObject(this.arrSort) || $.isEmptyObject(this.arrItem)) {
        this.rItems();
      } else {
        this.renderSort();
        this.renderItem();
      }
      this.renderCart();
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this3 = this;

      var _this = this;

      // 查看购物车
      $("#viewCart").click(function () {
        $("#cartMask").show();
        $("#cartOutBox").css("bottom", 45);
      });

      // 点击空白隐藏购物车
      $("#cartMask").click(function () {
        $(this).hide();
        $("#cartOutBox").css("bottom", '-100%');
      });

      // 选择分类滚动到对应商品
      $("#iScrollSort").on('click', 'li', function () {
        var sid = $(this).data("sortid");
        $(this).addClass('cur').siblings('li').removeClass();
        _this.iScrollItem.scrollToElement("#itemarr_" + sid, 500);
      });

      // 选择商品列表中商品
      $("#iScrollItem").on('click', ".J_item_choice i", function () {
        var isAdd = $(this).hasClass("icon-add");
        var curLi = $(this).closest('li');
        _this.changeCart(curLi.data('sortid'), curLi.data('itemid'), isAdd);
      });

      // 打开选规格
      $("#iScrollItem").on('click', ".J_item_choice span", function () {
        var curLi = $(this).closest('li');
        _this.openSpec(curLi.data('sortid'), curLi.data('itemid'));
      });

      // 选择规格
      $("#specBox").on('click', "span", function () {
        if ($(this).hasClass("cur")) return;
        $(this).addClass('cur').siblings('span').removeClass();
        _this.curChoiseSpec();
      });

      // 确认选择规格
      $("#choiceSpecOK").click(function () {
        return _this3.choiceSpecSave();
      });

      // 修改购物车数量
      $("#cartItemBox").on('click', '.J_cart_choice i', function () {
        var isAdd = $(this).hasClass("icon-add");
        var curLi = $(this).closest('li');
        _this.updateCart(curLi.data('sortid'), curLi.data('itemid'), curLi.data('specid'), isAdd, $(this).siblings('strong'));
      });

      // 清空购物车
      $("#cleanCart").click(function () {
        return _this3.cleanCart();
      });

      // 去结算
      $("#settlement").click(function () {
        return _this3.settlement();
      });
    }

    // 获取商品数据

  }, {
    key: 'rItems',
    value: function rItems() {
      var _this4 = this;

      _controller2.default.ajax({
        url: '/index/goods',
        type: 'GET'
      }, function (res) {
        var listArr = res.data && res.data.goods || [];
        _this4.formatItems(listArr);
      });
    }

    // 格式化数据

  }, {
    key: 'formatItems',
    value: function formatItems(listArr) {
      for (var i in listArr) {
        var items = listArr[i].items || [];
        if (items.length == 0) continue;
        this.arrSort[listArr[i].category_id] = { name: listArr[i].category_name };
        var arrItem = [];
        for (var j in items) {
          var itemsList = items[j];
          var group = {};
          for (var k in itemsList.goods_skuid) {
            var sku = itemsList.goods_skuid[k];
            group[sku.spec_ids] = { skuid: sku.skuid, price: sku.goods_price };
          }
          arrItem.push({
            itemId: itemsList.id,
            name: itemsList.goods_name,
            num: 0,
            imgUrl: itemsList.goods_logo || '/src/images/item.png',
            text: itemsList.goods_desc || '送蜡烛10支，每个账号限买一个',
            price: itemsList.goods_price,
            isSpec: itemsList.is_spec,
            spec: itemsList.spec_group_info,
            selectSpec: [],
            group: group
          });
        }
        this.arrItem[listArr[i].category_id] = arrItem;
      }
      this.saveSession();
      this.renderSort();
      this.renderItem();
    }

    // 渲染分类

  }, {
    key: 'renderSort',
    value: function renderSort() {
      var _this5 = this;

      var itemHTML = '';
      for (var i in this.arrSort) {
        var item = this.arrSort[i];
        itemHTML += '<li data-sortid="' + i + '" id="sort_' + i + '"' + (i == 0 ? ' class="cur"' : '') + '><p>' + item.name + '</p></li>';
      }
      $("#sortBox").html(itemHTML);
      setTimeout(function () {
        _this5.iScrollMenu = new IScroll('#iScrollSort', { disableMouse: true, click: true, tap: true });
      }, 200);
    }

    // 渲染商品

  }, {
    key: 'renderItem',
    value: function renderItem() {
      var _this6 = this;

      var itemHTML = '';
      for (var i in this.arrItem) {
        var arrItem = this.arrItem[i] || [];
        if (arrItem.length == 0) continue;
        // 点击左侧分类定位用
        itemHTML += '<ul id="itemarr_' + i + '">';
        for (var j in arrItem) {
          var item = arrItem[j];
          // 格式化价格
          var price = _controller2.default.formatMoney(item.price);
          var priceHtml = '<i>\uFFE5</i>' + price;
          if (item.isSpec == 1) priceHtml += '<i>起</i>';
          // 是否需要选规格
          var choiceHtml = '<i class="iconfont icon-minus"></i><strong>' + item.num + '</strong><i class="iconfont icon-add"></i>';
          if (item.isSpec == 1) choiceHtml = '<span>选规格</span>';
          itemHTML += '<li id="item_' + item.itemId + '" data-sortid="' + i + '" data-itemid="' + item.itemId + '">\n          <p class="item_img_box"><a href="detail.html"><img src="' + item.imgUrl + '" /></a></p>\n          <div class="item_infor_box">\n            <p class="item_name">' + item.name + '</p>\n            <div class="item_remark">' + item.text + '</div>\n            <div class="price_box">\n              <p class="item_choice J_item_choice">' + choiceHtml + '</p>\n              <p class="item_price">' + priceHtml + '</p>\n            </div>\n          </div>\n        </li>';
        }
        itemHTML += '</ul>';
      }
      $("#itemBox").html(itemHTML);
      setTimeout(function () {
        _this6.iScrollItem = new IScroll('#iScrollItem', { disableMouse: true, click: true, tap: true });
      }, 200);
    }

    // 获取购物车数据

  }, {
    key: 'rCart',
    value: function rCart() {
      var _this7 = this;

      var param = {
        token: this.token,
        shopid: '',
        is_check: ''
      };
      _controller2.default.ajax({
        url: '/cart/list',
        type: 'POST',
        data: param
      }, function (res) {
        _this7.renderCart();
      });
    }

    // 渲染购物车

  }, {
    key: 'renderCart',
    value: function renderCart() {
      var itemHTML = '';
      var totalNum = 0;
      var totalPrice = 0;
      for (var i in this.arrCart) {
        var item = this.arrCart[i];
        if (!item) continue;
        if (item.isSpec == 1) {
          for (var j in item.selectSpec) {
            var select = item.selectSpec[j];
            if (select.num > 0) {
              item.price = select.price || '0';
              item.num = select.num;
              item.specId = select.id || 'aaa';
              totalNum += parseInt(select.num);
              totalPrice += parseInt(select.price) * parseInt(select.num);
              itemHTML += this.cartHtml(item);
            }
          }
        }
        if (item.isSpec != 1 && item.num > 0) {
          totalNum += parseInt(item.num);
          totalPrice += parseInt(item.price) * parseInt(item.num);
          itemHTML += this.cartHtml(item);
        }
      }
      if (itemHTML == '') itemHTML = '<li>无商品！</li>';
      $("#cartItemBox").html(itemHTML);
      totalPrice = _controller2.default.formatMoney(totalPrice);
      $("#viewCart").html('\u8D2D' + totalNum + ' <span>\uFFE5' + totalPrice + '</span>');
    }

    // 购物车HTML

  }, {
    key: 'cartHtml',
    value: function cartHtml(item) {
      var price = _controller2.default.formatMoney(item.price);
      return '<li data-sortid="' + item.sortId + '" data-itemid="' + item.itemId + '" data-specid="' + (item.isSpec == 1 ? item.specId : '0') + '">\n      <div class="cart_item">\n        <p class="cart_item_tit">' + item.name + '</p>\n        <p class="cart_item_sm">' + price + '</p>\n      </div>\n      <div class="cart_choice J_cart_choice">\n        <i class="iconfont icon-minus"></i>\n        <strong>' + item.num + '</strong>\n        <i class="iconfont icon-add"></i>\n      </div>\n    </li>';
    }

    // 加入/移出购物车

  }, {
    key: 'changeCart',
    value: function changeCart(aid, cid, isadd) {
      var arrItem = this.arrItem[aid];
      var curNum = 0;
      var arrItemIndex = 0;
      for (var i in arrItem) {
        if (arrItem[i].itemId == cid) {
          curNum = parseInt(arrItem[i].num);
          arrItemIndex = i;
          break;
        }
      }
      var resNum = isadd ? ++curNum : --curNum;
      if (resNum < 0 || resNum > 99) return;
      this.arrItem[aid][arrItemIndex].num = resNum;
      // 更新加入购物车
      var arrCart = this.arrCart;
      if (resNum > 0) {
        arrCart[cid] = this.arrItem[aid][arrItemIndex];
        arrCart[cid].sortId = aid;
      } else {
        arrCart[cid] = null;
      }
      this.saveSession();
      $("#item_" + cid).find("strong").text(resNum);
      this.renderCart();
    }

    // 打开选规格

  }, {
    key: 'openSpec',
    value: function openSpec(sortid, itemid) {
      var arrItem = this.arrItem[sortid];
      for (var i in arrItem) {
        if (arrItem[i].itemId == itemid) this.curSpec = arrItem[i];
      }
      this.curSpec['sortId'] = sortid;
      var specHTML = '';
      for (var _i in this.curSpec.spec) {
        var spec = this.curSpec.spec[_i];
        specHTML += '<p>' + spec.spec_group_name + '</p>';
        specHTML += '<p>';
        for (var j in spec.spec_group_list) {
          var specSku = spec.spec_group_list[j];
          // specHTML += `<span data-specid="${arrSpec[i].id}" data-specprice="${arrSpec[i].price}">${arrSpec[i].name}</span>`;
          specHTML += '<span data-specid="' + specSku.spec_id + '"' + (j == 0 ? ' class="cur"' : '') + '>' + specSku.spec_name + '</span>';
        }
        specHTML += '</p>';
      }
      $("#specTit").text(this.curSpec.name);
      $("#specBox").html(specHTML);
      this.curChoiseSpec();
      $("#choiceSpec").show();
    }

    // 选择规格更新curSpec和价格

  }, {
    key: 'curChoiseSpec',
    value: function curChoiseSpec() {
      var specIds = [];
      $("#specBox span.cur").map(function () {
        var specid = $(this).data('specid');
        specIds.push(specid);
      });
      // 获取组合价格
      var groupId = specIds.join(',');
      this.curSpec['groupId'] = groupId;
      var group = this.curSpec.group[groupId];
      var groupPrice = '缺货';
      if (group) groupPrice = _controller2.default.formatMoney(group.price);
      $("#choiceSpecPrice").html('<i>\uFFE5</i>' + groupPrice);
    }

    // 确认规格

  }, {
    key: 'choiceSpecSave',
    value: function choiceSpecSave() {
      var curSpec = this.curSpec;
      // 更新当前规格商品信息
      var selectIndex = -1;
      for (var i in curSpec.selectSpec) {
        if (curSpec.selectSpec[i].id == curSpec.groupId) selectIndex = i;
      }
      var groupInfo = curSpec.group[curSpec.groupId];
      if (selectIndex == -1) {
        this.curSpec.selectSpec.push({ id: curSpec.groupId, price: groupInfo.price || '0', num: 1, specTxt: groupInfo.name || '未命名' });
      } else {
        this.curSpec.selectSpec[selectIndex].num++;
      }
      // 更新购物车和商品列表信息
      var arrItem = this.arrItem[curSpec.sortId];
      for (var _i2 in arrItem) {
        if (arrItem[_i2].itemId == curSpec.itemId) this.arrItem[curSpec.sortId][_i2] = this.curSpec;
      }
      this.arrCart[curSpec.itemId] = this.curSpec;
      this.saveSession();
      $("#choiceSpec").hide();
      this.renderCart();
    }

    // 修改购物车

  }, {
    key: 'updateCart',
    value: function updateCart(aid, cid, sid, isadd, cartdom) {
      var curNum = parseInt(cartdom.text());
      var resNum = isadd ? ++curNum : --curNum;
      // let isDel = confirm('是否从购物车中删除？');
      // if (!isDel) return;
      var itemIndex = -1,
          specIndex = -1;
      for (var i in this.arrItem[aid]) {
        var itemList = this.arrItem[aid][i];
        if (itemList.itemId == cid) itemIndex = i;
        // 查找规格商品
        if (itemList.itemId == cid && itemList.isSpec == 1) {
          for (var j in itemList.selectSpec) {
            if (itemList.selectSpec[j].id == sid) specIndex = j;
          }
        }
      }
      if (specIndex > -1) this.arrItem[aid][itemIndex].selectSpec[specIndex].num = resNum;
      this.arrCart[cid].num = this.arrItem[aid][itemIndex].num = resNum;
      $("#item_" + cid).find("strong").text(resNum);
      // cartdom.text(resNum);
      this.saveSession();
      this.renderCart();
    }

    // 清空购物车

  }, {
    key: 'cleanCart',
    value: function cleanCart() {
      var isDel = confirm('是否清空购物车？');
      if (!isDel) return;
      for (var i in this.arrCart) {
        for (var j in this.arrItem[i]) {
          var item = this.arrItem[i][j];
          if (item.isSpec == 1) item.selectSpec = [];
          item.num = 0;
        }
      }
      this.arrCart = {};
      this.saveSession();
      window.location.reload();
      // 登录状态更新服务端数据
      // if (!this.token) return;
      // Controller.ajax({
      //   url: '/cart/clearall',
      //   type: 'POST',
      //   data: {token: this.token, shopid: ''},
      // }, (res) => {
      //   console.log(res);
      // });
    }

    // 去结算

  }, {
    key: 'settlement',
    value: function settlement() {
      var _this8 = this;

      var arrItem = [];
      for (var i in this.arrCart) {
        var item = this.arrCart[i];
        if (item.isSpec == 1) {
          for (var j in item.selectSpec) {
            var spec = item.selectSpec[j];
            if (spec.num > 0) arrItem.push({ goods_id: i, spec_ids: spec.id, cart_num: spec.num });
          }
        }
        if (item.isSpec != 1 && item.num > 0) {
          arrItem.push({ goods_id: i, spec_ids: 0, cart_num: item.num });
        }
      }
      if (arrItem.length == 0) {
        _controller2.default.showMessage("购物车中还没有商品！");
        return;
      }
      if (!this.token) window.location.href = './login.html';
      var param = {
        token: this.token,
        goods_info_type: 2, // 1常规字符串，2json格式字符串
        goods_info: JSON.stringify(arrItem),
        is_allow_fail: '' // 是否允许部分失败 0允许(默认)，1不允许
      };
      _controller2.default.ajax({
        url: '/cart/batchadd',
        type: 'POST',
        data: param,
        dataType: "json"
      }, function (res) {
        _this8.arrItem = {};
        _this8.arrCart = {};
        _this8.saveSession();
        window.location.href = './confirm.html';
      });
    }

    // 暂存数据

  }, {
    key: 'saveSession',
    value: function saveSession() {
      sessionStorage.arrSort = JSON.stringify(this.arrSort);
      sessionStorage.arrItem = JSON.stringify(this.arrItem);
      sessionStorage.arrCart = JSON.stringify(this.arrCart);
    }
  }]);

  return Page;
}(_controller2.default);

new Page();

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[2]);