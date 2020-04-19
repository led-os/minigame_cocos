var Dictionary = require("Dictionary");


var AdConfig = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {
        platform: cc.AdConfigPlatformWrapper,
        adParser: cc.AdConfigParser,
    },
    statics: {

    },

    Init: function () {
        var p = new cc.AdConfigPlatformWrapper();
        this.platform = p.GetPlatform();

        this.adParser = new cc.AdConfigParser();
        this.adParser.StartParseConfig("");


        this.adParser.listPlatform.forEach(function (info, index) {
            this.platform.InitPlatform(info.source, cc.AdConfigParser.AdType.BANNER, info.appid, info.appkey, info.key_banner);
            this.platform.InitPlatform(info.source, cc.AdConfigParser.AdType.INSERT, info.appid, info.appkey, info.key_insert);
            this.platform.InitPlatform(info.source, cc.AdConfigParser.AdType.SPLASH_INSERT, info.appid, info.appkey, info.key_splash_insert);
            this.platform.InitPlatform(info.source, cc.AdConfigParser.AdType.SPLASH, info.appid, info.appkey, info.key_splash);
            this.platform.InitPlatform(info.source, cc.AdConfigParser.AdType.NATIVE, info.appid, info.appkey, info.key_native);
            this.platform.InitPlatform(info.source, cc.AdConfigParser.AdType.VIDEO, info.appid, info.appkey, info.key_video);
            this.platform.InitPlatform(info.source, cc.AdConfigParser.AdType.INSERT_VIDEO, info.appid, info.appkey, info.key_insert_video);

        }.bind(this));

        //this.SetNoAdDay(Config.main.NO_AD_DAY);
        this.SetEnableAdSplash(true);
    },
    InitPriority(src, type) {
        this.adParser.InitPriority(src, type);
    },
    GetAdSource(type) {
        return this.adParser.GetAdSource(type);
    },
    GetAppId(source) {
        return this.adParser.GetAppId(source);
    },

    GetAdKey(source, type) {
        return this.adParser.GetAdKey(source, type);
    },

    GetNextPriority(type) {
        return this.adParser.GetNextPriority(type);
    },
 

    SetEnableAdSplash: function (enable) {

    },
    InitSDK: function () {
        this.platform.InitSDK();
    },

    SetNoAd: function () {
        this.platform.SetNoAd();
    },
    SetNoAdDay: function (day) {
        this.platform.SetNoAdDay(day);
    },
    SetAdSource: function (type, source) {
        this.platform.SetAdSource(type, source);
    },
    SetAppId: function (source, appid) {
        this.platform.SetAppId(source, appid);
    },

    SetAdKey: function (source, type, key) {
        this.platform.SetAdKey(source, type, key);
    },
    SetConfig: function (type, source, appid, adkey) {
        this.platform.SetConfig(type, source, appid, adkey);
    },

    AdSplashSetConfig: function (source, appId, appKey, type) {
        this.platform.SetConfig(source, appId, appKey, type);
    },

    AdSplashInsertSetConfig: function (source, appId, appKey, type) {
        this.platform.AdSplashInsertSetConfig(source, appId, appKey, type);
    },


    AdSplashInitAd: function (source, type) {
        this.platform.AdSplashInsertSetConfig(source, type);
    },
    AdSplashShow: function () {
        this.platform.AdSplashShow();
    },

});

AdConfig._main = null;
AdConfig.main = function () {
    // 
    if (!AdConfig._main) {
        AdConfig._main = new AdConfig();
        AdConfig._main.Init();
    }
    return AdConfig._main;
}
cc.AdConfig = module.export = AdConfig;


