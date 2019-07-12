/**
    针对不同模块建立初始化数据
    hugescreen1, // banner 巨幕
    navbar, // 导航条
    detail, // 活动详情
    datetime, // 活动时间
    activeaddress, // 活动地址
    signupform, // 用户信息表 报名
    speaker, // 演讲嘉宾
    schedule, // 活动 日程
    participants, // 参会人员
    retrieveorder, // 找回订单
    investigation, // 问卷调查
    contactus, // 联系我们
    ticket, // 买票 票信息
    VotingSurvey, // 投票调查
    FocusOnUs, // 关注我们
    ActiveFooter, // 页脚 关于我们等等
 *  */
let moduleID = 0;
class Module { // 一个没有具体名字的模块
    constructor(options){
        options = options || {};
        this.id = moduleID++;                       // 自增ID,先这样当做一个唯一不重复的ID
        this.isMounted = false;
        this.canMove = options.canMove || false;
        this.canDrop = options.canDrop || false;
        this.addUp = options.addUp || false;
        this.addRight = options.addRight || false;
        this.addBottom = options.addBottom || false;
        this.addLeft = options.addLeft || false;
        this.name = options.name;                   // 模块必须有名字
        this.alias = options.alias || options.name; // 模块的别名,展示的时候用
        // 模块的位置信息, 应该动态获取
        this.el = null;
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this.dragover = false;                      // 拖拽过程中 鼠标是否在该模块内

        this.dropUp = false;                        // 拖拽的时候鼠标是否最靠近模块上沿
        this.dropRight = false;                     // 拖拽的时候鼠标是否最靠近模块右沿
        this.dropBottom = false;                      // 
        this.dropLeft = false;                      // 

        this.dropIn = false;                        // 拖拽放开的时候鼠标是否在该模块内部
    }
}
class Column { // 一个模块的容器 一行中横向排列的容器, flex: 1
    constructor (){
        this.name = "column";
        this.id = "col-" + moduleID++;
        this.module = null;
    }
}
class Row { // 行容器 page中的一行
    constructor (options){
        options = options || {};
        this.name = "row";
        this.id = "row" + moduleID++;
        this.cols = [];
        this.backgroundColor = options.color || "";
        this.width = options.width || "1000px";
        this.canEdit = options.canEdit || false;
    }
}
class Page { // 页面容器, 整个可视区域
    constructor (){
        this.name = "page";
        this.id =  "page" + moduleID++;
        this.rows = [];
        this.backgroundColor = "";
    }
}
class HugeScreen extends Module {
    constructor (options){
        super(options);
        this.style = { // 默认样式
            bannerImgUrl: "",
            useBannerImg: true,
            displayNameAndTimeAndLocation: true,
            fontColor: "#FFF"
        };
        this.data = { // 默认数据
            name: "这是活动名称",
            time: {
                startDate: "2019/06/27",
                startTime: "09:00",
                endDate: "2019/06/28",
                endTime: "16:00",
            },
            location: "四川省成都市高地中心1栋1707",
        };
    }
 }

 console.log(JSON.stringify(new HugeScreen({
    name: "detail",
    canMove: true,
    canDrop: true,
    addRight: false,
    addLeft: false
 }), "\r", null))
