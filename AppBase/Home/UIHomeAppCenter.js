var UIView = require("UIView");
var SettingViewController = require("SettingViewController");
var HomeViewController = require("HomeViewController");

var UIHomeAppCenter = cc.Class({
    extends: UIView,
    statics: {
        // 声明静态变量
        AD_JSON_FILE_KIDS: "applist_home_kids.json",
        AD_JSON_FILE_SMALL_GAME: "applist_home_minigame.json",

        //http://www.mooncore.cn/moonma/app_center/applist_home_smallgame.json
        APPCENTER_HTTP_URL_HOME_SMALL_GAME: "http://www.mooncore.cn/moonma/app_center/" + UIHomeAppCenter.AD_JSON_FILE_SMALL_GAME,

        //http://www.mooncore.cn/moonma/app_center/applist_home_kids.json
        APPCENTER_HTTP_URL_HOME_KIDS_GAME: "http://www.mooncore.cn/moonma/app_center/" + UIHomeAppCenter.AD_JSON_FILE_KIDS,
    },

    properties: {
        tableView: {
            default: null,
            type: cc.TableView
        },
        oneCellNum: 0,
        listItem: {
            default: [],
            type: cc.Object
        },
    },

    onLoad: function () {
        this.oneCellNum = 1;
        this.UnifyButtonSprite(this.btnNoAd);
        this.StartParserAppList();
        this.LayOut();
    },

    LayOut: function () {
        var ly = this.node.getComponent(cc.Layout);
        if (ly != null) {
            //有些按钮隐藏后重新布局
            ly._doLayout();
        }

    },


    UpdateList: function () {
        this.tableView.uiViewParent = this;
        this.tableView.cellHeight = 256;
        var size = this.node.getContentSize();
       // this.oneCellNum = Math.floor(size.width / this.tableView.cellHeight);
        this.tableView.oneCellNum = this.oneCellNum;

        this.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    },

    StartParserAppList() {
        this.listItem.length = 0;
        var url = UIHomeAppCenter.APPCENTER_HTTP_URL_HOME_KIDS_GAME;
        if (!cc.Config.main().APP_FOR_KIDS) {
            url = UIHomeAppCenter.APPCENTER_HTTP_URL_HOME_SMALL_GAME;
        }
        // 加载json文件
        cc.loader.load({ url: url, type: "json" }, function (err, rootJson) {
            if (err == null) {
                this.ParseJsonData(err, rootJson);
            }
        }.bind(this));
    },

    ParseJsonData: function (json) {
        var applist = json.app;
        for (var i = 0; i < applist.length; i++) {
            var item = applist[i];
            var info = new cc.ItemInfo();
            info.title = cc.JsonUtil.GetItem(item, "title", "");
            info.pic = cc.JsonUtil.GetItem(item, "pic", "");
            var store = cc.Source.WEIXIN;
            var appid = item.APPID.store;
            appid = "wx2c5d3abfad26e8b1";
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
        this.UpdateList();
    },
 
    OnClickBtnNoAd: function (event, customEventData) {
    },

}); 