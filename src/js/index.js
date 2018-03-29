import validata from './utils/validate';
console.log(123)
function aa() {
	alert(123)
}
var abc = () => {
	console.log(456)
	var acc = validata.isNumber(123);
	console.log(acc)
}

abc();

class Page {

  constructor() {
  	console('abc')
  }

  loadList() {
    let testa = {
      url: '/api/member/policy/employeePolicyList',
      data: {
        page: this.pageInfo.page
      }
    }

  }


}