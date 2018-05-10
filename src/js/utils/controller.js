
import { Tips, Loading } from './modal.js';

const tips = new Tips();
const loading = new Loading();

class Controller {

  constructor() {}

  // 提示信息，默认为提示错误信息
  static showMessage(msg, err = 0) { tips.show(msg, err) }
  static hideMessage() { tips.hide() }

  // 加载中
  static showLoading() { loading.show() }
  static hideLoading() { loading.hide() }

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
  static getFormData(selector) {
    selector = selector || 'input, select, textarea';
    let data = {};
    $(selector).each((index, el) => {
      if (el.value.trim().length) data[el.name] = el.value;
    });
    return data;
  }

  // ajax封装
  static ajax(options, success) {
    Controller.showLoading();
    options.success = options.success || function(data) {
      Controller.hideLoading();
      if (data.code == 0) {
        success(data);
      } else {
        if (data.code == 100008) {
          // Controller.showMessage('登录超时，请重新登录！');
          window.location.href='/login.html';
        } else {
          Controller.showMessage(data.msg);
        }
      }
    }
    options.error = options.error || function(data) {
      Controller.hideLoading();
      Controller.showMessage('网络异常，请稍后重试');
    }
    options.url = 'http://devapi.nfangbian.com' + options.url;

    $.ajax(options);
  }

  // 获取cookie
  static getCookie(name) {
    let r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
    let m = document.cookie.match(r);
    return (!m ? "" : decodeURIComponent(m[2]));
  }

  // 设置cookie
  static setCookie(name, v, path, expire, domain) {
    let s = name + "=" + encodeURIComponent(v) + "; path=" + (path || '/') + (domain ? ("; domain=" + domain) : '');
    if (expire > 0) {
      let d = new Date();
      d.setTime(d.getTime() + expire * 1000);
      s += ";expires=" + d.toGMTString();
    }
    document.cookie = s;
  }

  // 删除cookie
  static delCookie(name, path, domain) {
    if (arguments.length == 2) {
      domain = path;
      path = "/";
    }
    document.cookie = name + "=;path=" + path + ";" + (domain ? ("domain=" + domain + ";") : '') + "expires=Thu, 01-Jan-70 00:00:01 GMT";
  }

  // 获取url指定参数的值
  static getQuery(key) {
    return this.getQueryParams()[key];
  }

  // 格式化金额
  static formatMoney(val) {
    let arrVal = String(val).split('.');
    // arrVal[1]?
    // return this.getQueryParams()[key];
  }

  // 获取url参数对象
  static getQueryParams() {
    let params = {};

    if(location.search.length == 0) return params;


    let keyValPairs = location.search.substr(1).split('&'),
      tempArr;

    for (let i = 0; i < keyValPairs.length; i++) {
      tempArr = keyValPairs[i].split('=');
      params[tempArr[0]] = decodeURIComponent(tempArr[1] || '');
    }

    return params;
  }

}

export default Controller;