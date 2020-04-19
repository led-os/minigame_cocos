var AdNativePlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.AdNativeWeiXin();
        }
        return p;
    },
 
    InitAd(source) {

    },
    ShowSplash(source) {

    },

    ShowAd() {

    }, 
});

cc.AdNativePlatformWrapper = module.export = AdNativePlatformWrapper; 
