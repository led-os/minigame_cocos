var UIViewController = require("UIViewController");
var UIGuankaBase = require("UIGuankaBase");
//var Common = require("Common");
//var Config = require("Config");

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
        this.ui = node.getComponent(UIGuankaBase);
        this.ui.SetController(this);
    },

    LoadPrefabDefault: function () {
        var strPrefabDefault = "Common/Prefab/Guanka/UIGuanka";
        cc.PrefabCache.main.Load(strPrefabDefault, function (err, prefab) {
            if (err) {
                cc.Debug.Log("UIGuanka default err:" + err.message || err);
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    LoadPrefab: function () {
        var strPrefab = "AppCommon/Prefab/Guanka/UIGuanka" + cc.Config.main().appType;
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("UIGuanka err:" + err.message || err);
                this.LoadPrefabDefault();
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    ViewDidLoad: function () {
        cc.Debug.Log("GuankaViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("GuankaViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("GuankaViewController LayOutView");
        //  base.LayOutView();

    },
    OnClickBtnBack: function (event, customEventData) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },

});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
GuankaViewController._main = null;
GuankaViewController.main = function () {
    // 
    if (!GuankaViewController._main) {
        cc.Debug.Log("_main is null");
        GuankaViewController._main = new GuankaViewController();
        GuankaViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return GuankaViewController._main;
}