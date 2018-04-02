import $ from 'jquery';

// 翻页
class Ipage {

  constructor(options) {

    // 初始化
    this.options = $.extend({
      'dom': null,
      'pageTotal': 0, //总页数
      'perPage': 10, //显示几页
      'currentPage': 1, //当前页码
      'callback': null
    }, options || {});

    this.init();
  }

    init() {

      // 只有一页return
    if(this.options.pageTotal < 2) return;
    if(!this.options.dom) return;

    this.container = $('<ul class="ui_ipage">');
    $(this.options.dom).html(this.container);

    this.index = parseInt(this.options.currentPage);
    this.createPage();
    this.bindEvent();

  }

  createPage() {

    let sPage = '',
      arr = this.pageResult();
    this.container.empty();

    for (let i in arr){
      let _0 = arr[i][0],
      _1 = arr[i][1];
      if(!_1){
        sPage += '<li class="pointpage">'+ _0 +'</li>';
      } else if(_1 == this.index){
        sPage += '<li class="curpage">'+ _1 +'</li>';
      } else {
        sPage += '<li data-ipage="'+ _1 +'">'+ _0 +'</li>';
      }
    }

    this.container.append(sPage);
    }

    pageResult() {

        let total = parseInt(this.options.pageTotal),
            per = parseInt(this.options.perPage),
            index = this.index,
            start = 0,
            end = 0,
            middle = Math.ceil(per / 2);

        if(total <= per){
            start = 1;
            end = total;
        } else {
            if(index <= middle){
                start = 1;
                end = per;
            } else {
                if(index + middle <= total){
                    start = index - middle + 1;
                    end = index + parseInt(per / 2);
                }else{
                    start = total - per + 1;
                    end = total;
                }
            }
        }

        let arr = [];

        if(index > 1) arr.push(['&lt;', index - 1]);

        if(start == 2) arr.push(['1', 1]);
        if(start > 2){
            arr.push(['1', 1]);
            arr.push(['']);
        }

        let i = start;
        while(i <= end) arr.push([i, i++]);

        if(end == total - 1) arr.push([total, total]);
        if(end < total - 1){
            arr.push(['']);
            arr.push([total, total]);
        }

        if(index < total) arr.push(['&gt;', index + 1]);

        return arr;

    }

    pageTo(i) {
        let options = this.options;

        this.index = i ? parseInt(i < 1 ? 1 : i > options.pageTotal ? options.pageTotal : i) : this.index;
        options.callback && options.callback.call(this, this.index);
        this.createPage();
    }

    bindEvent() {
        var _this = this;

        _this.container.delegate('li', 'click', function(){
            let ipage = $(this).data('ipage');
            if (!ipage) return;
            _this.pageTo(ipage);
        });
    }

}

export default Ipage;