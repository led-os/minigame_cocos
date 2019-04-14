var UIViewController = require("UIViewController");
//var Common = require("Common");
//var Config = require("Config");
var UIView = require("UIView");

var UIGameBase = cc.Class({
    extends: UIView,


    properties: {
        gamePrefab: {
            default: null,
            type: cc.Prefab
        },
        listGuanka: {
            default: [],
            type: cc.Object
        },
        listProLoad: {
            default: [],
            type: cc.LoadItemInfo
        },

        imageBg: cc.Sprite,
        callbackGuankaFinish: null,
        callbackPlaceFinish: null,

    },
    Init: function () {
    },
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
    },
    LoadGamePrefab: function () {
        var strPrefab = "App/Prefab/Game/Game" + cc.Config.main().appType;
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.gamePrefab = prefab;
            this.CreateGame();
        }.bind(this)
        );
    },
    CreateGame: function () {
    },

    OnClickBtnBack: function (event, customEventData) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },



    //guanka 

    GetGuankaTotal: function () {
        return 0;
    },

    CleanGuankaList: function () {
        if (this.listGuanka != null) {
            this.listGuanka.splice(0, this.listGuanka.length);
        }
    },
    StartParseGuanka: function (callback) {
        this.callbackGuankaFinish = callback;
        cc.Debug.Log("ParseGuanka UIGameBase");
        return 0;
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

    UpdateGuankaLevel: function (level) {

    },
    UpdatePlaceLevel: function (level) {
    },


    LoadLanguageGameDidFinish: function (p) {

    },

    LoadLanguageGame: function () {
        var info = cc.GameManager.main().GetPlaceItemInfo(cc.GameManager.placeLevel);
        var filepath = cc.Common.GAME_RES_DIR + "/language/" + info.language + ".csv";
        cc.Debug.Log("LoadLanguageGame::filepath=" + filepath);
        cc.Language._game = new cc.Language();
        cc.Language._game.Init2(filepath, this.LoadLanguageGameDidFinish.bind(this));

    },

    ShowUserGuide: function () {
        var key = cc.AppRes.KEY_USER_GUIDE + cc.Common.main().GetAppVersion();
        var isshowplay = cc.Common.GetBoolOfKey(key, false);
        if (isshowplay == true) {
            return;
        }
        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_USER_GUIDE");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_USER_GUIDE");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_USER_GUIDE");
        var no = yes;

        cc.ViewAlertManager.main().ShowFull(title, msg, yes, no, false, "STR_KEYNAME_VIEWALERT_USER_GUIDE",
            function (alert, isYes) {
                if (isYes) {
                } else {

                }
                cc.Common.SetBoolOfKey(key, true);

            }.bind(this)
        );
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
            cc.Debug.Log("place id = " + info.id);
            info.type = cc.JsonUtil.GetItem(item, "type", "");
            info.isAd = cc.JsonUtil.GetItem(item, "advideo", false);
            info.pic = cc.Common.GAME_RES_DIR + "/" + cc.JsonUtil.GetItem(item, "pic", "place/image/" + info.id + ".png");
            info.title = cc.JsonUtil.GetItem(item, "title", "STR_PLACE_" + info.id);
            //info.icon = info.pic;
            info.language = cc.JsonUtil.GetItem(item, "language", "language");
            // info.index = i;

            cc.GameManager.main().listPlace.push(info);
        }

        if (this.callbackPlaceFinish != null) {
            cc.Debug.Log("StartParsePlaceList callbackPlaceFinish length = " + cc.GameManager.main().listPlace.length);
            this.callbackPlaceFinish();
        }
    },

});

//单例对象 方法一
//UIGameBase.main = new UIGameBase(); 

//单例对象 方法二
UIGameBase._main = null;
UIGameBase.main = function () {
    // 
    if (!UIGameBase._main) {
        cc.Debug.Log("_main is null");
        UIGameBase._main = new UIGameBase();
        UIGameBase._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return UIGameBase._main;
}