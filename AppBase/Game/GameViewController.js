var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");

var GameViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIGameBase
        },


    },
    Init: function () {
    },

    CreateUI: function () {
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIGameBase);
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
            this.CreateUI();
        }.bind(this)
        );
    },


    ViewDidLoad: function () {
        cc.log("GameViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.log("GameViewController ViewDidUnLoad");
        this._super();

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