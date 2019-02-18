var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
var LoadItemInfo = require("LoadItemInfo");

var GameViewController = cc.Class({
    extends: UIViewController,
    statics: {
        // 声明静态变量 
        callbackFinish: null,
        loadInfo: LoadItemInfo,
    },

    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIGameBase
        },
        _gameBase: {
            default: null,
            type: UIGameBase
        },
        gameBase: {
            //default 和 get set 不能同时存在  
            type: UIGameBase,
            get: function () {
                this.LoadUI();
                return this.ui;
            },
        },

    },
    Init: function () {
        //提前加载
        this.LoadPrefab();
    },

    SetLoadFinishCallBack: function (callback, info) {
        GameViewController.callbackFinish = callback;
        GameViewController.loadInfo = info;
    },

    LoadUI: function () {
        if (this.ui == null) {
            var node = cc.instantiate(this.uiPrefab);
            this.ui = node.getComponent(UIGameBase);
        }
    },

    CreateUI: function () {
        this.LoadUI();
        this.ui.SetController(this);
    },

    LoadPrefab: function () {
        var strPrefab = "App/Prefab/Game/UIGame" + Config.main().appType;
        PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.log(err.message || err);
                return;
            }
            this.uiPrefab = prefab;
            this.LoadUI();

            if (GameViewController.callbackFinish != null) {
                if (GameViewController.loadInfo != null) {
                    GameViewController.loadInfo.isLoad = true;
                }

                GameViewController.callbackFinish(this);
            }
            // //this.CreateUI();
        }.bind(this)
        );
    },


    ViewDidLoad: function () {
        cc.log("GameViewController ViewDidLoad");
        this._super();
        //this.LoadPrefab();
        this.CreateUI();
    },
    ViewDidUnLoad: function () {
        cc.log("GameViewController ViewDidUnLoad");
        this._super();
        this.ui = null;

    },
    LayOutView: function () {
        cc.log("GameViewController LayOutView");
        //  base.LayOutView();

    },

    GotoGame: function (name) {
    },

});

//单例对象 方法一
//GameViewController.main = new GameViewController(); 

//单例对象 方法二
GameViewController._main = null;
GameViewController.main = function () {
    // 
    if (!GameViewController._main) {
        cc.log("_main is null");
        GameViewController._main = new GameViewController();
        GameViewController._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return GameViewController._main;
}