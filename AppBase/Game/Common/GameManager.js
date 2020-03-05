var UIViewController = require("UIViewController");
var UIHomeBase = require("UIHomeBase");
//var Common = require("Common"); 
var GameViewController = require("GameViewController");


var GameManager = cc.Class({
    extends: cc.Object,
    statics: {
        gameMode: 0,

    },
    properties: {
        uiPrefab: {
            default: null,
            type: cc.Prefab
        }, 
 
        
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
 
    GotoPlayAgain: function () {
        GameViewController.main().gameBase.UpdateGuankaLevel(cc.LevelManager.main().gameLevel);
    },
  
});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
GameManager._main = null;
GameManager.main = function () {
    // 
    if (!GameManager._main) {
        cc.Debug.Log("_main is null");
        GameManager._main = new GameManager();
        GameManager._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return GameManager._main;
}

cc.GameManager = module.export = GameManager; 