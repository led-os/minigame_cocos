var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameCaiCaiLe = require("GameCaiCaiLe");
var AppType = require("AppType");
var UIWordBoard = require("UIWordBoard");
var UIWordContentBase = require("UIWordContentBase");
var UIWordImageText = require("UIWordImageText");


var UIGameCaiCaiLe = cc.Class({
    extends: UIGameBase,
    statics: {
        PLACE_MATH: "Math",
        languageColor: null,
    },

    properties: {
        game: {
            default: null,
            type: GameCaiCaiLe
        },

        uiWordContentPrefab: {
            default: null,
            type: cc.Prefab
        },

        uiWordBoard: UIWordBoard,
        isShowGame: false,
        uiWordContent: UIWordContentBase,

    },
    onLoad: function () {
        this._super();
        // this.LoadLanguageGame();
        this.LoadUIPrefab();

        // var url = cc.CloudRes.main().rootPath + "/" + cc.AppRes.Game_BG;
        // cc.TextureCache.main.Load(url, function (err, tex) {
        //     if (err) {

        //         cc.Debug.Log(err.message || err);
        //         return;
        //     }
        //     // cc.Debug.Log("TextureCache loadRes ok");

        //     this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
        //     var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
        //     lyscale.LayOut();

        //     // this.ShowUserGuide();
        // }.bind(this));

    },
    start: function () {

    },

    LoadUIPrefab: function () {
        var info = cc.GameLevelParse.main().GetLevelItemInfoCur();
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);

        var strPrefab = "";
        // switch (infoPlace.gameType) {
        //     case cc.GameRes.GAME_TYPE_IMAGE:
        //     case cc.GameRes.GAME_TYPE_TEXT:
        //     case cc.GameRes.GAME_TYPE_IMAGE_TEXT:
        //         {
        //             strPrefab = "AppCommon/Prefab/Game/UIWordImageText";
        //         }
        //         break;
        //     case cc.GameRes.GAME_TYPE_CONNECT:
        //         {
        //             strPrefab = "AppCommon/Prefab/Game/UIWordFillBox";
        //         }
        //         break;
        // }
        // if (infoPlace.gameType == cc.GameRes.GAME_TYPE_IMAGE)
        {
            strPrefab = "AppCommon/Prefab/Game/UIWordImageText";
        }

        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("LoadUIPrefab err=" + err.message || err);
                return;
            }
            this.uiWordContentPrefab = prefab;
            this.OnInitUI();
        }.bind(this)
        );
    },


    LoadLanguageGameDidFinish: function (p) {
        cc.Debug.Log("GameLianLianLe LoadLanguageDidFinish=");
        this.LoadGamePrefab();
    },

    OnInitUI: function () {
        var node = cc.instantiate(this.uiWordContentPrefab);
        this.uiWordContent = node.getComponent(UIWordContentBase);
        this.uiWordContent.node.parent = this.node;
        this.uiWordContent.node.setPosition(0, 512);

    },

    CreateGame: function () {
        cc.Debug.Log("GameLianLianLe CreateGame=");
        /*
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameCaiCaiLe);
        this.game.node.parent = this.node;
        this.game.languageColor = this.languageColor;
        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
        this.game.callbackGameWin = this.OnGameWin.bind(this);

        this.UpdateGuankaLevel(cc.LevelManager.main().gameLevel);
        */

    },



    UpdateGuankaLevel: function (level) {
        this._super();
        //this.textTitle.node.active = false;
        this.UpdateTitle();
        this.game.LoadGame();
    },

    OnGameWin: function () {
        this.OnGameWinBase();
        this.ShowGameWinAlert();

    },
    UpdateTitle() {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        var key = cc.GameLevelParse.main().keyGameGuide;
        var str = cc.Language.game().GetString(key);
        this.textTitle.string = str;
        cc.Tts.Speak(str);
    },
});
