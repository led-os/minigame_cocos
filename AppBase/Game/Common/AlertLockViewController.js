var UIViewController = require("UIViewController");
var PopViewController = require("PopViewController");
//var Common = require("Common");
var UIAlertLock = require("UIAlertLock");

var AlertLockViewController = cc.Class({
    extends: PopViewController, 
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIAlertLock
        },


    },
    Init: function () {
        cc.Debug.Log("AlertLockViewController Init");
        //  this.LoadPrefab();
    },
    CreateUI: function () {
        cc.Debug.Log("AlertLockViewController CreateUI");
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIAlertLock);
        this.ui.SetController(this);
    },

    LoadPrefab: function () {
        var strPrefab = "Common/Prefab/Game/UIAlertLock";

        cc.Debug.Log("AlertLockViewController LoadPrefab=" + strPrefab);
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("LoadPrefab err:" + err.message || err);

                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    ViewDidLoad: function () {
        cc.Debug.Log("AlertLockViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("AlertLockViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("AlertLockViewController LayOutView");
        //  base.LayOutView();

    },

});

//单例对象 方法一
//AlertLockViewController.main = new AlertLockViewController(); 

//单例对象 方法二
AlertLockViewController._main = null;
AlertLockViewController.main = function () {
    // 
    if (!AlertLockViewController._main) {
        cc.Debug.Log("_main is null");
        AlertLockViewController._main = new AlertLockViewController();
        AlertLockViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return AlertLockViewController._main;
}