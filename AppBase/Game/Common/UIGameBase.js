var UIViewController = require("UIViewController");
//var Common = require("Common");
//var Config = require("Config");
var UIView = require("UIView");
//var Language = require("Language");

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
        callbackGuankaFinish:null,

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
                cc.log(err.message || err);
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
    ParseGuanka: function (callback) {
        this.callbackGuankaFinish = callback;
        cc.log("ParseGuanka UIGameBase");
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
    //guanka
});

//单例对象 方法一
//UIGameBase.main = new UIGameBase(); 

//单例对象 方法二
UIGameBase._main = null;
UIGameBase.main = function () {
    // 
    if (!UIGameBase._main) {
        cc.log("_main is null");
        UIGameBase._main = new UIGameBase();
        UIGameBase._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return UIGameBase._main;
}