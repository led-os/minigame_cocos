var UIViewController = require("UIViewController");
var UIPlaceBase = require("UIPlaceBase");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
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
        var strPrefab = "App/Prefab/Place/UIPlace" + Config.main().appType;
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
        cc.log("GuankaViewController ViewDidLoad");
        this._super();
        this.LoadPrefabDefault();
    },
    ViewDidUnLoad: function () {
        cc.log("GuankaViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.log("HomeViewController LayOutView");
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
        cc.log("_main is null");
        PlaceViewController._main = new PlaceViewController();
        PlaceViewController._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return PlaceViewController._main;
}