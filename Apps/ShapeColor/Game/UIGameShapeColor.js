var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameShapeColor = require("GameShapeColor");
var AppType = require("AppType");
//var LoadItemInfo = require("LoadItemInfo");

var UIGameShapeColor = cc.Class({
    extends: UIGameBase,
    statics: {
        languageColor: null,
    },

    properties: {
        game: {
            default: null,
            type: GameShapeColor
        },


        isShowGame: false,
    },
    onLoad: function () {
        this._super();
        this.LoadLanguageGame();
        this.LoadLanguageColor(this.LoadLanguageDidFinish.bind(this));
        this.textTitle.node.active = false;
    },
    start: function () {

    },
    LoadLanguageColor: function (callback) {
        var filepath = cc.Common.GAME_RES_DIR + "/language/language_color.csv";
        if (this.languageColor != null) {
            if (callback != null) {
                callback(this);
            }
            return;
        }
        this.languageColor = new cc.Language();
        this.languageColor.Init2(filepath, callback);
    },

    LoadLanguageDidFinish: function (p) {
        this.LoadGamePrefab();
    },

    CreateGame: function () {
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameShapeColor);
        this.game.node.parent = this.node;
        this.game.languageColor = this.languageColor;
        this.game.cbGameDidError = this.OnGameShapeColorDidError.bind(this);
        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
        this.UpdateGuankaLevel(cc.GameManager.main().gameLevel);

    },

    LanguageKeyOfShape: function (info) {
        var key = info.id;
        // if (cc.Config.main().appKeyName == cc.AppType.SHAPECOLOR) {
        //     key = "SHAPE_TITLE_" + info.id;
        // }
        return key;
    },

    StringOfGameStatus: function (status) {
        var str = "unknown" + status;
        switch (status) {
            case GameShapeColor.GAME_STATUS_UN_START:
                str = cc.Language.main().GetString("STR_GAME_STATUS_UN_START");
                break;
            case GameShapeColor.GAME_STATUS_PLAY:
                str = cc.Language.main().GetString("STR_GAME_STATUS_PLAY");
                break;
            case GameShapeColor.GAME_STATUS_FINISH:
                str = cc.Language.main().GetString("STR_GAME_STATUS_FINISH");
                break;
        }

        return str;
    },
    GameStatusOfShape: function (info) {
        var key = GameShapeColor.STR_KEY_GAME_STATUS_SHAPE + info.id;
        var status = cc.Common.GetIntOfKey(key, GameShapeColor.GAME_STATUS_UN_START);
        cc.Debug.Log("status=" + status);
        var str = this.StringOfGameStatus(status);
        return str;
    },
    GameStatusOfColor: function (info) {
        var key = GameShapeColor.STR_KEY_GAME_STATUS_COLOR + info.id;
        var status = cc.Common.GetIntOfKey(key, GameShapeColor.GAME_STATUS_UN_START);
        var str = this.StringOfGameStatus(status);
        return str;
    },
    ShapeTitleOfItem: function (info) {
        var key = this.LanguageKeyOfShape(info);
        var str = cc.Language.game().GetString(key);
        return str;
    },
    ColorTitleOfItem: function (info) {
        var str = "unknown";
        if (this.languageColor != null) {
            str = this.languageColor.GetString(info.id);
        } else {
            this.LoadLanguageColor(function (p) { });
        }
        return str;
    },



    UpdateGuankaLevel: function (level) {
        cc.Debug.Log("UIGameShapeColor::UpdateGuankaLevel");
        this._super();
        this.game.listShape = cc.GameLevelParse.main().listShape;
        this.game.listColor = cc.GameLevelParse.main().listColor;
        this.game.textTitle = this.textTitle;
        this.textTitle.node.active = false;
        this.game.LoadGame(cc.GameManager.gameMode);
        //必须在loadgame之后loadbg
        this.LoadBg();
    },
    OnGameShapeColorDidError: function (g, error, str) {
        this.UpdateError(error, str);
    },
    UpdateError: function (error, str) {
        var title = "";
        var color = cc.Color.WHITE;
        this.textTitle.node.active = true;

        switch (error) {
            case GameShapeColor.ERROR_STATUS_NONE:
                title = str;
                color = cc.Color.WHITE;
                break;
            case GameShapeColor.ERROR_STATUS_SHAPE:
                title = cc.Language.main().GetString("STR_ERROR_SHAPE");
                color = cc.Color.RED;
                cc.Tts.Speak(title);
                break;
            case GameShapeColor.ERROR_STATUS_COLOR:
                title = cc.Language.main().GetString("STR_ERROR_COLOR");
                color = cc.Color.RED;
                cc.Tts.Speak(title);
                break;
            case GameShapeColor.ERROR_STATUS_SHAPE_COLOR:
                title = cc.Language.main().GetString("STR_ERROR_SHAPE_COLOR");
                color = cc.Color.RED;
                cc.Tts.Speak(title);
                break;
            case GameShapeColor.ERROR_STATUS_HIDE:
                this.textTitle.node.active = false;
                break;
            case GameShapeColor.ERROR_STATUS_SHOW:
                this.textTitle.node.active = true;
                break;
        }
        cc.Debug.Log("UpdateError error=" + error + " title=" + title);
        this.textTitle.string = title;
        this.textTitle.node.color = color;
    },



    IsInColorFilter: function (colorfilter, info) {
        var isfilter = false;
        for (let infocolor of colorfilter.listColorFilter) {
            if (info.id == infocolor.id) {
                isfilter = true;
                break;
            }
        }
        return isfilter;
    },
    LoadBg: function () {
        var listBgNew = [];
        var listBg = cc.GameLevelParse.main().listBg;
        for (let infobg of listBg) {
            var isColorFilter = false;
            for (let infocolor of this.game.listColorShow) {
                isColorFilter = this.IsInColorFilter(infobg, infocolor);
                if (isColorFilter) {
                    break;
                }
            }
            if (!isColorFilter) {
                listBgNew.push(infobg);
            }
        }
        if (listBgNew.length == 0) {
            listBgNew = listBg;
        }

        var rdm = cc.Common.RandomRange(0, listBgNew.length);
        cc.Debug.Log("listBgNew.count = " + listBgNew.length + " rdm=" + rdm);

        var info = this.game.GetItemInfoShapeColor(rdm, listBgNew);
        //imagebg
        //var url = "http://i1.bvimg.com/679362/29748b18acf1446a.png"
        //var url = cc.AppRes.URL_HTTP_HEAD + cc.Common.GAME_RES_DIR + "/image_bg/bg0.jpg";
        // var url = cc.AppRes.URL_HTTP_HEAD + cc.Common.GAME_RES_DIR + "/image_bg/bg1.png"; 
        var dirRoot = cc.Common.CLOUD_RES_DIR;
        if (cc.Common.main().isWeiXin) {
            dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
        }
        var url = dirRoot + "/image_bg/" + info.pic;
        cc.Debug.Log("listBgNew.count = " + listBgNew.length + " url=" + url);
        cc.TextureCache.main.Load(url, function (err, tex) {
            if (err) {

                cc.Debug.Log(err.message || err);
                return;
            }
            // cc.Debug.Log("TextureCache loadRes ok");

            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            lyscale.LayOut();

           this.ShowUserGuide();
        }.bind(this));

    },





});
