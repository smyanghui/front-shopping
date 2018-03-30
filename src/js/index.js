import validata from './utils/validate';
import controller from './utils/controller';


console.log(123)
function aa() {
	alert(123)
}
var abc = () => {
	console.log(456)
	var acc = validata.isNumber(123);
	console.log(acc)
}


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

$(function(){
  $("#successBtn").click(function(){
    controller.tips("123adfasdf")
  })

  $("#loadingBtn").click(function(){
    controller.loadingShow();
  })
})