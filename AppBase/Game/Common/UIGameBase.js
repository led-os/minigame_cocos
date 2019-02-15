var UIViewController = require("UIViewController"); 
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
var UIView = require("UIView");
var Language = require("Language");

var UIGameBase = cc.Class({
    extends: UIView,
    properties: { 

    },
    Init: function () { 
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
//UIGameBase.main = new UIGameBase(); 

//单例对象 方法二
UIGameBase._main = null;
UIGameBase.main = function () {
    // 
    if (!UIGameBase._main) {
        cc.log("_main is null");
        UIGameBase._main = new UIGameBase();
        UIGameBase._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return UIGameBase._main;
}