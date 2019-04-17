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

    ReadFile: function (filePath) {
    },

    UnzipFile: function (filePath) {
   
    },
    DownloadFile: function (url) {
    },
    
});

cc.FileSystemPlatformWrapper = module.export = FileSystemPlatformWrapper; 
