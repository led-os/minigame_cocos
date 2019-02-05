var UIViewController = require("UIViewController");
var UIGuankaBase = require("UIGuankaBase");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");

var GuankaViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIGuankaBase
        },


    },
    Init: function () { 
    },
    CreateUI: function () { 
        var node = cc.instantiate(this.uiPrefab);
        this.ui= node.getComponent(UIGuankaBase);
        this.ui.SetController(this);
    },

    LoadPrefabDefault: function () {
        var strPrefabDefault = "Common/Prefab/Guanka/UIGuanka";
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
        var strPrefab = "App/Prefab/Guanka/UIGuanka" + Config.main().appType;
        PrefabCache.main.Load(strPrefab, function (err, prefab) {
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
 
    ViewDidLoad: function () {
        cc.log("GuankaViewController ViewDidLoad");
        this._super();
        this.LoadPrefabDefault();
    },
    ViewDidUnLoad: function () {
        cc.log("GuankaViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.log("GuankaViewController LayOutView");
        //  base.LayOutView();

    },

});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
GuankaViewController._main = null;
GuankaViewController.main = function () {
    // 
    if (!GuankaViewController._main) {
        cc.log("_main is null");
        GuankaViewController._main = new GuankaViewController();
        GuankaViewController._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return GuankaViewController._main;
}