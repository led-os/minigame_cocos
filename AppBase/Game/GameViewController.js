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

         //显示横幅广告
         cc.AdKitCommon.main.callbackFinish = this.OnAdKitFinish.bind(this);
        //  cc.AdKitCommon.main.InitAdBanner();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("GameViewController ViewDidUnLoad");
        this._super();
        this.ui.node.destroy();
        this.ui = null;
        // cc.AdKitCommon.main.ShowAdBanner(false);

    },
    LayOutView: function () {
        cc.Debug.Log("GameViewController LayOutView");
        //  base.LayOutView();

    },

    GotoGame: function (name) {
       
    },

    OnAdKitFinish(type, status, str) {
    if (type == cc.AdKitCommon.AdType.BANNER) {
            if (status == cc.AdKitCommon.AdStatus.SUCCESFULL) {
                // int w = 0;
                // int h = 0;
                // int idx = str.IndexOf(":");
                // string strW = str.Substring(0, idx);
                // int.TryParse(strW, out w);
                // string strH = str.Substring(idx + 1);
                // int.TryParse(strH, out h);
                // Debug.Log("OnGameAdKitFinish AdBannerDidReceiveAd::w=" + w + " h=" + h);

                // Vector2 sizeCanvas = AppSceneBase.main.sizeCanvas;
                // GameManager.main.heightAdScreen = h + Device.heightSystemHomeBar;
                // GameManager.main.heightAdWorld = Common.ScreenToWorldHeight(mainCam, h);
                // GameManager.main.heightAdCanvas = Common.ScreenToCanvasHeigt(sizeCanvas, h);
            }
        }
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