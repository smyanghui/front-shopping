
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

  // ajax
  static ajax(options, success) {
    Controller.showLoading();
    options.success = options.success || function(data) {
      Controller.hideLoading();
      if (parseInt(data.code) >= 20000) {
        // 请求超时刷新页面
        // if (parseInt(data.code) == 20002) {
        //   //Controller.showMessage(data.message);
        //   setTimeout(function(){
        //     window.location.reload();
        //   }, 1000);
        // }
        // console.log(data);
        Controller.showMessage(data.msg);
      } else {
        success(data);
      }
    }
    options.error = options.error || function(data) {
      Controller.hideLoading();
      Controller.showMessage('网络异常，请稍后重试');
    }
    options.url = 'http://devapi.nfangbian.com' + options.url;

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