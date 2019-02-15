var UIViewController = require("UIViewController");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
var UIGameBase = require("UIGameBase");
var Language = require("Language");

var UIGameShapeColor = cc.Class({
    extends: UIGameBase,
    properties: {
        imageBg: cc.Sprite,
        btnBack: {
            default: null,
            type: cc.Button
        },
    },
    onLoad: function () {
        this._super();
        this.UnifyButtonSprite(this.btnBack);
    },

    Init: function () {
    },

});

//单例对象 方法一
//UIGameBase.main = new UIGameBase(); 

//单例对象 方法二
UIGameShapeColor._main = null;
UIGameShapeColor.main = function () {
    // 
    if (!UIGameShapeColor._main) {
        cc.log("_main is null");
        UIGameShapeColor._main = new UIGameShapeColor();
        UIGameShapeColor._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return UIGameShapeColor._main;
}