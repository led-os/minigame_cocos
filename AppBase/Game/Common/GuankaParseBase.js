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
        if (this.listShape != null) {
            count = GameShapeColor.GUANKA_NUM_PER_ITEM * this.listShape.length;
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
                if (info.type == UIGameBase.PLACE_ITEM_TYPE_VIDEO) {
                    info.isAd = true;
                }
                {
                    if (info.type == UIGameBase.FPLACE_ITEM_TYPE_LOCK) {
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
