import $ from 'jquery';

// loading加载
class Loading {

  constructor() {
    this.createHtml();
  }

  createHtml(){

    this.loadingBox = $('<div class="ui_tips">');

    let loadingContent = '<div class="ui_loading">';

    // 显示输出
    this.loadingBox.append(loadingContent).appendTo('body');

  }

  show(){ this.loadingBox.show(); }

  hide(){ this.loadingBox.hide(); }

}

//var newLoading = ;

export default new Loading();