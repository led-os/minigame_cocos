var CloudRes = cc.Class({
    extends: cc.Object,
    properties: {
        source: '',
    },


    StartDownload: function () {
        cc.FileSystem.main().DownloadFile({
            url: AppRes.URL_CLOUND_RES,
            success: function (res) {
                var filePath = res.tempFilePath;
                console.log("downloadFile=" + filePath)
                this.UnzipFile(filePath);
            }.bind(this),
            fail: function (res) {
                console.log("readFile fail=" + file)
            }.bind(this),
            progress: function (res) {
                console.log('CloudRes下载进度=', res.progress)
                console.log('CloudRes已经下载的数据长度=', res.totalBytesWritten)
                console.log('CloudRes预期需要下载的数据总长度=', res.totalBytesExpectedToWrite)
            }.bind(this),
        });
    },

    UnzipFile: function (filePath) {
        var dir = cc.FileSystem.main().GetRootDirPath();
        cc.FileSystem.main().UnzipFile({
            zipFilePath: filePath,
            targetPath: dir,
            success: function (res) {
                console.log("unzip success=" + filePath);
                // this.readFile(dir + "/CloudRes/image/Bird/Albatross.png");

            }.bind(this),
            fail: function (res) {

            }.bind(this),
        });
    },
});

CloudRes._main = null;
CloudRes.main = function () {
    // 
    if (!CloudRes._main) {
        CloudRes._main = new CloudRes();
    }
    return CloudRes._main;
}

cc.CloudRes = module.export = CloudRes; 