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
        callbackGuankaFinish: null,
        placeLevel: 0,
        //get 和 set 函数不能放在statics里
        gameLevel: {
            get: function () {
                var key = "KEY_GAME_LEVEL_PLACE" + GameManager.placeLevel;
                return cc.Common.GetIntOfKey(key, 0);
            },
            set: function (value) {
                var key = "KEY_GAME_LEVEL_PLACE" + GameManager.placeLevel;
                cc.Common.SetItemOfKey(key, value);
            },
        },



        gameLevelFinish://已经通关 
        {
            get: function () {
                var key = "KEY_GAME_LEVEL_PLACE_FINISH" + GameManager.placeLevel;
                return cc.Common.GetIntOfKey(key, -1);
            },
            set: function (value) {
                var key = "KEY_GAME_LEVEL_PLACE_FINISH" + GameManager.placeLevel;
                cc.Common.SetItemOfKey(key, value);
            },
        },
        placeTotal:
        {
            get: function () {
                var ret = cc.GameGuankaParse.main().GetPlaceTotal();
                return ret;
            },
        },

        maxGuankaNum:
        {
            get: function () {
                var ret = cc.GameGuankaParse.main().GetGuankaTotal();
                return ret;
            },
        },
        listPlace: {
            default: [],
            type: cc.Object
        },

    },
    Init: function () {
        //this.ParseGuanka();
    },
    LoadPrefab: function () {

    },


    GetPlaceItemInfo: function (idx) {
        var game = GameViewController.main().gameBase;
        var info = cc.GameManager.main().listPlace[idx];
        cc.Debug.Log("GetPlaceItemInfo idx=" + idx + " GameManager.listPlace.length=" + cc.GameManager.main().listPlace.length);
        return info;
    },

    //UIViewController
    GotoGame: function (fromController) {
        var navi = fromController.naviController;
        if (navi != null) {
            navi.Push(GameViewController.main());
        }
    },
    CleanGuankaList: function () {
        cc.GameGuankaParse.main().CleanGuankaList();
    },
    StartParseGuanka: function (callback) {
        this.CleanGuankaList();
        this.callbackGuankaFinish = callback;
        // GameViewController.main().gameBase.StartParseGuanka(callback);
        cc.GameGuankaParse.main().StartParseGuanka(callback);
    },

    //place 
    StartParsePlace: function (callback) {
        //GameViewController.main().gameBase.StartParsePlaceList(callback);
        cc.GameGuankaParse.main().StartParsePlaceList(callback);
    },

    GotoPlayAgain: function () {
        GameViewController.main().gameBase.UpdateGuankaLevel(this.gameLevel);
    },

    GotoPreLevel: function () {

        this.gameLevel--;
        if (this.gameLevel < 0) {
            this.GotoPrePlace();
            return;

        }
        // GameManager.GotoGame();
        GameViewController.main().gameBase.UpdateGuankaLevel(this.gameLevel);

    },

    GotoNextLevel: function () {
        cc.Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        this.gameLevel++;
        cc.Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (this.gameLevel >= this.maxGuankaNum) {
            cc.Debug.Log("GotoNextPlace:gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
            this.GotoNextPlace();
            return;

        }
        GameViewController.main().gameBase.UpdateGuankaLevel(this.gameLevel);

    },


    GotoNextPlace: function () {

        this.placeLevel++;

        if (this.placeLevel >= this.placeTotal) {
            this.placeLevel = 0;

        }
        //必须在placeLevel设置之后再设置gameLevel
        this.gameLevel = 0;

        this.StartParseGuanka(this.callbackGuankaFinish);
        GameViewController.main().gameBase.UpdateGuankaLevel(this.gameLevel);

    },

    GotoPrePlace: function () {

        this.placeLevel--;
        if (this.placeLevel < 0) {
            this.placeLevel = this.placeTotal - 1;

        }
        //必须在placeLevel设置之后再设置gameLevel
        this.gameLevel = 0;

        this.StartParseGuanka(this.callbackGuankaFinish);
        GameViewController.main().gameBase.UpdateGuankaLevel(this.gameLevel);

    },
    //关卡循环
    GotoNextLevelWithoutPlace: function () {
        cc.Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        this.gameLevel++;
        cc.Debug.Log("gameLevel=" + this.gameLevel + " maxGuankaNum=" + this.maxGuankaNum);
        if (this.gameLevel >= this.maxGuankaNum) {
            this.gameLevel = 0;

        }
        GameViewController.main().gameBase.UpdateGuankaLevel(this.gameLevel);

    },

    //return List<object>
    GetGuankaListOfAllPlace: function () {
        var listRet;// = new List<object>();
        cc.Debug.Log("GetGuankaListOfAllPlace placeTotal=" + this.placeTotal);
        for (var i = 0; i < this.placeTotal; i++) {
            this.placeLevel = i;
            //必须在placeLevel设置之后再设置gameLevel
            this.gameLevel = 0;
            this.StartParseGuanka(this.callbackGuankaFinish);
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
        cc.Debug.Log("_main is null");
        GameManager._main = new GameManager();
        GameManager._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return GameManager._main;
}

cc.GameManager = module.export = GameManager; 