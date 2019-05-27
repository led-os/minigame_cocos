
var FrendBoardViewController = require("FrendBoardViewController");

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

    //score:string
    SaveData: function (score) {
        if (this.platform == null) {
            return;
        }
        this.platform.SaveData(score);
    },

    // ShowFrendBoard: function () {
    //     if (this.platform == null) {
    //         return;
    //     }
    //     this.platform.ShowFrendBoard();
    // },

    Show() {
        FrendBoardViewController.main().Show(null, null);
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
