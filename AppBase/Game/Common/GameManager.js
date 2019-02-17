var UIViewController = require("UIViewController");
var UIHomeBase = require("UIHomeBase");
var PrefabCache = require("PrefabCache");
var Common = require("Common");
var Config = require("Config");
var GameViewController = require("GameViewController");


var GameManager = cc.Class({
    extends: cc.Object,

    statics: {
        gameLevel: 0,//streamingAssetsPath下的游戏配置等数据
        placeTotal: 0,
        gameLevelFinish: 0,//streamingAssetsPath 下的游戏图片等资源
        gameMode: 0,
        maxGuankaNum: 0,

    },
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        }


    },
    Init: function () {
      //this.ParseGuanka();
    },
    LoadPrefab: function () {

    },
    //UIViewController
    GotoGame: function (fromController) {
        var navi = fromController.naviController;
        if (navi != null) {
            navi.Push(GameViewController.main());
        }
    },
    CleanGuankaList: function () {
        GameViewController.main().ui.CleanGuankaList();
    },
    ParseGuanka: function () {
        this.CleanGuankaList();
        GameViewController.main().ui.ParseGuanka();
    },


});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
GameManager._main = null;
GameManager.main = function () {
    // 
    if (!GameManager._main) {
        cc.log("_main is null");
        GameManager._main = new GameManager();
        GameManager._main.Init();
    } else {
        cc.log("_main is not null");
    }

    return GameManager._main;
}