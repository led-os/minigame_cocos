var UIViewController = require("UIViewController");
var UIHomeBase = require("UIHomeBase");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
var GameViewController = require("GameViewController");

var HomeViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIHomeBase
        },


    },
    Init: function () {
        cc.log("HomeViewController Init");
        //  this.LoadPrefab();
    },
    CreateUI: function () {
        cc.log("HomeViewController CreateUI");
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIHomeBase);
        this.ui.SetController(this);
    },

    LoadPrefabDefault: function () {
        var strPrefabDefault = "Common/Prefab/Home/UIHomeDefault";
        PrefabCache.main.Load(strPrefabDefault, function (err, prefab) {
            if (err) {
                cc.log(err.message || err);
                this.LoadPrefab();
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    LoadPrefab: function () {
        var strPrefab = "App/Prefab/Home/UIHome" + Config.main().appType;

        cc.log("HomeViewController LoadPrefab=" + strPrefab);
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

    AppPreLoadDidFinish: function (p) {
        cc.log("HomeViewController AppPreLoadDidFinish ");
        this.LoadPrefabDefault();
    },

    ViewDidLoad: function () {
        cc.log("HomeViewController ViewDidLoad");
        this._super();

        //提前加载game prefab
        {
            var game = GameViewController.main();
            game.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), null);
        }
        //this.LoadPrefabDefault();
    },
    ViewDidUnLoad: function () {
        cc.log("HomeViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.log("HomeViewController LayOutView");
        //  base.LayOutView();

    },

});

//单例对象 方法一
//HomeViewController.main = new HomeViewController(); 

//单例对象 方法二
HomeViewController._main = null;
HomeViewController.main = function () {
    // 
    if (!HomeViewController._main) {
        cc.log("_main is null");
        HomeViewController._main = new HomeViewController();
        HomeViewController._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return HomeViewController._main;
}