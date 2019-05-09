var UIViewController = require("UIViewController");
//var Common = require("Common");
//var Config = require("Config");
var UIView = require("UIView");

var UIAlertLock = cc.Class({
    extends: UIView,

    statics: {
    },

    properties: {
        gamePrefab: {
            default: null,
            type: cc.Prefab
        },

        content: cc.Node,

        imageBg: cc.Sprite,
        imageBoard: cc.Sprite,
        textTitle: cc.Label,
        textMsg: cc.Label,
        btnYes: cc.Button,
        btnNo: cc.Button,


        callbackGuankaFinish: null,
        callbackPlaceFinish: null,

    },
    Init: function () {
    },
    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
        this.UnifyButtonSprite(this.btnYes);
        this.UnifyButtonSprite(this.btnNo);
        this.UnifyButtonSprite(this.btnClose);
        this.textTitle.string = cc.Language.main().GetString("STR_ALERTLOCK_TITLE");
        this.textMsg.string = cc.Language.main().GetString("STR_ALERTLOCK_MSG");

        var strYes = cc.Language.main().GetString("STR_ALERTLOCK_YES");
        var strNo = cc.Language.main().GetString("STR_ALERTLOCK_NO");

        var textBtn = cc.Common.GetButtonText(this.btnYes);
        var fontsize = textBtn.fontSize;
        var w_yes = cc.Common.GetTextWidth(strYes, fontsize) + fontsize / 2;
        var w_no = cc.Common.GetTextWidth(strNo, fontsize) + fontsize / 2;
        var w = Math.max(w_yes, w_no);

        this.UpdateBtnText(this.btnYes, strYes, w);
        this.UpdateBtnText(this.btnNo, strNo, w);
        this.LayOut();
    },

    UpdateBtnText: function (btn, str, w) {
        var textBtn = cc.Common.GetButtonText(btn);
        textBtn.string = str;
        var h = btn.node.getContentSize().height;
        btn.node.setContentSize(w, h);
    },

    LayOut: function () {
        var size = this.node.getContentSize();
        var ratio = 0.5;
        var x, y, w, h;
        w = size.width * ratio;
        h = size.height * ratio;
        w = Math.min(w,h);
        h = w;
        this.content.setContentSize(w, h);
    },

    DoUnLockGame: function () {
        cc.Common.SetBoolOfKey(cc.AppRes.KEY_GAME_LOCK, false);
    },
    OnClose: function () {
        if (this.controller != null) {
            this.controller.Close();
        }
    },

    OnClickBtnYes: function (event, customEventData) {
        this.OnClose();
        cc.Share.main().ShareImageText("", cc.AppRes.SHARE_TITLE, cc.AppRes.SHARE_IMAGE_URL, "");
        //this.scheduleOnce(this.DoUnLockGame, 1);
        this.DoUnLockGame();
    },
    OnClickBtnNo: function (event, customEventData) {

        this.OnClose();
    },
});
