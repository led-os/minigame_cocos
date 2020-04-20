var AdInsertPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {
        objConfig: null,
    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.AdInsertWeiXin();
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

    InitAd(source) {

    },
    SetObjectInfo(objName) {

    }
    ,
    ShowAd() {

    },
});

cc.AdInsertPlatformWrapper = module.export = AdInsertPlatformWrapper; 
