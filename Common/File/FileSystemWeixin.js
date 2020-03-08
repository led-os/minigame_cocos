var FileSystemWeixin = cc.Class({
    extends: cc.FileSystemPlatformWrapper,// cc.ItemInfo,  
    properties: {

    },

    GetRootDirPath: function () {
        // return `${wx.env.USER_DATA_PATH}/` + cc.FileSystemPlatformWrapper.FILE_ROOT_DIR;
        return `${wx.env.USER_DATA_PATH}`;
    },

    DownloadFile: function (obj) {

        const fs = wx.getFileSystemManager()
        var dir = this.GetRootDirPath();
        //  var ret = fs.accessSync(dir)
        //  console.log("ret=" + ret);
        // if (!fs.accessSync(dir)) {
        //     fs.mkdirSync(dir, true)
        // }
        //var filepath = dir + `/hello.txt`
        //console.log("filepath=" + filepath);
        // fs.writeFileSync(filepath, 'hello, world', 'utf8')

        const downloadTask = wx.downloadFile({
            //url: "https://6d6f-moonma-dbb297-1258816908.tcb.qcloud.la/ShapeColor/CloudRes.zip?sign=e78a71df50918d8ee0e181886b20c12f&t=1555465442",
            url: obj.url,
            success: function (res) {
                var filePath = res.tempFilePath;
                console.log("downloadFile=" + filePath)
                // this.UnzipFile(filePath);
                if (obj.success != null) {
                    obj.success(res);
                }
            }.bind(this),

            fail: function (res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            }.bind(this)

        })
        downloadTask.onProgressUpdate((res) => {
            //console.log('下载进度', res.progress)
            //console.log('已经下载的数据长度', res.totalBytesWritten)
            //console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)

            if (obj.progress != null) {
                obj.progress(res);
            }
        })

        // downloadTask.abort() // 取消下载任务

    },

    UnzipFile: function (obj) {
        const fs = wx.getFileSystemManager();
        var dir = this.GetRootDirPath();
        fs.unzip({
            zipFilePath: obj.zipFilePath,
            targetPath: obj.targetPath,
            success: function (res) {
                console.log("weixin unzip success=" + dir);
                // this.readFile(dir + "/CloudRes/image/Bird/Albatross.png");
                if (obj.success != null) {
                    obj.success(res);
                }
            }.bind(this),
            fail: function (res) {
                console.log("weixin unzip fail");
                if (obj.fail != null) {
                    obj.fail(res);
                }
            }.bind(this),

        });
    },

    ReadFile: function (obj) {
        const fs = wx.getFileSystemManager()
        var dir = this.GetRootDirPath();
        fs.readFile({
            filePath: obj.filePath,
            success: function (res) {
                if (obj.success != null) {
                    obj.success(res);
                }
            }.bind(this),
            fail: function (res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            }.bind(this),

        })
    },
    WriteFile: function (obj) {
        const fs = wx.getFileSystemManager()
        fs.writeFile({
            filePath: obj.filePath,
            success: function (res) {
                if (obj.success != null) {
                    obj.success(res);
                }
            }.bind(this),
            fail: function (res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            }.bind(this),

        })
    },

    DeleteFile: function (filepath) {
        const fs = wx.getFileSystemManager()
        fs.removeSavedFile({
            filePath: filepath,
            success: function (res) {

            }.bind(this),
            fail: function (res) {

            }.bind(this),

        })
    },

});


FileSystemWeixin._main = null;
FileSystemWeixin.main = function () {
    // 
    if (!FileSystemWeixin._main) {
        FileSystemWeixin._main = new FileSystemWeixin();
    }
    return FileSystemWeixin._main;
}

cc.FileSystemWeixin = module.export = FileSystemWeixin; 
