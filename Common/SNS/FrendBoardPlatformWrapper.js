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
        } else if (cc.Common.main().isFacebook) {
            p = new cc.FrendBoardFacebook();
        }


        return p;
    },

    SaveData: function (score) {

    },
    ShowFrendBoard: function () {
    },
});

cc.FrendBoardPlatformWrapper = module.export = FrendBoardPlatformWrapper; 
