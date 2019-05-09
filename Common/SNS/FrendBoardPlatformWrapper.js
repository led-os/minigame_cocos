var FrendBoardPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            //显示分享
            //  wx.showFrendBoardMenu();
            p = new cc.FrendBoardWeiXin();
        }
        return p;
    },
 
    SaveData: function (source, title, pic, url) {

    },
});

cc.FrendBoardPlatformWrapper = module.export = FrendBoardPlatformWrapper; 
