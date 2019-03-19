var Share = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {
        platform: cc.SharePlatformWrapper,
    },
    statics: {

    },

    Init: function () {
        var p = new cc.SharePlatformWrapper();
        this.platform = p.GetPlatform();
    },

    SetWeiXinMPShareMenu: function (title, pic) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetWeiXinMPShareMenu(title, pic);
    },

    ShareImageText: function (source, title, pic, url) {
        if (this.platform == null) {
            return;
        }
        this.platform.ShareImageText(source, title, pic, url);
    },
});

Share._main = null;
Share.main = function () {
    // 
    if (!Share._main) {
        Share._main = new Share();
        Share._main.Init();
    }
    return Share._main;
}
cc.Share = module.export = Share; 
