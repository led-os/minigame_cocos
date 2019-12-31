var UIViewController = require("UIViewController");
var UIHomeBase = require("UIHomeBase");
var AdConfigParser = require("AdConfigParser");
var GameViewController = require("GameViewController");

var HomeViewController = cc.Class({
    extends: UIViewController,
    statics: {
        isGameHasInit: false,
    },
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIHomeBase
        },
        runCount: 0,


    },
    Init: function () {
        cc.Debug.Log("HomeViewController Init");
        //  this.LoadPrefab();
        // cc.CloudRes.main().StartDownload();
    },
    CreateUI: function () {
        cc.Debug.Log("HomeViewController CreateUI");
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIHomeBase);
        this.ui.SetController(this);
        cc.LevelManager.main().StartParsePlace(function () {
            cc.LevelManager.main().StartParseGuanka(null);
        }.bind(this)
        );

        // CloudResViewController.main().Show(null, null);
        if (this.runCount == 0) {
            //至少在home界面显示一次视频广告
            //AdKitCommon.main.callbackAdVideoFinish = OnAdKitAdVideoFinish;
            //   if (uiHome != null)
            // {
            //     uiHome.OnClickBtnAdVideo();
            // }

            //至少在home界面显示一次开机插屏
            // var type = AdConfigParser.SOURCE_TYPE_INSERT;
            // var source = cc.Source.GDT;
            // cc.AdInsert.main().InitAd(source); 
            // cc.AdKitCommon.main.ShowAdInsert(100);

        }
        this.runCount++;
    },

    LoadPrefabDefault: function () {
        var strPrefabDefault = "Common/Prefab/Home/UIHomeDefault";
        cc.PrefabCache.main.Load(strPrefabDefault, function (err, prefab) {
            if (err) {
                cc.Debug.Log("LoadPrefabDefault err:" + err.message || err);
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    LoadPrefab: function () {
        var strPrefab = "AppCommon/Prefab/Home/UIHome" + cc.Config.main().appType;

        cc.Debug.Log("HomeViewController LoadPrefab=" + strPrefab);
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("LoadPrefab err:" + err.message || err);
                this.LoadPrefabDefault();
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    AppPreLoadDidFinish: function (p) {
        cc.Debug.Log("HomeViewController AppPreLoadDidFinish ");
        HomeViewController.isGameHasInit = true;
        this.LoadPrefab();
    },

    ViewDidLoad: function () {
        cc.Debug.Log("HomeViewController ViewDidLoad");
        this._super();
        //提前加载game prefab
        if (!HomeViewController.isGameHasInit) {
            var game = GameViewController.main();
            game.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), null);
        } else {
            this.LoadPrefab();
        }
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("HomeViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("HomeViewController LayOutView");
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
        cc.Debug.Log("_main is null");
        HomeViewController._main = new HomeViewController();
        HomeViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return HomeViewController._main;
}