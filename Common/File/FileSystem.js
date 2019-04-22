//api 参数参照微信小程序FileSystemManager
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

    GetRootDirPath: function () {
        if (this.platform == null) {
            return "";
        }
        return this.platform.GetRootDirPath();
    },

    /*
             filePath: obj.filePath,
                success: function (res) {
                }.bind(this),
                fail: function (res) {
                }.bind(this),
 */

    ReadFile: function (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.ReadFile(obj);
    },
    WriteFile: function (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.WriteFile(obj);
    },

    /*
          zipFilePath: obj.zipFilePath,
            targetPath: obj.targetPath,
            success: function (res) { 
            }.bind(this),
            fail: function (res) { 
            }.bind(this),
*/

    UnzipFile: function (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.UnzipFile(obj);
    },

    /*
    {

            // url: "https://6d6f-moonma-dbb297-1258816908.tcb.qcloud.la/ShapeColor/CloudRes.zip?sign=e78a71df50918d8ee0e181886b20c12f&t=1555465442",
            url: url,
            success: function (res) {
                var filePath = res.tempFilePath; 
            }.bind(this),
            fail: function (res) { 
            }.bind(this),
            progress: function (res) {
                console.log('下载进度', res.progress)
                console.log('已经下载的数据长度', res.totalBytesWritten)
                console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite) 
            }.bind(this),
            

        }
 */

    DownloadFile: function (obj) {
        if (this.platform == null) {
            return;
        }
        this.platform.DownloadFile(obj);
    },

    DeleteFile: function (filepath) {
        if (this.platform == null) {
            return;
        }
        this.platform.DeleteFile(filepath);
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
