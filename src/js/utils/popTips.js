import $ from 'jquery';

// 弹窗提示
class Tips {

	constructor() {
		this.createHtml();
	}

	createHtml(){
		this.curTips = $('<div class="ui-message">');
		this.curTips.appendTo('body');
		this.timeTips = null;
	}

	show(msg, msgType){

		// 弹窗内容
		let contentBox = $('<div class="wrong-box">');

		// 关闭按钮
		let closeBtn = $('<i class="mask-close">');
		contentBox.append(closeBtn);
		closeBtn.on('click', () => { this.curTips.hide(); });

		let contentHtml = ''
		if (msgType) {

			contentHtml += '<p class="tips-icon icon1"></p>';

		} else {

			contentHtml += '<p class="tips-icon icon3"></p>';

			// 不显示关闭按钮
			closeBtn.hide();

			// 倒计时关闭、点击空白关闭
			clearTimeout(this.timeTips);
			this.timeTips = setTimeout(() => { this.curTips.hide(); }, 2000);
			this.curTips.on('click', () => { this.curTips.hide(); });
			
		}

		// 拼接弹窗内容
		contentHtml += '<p class="tips-txt">'+ msg +'</p>';

		// 显示输出
		contentBox.append(contentHtml);
		this.curTips.html(contentBox).show();

	}

	hide(){
		this.curTips.hide();
	}

}

var newTips = new Tips();

// loading加载
class Loading {

	constructor() {
		this.createHtml();
	}

	createHtml(){

		this.loadingBox = $('<div class="ui-loading">');

		let contentHtml = '';
			contentHtml += '<i class="loading rotate360"></i>';
			contentHtml += '<p>加载中</p>';

		// 显示输出
		this.loadingBox.append(contentHtml).appendTo('body');

	}

	show(){ this.loadingBox.show(); }

	hide(){ this.loadingBox.hide(); }

}

var newLoading = new Loading();

export {newTips, newLoading};

// module.exports = {

// 	// 错误提示
// 	showMessage: (msg) => {
// 		newTips.show(msg, 1);
// 	},

// 	// 关闭错误提示
// 	hideMessage: () => {
// 		newTips.hide();
// 	},

// 	// 定时提示
// 	showToast: (msg) => {
// 		newTips.show(msg, 0);
// 	},

// 	// 关闭定时提示
// 	hideToast: () => {
// 		newTips.hide();
// 	},

// 	// 显示加载
// 	showLoading: () => {
// 		if (!newLoading) newLoading = new Loading();
// 		newLoading.show();
// 	},

// 	// 隐藏加载
// 	hideLoading: () => {
// 		newLoading.hide();
// 	}

// }