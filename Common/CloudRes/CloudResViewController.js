var UIViewController = require("UIViewController");
var UIHomeBase = require("UIHomeBase");
var PopViewController = require("PopViewController");
//var Common = require("Common");
var UICloudRes = require("UICloudRes");
var GameViewController = require("GameViewController");

var CloudResViewController = cc.Class({
    extends: PopViewController, 
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UICloudRes
        },


    },
    Init: function () {
        cc.Debug.Log("CloudResViewController Init");
        //  this.LoadPrefab();
    },
    CreateUI: function () {
        cc.Debug.Log("CloudResViewController CreateUI");
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UICloudRes);
        this.ui.SetController(this);
    },

    LoadPrefab: function () {
        var strPrefab = "Common/Prefab/CloudRes/UICloudRes";

        cc.Debug.Log("CloudResViewController LoadPrefab=" + strPrefab);
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
        cc.Debug.Log("CloudResViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("CloudResViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("CloudResViewController LayOutView");
        //  base.LayOutView();

    },

});

//单例对象 方法一
//CloudResViewController.main = new CloudResViewController(); 

//单例对象 方法二
CloudResViewController._main = null;
CloudResViewController.main = function () {
    // 
    if (!CloudResViewController._main) {
        cc.Debug.Log("_main is null");
        CloudResViewController._main = new CloudResViewController();
        CloudResViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return CloudResViewController._main;
}