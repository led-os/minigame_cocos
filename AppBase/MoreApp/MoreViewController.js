var UIViewController = require("UIViewController");
var UIMoreApp = require("UIMoreApp");
// var Common = require("Common");
//var Config = require("Config");
//var GuankaViewController = require("GuankaViewController"); 

var MoreViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIMoreApp
        },

    },
    Init: function () {
    },
    CreateUI: function () {
        var node = cc.instantiate(this.uiPrefab);
        if (node != null) {
            this.ui = node.getComponent(UIMoreApp);
            this.ui.SetController(this);
        }
    },


    LoadPrefabDefault: function () {
        var strPrefabDefault = "Common/Prefab/MoreApp/UIMoreApp";
        cc.PrefabCache.main.Load(strPrefabDefault, function (err, prefab) {
            if (err) {
                cc.Debug.Log("UIPlace default err:" + err.message || err);
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },



    LoadPrefab: function () {
        var strPrefab = "AppCommon/Prefab/MoreApp/UIMoreApp" + cc.Config.main().appType;
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("UIPlace err:" + err.message || err);
                this.LoadPrefabDefault();
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    ViewDidLoad: function () {
        cc.Debug.Log("MoreViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("MoreViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("MoreViewController LayOutView");
        //  base.LayOutView();

    },



});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
MoreViewController._main = null;
MoreViewController.main = function () {
    // 
    if (!MoreViewController._main) {
        cc.Debug.Log("_main is null");
        MoreViewController._main = new MoreViewController();
        MoreViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return MoreViewController._main;
}