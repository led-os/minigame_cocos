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

        if (!cc.sys.isNative) {
            this.btnNoAd.node.active = false;
            if (this.btnRestoreIAP != null) {
                this.btnRestoreIAP.node.active = false;
            }
            this.btnMore.node.active = false;
            //this.btnShare.node.active = false;
        }

        this.LayOut();
    },

    LayOut: function () {
        var ly = this.node.getComponent(cc.Layout);
        if (ly != null) {
            //有些按钮隐藏后重新布局
            ly._doLayout();
        }

    },

    OnClickBtnMusic: function (event, customEventData) {
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
}); 