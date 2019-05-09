var FrendBoard = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {
        platform: cc.FrendBoardPlatformWrapper,
    },
    statics: {

    },

    Init: function () {
        var p = new cc.FrendBoardPlatformWrapper();
        this.platform = p.GetPlatform();
    },

    SaveData: function (source, title, pic, url) {
        if (this.platform == null) {
            return;
        }
        this.platform.FrendBoardImageText(source, title, pic, url);
    },
});

FrendBoard._main = null;
FrendBoard.main = function () {
    // 
    if (!FrendBoard._main) {
        FrendBoard._main = new FrendBoard();
        FrendBoard._main.Init();
    }
    return FrendBoard._main;
}
cc.FrendBoard = module.export = FrendBoard; 
