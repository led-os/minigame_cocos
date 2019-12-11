var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
//var Common = require("Common");
//var Config = require("Config");
//var LoadItemInfo = require("LoadItemInfo");

var GameViewController = cc.Class({
    extends: UIViewController,
    statics: {
        // 声明静态变量 
        callbackFinish: null,
        loadInfo: cc.LoadItemInfo,
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

    LoadPrefabEnd: function () {
        if (GameViewController.callbackFinish != null) {
            if (GameViewController.loadInfo != null) {
                GameViewController.loadInfo.isLoad = true;
            }

            GameViewController.callbackFinish(this);
        }
    },

    LoadPrefab: function () {
        var strPrefab = "AppCommon/Prefab/Game/UIGame" + cc.Config.main().appType;
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("Game LoadPrefab fail");
                cc.Debug.Log(err.message || err);
                this.LoadPrefabEnd();
                return;
            }
            this.uiPrefab = prefab;
            this.LoadUI();
            cc.Debug.Log("Game LoadPrefab Finish");
            this.LoadPrefabEnd();

            // //this.CreateUI();
        }.bind(this)
        );
    },


    ViewDidLoad: function () {
        cc.Debug.Log("GameViewController ViewDidLoad");
        this._super();
        //this.LoadPrefab();
        this.CreateUI();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("GameViewController ViewDidUnLoad");
        this._super();
        this.ui.node.destroy();
        this.ui = null;

    },
    LayOutView: function () {
        cc.Debug.Log("GameViewController LayOutView");
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
        cc.Debug.Log("_main is null");
        GameViewController._main = new GameViewController();
        GameViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return GameViewController._main;
}