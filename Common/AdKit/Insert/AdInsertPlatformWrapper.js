var AdInsertPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.AdInsertWeiXin();
        }
        return p;
    },

    InitAd(source) {

    },
    SetObjectInfo(objName) {

    }
    ,
    ShowAd() {

    },
});

cc.AdInsertPlatformWrapper = module.export = AdInsertPlatformWrapper; 
