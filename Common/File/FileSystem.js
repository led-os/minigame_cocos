var FileSystem = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {
        platform: cc.FileSystemPlatformWrapper,
    },
    statics: {

    },

    Init: function () {
        var p = new cc.FileSystemPlatformWrapper();
        this.platform = p.GetPlatform();
    },


    ReadFile: function (filepath) {
        if (this.platform == null) {
            return;
        }
        this.platform.ReadFile(filepath);
    },
    UnzipFile: function (filePath) {
        if (this.platform == null) {
            return;
        }
        this.platform.UnzipFile(filepath);
    },
    DownloadFile: function (url) {
        if (this.platform == null) {
            return;
        }
        this.platform.DownloadFile(url);
    },
});

FileSystem._main = null;
FileSystem.main = function () {
    // 
    if (!FileSystem._main) {
        FileSystem._main = new FileSystem();
        FileSystem._main.Init();
    }
    return FileSystem._main;
}
cc.FileSystem = module.export = FileSystem; 
