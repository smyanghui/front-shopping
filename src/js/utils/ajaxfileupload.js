import $ from 'jquery';
import Controller from './controller.js';

// 调用说明
// 'url' 上传地址
// 'data' 其他参数 json
// 'format' 文件格式 "xlsx, xls"
// 'size' 3 * 1024 * 1024
// 'formatTips' 错误格式提示
// 'callback' 回调

// 翻页
class upload {

	constructor(options) {

		if (!options) return;

		this.url = options.url || '';
		this.data = options.data || {};
		this.size = parseInt(options.size || 1) * 1024 * 1024; // 默认1M
		this.format = options.format || [];
		this.formatTips = options.formatTips || "格式不正确！";
		this.callback = options.callback || function(data){ console.log(data);};
		this.init();

	}

	init() {
		this.creatUpload();
		this.eventUpload();
	}

	creatUpload() {
		
		// 创建iframe
		this.iframe = $('<iframe name="uploadIframe" style="display: none;" />');
		this.iframe.appendTo('body');

		// 创建表单
		this.form = $('<form action="'+ this.url +'" method="post" enctype="multipart/form-data" target="uploadIframe" style="display: none;" />');
		this.form.appendTo('body');

		// 是否有其他参数
		if(this.data) {
			$.each(this.data, (k, v) => {
				this.form.append('<input type="text" name="'+ k +'" value="'+ v +'" />');
			});
		}

		// 创建上传控件
		this.inputFile = $('<input type="file" name="fileName" />');
		this.inputFile.appendTo(this.form).click();

	}

	eventUpload() {

		let _this = this;

		// 选择文件
		this.inputFile.on('change', function() {

			// 获取文件格式
			let fileName = $(this).val(),
				typeName = fileName.substring(fileName.lastIndexOf(".") + 1);

			//判断文件格式
			if (_this.format) {
				let isFormat = $.inArray(typeName, _this.format);
				if (isFormat == -1) {
					Controller.showMessage(_this.formatTips);
					return;
				}
			}

			// 判断文件大小
			let fileSize = this.files[0].size;
			if (fileSize > _this.size) {
				Controller.showMessage("文件大小超过上限！");
				return;
			}
	
			_this.form.submit();
		});

		// 监听是否返回数据
		this.iframe.on('load', function() {

			// 获取返回值
			let backTxt = $(this)[0].contentDocument.body.innerHTML;

			// 返回值转JSON
			let backJson = backTxt.substring(backTxt.indexOf("{"), (backTxt.lastIndexOf("}") + 1));
			backJson = JSON.parse(backJson);

			// 清除，回调
			_this.clearUpload();
			if (backJson) _this.callback(backJson);

		});

	}

	clearUpload() {
		this.iframe.remove();
		this.form.remove();
	}


}
export default upload;