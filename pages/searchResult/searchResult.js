
const api = require('../../utils/api.js');

Page({
  data: {
    scrollHeight: 200, //scroll-view高度
    pageIndex: 0, //页码
    //totalRecord: 1, //图书总数
    //isInit: true, //是否第一次进入应用
    loadingMore: false, //是否正在加载更多
    pageData: [], //图书数据
  },
  
  输入书名:function(event){
    this.setData({
      searchKey:event.detail.value
    })
    console.log(this.searchKey)
  },
  按书名搜索:function(event){
    //获取搜索结果列表
    // wx.request({
    //   url: '',
    //   method:"GET",
    //   data: {
    //   },
    //   header: {
    //     'content-type': 'application/json' //默认值
    //   },
    //   dataType:JSON,
    //   success: function(res){
    //   }
    // })
    var list = [
      {authorName: "唐家三少",author_id: 2,bookid: 2,image: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",pubdate: "2020-5-17",rating: 6,title: "斗罗大陆"},
      {authorName: "唐家三少",author_id: 2,bookid: 3,image: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",rating: 6.6,title: "斗罗大陆2"},
    ]
    console.log("点击后跳转到category页面")
    wx.navigateTo({
      url: '../searchResult/searchResult?list='+JSON.stringify(list),
    })
  },

  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        //80为顶部搜索框区域高度 rpx转px 屏幕宽度/750
        this.setData({
          scrollHeight: res.windowHeight - (100 * res.windowWidth / 750)
        });
      }
    })
  },

  onLoad(option) {
    console.log("搜索结果页")
    var list = JSON.parse(option.list)
    this.setData({
      pageData:list
    })
    
  },

  //下拉请求数据
  scrollLowerEvent(e) {
    !this.data.loadingMore && requestData.call(this);
  },

  //跳转到详细页面
  toDetailPage(e) {
    const bid = e.currentTarget.dataset.id; //图书id [data-id]
    wx.navigateTo({
      url: `../detail/detail?id=${bid}`
    });
  }

});

function getPageData(){
  //TODO
  var _this=this;
  const i = this.categoryId;
  const start = this.data.pageIndex;

  this.setData({
    loadingMore: true,
    isInit: false
  });

  wx.showLoading({
    title: '加载中',
  });

  wx.request({
    
    url: `http://wesource.ink:8080/book/bookCategory/`+_this.data.categoryId, 
    data: {
    },
    header: {
      'content-type': 'application/json' 
    },
    success: function(res) {
      console.log("GET SUCCEESS!")
      this.setData({
        pageData:res.data.content,
      })
    }
  })
  
  
 
}
  /**api.requestPageData({
    q: "i",
    start: start
  }).then((data) => {
    wx.hideLoading();
    this.setData({
      loadingMore: false,
      pageData: this.data.pageData.concat([{"image": "http://p0.itc.cn/images01/20200520/a174fae3cb224d9abb25583597ef9cfa.jpeg", "id": "1", "title": "关于我不是人这一回事","rating":{"average":9.5},"author":{"1":"川原砾","2":"镰池和马"},"pubdate":"2000.5"},{"image": "http://img.mp.itc.cn/upload/20170715/c0019320eb544331b53c136c80ea24c1_th.jpg", "id": "2", "title": "关于你不是人这一回事","rating":{"average":0.0},"author":{"1":"川原乐","2":"镰也和马"},"pubdate":"2020.4"}]),
      pageIndex: start + 1,
      totalRecord: data.total
    }
  )}).catch(_ => {
    this.setData({
      loadingMore: false,
      totalRecord: 0
    });
    
    wx.hideLoading();
    
}
  )}
  **/

  
 