var UIView = require("UIView");
var UIGameWinBase = cc.Class({
    extends: cc.UIViewPop,// cc.ItemInfo, 
    statics: {
        KEY_GAMEWIN_INFO_INTRO: "KEY_GAMEWIN_INFO_INTRO",
        KEY_GAMEWIN_INFO_YUANWEN: "KEY_GAMEWIN_INFO_YUANWEN",
        KEY_GAMEWIN_INFO_TRANSLATION: "KEY_GAMEWIN_INFO_TRANSLATION",
        KEY_GAMEWIN_INFO_JIANSHUANG: "KEY_GAMEWIN_INFO_JIANSHUANG",
        KEY_GAMEWIN_INFO_AUTHOR_INTRO: "KEY_GAMEWIN_INFO_AUTHOR_INTRO",
        KEY_GAMEWIN_INFO_ALBUM: "KEY_GAMEWIN_INFO_ALBUM",
    },
    properties: {
        uiSegment: cc.UISegment,
        textView: cc.UITextView,
        textTitle: cc.UIText,
        imageBg: cc.UIImage,
        imageHead: cc.UIImage,
        btnClose: cc.UITypeButton,
        btnAddLove: cc.UITypeButton,
        btnFriend: cc.UITypeButton,
        btnNext: cc.UITypeButton,
        objLayoutBtn: cc.Node,

        indexSegment: 0,
    },

    onLoad: function () {
        this._super();
    },

    LayOut() {
        this._super();
    },
    UpdateItem(info) {

    },

    UpdateLoveStatus() {
        var info = cc.GameLevelParse.main().GetItemInfo();
        var strBtn = "";
        if (cc.LoveDB.main().IsItemExist(infoItem)) {
            strBtn = cc.Language.main().GetString("STR_IdiomDetail_DELETE_LOVE");
        }
        else {
            strBtn = cc.Language.main().GetString("STR_IdiomDetail_ADD_LOVE");
        }
        this.btnAddLove.text = strBtn;
        // Common.SetButtonText(btnAddLove, strBtn, 0, false);
    },

    OnClickBtnClose() {
        this.Close();
        cc.GameManager.main().GotoPlayAgain();
    },
    OnClickBtnNext() {
        this.Close();
        cc.LevelManager.main().GotoNextLevel();
    },
    OnClickBtnAddLove() {
        var info = cc.GameLevelParse.main().GetItemInfo();
        if (cc.LoveDB.main().IsItemExist(info)) {
            cc.LoveDB.main().DeleteItem(info);
        }
        else {
            cc.LoveDB.main().AddItem(info);
        }
        this.UpdateLoveStatus();
    },
});

