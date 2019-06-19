var UIView = require("UIView");

var UIHomeAppCenter = cc.Class({
    extends: UIView,
    statics: {
        APPCENTER_HTTP_URL_HOME_KIDS_GAME: "",
        APPCENTER_HTTP_URL_HOME_SMALL_GAME: "",
    },

    properties: {
        tableView: cc.TableView,
        listItem: {
            default: [],
            type: cc.Object
        },

        oneCellNum: 0,
    },

    onLoad: function () {
        this.oneCellNum = 1;
        this.UnifyButtonSprite(this.btnNoAd);
        this.listItem.length = 0;
        // for (var i = 0; i < 10; i++) {
        //     var info = new cc.ItemInfo();
        //     info.title = "title";
        //     info.pic = "https://is5-ssl.mzstatic.com/image/thumb/Purple128/v4/e6/c3/25/e6c325c8-afe0-5a52-1f59-0e432d8f8651/AppIcon-1x_U007emarketing-85-220-9.png/230x0w.jpg";
        //     var store = cc.Source.WEIXIN;
        //     var appid = "wx2c5d3abfad26e8b1";
        //     if (appid != null) {
        //         this.listItem.push(info);
        //     }
        //     this.UpdateList();
        // }
        this.StartParserAppList();

        this.LayOut();
    },
    start: function () {

        // 
    },

    LayOut: function () {
        var ly = this.node.getComponent(cc.Layout);
        if (ly != null) {
            //有些按钮隐藏后重新布局
            ly._doLayout();
        }

    },


    UpdateList: function () {
        var size = this.node.getContentSize();
        this.tableView.uiViewParent = this;
        this.tableView.cellHeight = size.width / 4;

        // this.oneCellNum = Math.floor(size.width / this.tableView.cellHeight);
        this.tableView.oneCellNum = this.oneCellNum;

        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },

    StartParserAppList: function () {

        var urljson = UIHomeAppCenter.APPCENTER_HTTP_URL_HOME_KIDS_GAME;
        if (!cc.Config.main().APP_FOR_KIDS) {
            urljson = UIHomeAppCenter.APPCENTER_HTTP_URL_HOME_SMALL_GAME;
        }
        urljson = "https://6c69-lianlianle-shkb3-1259451541.tcb.qcloud.la/AppCenter/applist_home_kids.json";
        //  urljson = "https://6c69-lianlianle-shkb3-1259451541.tcb.qcloud.la/AppCenter/version.json?sign=a746e91337cac8983dde5d48e37c493e&t=1560913771";
        var filepath = cc.Common.RES_CONFIG_DATA + "/app_center/applist_home_kids";
        //
        // 加载json文件
        // cc.loader.load({ url: urljson, type: "json" }, function (err, rootJson)
        // cc.loader.load(urljson, function (err, rootJson)
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("HomeAppCenter error url=" + urljson);
                cc.Debug.Log("HomeAppCenter err:" + err.message || err);
            } else {
                this.ParseJsonData(rootJson.json);
            }
        }.bind(this));
    },

    ParseJsonData: function (json) {
        if (json == null) {
            cc.Debug.Log("HomeAppCenter:ParseJsonDatatest=null");
            return;
        }
        var applist = json.app;
        for (var i = 0; i < applist.length; i++) {
            var item = applist[i];
            var info = new cc.ItemInfo();
            info.title = cc.JsonUtil.GetItem(item, "title", "");
            info.pic = cc.JsonUtil.GetItem(item, "pic", "");
            var appid = item.APPID.appstore;
            if (cc.Common.main().isWeiXin) {
                appid = item.APPID.weixin;
            }
            //appid = "wx2c5d3abfad26e8b1";
            if (appid != null) {
                info.id = appid;
                if (cc.Config.main().appid == appid) {
                    continue;
                }
            }

            var url = item.URL.ios;
            if (url != null) {
                info.url = url;
            }

            if (appid != null) {
                this.listItem.push(info);
            }

        }
        // cc.Debug.Log("HomeAppCenter applist=" + applist.length);
        this.UpdateList();
    },

    OnClickBtnNoAd: function (event, customEventData) {
    },

}); 