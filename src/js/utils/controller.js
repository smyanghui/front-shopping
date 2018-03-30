import $ from 'jquery';
//import { Message, Loading, Toast } from 'js/components';
import tips from './tips.js';
import loading from './loading.js';
class Controller {

  constructor() {}

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

  static tips(msg, mType = 'warning', t = 3) {
    tips.show(msg, mType, t);
  }

  // 定时提示
  // static showToast(msg) {
  //  newTips.show(msg, 0);
  // }
  // static hideToast() {
  //  newTips.hide();
  // }

  static loadingShow() {
    loading.show();
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
  static getFormData(selector) {
    selector = selector || 'input, select, textarea';
    let data = {};
    $(selector).each((index, el) => {
      if (el.value.trim().length) data[el.name] = el.value;
    });
    return data;
  }

  // ajax
  static ajax(options, success, error) {

    options.success = options.success || function(data) {
      Controller.hideLoading();
      if (parseInt(data.code) >= 20000) {
        // 请求超时刷新页面
        if (parseInt(data.code) == 20002) {
          //Controller.showMessage(data.message);
          setTimeout(function(){
            window.location.reload();
          }, 1000);
        }
        console.log(data);
        Controller.showMessage(data.message);
      } else {
        success(data);
      }
    }

    options.error = options.error || function(data) {
      console.log(data);
      //Controller.hideLoading();
      Controller.showMessage('网络异常，请稍后重试');
    }

    $.ajax(options);
  }

  // 获取url指定参数的值
  static getQuery(key) {
    return this.getQueryParams()[key];
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