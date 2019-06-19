var UIViewController = require("UIViewController");
var UIPlaceBase = require("UIPlaceBase");
// var Common = require("Common");
//var Config = require("Config");
//var GuankaViewController = require("GuankaViewController"); 

var PlaceViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIPlaceBase
        },

    },
    Init: function () {
    },
    CreateUI: function () {
        var node = cc.instantiate(this.uiPrefab);
        if (node != null) {
            this.ui = node.getComponent(UIPlaceBase);
            this.ui.SetController(this);
        }
    },


    LoadPrefabDefault: function () {
        var strPrefabDefault = "Common/Prefab/Place/UIPlace";
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
        var strPrefab = "AppCommon/Prefab/Place/UIPlace" + cc.Config.main().appType;
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
        cc.Debug.Log("PlaceViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("PlaceViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("PlaceViewController LayOutView");
        //  base.LayOutView();

    },



});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
PlaceViewController._main = null;
PlaceViewController.main = function () {
    // 
    if (!PlaceViewController._main) {
        cc.Debug.Log("_main is null");
        PlaceViewController._main = new PlaceViewController();
        PlaceViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return PlaceViewController._main;
}