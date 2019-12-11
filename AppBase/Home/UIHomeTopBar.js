var UIView = require("UIView");
var SettingViewController = require("SettingViewController");
var HomeViewController = require("HomeViewController");

cc.Class({
    extends: UIView,
    statics: {
        // 声明静态变量
        STR_KEYNAME_VIEWALERT_NOAD: "STR_KEYNAME_VIEWALERT_NOAD",
        STR_KEYNAME_VIEWALERT_LOADING: "STR_KEYNAME_VIEWALERT_LOADING",
    },

    properties: {
        btnNoAd: {
            default: null,
            type: cc.Button
        },
        btnRestoreIAP: {
            default: null,
            type: cc.Button
        },
        btnMore: {
            default: null,
            type: cc.Button
        },
        btnSetting: {
            default: null,
            type: cc.Button
        },
        btnShare: {
            default: null,
            type: cc.Button
        },
        btnAdVideo: {
            default: null,
            type: cc.Button
        },
        btnMusic: {
            default: null,
            type: cc.Button
        },
    },

    onLoad: function () {

        this.UnifyButtonSprite(this.btnNoAd);
        this.UnifyButtonSprite(this.btnRestoreIAP);
        this.UnifyButtonSprite(this.btnMore);
        this.UnifyButtonSprite(this.btnSetting);
        this.UnifyButtonSprite(this.btnShare);
        this.UnifyButtonSprite(this.btnAdVideo);
        this.UnifyButtonSprite(this.btnMusic);

        if (!cc.sys.isNative) {
            this.btnNoAd.node.active = false;
            if (this.btnRestoreIAP != null) {
                this.btnRestoreIAP.node.active = false;
            }
            this.btnMore.node.active = false;
            //this.btnShare.node.active = false;
        }
        this.UpdateBtnMusic();
        this.LayOut();
    },

    LayOut: function () {
        var ly = this.node.getComponent(cc.Layout);
        if (ly != null) {
            //有些按钮隐藏后重新布局
            ly._doLayout();
        }

    },

    UpdateBtnMusic: function () {
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
        cc.TextureUtil.UpdateButtonTexture(this.btnMusic, ret ? cc.AppRes.IMAGE_BtnMusicOn : cc.AppRes.IMAGE_BtnMusicOff, false);
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
    OnClickBtnNoAd: function (event, customEventData) {
    },
    OnClickBtnMore: function (event, customEventData) {
    },
    OnClickBtnShare: function (event, customEventData) {
        cc.Share.main().ShareImageText("", cc.AppRes.SHARE_TITLE, cc.AppRes.SHARE_IMAGE_URL, "");
    },
    OnClickBtnSetting: function (event, customEventData) {
        // SettingViewController.main().Show(null,null);
        var controller = HomeViewController.main();
        if (controller != null) {
            var navi = controller.naviController;
            navi.Push(SettingViewController.main());
        }
    },
    OnClickBtnAdVideo: function (event, customEventData) {
    },

    OnClickBtnFrendBoard: function (event, customEventData) {
        cc.FrendBoard.main().Show();
    },
}); 