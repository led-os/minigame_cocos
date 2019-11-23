var UIView = require("UIView");
var AppRes = require("AppRes");
var HomeViewController = require("HomeViewController");
var SettingViewController = require("SettingViewController");


cc.Class({
    extends: UIView,
    properties: {
        indexAction: 0,
        timeAction: 0.3,
        isActionFinish: false,
        btnSetting: cc.Button,
        btnMore: cc.Button,
        btnShare: cc.Button,
        btnNoAd: cc.Button,

        btnAdVideo: cc.Button,
        btnRestoreIAP: cc.Button,
        btnMusic: cc.Button,
        btnSound: cc.Button,
    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        // this.UnifyButtonSprite(this.btnSetting);
        // this.UnifyButtonSprite(this.btnRestoreIAP);
        // this.UnifyButtonSprite(this.btnMore);

        // this.UnifyButtonSprite(this.btnShare);
        // this.UnifyButtonSprite(this.btnAdVideo);
        // this.UnifyButtonSprite(this.btnMusic);

        this.LayOut();

    },

    start: function () {
    },
    LayOut: function () {
        this._super();
        var size = this.node.getContentSize();
        var x, y, w, h;
        var ly = this.node.getComponent(cc.LayOutGrid);
        var rctran = this.node.getComponent(cc.RectTransform);
       // rctran.LayOut();
        cc.Debug.Log("UIHomeSideBar  w=  " + rctran.width + " h=" + rctran.height);
        if (ly != null) {
            ly.row = ly.GetChildCount(false);
            cc.Debug.Log("GetChildCount ly.row=" + ly.row);
            //有些按钮隐藏后重新布局
            ly.LayOut();
        }

    },

    UpdateBtnMusic: function () {
        var ret = cc.Common.GetBoolOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, false);
        cc.TextureUtil.UpdateButtonTexture(this.btnMusic, ret ? cc.AppRes.IMAGE_BtnMusicOn : cc.AppRes.IMAGE_BtnMusicOff, false);
    },

    OnClickBtnMusic: function (event, customEventData) {
        var ret = cc.Common.GetBoolOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
        var v = !ret;
        cc.Debug.Log("UpdateBtnSwitch value=" + v);
        cc.Common.SetBoolOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, v);
        this.UpdateBtnMusic();
        if (v) {
            cc.AudioPlay.main().PlayBgMusic();
        }
        else {
            cc.AudioPlay.main().PlayStopBgMusic();
        }
    },

    OnClickBtnSound: function (event, customEventData) {
    },

    OnClickBtnNoAd: function (event, customEventData) {
    },
    OnClickBtnMore: function (event, customEventData) {
    },
    OnClickBtnShare: function (event, customEventData) {
        cc.Share.main().ShareImageText("", cc.AppRes.SHARE_TITLE, cc.AppRes.SHARE_IMAGE_URL, "");
    },
    OnClickBtnSetting: function (event, customEventData) {
        cc.Debug.Log("UIHomeSideBar OnClickBtnSetting 1");
        var controller = HomeViewController.main();
        if (controller != null) {
            var navi = controller.naviController;
            cc.Debug.Log("UIHomeSideBar OnClickBtnSetting 2");
            navi.Push(SettingViewController.main());

        }
    },
    OnClickBtnAdVideo: function (event, customEventData) {
    },

    OnClickBtnFrendBoard: function (event, customEventData) {
        cc.FrendBoard.main().Show();
    },

});

