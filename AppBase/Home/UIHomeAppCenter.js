var UIView = require("UIView");
var UIAppIcon = require("UIAppIcon");

var UIHomeAppCenter = cc.Class({
    extends: UIView,
    // statics: {
    //     AD_JSON_FILE_KIDS: "applist_home_kids.json",
    //     AD_JSON_FILE_SMALL_GAME: "applist_home_minigame.json",
    //     APPCENTER_HTTP_URL_HEAD: "",
    //     APPCENTER_HTTP_URL_HOME_SMALL_GAME: "https://6d6f-moonma-dbb297-1258816908.tcb.qcloud.la/Unity/app_center/applist_home_minigame.json?sign=4b79dab72806704c30be94312351cacd&t=1561688564",
    //     APPCENTER_HTTP_URL_HOME_KIDS_GAME: "https://6d6f-moonma-dbb297-1258816908.tcb.qcloud.la/Unity/app_center/applist_home_kids.json?sign=0dc2a5bf8e85d12b9515afb3cf87cfe1&t=1561688516",


    // },

    properties: {
        listItem: {
            default: [],
            type: cc.Object//UIAppIcon
        },
        uiAppIconPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    onLoad: function () {
        this._super();
        this.listItem.length = 0;



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

        var ly = this.node.getComponent(cc.LayOutGrid);
        var rctran = this.node.getComponent(cc.RectTransform);
        var sizeParent = this.node.parent.getContentSize();
        if (ly != null) {
            var align = cc.Align.NONE;
            if (cc.Device.main.isLandscape) {
                align = cc.Align.RIGHT;
                rctran.width = 160;
                rctran.height = sizeParent.height;
                ly.row = cc.LayoutUtil.main().GetChildCount(this.node, false);
                ly.col = 1;
            } else {
                align = cc.Align.DOWN;
                ly.col = cc.LayoutUtil.main().GetChildCount(this.node, false);
                ly.row = 1;
                rctran.width = sizeParent.width;
                rctran.height = 160;
            }
            rctran.UpdateSize(rctran.width, rctran.height);
            rctran.alignType = align;
            rctran.LayOut();
            //有些按钮隐藏后重新布局
            ly.LayOut();
        }

    },


    CreateItem: function (info) {
        var node = cc.instantiate(this.uiAppIconPrefab);
        var item = node.getComponent(UIAppIcon);
        node.setParent(this.node);
        item.UpdateItem(info);
        this.listItem.push(item);
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
                // this.listItem.push(info);
                this.CreateItem(info);
            }

        }

    },
}); 