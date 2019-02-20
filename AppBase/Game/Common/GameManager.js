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
        placeLevel: 0,

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
        GameViewController.main().gameBase.CleanGuankaList();
    },
    ParseGuanka: function () {
        this.CleanGuankaList();
        GameViewController.main().gameBase.ParseGuanka();
    },

    GotoPlayAgain: function () {
        GameViewController.main.gameBase.UpdateGuankaLevel(GameManager.gameLevel);
    },

    GotoPreLevel: function () {

        GameManager.gameLevel--;
        if (GameManager.gameLevel < 0) {
            this.GotoPrePlace();
            return;

        }
        // GameManager.GotoGame();
        GameViewController.main.gameBase.UpdateGuankaLevel(GameManager.gameLevel);

    },

    GotoNextLevel: function () {
        cc.log("gameLevel=" + GameManager.gameLevel + " maxGuankaNum=" + GameManager.maxGuankaNum);
        GameManager.gameLevel++;
        cc.log("gameLevel=" + GameManager.gameLevel + " maxGuankaNum=" + GameManager.maxGuankaNum);
        if (GameManager.gameLevel >= GameManager.maxGuankaNum) {
            cc.log("GotoNextPlace:gameLevel=" + GameManager.gameLevel + " maxGuankaNum=" + GameManager.maxGuankaNum);
            this.GotoNextPlace();
            return;

        }
        GameViewController.main.gameBase.UpdateGuankaLevel(GameManager.gameLevel);

    },


    GotoNextPlace: function () {

        GameManager.placeLevel++;

        if (GameManager.placeLevel >= GameManager.placeTotal) {
            GameManager.placeLevel = 0;

        }
        //必须在placeLevel设置之后再设置gameLevel
        GameManager.gameLevel = 0;

        this.ParseGuanka();
        GameViewController.main.gameBase.UpdateGuankaLevel(GameManager.gameLevel);

    },

    GotoPrePlace: function () {

        GameManager.placeLevel--;
        if (GameManager.placeLevel < 0) {
            GameManager.placeLevel = GameManager.placeTotal - 1;

        }
        //必须在placeLevel设置之后再设置gameLevel
        GameManager.gameLevel = 0;

        this.ParseGuanka();
        GameViewController.main.gameBase.UpdateGuankaLevel(GameManager.gameLevel);

    },
    //关卡循环
    GotoNextLevelWithoutPlace: function () {
        cc.log("gameLevel=" + GameManager.gameLevel + " maxGuankaNum=" + GameManager.maxGuankaNum);
        GameManager.gameLevel++;
        cc.log("gameLevel=" + GameManager.gameLevel + " maxGuankaNum=" + GameManager.maxGuankaNum);
        if (GameManager.gameLevel >= GameManager.maxGuankaNum) {
            GameManager.gameLevel = 0;

        }
        GameViewController.main.gameBase.UpdateGuankaLevel(GameManager.gameLevel);

    },

    //return List<object>
    GetGuankaListOfAllPlace: function () {
        var listRet;// = new List<object>();
        cc.log("GetGuankaListOfAllPlace placeTotal=" + GameManager.placeTotal);
        for (var i = 0; i < GameManager.placeTotal; i++) {
            GameManager.placeLevel = i;
            //必须在placeLevel设置之后再设置gameLevel
            GameManager.gameLevel = 0;
            this.ParseGuanka();
            // if (UIGameBase.listGuanka == null) {
            //     Debug.Log("listGuanka is null");
            // }
            // else {
            //     foreach(object obj in UIGameBase.listGuanka)
            //     {
            //         listRet.Add(obj);
            //     }
            // }


        }
        return listRet;

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