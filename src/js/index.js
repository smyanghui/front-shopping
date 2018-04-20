
class Index {

  constructor() {
    this.init();
    this.bindEvent();
  }

  init() {
    console.log(12345);
  }

  bindEvent() {
    //aa
  }

  // 渲染菜单
  renderMenu() {
    const pathName = window.location.pathname;
    console.log(pathName);
  }

}
console.log(123, IScroll);

var myScroll = new IScroll('#wrapper');
$("#myclik").click(function(){
	myScroll.scrollToElement("#poia")
})
// new Index();
