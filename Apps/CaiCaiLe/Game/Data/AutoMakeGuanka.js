var AutoMakeGuanka = cc.Class({
    extends: cc.ItemInfo,// cc.ItemInfo,
    properties: {
        colorid: "",
        count: 0,

        listAutoGuankaJson: {//AutoMakeGuankaInfo
            default: [],
            type: cc.Object
        },
        n_one_group: 0,
        total: 0,
        strSplit: ",",
        callbackFinish: null,

        filepathAutoGuankaJson:
        {
            get: function () {
                // return cc.CloudRes.main().rootPath + "/guanka/auto_guanka.json";
                return cc.Common.GAME_RES_DIR + "/guanka/auto_guanka.json";

            },
        },

    },

    Init() {
        this.n_one_group = 5;
    },

    LoadAutoGuankaJson(cbFinish) {
        this.callbackFinish = cbFinish;
        var filepath = this.filepathAutoGuankaJson;
        // if (cc.Common.main().isWeiXin) {
        //     // 加载json文件
        //     cc.loader.load({ url: filepath, type: "json" }, function (err, rootJson) {
        //         this.LoadFinish(err, rootJson);
        //     }.bind(this));
        // } else {
        //cc.JsonAsset   cc.loader.load
        //去除后缀
        filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
            this.LoadFinish(err, rootJson);
        }.bind(this));
        // }
    },

    LoadFinish(err, rootJson) {
        if (err) {
            // return;
        }
        if (err == null) {
            if (rootJson.json == null) {
                this.ParseAutoGuankaJson(rootJson);
            } else {
                //resource里的json文件
                this.ParseAutoGuankaJson(rootJson.json);
            }
        }
    },

    ParseAutoGuankaJson(rootJson) {
        var items = rootJson.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.LianLianLeItemInfo();
            var item = items[i];
            info.id = cc.JsonUtil.GetItem(item, "content", "");
            var str = cc.JsonUtil.GetItem(item, "count", "");
            info.count = cc.Common.String2Int(str);
            this.listAutoGuankaJson.push(info);
        }
        if (this.callbackFinish != null) {
            this.callbackFinish();
        }

    },

});

AutoMakeGuanka._main = null;
AutoMakeGuanka.main = function () {
    if (!AutoMakeGuanka._main) {
        AutoMakeGuanka._main = new AutoMakeGuanka();
        AutoMakeGuanka._main.Init();
    }
    return AutoMakeGuanka._main;
}
cc.AutoMakeGuanka = module.export = AutoMakeGuanka; 