var UIViewController = require("UIViewController"); 
var PopViewController = require("PopViewController"); 
var UIFrendBoard = require("UIFrendBoard"); 

var FrendBoardViewController = cc.Class({
    extends: PopViewController, 
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        },
        ui: {
            default: null,
            type: UIFrendBoard
        },


    }, 
    CreateUI: function () {
        var node = cc.instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIFrendBoard);
        this.ui.SetController(this);
    },

    LoadPrefab: function () {
        var strPrefab = "Common/Prefab/FrendBoard/UIFrendBoard"; 
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
        cc.Debug.Log("FrendBoardViewController ViewDidLoad");
        this._super();
        this.LoadPrefab();
    },
    ViewDidUnLoad: function () {
        cc.Debug.Log("FrendBoardViewController ViewDidUnLoad");
        this._super();

    },
    LayOutView: function () {
        cc.Debug.Log("FrendBoardViewController LayOutView");
        //  base.LayOutView();

    },

});

//单例对象 方法一
//FrendBoardViewController.main = new FrendBoardViewController(); 

//单例对象 方法二
FrendBoardViewController._main = null;
FrendBoardViewController.main = function () {
    // 
    if (!FrendBoardViewController._main) { 
        FrendBoardViewController._main = new FrendBoardViewController(); 
    }  

    return FrendBoardViewController._main;
}