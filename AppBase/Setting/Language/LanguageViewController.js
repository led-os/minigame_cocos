var UIViewController = require("UIViewController");
var UILanguage = require("UILanguage"); 
// var Common = require("Common");
//var Config = require("Config");

var LanguageViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UILanguage
        },


    },
    Init: function () { 
    },
    CreateUI: function () {
        var node = cc.instantiate(this.uiPrefab);
        if (node != null) {
            this.ui = node.getComponent(UILanguage);
            this.ui.SetController(this);
        }


    },

    LoadPrefab: function () {
        var strPrefab = "Common/Prefab/Setting/UILanguage";
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
        cc.Debug.Log("LanguageViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("LanguageViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("LanguageViewController LayOutView");
        //  base.LayOutView();

    },

});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
LanguageViewController._main = null;
LanguageViewController.main = function () {
    // 
    if (!LanguageViewController._main) { 
        LanguageViewController._main = new LanguageViewController();
        LanguageViewController._main.Init();
    } else { 
    }

    return LanguageViewController._main;
}