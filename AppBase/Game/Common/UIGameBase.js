var UIViewController = require("UIViewController");
var UIHomeBase = require("UIHomeBase");
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
            type: UIHomeBase
        },


    },
    Init: function () { 
    },
    CreateUI: function () { 
        // if (this.naviController != null) {
        //     this.naviController.HideNavibar(true);
        // }
        // uiHome = (UIHomeBase)GameObject.Instantiate(uiHomePrefab);
        // uiHome.SetController(this);
        // ViewControllerManager.ClonePrefabRectTransform(uiHomePrefab.gameObject, uiHome.gameObject);
        // uiHome.Init();
    },

    LoadPrefab: function () {
        // var ishave = Common.main().JsonDataContainsKey(null, "key"); 
        // var strPrefab = "App/Prefab/Home/UIHome" + Common.main().appType;
        var strPrefab = "App/Prefab/Home/UIHome" + Config.main().appType;

        var strPrefabDefault = "Common/Prefab/Home/UIHomeDefault";
        // GameObject obj = PrefabCache.main.Load(strPrefab);
        // if (obj == null) {
        //     obj = PrefabCache.main.Load(strPrefabDefault);
        // }

        // uiHomePrefab = obj.GetComponent<UIHomeBase>();
        cc.log("GuankaViewController LoadPrefab=" + strPrefab);
        PrefabCache.main.Load(strPrefab, function (err, prefab) {
            this.uiPrefab = prefab;
            var node = cc.instantiate(prefab);
            this.ui= node.getComponent(UIHomeBase);
            this.ui.SetController(this);
        }.bind(this)
        );
    },

    ViewDidLoad: function () {
        cc.log("GuankaViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
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
GuankaViewController._main = null;
GuankaViewController.main = function () {
    // 
    if (!HomeViewController._main) {
        cc.log("_main is null");
        GuankaViewController._main = new GuankaViewController();
        GuankaViewController._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return GuankaViewController._main;
}