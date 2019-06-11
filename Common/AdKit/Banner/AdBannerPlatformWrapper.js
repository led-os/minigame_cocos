var AdBannerPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.AdBannerWeiXin();
        }
        return p;
    },

    InitAd(source) {
 
    },

    ShowAd(isShow) {
       
    },


    SetScreenSize(w, h) {
     
    },
    //y 基于屏幕底部
    SetScreenOffset(x, y) {
    
    },
});

cc.AdBannerPlatformWrapper = module.export = AdBannerPlatformWrapper; 
