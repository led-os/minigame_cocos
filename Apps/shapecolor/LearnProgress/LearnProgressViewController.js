var UIViewController = require("UIViewController");
var UILearnProgress = require("UILearnProgress");

var LearnProgressViewController = cc.Class({
    extends: UIViewController,
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UILearnProgress
        },


    },
    Init: function () {
    },
    CreateUI: function () {
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UILearnProgress);
        this.ui.SetController(this);
    },

    LoadPrefab: function () {
        var strPrefab = "App/Prefab/Home/UILearnProgress";
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
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
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        this._super();

    },
    LayOutView: function () {
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
LearnProgressViewController._main = null;
LearnProgressViewController.main = function () {
    // 
    if (!LearnProgressViewController._main) {
        cc.log("_main is null");
        LearnProgressViewController._main = new LearnProgressViewController();
        LearnProgressViewController._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return LearnProgressViewController._main;
}