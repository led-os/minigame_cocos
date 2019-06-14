var UIViewController = require("UIViewController");
//var Common = require("Common");
var AlertLockViewController = require("AlertLockViewController");
var UIView = require("UIView");

var GuankaParseBase = cc.Class({
    extends: cc.Object,

    statics: {
        PLACE_ITEM_TYPE_NONE: "none",
        PLACE_ITEM_TYPE_VIDEO: "video",
        PLACE_ITEM_TYPE_LOCK: "lock",
    },

    properties: {
        listGuanka: {
            default: [],
            type: cc.Object
        },
        callbackGuankaFinish: null,
        callbackPlaceFinish: null,
        callbackGuankaIdFinish: null,
        autoGuankaOneGroupCount: 5,

    },
    Init: function () {
    },


    CleanGuankaList: function () {
        if (this.listGuanka != null) {
            this.listGuanka.splice(0, this.listGuanka.length);
        }
    },
    GetGuankaTotal: function () {
        // var count = this.ParseGuanka();
        var count = 0;
        if (this.listGuanka != null) {
            count = this.listGuanka.length;
        }
        return count;
    },
    //ItemInfo
    GetGuankaItemInfo: function (idx) {
        if (this.listGuanka == null) {
            return null;
        }
        if (idx >= this.listGuanka.Count) {
            return null;
        }
        var info = this.listGuanka[idx];
        return info;
    },

    //place 
    GetPlaceTotal: function () {
        return cc.GameManager.main().listPlace.length;
    },
    StartParsePlaceList: function (callback) {
        if (callback != null) {
            this.callbackPlaceFinish = callback;
        }
        var filepath = cc.Common.GAME_RES_DIR + "/place/place_list.json";
        cc.Debug.Log("StartParsePlaceList ");
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("StartParsePlaceList:err=" + err);
            }
            if (err == null) {
                this.ParsePlaceList(rootJson.json);
            }
        }.bind(this));
    },
    ParsePlaceList: function (json) {
        cc.Debug.Log("StartParsePlaceList ParsePlaceList");
        if ((cc.GameManager.main().listPlace != null) && (cc.GameManager.main().listPlace.length != 0)) {
            cc.Debug.Log("StartParsePlaceList not 0");
            if (this.callbackPlaceFinish != null) {
                cc.Debug.Log("StartParsePlaceList callbackPlaceFinish length = " + cc.GameManager.main().listPlace.length);
                this.callbackPlaceFinish();
            }
            return;
        }
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ItemInfo();
            var item = items[i];

            info.id = cc.JsonUtil.GetItem(item, "id", "");
            info.game = cc.JsonUtil.GetItem(item, "game", "");
            cc.Debug.Log("place id = " + info.id);
            info.type = cc.JsonUtil.GetItem(item, "type", "");

            var dirRoot = cc.Common.CLOUD_RES_DIR;
            if (cc.Common.main().isWeiXin) {
                dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
            }
            info.pic = dirRoot + "/place/image/" + info.id + ".png";

            info.title = cc.JsonUtil.GetItem(item, "title", "STR_PLACE_" + info.id);
            //info.icon = info.pic;
            info.language = cc.JsonUtil.GetItem(item, "language", "language");
            // info.index = i;

            info.isAd = false;
            //if (AppVersion.appCheckHasFinished && (!Common.noad)) 
            {
                if (info.type == GuankaParseBase.PLACE_ITEM_TYPE_VIDEO) {
                    info.isAd = true;
                }
                {
                    if (info.type == GuankaParseBase.FPLACE_ITEM_TYPE_LOCK) {
                        info.isAd = true;
                    }
                }
            }

            cc.GameManager.main().listPlace.push(info);
        }

        if (this.callbackPlaceFinish != null) {
            cc.Debug.Log("StartParsePlaceList callbackPlaceFinish length = " + cc.GameManager.main().listPlace.length);
            this.callbackPlaceFinish();
        }
    },
    StartParseGuanka(callback) {
        this.callbackGuankaFinish = callback;
        var idx = cc.GameManager.main().placeLevel;
        var infoPlace = cc.GameManager.main().GetPlaceItemInfo(idx);
        //var filepath = cc.Common.GAME_RES_DIR + "/guanka/item_Bird" + ".json";//+ infoPlace.id 
        var filepath = cc.Common.GAME_RES_DIR + "/guanka/item_" + infoPlace.id + ".json";//
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("config:err=" + err);
            }
            if (err == null) {
                this.ParseGuanka(rootJson.json);
            }
        }.bind(this));
    },

    ParseGuankaDidFinish() {
        if (this.callbackGuankaFinish != null) {
            this.callbackGuankaFinish();
        }
    },

    LoadGuankaItemId(cbFinish) {
        var idx = cc.GameManager.main().placeLevel;
        var infoPlace = cc.GameManager.main().GetPlaceItemInfo(idx);
        this.callbackGuankaIdFinish = cbFinish;
        // var filepath = cc.CloudRes.main().rootPath + "/guanka/item_" + infoPlace.id + ".json";
        var filepath = cc.Common.GAME_RES_DIR + "/guanka/item_" + infoPlace.id + ".json";

        // cc.Debug.Log("LoadGuankaItemId  :this.listGuanka= filepath=" + filepath);
        // if (cc.Common.main().isWeiXin) {
        //     // 加载json文件
        //     cc.loader.load({ url: filepath, type: "json" }, function (err, rootJson) {
        //         this.LoadGuankaItemIdFinish(err, rootJson);
        //     }.bind(this));
        // } else 

        {
            //cc.JsonAsset   cc.loader.load
            //去除后缀
            filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
            cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
                this.LoadGuankaItemIdFinish(err, rootJson);
            }.bind(this));
        }
    },

    LoadGuankaItemIdFinish(err, rootJson) {
        if (err) {
            // return;
            cc.Debug.Log("LoadGuankaItemIdFinish error:this.listGuanka=");
        }
        if (err == null) {
            if (rootJson.json == null) {
                this.ParseGuankaItemId(rootJson);
            } else {
                //resource里的json文件
                this.ParseGuankaItemId(rootJson.json);
            }
        }
    },

    ParseGuankaItemId(rootJson) {
        // cc.Debug.Log("ParseGuankaItemId:this.listGuanka=");
        //         //search_items
        var idx = cc.GameManager.main().placeLevel;
        var infoPlace = cc.GameManager.main().GetPlaceItemInfo(idx);
        var picRoot = cc.CloudRes.main().rootPath + "/image/" + infoPlace.id + "/";

        //clear
        if (this.listGuankaItemId != null) {
            this.listGuankaItemId.length = 0;
        }

        var items = rootJson.items;

        for (var i = 0; i < items.length; i++) {

            var item = items[i];
            var info = new cc.ItemInfo();
            info.id = cc.JsonUtil.GetItem(item, "id", "");
            info.pic = picRoot + info.id + ".png";
            this.listGuankaItemId.push(info);
        }


        //让总数是count_one_group的整数倍
        var count_one_group = this.autoGuankaOneGroupCount;
        var tmp = (this.listGuankaItemId.length % count_one_group);
        if (tmp > 0) {
            for (var i = 0; i < (count_one_group - tmp); i++) {
                var infoId = this.listGuankaItemId[i];
                var info = new cc.ItemInfo();
                info.id = infoId.id;
                info.pic = infoId.pic;
                this.listGuankaItemId.push(info);
            }
        }

        //   cc.Debug.Log("ParseGuankaItemId:this.listGuanka=end");
        if (this.callbackGuankaIdFinish != null) {
            // cc.Debug.Log("ParseGuankaItemId:this.listGuanka=callbackGuankaIdFinish");
            this.callbackGuankaIdFinish();
        }
    },

});

//单例对象 方法二
GuankaParseBase._main = null;
GuankaParseBase.main = function () {
    // 
    if (!GuankaParseBase._main) {
        GuankaParseBase._main = new GuankaParseBase();
        GuankaParseBase._main.Init();
    }

    return GuankaParseBase._main;
}

cc.GuankaParseBase = module.export = GuankaParseBase; 
