var UIView = require("UIView");
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
}); 