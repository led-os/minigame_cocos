var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameCaiCaiLe = require("GameCaiCaiLe");
var AppType = require("AppType");
var UIWordBoard = require("UIWordBoard");
var UIWordContentBase = require("UIWordContentBase");
var UIWordImageText = require("UIWordImageText");
var UIWordBar = require("UIWordBar");

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
        uiWordBar: UIWordBar,
        nodeTopBar: cc.Node,
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

        this.uiWordBar.objCallBack = {
            OnGameFinish: function (ui, isFail) {
                this.OnGameWinFinish(ui, isFail);
            }.bind(this),
            OnDidBackWord: function (ui, item) {
                this.OnUIWordBarDidBackWord(ui, item);
            }.bind(this),
        };

        this.uiWordBoard.objCallBack = {
            OnBoardDidClick: function (uiBorad, uiItem) {
                this.OnUIWordBoardDidClick(uiBorad, uiItem);
            }.bind(this),
        };

    },
    start: function () {
        this.LayOut();
        // this.ShowGameWinAlert();
    },

    LoadUIPrefab: function () {
        var info = cc.GameLevelParse.main().GetLevelItemInfoCur();
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);

        var strPrefab = "";
        infoPlace.gameType = cc.GameRes.GAME_TYPE_IMAGE;
        switch (infoPlace.gameType) {
            case cc.GameRes.GAME_TYPE_IMAGE:
            case cc.GameRes.GAME_TYPE_TEXT:
            case cc.GameRes.GAME_TYPE_IMAGE_TEXT:
                {
                    strPrefab = "AppCommon/Prefab/Game/UIWordImageText";
                }
                break;
            case cc.GameRes.GAME_TYPE_CONNECT:
                {
                    strPrefab = "AppCommon/Prefab/Game/UIWordFillBox";
                }
                break;
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
        node.parent = this.node;
        this.UpdateGuankaLevel(cc.LevelManager.main().gameLevel);
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

    LayOut: function () {
        if (this.uiWordContent != null) {
            var ly = this.uiWordContent.node.getComponent(cc.LayOutBetween);
            if (ly != null) {
                ly.target1 = this.uiWordBar.node;
                ly.target2 = this.nodeTopBar;
                ly.LayOut();
            }
        }



    },

    UpdateGuankaLevel: function (level) {
        this._super();
        //this.textTitle.node.active = false;
        this.UpdateTitle();
        //this.game.LoadGame();
        this.UpdateWord();
        this.uiWordContent.UpdateGuankaLevel(cc.LevelManager.main().gameLevel);
        this.LayOut();

    },

    UpdateTitle() {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        var key = cc.GameLevelParse.main().keyGameGuide;
        var str = cc.Language.game().GetString(key);
        this.textTitle.string = str;
        cc.Tts.Speak(str);
    },
    UpdateWord() {
        var info = cc.GameLevelParse.main().GetItemInfo();
        // cc.Debug.Log("UpdateWord gameType=" + info.gameType);

        if (this.uiWordContent != null) {
            //this.uiWordContent.UpdateWord();
        }
        //先计算行列数
        this.LayOut();
        this.uiWordBoard.InitItem();//ok
        var strBoard = cc.GameAnswer.main().GetWordBoardString(info, this.uiWordBoard.row, this.uiWordBoard.col);//ok
        this.uiWordBoard.UpadteItem(info, strBoard);//ng
        this.uiWordBar.UpadteItem(info);

    },


    //interface
    OnGameWinFinish(ui, isFail) {
        var info = cc.GameLevelParse.main().GetItemInfo();
        //show game win
        if (isFail) {
            //PopUpManager.main.Show<UIGameFail>("App/Prefab/Game/UIGameFail");
        }
        else {
            cc.Debug.Log("caicaile OnGameWin");
            // LevelManager.main.gameLevelFinish = LevelManager.main.gameLevel;
            this.OnGameWinBase();
            this.ShowGameWinAlert();
            // if (gameBase != null) {
            //     Debug.Log("caicaile OnGameWin GAME_STATUS_FINISH+info.id=" + info.id);
            //     gameBase.SetGameItemStatus(info, GameBase.GAME_STATUS_FINISH);
            // }

            if (info.gameType == cc.GameRes.GAME_TYPE_CONNECT) {
                //PopUpManager.main.Show<UIGameWinIdiomConnect>("App/Prefab/Game/UIGameWinIdiomConnect");
            }
            else {
                //PopUpManager.main.Show<UIGameWin>("App/Prefab/Game/UIGameWin");
            }


        }

    },

    OnUIWordBoardDidClick: function (uiBorad, item) {

        cc.Debug.Log("UIWordBoardDidClick");
        var infoGuanka = cc.GameLevelParse.main().GetItemInfo();
        if (infoGuanka.gameType == cc.GameRes.GAME_TYPE_TEXT) {
            if (this.uiWordContent.CheckAllFill()) {
                this.uiWordContent.OnAddWord(item.wordDisplay);
                item.ShowContent(false);
                if (CheckAllAnswerFinish()) {
                    this.OnGameWinFinish(this.uiWordBar, false);
                }
                else {
                    this.OnGameWinFinish(this.uiWordBar, true);
                }
            }
        }
        if (this.uiWordBar.node.active) {
            if (!this.uiWordBar.CheckAllFill()) {
                this.uiWordBar.AddWord(item.wordDisplay);
                item.ShowContent(false);
            }
        }
        else {
            if (this.uiWordContent != null) {
                this.uiWordContent.OnAddWord(item.wordDisplay);
                item.ShowContent(false);
                var ret = this.uiWordContent.CheckAllAnswerFinish();
                cc.Debug.Log("CheckAllAnswer ret=" + ret);
                if (ret) {
                    this.OnGameWinFinish(this.uiWordBar, false);
                }
            }

        }
    },

    OnUIWordBarDidBackWord: function (ui, item) {
        this.uiWordBoard.BackWord(item.wordDisplay);
    }


});
