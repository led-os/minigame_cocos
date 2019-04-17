var FileSystemWeixin = cc.Class({
    extends: cc.FileSystemPlatformWrapper,// cc.ItemInfo,

    properties: {

    },

    GetRootDirPath: function () {
        return `${wx.env.USER_DATA_PATH}/` + FileSystemPlatformWrapper.FILE_ROOT_DIR;
    },

    DownloadFile: function (url) {

        const fs = wx.getFileSystemManager()
        var dir = GetRootDirPath();
        var ret = fs.accessSync(dir)
        console.log("ret=" + ret);
        // if (!fs.accessSync(dir))
        {
            //fs.mkdirSync(dir, true)
        }
        var filepath = dir + `/hello.txt`
        console.log("filepath=" + filepath);
        // fs.writeFileSync(filepath, 'hello, world', 'utf8')


        const downloadTask = wx.downloadFile({

            // url: "https://6d6f-moonma-dbb297-1258816908.tcb.qcloud.la/ShapeColor/CloudRes.zip?sign=e78a71df50918d8ee0e181886b20c12f&t=1555465442",
            url: url,
            success: function (res) {
                var filePath = res.tempFilePath;
                console.log("downloadFile=" + filePath)
                this.UnzipFile(filePath);
            }.bind(this)

        })
        downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })

        // downloadTask.abort() // 取消下载任务

    },

    UnzipFile: function (filePath) {
        const fs = wx.getFileSystemManager();
        var dir = GetRootDirPath();
        fs.unzip({

            zipFilePath: filePath,
            targetPath: dir,
            success: function (res) {
                console.log("unzip success=" + dir);
                this.readFile(dir + "/CloudRes/image/Bird/Albatross.png");
            }.bind(this)

        });
    },

    ReadFile: function (file) {
        const fs = wx.getFileSystemManager()
        var dir = GetRootDirPath();
        fs.readFile({
            filePath: file,
            success: function (res) {
                console.log("readFile success=" + file)
            }.bind(this),
            fail: function (res) {
                console.log("readFile fail=" + file)
            }.bind(this),

        })
    },

});

cc.FileSystemWeixin = module.export = FileSystemWeixin; 
