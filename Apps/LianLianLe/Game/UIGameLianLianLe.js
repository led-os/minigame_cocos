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
        //this.LoadGamePrefab();
        //var ev = this.node.addComponent(cc.UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent;


        var dirRoot = cc.CloudRes.main().rootPath; 
     
        var url = dirRoot + "/ui/GuankaBg.jpg"; 
        cc.TextureCache.main.Load(url, function (err, tex) {
            if (err) {

                cc.Debug.Log(err.message || err);
                return;
            }
            // cc.Debug.Log("TextureCache loadRes ok");

            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            lyscale.LayOut();

           // this.ShowUserGuide();
        }.bind(this));

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
        this.game.callbackGameWin = this.OnGameWin.bind(this);
        
        this.UpdateGuankaLevel(cc.GameManager.main().gameLevel);
    },



    UpdateGuankaLevel: function (level) {
        this._super();
        this.game.textTitle = this.textTitle;
        this.textTitle.node.active = false;
        this.game.LoadGame();
    },

    OnGameWin: function () {
        this.OnGameWinBase();
        this.ShowGameWinAlert();
 
    },


});
