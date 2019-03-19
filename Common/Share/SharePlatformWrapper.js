var SharePlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            //显示分享
            //  wx.showShareMenu();
            p = new cc.ShareWeiXin();
        }
        return p;
    },


    //微信小程序 菜单 “转发”按钮
    SetWeiXinMPShareMenu: function (title, pic) {
    },
    ShareImageText: function (source, title, pic, url) {

    },
});

cc.SharePlatformWrapper = module.export = SharePlatformWrapper; 
