var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameLianLianLe = require("GameLianLianLe");
var AppType = require("AppType");
//var LoadItemInfo = require("LoadItemInfo");

var UIGameLianLianLe = cc.Class({
    extends: UIGameBase,
    statics: {
        PLACE_MATH: "Math",
        languageColor: null,
    },

    properties: {
        game: {
            default: null,
            type: GameLianLianLe
        },

        isShowGame: false,
    },
    onLoad: function () {
        this._super();
        //this.UnifyButtonSprite(this.btnBack);
        this.LoadLanguageGame();
        //this.textTitle.node.active = false;
        //this.LoadGamePrefab();
        //var ev = this.node.addComponent(cc.UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent;
 
    },
    start: function () {

    },


    LoadLanguageGameDidFinish: function (p) {
        cc.Debug.Log("GameLianLianLe LoadLanguageDidFinish=");
        this.LoadGamePrefab();
    },

    CreateGame: function () {
        cc.Debug.Log("GameLianLianLe CreateGame=");
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameLianLianLe);
        this.game.node.parent = this.node;
        this.game.languageColor = this.languageColor;
        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
        // this.game.callbackGameWin = this.OnGameWin.bind(this);
        this.game.objGameFinish = {
            onWin: function (ui) {
                this.OnGameWinFinish(ui, false);
            }.bind(this),
            onFail: function (ui) {
                this.OnGameWinFinish(ui, true);
            }.bind(this),
        };


        this.UpdateGuankaLevel(cc.LevelManager.main().gameLevel);
    },



    UpdateGuankaLevel: function (level) {
        this._super();
        //this.textTitle.node.active = false;
        this.UpdateTitle();
        this.game.LoadGame();
    },

    //interface
    OnGameWinFinish(uigame, isFail) {
        var info = cc.GameLevelParse.main().GetItemInfo();
        var strPrefab = "";
        //show game win
        if (isFail) {
            strPrefab = "AppCommon/Prefab/Game/UIGameFail";

        }
        else {
            cc.Debug.Log("  OnGameWin");
            strPrefab = "AppCommon/Prefab/Game/UIGameWin";
            this.OnGameWinBase();
        }

        cc.PopUpManager.main().Show({
            prefab: strPrefab,
            open: function (ui) {
                ui.UpdateItem(info);
            }.bind(this),
            close: function (ui) {
            }.bind(this),
        });

    },

    UpdateTitle() {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        var key = cc.GameLevelParse.main().keyGameGuide;
        var str = cc.Language.game().GetString(key);
        this.textTitle.text = str;
        cc.Tts.Speak(str);
    },
});
