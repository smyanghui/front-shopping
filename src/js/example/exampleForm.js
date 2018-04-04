import ipage from '../utils/ipage';


class Page {
  //aa
}

let myPage = null;
myPage = new ipage({
  'dom': "#tablePageBox",
  'pageTotal': 5, //总页数
  'perPage': 10, //显示几页
  'currentPage': 1, //当前页码
  'callback': num => {
    console.log(num);
  }
})