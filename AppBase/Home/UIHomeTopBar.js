var UIView = require("UIView");
var SettingViewController = require("SettingViewController");
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
    },

    onLoad:function()
    {
       
    },

    OnClickBtnNoAd: function (event, customEventData) {
    },
    OnClickBtnMore: function (event, customEventData) {
    },
    OnClickBtnShare: function (event, customEventData) {
    },
    OnClickBtnSetting: function (event, customEventData) {
        SettingViewController.main().Show(null,null);
    },
    OnClickBtnAdVideo: function (event, customEventData) {
    },
}); 