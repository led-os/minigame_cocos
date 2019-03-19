var ShareWeiXin = cc.Class({
    extends: cc.SharePlatformWrapper,// cc.ItemInfo,
    properties: {

    },
    statics: {




    },

    //微信小程序 菜单 “转发”按钮
    SetWeiXinMPShareMenu: function (title, pic) {
        wx.onShareAppMessage(() => ({
            title: title,
            imageUrl: pic,
        }))

    },

    ShareImageText: function (source, title, pic, url) {
        this.SetWeiXinMPShareMenu(title, pic);
        wx.shareAppMessage({
            title: title,
            imageUrl: pic,
        })

    },
});
cc.ShareWeiXin = module.export = ShareWeiXin; 
