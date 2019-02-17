var UIViewController = require("UIViewController");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config"); 
var Language = require("Language");
var UIView = require("UIView");

var GameShapeColor = cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.Sprite,
      
    },
    onLoad: function () {
        this._super();
     
    },

    Init: function () {
    },

});
 
//单例对象 方法二
GameShapeColor._main = null;
GameShapeColor.main = function () {
    // 
    if (!GameShapeColor._main) {
        cc.log("_main is null");
        GameShapeColor._main = new GameShapeColor();
        GameShapeColor._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return GameShapeColor._main;
}