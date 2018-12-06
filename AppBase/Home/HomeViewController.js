var UIViewController = require("UIViewController");
var UIViewHome = require("UIViewHome");
var HomeViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiHomePrefab: {
            default: null,
            type: cc.Prefab
        },
        uiHome: {
            default: null,
            type: UIViewHome
        },


    },
    Init: function () {
        cc.log("HomeViewController Init");
        //  this.LoadPrefab();
    },
    CreateUI: function () {
        cc.log("HomeViewController CreateUI");

        // if (this.naviController != null) {
        //     this.naviController.HideNavibar(true);
        // }
        // uiHome = (UIHomeBase)GameObject.Instantiate(uiHomePrefab);
        // uiHome.SetController(this);
        // ViewControllerManager.ClonePrefabRectTransform(uiHomePrefab.gameObject, uiHome.gameObject);
        // uiHome.Init();
    },

    LoadPrefab: function () {
        //   name = "UIHome" + Common.appType;
        var strPrefab = "App/Prefab/Home/UIHome";
        var strPrefabDefault = "Common/Prefab/Home/UIHomeDefault";
        // GameObject obj = PrefabCache.main.Load(strPrefab);
        // if (obj == null) {
        //     obj = PrefabCache.main.Load(strPrefabDefault);
        // }

        // uiHomePrefab = obj.GetComponent<UIHomeBase>();

        cc.loader.loadRes(strPrefab, function (err, prefab) {
            this.uiHomePrefab = prefab;
            var node = cc.instantiate(prefab);
            this.uiHome = node.getComponent(UIViewHome);
            this.uiHome.SetController(this);
            // node.parent = this.objController;
        }.bind(this)
        );
    },

    ViewDidLoad: function () {
        cc.log("HomeViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
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