var UIViewController = require("UIViewController");
//var Common = require("Common");
var AlertLockViewController = require("AlertLockViewController");
var UIView = require("UIView");

var UIGameBase = cc.Class({
    extends: UIView,

    statics: {
        GAME_AD_INSERT_SHOW_STEP: 2
    },

    properties: {
        gamePrefab: {
            default: null,
            type: cc.Prefab
        },
        listProLoad: {
            default: [],
            type: cc.LoadItemInfo
        },
        btnMusic: cc.UIButton,
        btnBack: cc.UIButton,
        imageBg: cc.UIImage,
        textTitle: cc.UIText,
        callbackGuankaFinish: null,
        callbackPlaceFinish: null,
    },
    Init: function () {
    },
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
        
    },
    start: function () {
        this.UpdateBtnMusic();
    },
    LoadGamePrefab: function () {
        var strPrefab = "AppCommon/Prefab/Game/Game" + cc.Config.main().appType;
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("LoadGamePrefab err=" + err.message || err);
                return;
            }
            this.gamePrefab = prefab;
            this.CreateGame();
        }.bind(this)
        );
    },
    CreateGame: function () {
    },

    OnClickBtnBack: function (event, customEventData) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    },
    UpdateBtnMusic: function () {
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
        this.btnMusic.UpdateSwitch(ret);

    },

    OnClickBtnMusic: function (event, customEventData) {
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
        var v = !ret;
        cc.Debug.Log("UpdateBtnSwitch value=" + v);
        cc.Common.SetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, v);
        this.UpdateBtnMusic();
        if (v) {
            cc.AudioPlay.main().PlayBgMusic();
        }
        else {
            cc.AudioPlay.main().PlayStopBgMusic();
        }
    },

    //guanka  



    UpdateGuankaLevel: function (level) {
        var idx = cc.LevelManager.main().gameLevel;
        cc.Debug.Log("UIGameBase::UpdateGuankaLevel idx=" + idx);
        if (idx >= 3) {
            var isLock = cc.Common.GetBoolOfKey(cc.AppRes.KEY_GAME_LOCK, true);
            if (isLock) {
                //AlertLockViewController.main().Show(null, null);
            }
        }

    },
    UpdatePlaceLevel: function (level) {
    },


    LoadLanguageGameDidFinish: function (p) {

    },

    LoadLanguageGame: function () {
        var info = cc.LevelManager.main().GetPlaceItemInfo(cc.LevelManager.main().placeLevel);
        var filepath = cc.Common.GAME_RES_DIR + "/language/" + info.language;//+ ".csv";
        cc.Debug.Log("LoadLanguageGame::filepath=" + filepath);
        cc.Language._game = new cc.Language();
        cc.Language._game.Init2(filepath, this.LoadLanguageGameDidFinish.bind(this));

    },

    ShowUserGuide: function () {
        var key = cc.CommonRes.KEY_USER_GUIDE + cc.Common.main().GetAppVersion();
        var isshowplay = cc.Common.GetBoolOfKey(key, false);
        if (isshowplay == true) {
            return;
        }
        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_USER_GUIDE");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_USER_GUIDE");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_USER_GUIDE");
        var no = yes;

        cc.ViewAlertManager.main().ShowFull({
            title: title,
            msg: msg,
            yes: yes,
            no: no,
            isShowBtnNo: false,
            name: "STR_KEYNAME_VIEWALERT_USER_GUIDE",
            finish: function (ui, isYes) {
                if (isYes) {
                } else {

                }
                cc.Common.SetBoolOfKey(key, true);
            }.bind(this),
        });

    },

    ShowAdInsert(step) {
        var _step = step;
        if (_step <= 0) {
            _step = 1;
        }
        //cc.GameManager.main().isShowGameAdInsert = false;
        // if ((GameManager.gameLevel != 0) && ((GameManager.gameLevel % _step) == 0))
        if ((cc.LevelManager.main().gameLevel % _step) == 0) {
            cc.AdKitCommon.main.InitAdInsert();
            cc.AdKitCommon.main.ShowAdInsert(100);
            //GameManager.main.isShowGameAdInsert = true;
        }
    },

    OnGameWinBase: function () {
        this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP);
        if (cc.LevelManager.main().gameLevelFinish < cc.LevelManager.main().gameLevel) {
            cc.LevelManager.main().gameLevelFinish = cc.LevelManager.main().gameLevel;
            //好友排行榜
            let score = cc.LevelManager.main().placeLevel + "-" + cc.LevelManager.main().gameLevel;
            cc.Debug.Log("OnGameWin score=" + score);
            cc.FrendBoard.main().SaveData(score);
        }

    },

    ShowGameWinAlert: function () {
        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = cc.Language.main().GetString("STR_UIVIEWALERT_NO_GAME_FINISH");
        cc.Debug.Log("game finish ShowFull");

        cc.ViewAlertManager.main().ShowFull({
            title: title,
            msg: msg,
            yes: yes,
            no: no,
            isShowBtnNo: true,
            name: "STR_KEYNAME_VIEWALERT_GAME_FINISH",
            finish: function (ui, isYes) {
                if (isYes) {
                    cc.LevelManager.main().GotoNextLevelWithoutPlace();
                } else {
                    //replay
                    cc.GameManager.main().GotoPlayAgain();
                }
            }.bind(this),
        });

    },

});

//单例对象 方法一
//UIGameBase.main = new UIGameBase(); 

//单例对象 方法二
UIGameBase._main = null;
UIGameBase.main = function () {
    // 
    if (!UIGameBase._main) {
        cc.Debug.Log("_main is null");
        UIGameBase._main = new UIGameBase();
        UIGameBase._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return UIGameBase._main;
}