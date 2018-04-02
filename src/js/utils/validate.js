const INTEGER = /^\d+$/; // 是否0/正整数
const MONEY = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/; // 金额
const MOBILE = /^1\d{10}$/; // 手机号码
const EMAIL = /^([\w-\.])+@([\w-])+(\.[a-zA-Z]{2,4}){1,2}$/; // 邮箱
const ORGANIZATION = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/; // 织机构代码
const UNISOCIALCRECODE = /^[a-zA-Z0-9]{18}$/; // 统一社会信用代码
const ENGNUM = /^[0-9a-zA-Z]+$/; // 数字和英文
const USERNAME = /^[^~!@#$%^*+|}{"?/'\\=`]*$/; // 用户姓名（非特殊字符）
const CHINESE = /^[\u4e00-\u9fa5\s]+$/; // 中文（含空格）
const IDCARD = /(^\d{15})|(^\d{17}(\d|X|x)$)/; // 身份证
const URL = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; // 网址

const trim = function(val){
  return String.prototype.trim ? val.trim() : val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

class Validate {

  // 是否为空
  static isBlank(val) {
    if (val == undefined || val == '' || val == null) return true;
    return trim(val + '') == '';
  }

  // 是否是数值(正负0小数)
  static isNumber(val) {
    return val != null && !isNaN(val);
  }

  static isInteger(val) {
    return INTEGER.test(val);
  }

  static isMoney(val) {
    return MONEY.test(val);
  }

  static isMobile(val) {
    return MOBILE.test(val);
  }

  static isEmail(val) {
    return EMAIL.test(val);
  }

  static isOrganizationCode(val) {
    return ORGANIZATION.test(val);
  }

  static isUniSocialCreCode(val) {
    return UNISOCIALCRECODE.test(val);
  }

  static isEngNum(val) {
    return ENGNUM.test(val);
  }

  static isName(val) {
    return USERNAME.test(val);
  }

  static isChinese(val) {
    return CHINESE.test(val);
  }

  static isIdCardSimple(val) {
    return IDCARD.test(val);
  }

  static isUrl(val) {
    return URL.test(val);
  }

  // 身份证校验
  static isIdCard(val) {
    let num = val.toUpperCase();
    switch (num.length) {
      case 15:
        if (!this.isInteger(num)) return false;

        let re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        let arrSplit = num.match(re);

        //检查生日日期是否正确
        let dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);

        let bGoodDay = false;
        bGoodDay = dtmBirth.getYear() == Number(arrSplit[2]) && dtmBirth.getMonth() + 1 == Number(arrSplit[3]) && dtmBirth.getDate() == Number(arrSplit[4]);
        return bGoodDay;

      case 18:
        if (!this.isInteger(num.substr(0, 17))) return false;

        let arrInt = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']; //加权因子
        let code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2', '1']; //效验码

        let checknum = 0;
        for (let i = 0; i < 17; i++) {
          checknum += num.substr(i, 1) * arrInt[i];
        }
        return code[checknum % 11] == num.substr(17, 1);

      default:
        return false;
    }
  }

}

export default Validate;
