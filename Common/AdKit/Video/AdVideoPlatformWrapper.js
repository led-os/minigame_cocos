var AdVideoPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {
        objConfig: null,
    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.AdVideoWeiXin();
        }
        return p;
    },

    /*
   {
   adKey: "",  
   Finish: function () {
   }, 
   Fail: function (w,h) {
   }, 
   
   }
   */
    SetConfig(obj) {
        this.objConfig = obj;
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
