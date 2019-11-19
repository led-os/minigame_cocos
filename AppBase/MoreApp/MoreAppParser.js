 
var MoreAppParser = cc.Class({
    extends: cc.Object,
    statics: {
        
    },

    properties: {
        listItem: {
            default: [],
            type: cc.Object
        },

     
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

    

}); 