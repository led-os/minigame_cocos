var AdConfigPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.AdConfigWeiXin();
        }
        return p;
    },

    InitPlatform: function (source, type, appId, appKey, adKey) {

    },

    SetEnableAdSplash: function (enable) {

    },
    InitSDK: function () {

    },

    SetNoAd: function () {

    },
    SetNoAdDay: function (day) {

    },
    SetAdSource: function (type, source) {

    },
    SetAppId: function (source, appid) {

    },

    SetAdKey: function (source, type, key) {

    },
    SetConfig: function (type, source, appid, adkey) {

    },

    AdSplashSetConfig: function (source, appId, appKey, type) {

    },

    AdSplashInsertSetConfig: function (source, appId, appKey, type) {

    },


    AdSplashInitAd: function (source, type) {

    },
    AdSplashShow: function () {

    },

});

cc.AdConfigPlatformWrapper = module.export = AdConfigPlatformWrapper; 
