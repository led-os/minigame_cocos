var PopViewController = require("PopViewController");
var UISetting = require("UISetting"); 
// var Common = require("Common");
//var Config = require("Config");

var SettingViewController = cc.Class({
    extends: PopViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UISetting
        },


    },
    Init: function () {
    },
    CreateUI: function () {
        var node = cc.instantiate(this.uiPrefab);
        if (node != null) {
            this.ui = node.getComponent(UISetting);
            this.ui.SetController(this);
        }


    },

    LoadPrefab: function () {
        var strPrefab = "Common/Prefab/Setting/UISetting";
       cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log(err.message || err);
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    },

    ViewDidLoad: function () {
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        this._super();

    },
    LayOutView: function () {
        //  base.LayOutView();

    },

});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
SettingViewController._main = null;
SettingViewController.main = function () {
    // 
    if (!SettingViewController._main) {
        cc.Debug.Log("_main is null");
        SettingViewController._main = new SettingViewController();
        SettingViewController._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return SettingViewController._main;
}