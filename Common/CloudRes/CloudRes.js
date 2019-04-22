var CloudRes = cc.Class({
    extends: cc.Object,
    properties: {
        source: '',
    },


    StartDownload: function (obj) {
        cc.FileSystem.main().DownloadFile({
            url: obj.url,
            success: function (res) {
                var filePath = res.tempFilePath;
                console.log("downloadFile=" + filePath)
                this.UnzipFile(filePath);
                if (obj.success != null) {
                    obj.success(res);
                }
            }.bind(this),
            fail: function (res) {
                console.log("readFile fail=" + file)
                if (obj.fail != null) {
                    obj.fail(res);
                }
            }.bind(this),
            progress: function (res) {
                console.log('CloudRes下载进度=', res.progress)
                console.log('CloudRes已经下载的数据长度=', res.totalBytesWritten)
                console.log('CloudRes预期需要下载的数据总长度=', res.totalBytesExpectedToWrite)
                if (obj.progress != null) {
                    obj.progress(res);
                }
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
                cc.FileSystem.main().DeleteFile(filePath);
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