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
        this.UnifyButtonSprite(this.btnBack);
        this.LoadLanguageGame();
        this.textTitle.node.active = false;
        // this.LoadGamePrefab();
        //var ev = this.node.addComponent(cc.UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent;
    },
    start: function () {

    },


    LoadLanguageDidFinish: function (p) {
        this.LoadGamePrefab();
    },

    CreateGame: function () {
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameLianLianLe);
        this.game.node.parent = this.node;
        this.game.languageColor = this.languageColor;
        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
        this.UpdateGuankaLevel(cc.GameManager.main().gameLevel);
    },



    UpdateGuankaLevel: function (level) {
        this._super();
        this.game.listShape = this.listShape;
        this.game.listColor = this.listColor;
        this.game.textTitle = this.textTitle;
        this.textTitle.node.active = false;
        this.game.LoadGame();
        //必须在loadgame之后loadbg
        this.LoadBg();
    },




});
