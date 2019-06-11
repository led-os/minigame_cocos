var AdVideoPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.AdVideoWeiXin();
        }
        return p;
    },

    InitAd(source) { 
    },
    SetObjectInfo(objName, objMethod) {

    },
    SetType(type) {

    },
    InitAd(source) {

    },
    PreLoad(source) {

    },

    ShowAd() {

    },
    OnClickAd() {

    },
});

cc.AdVideoPlatformWrapper = module.export = AdVideoPlatformWrapper; 
