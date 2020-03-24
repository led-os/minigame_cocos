var UIViewController = require("UIViewController");
//var Common = require("Common");
var AlertLockViewController = require("AlertLockViewController");
var UIView = require("UIView");

var LevelParseBase = cc.Class({
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
        listGuankaItemId: {
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
    GetLevelItemInfo: function (idx) {
        if (this.listGuanka == null) {
            return null;
        }
        if (idx >= this.listGuanka.length) {
            return null;
        }
        var info = this.listGuanka[idx];
        // cc.Debug.Log("UIGameCaiCaiLe GetLevelItemInfo idx=" + idx + " info=" + info);
        return info;
    },

    GetItemInfo: function () {
        var level = cc.LevelManager.main().gameLevel;
        //cc.Debug.Log("UIGameCaiCaiLe GetItemInfo level=" + level);
        return this.GetLevelItemInfo(level);
    },

    GetLevelItemInfoCur: function () {
        var level = cc.LevelManager.main().gameLevel;
        return this.GetLevelItemInfo(level);
    },

    //place 
    GetPlaceTotal: function () {
        return cc.LevelManager.main().listPlace.length;
    },
    StartParsePlaceList: function (callback) {
        if (callback != null) {
            this.callbackPlaceFinish = callback;
        }
        var filepath = cc.Common.GAME_RES_DIR + "/place/place_list";
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
        if ((cc.LevelManager.main().listPlace != null) && (cc.LevelManager.main().listPlace.length != 0)) {
            cc.Debug.Log("StartParsePlaceList not 0");
            if (this.callbackPlaceFinish != null) {
                cc.Debug.Log("StartParsePlaceList callbackPlaceFinish length = " + cc.LevelManager.main().listPlace.length);
                this.callbackPlaceFinish();
            }
            return;
        }
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ItemInfo();
            var item = items[i];

            info.id = cc.JsonUtil.GetItem(item, "id", "");
            info.gameType = cc.JsonUtil.GetItem(item, "game", "");
            cc.Debug.Log("place id = " + info.id);
            info.type = cc.JsonUtil.GetItem(item, "type", "");

            // var dirRoot = cc.Common.CLOUD_RES_DIR;
            // if (cc.Common.main().isWeiXin) {
            //     dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
            // }
            var dirRoot = cc.CloudRes.main().rootPath;
            info.pic = dirRoot + "/place/image/" + info.id + ".png";

            info.title = cc.JsonUtil.GetItem(item, "title", "STR_PLACE_" + info.id);
            //info.icon = info.pic;
            info.language = cc.JsonUtil.GetItem(item, "language", "language");
            // info.index = i;

            info.isAd = false;
            //if (AppVersion.appCheckHasFinished && (!Common.noad)) 
            {
                if (info.type == LevelParseBase.PLACE_ITEM_TYPE_VIDEO) {
                    info.isAd = true;
                }
                {
                    if (info.type == LevelParseBase.FPLACE_ITEM_TYPE_LOCK) {
                        info.isAd = true;
                    }
                }
            }

            cc.LevelManager.main().listPlace.push(info);
        }

        if (this.callbackPlaceFinish != null) {
            cc.Debug.Log("StartParsePlaceList callbackPlaceFinish length = " + cc.LevelManager.main().listPlace.length);
            this.callbackPlaceFinish();
        }
    },
    StartParseGuanka(callback) {
        this.callbackGuankaFinish = callback;
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
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

    StartParseGuankaItemId(idx, cbFinish) {

        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        this.callbackGuankaIdFinish = cbFinish;
        // var filepath = cc.CloudRes.main().rootPath + "/guanka/item_" + infoPlace.id + ".json";
        var filepath = cc.Common.GAME_RES_DIR + "/guanka/item_" + infoPlace.id + ".json";
        cc.Debug.Log("StartParseGuankaItemId:idx=" + idx + " filepath=" + filepath);
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
                this.LoadGuankaItemIdFinish(err, rootJson, idx);
            }.bind(this));
        }
    },


    LoadGuankaItemId(cbFinish) {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
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
                this.LoadGuankaItemIdFinish(err, rootJson, idx);
            }.bind(this));
        }
    },

    LoadGuankaItemIdFinish(err, rootJson, idxPlace) {
        if (err) {
            // return;
            cc.Debug.Log("LoadGuankaItemIdFinish error:this.listGuanka=");
        }
        if (err == null) {
            if (rootJson.json == null) {
                this.ParseGuankaItemId(idxPlace, rootJson);
            } else {
                //resource里的json文件
                this.ParseGuankaItemId(idxPlace, rootJson.json);
            }
        }
    },

    ParseGuankaItemId(idxPlace, rootJson) {
        // cc.Debug.Log("ParseGuankaItemId:this.listGuanka=");
        //         //search_items
        var idx = idxPlace;// cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
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
LevelParseBase._main = null;
LevelParseBase.main = function () {
    // 
    if (!LevelParseBase._main) {
        LevelParseBase._main = new LevelParseBase();
        LevelParseBase._main.Init();
    }

    return LevelParseBase._main;
}

cc.LevelParseBase = module.export = LevelParseBase; 
