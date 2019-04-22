var FileSystemPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,

    statics: {
        FILE_ROOT_DIR: "moonma",

    },

    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Common.main().isWeiXin) {
            p = new cc.FileSystemWeixin();
        }
        return p;
    },
    GetRootDirPath: function () {
        return "";
    },

    ReadFile: function (obj) {
    },
    WriteFile: function (obj) {
    },
    UnzipFile: function (obj) {
   
    },
    DownloadFile: function (obj) {
    },
    DeleteFile: function (filepath) { 
    },
});

cc.FileSystemPlatformWrapper = module.export = FileSystemPlatformWrapper; 
