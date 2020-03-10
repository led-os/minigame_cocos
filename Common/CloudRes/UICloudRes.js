var UIView = require("UIView");
var UIProgress = require("UIProgress");
var UICloudRes = cc.Class({
    extends: UIView,
    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,
        textStatus: cc.Label,
        uiProgress: UIProgress,
    },

    onLoad: function () {
        this._super();
        this.node.setContentSize(this.node.parent.getContentSize());
        this.textTitle.string = cc.Language.main().GetString("STR_CLOUDRES_TITLE");
        // this.progressBar.totalLength = this.node.getContentSize().width-32;
        this.UpdateProgress(0);

        cc.CloudRes.main().StartDownload({
            url: cc.Device.main.isLandscape ? cc.AppRes.URL_CLOUND_RES_HD : cc.AppRes.URL_CLOUND_RES,
            success: function (res) {

            }.bind(this),
            fail: function (res) {

            }.bind(this),
            progress: function (res) {
                //console.log('CloudRes下载进度=', res.progress)
                //console.log('CloudRes已经下载的数据长度=', res.totalBytesWritten)
                //console.log('CloudRes预期需要下载的数据总长度=', res.totalBytesExpectedToWrite)
                this.UpdateProgress(res.progress / 100.0);
            }.bind(this),

            unzipSuccess: function () {
                cc.Debug.Log(" unzipSuccess ");
                this.scheduleOnce(this.OnCloudResDidFinish, 0.25);
            }.bind(this),


        });

        this.LayOut();
    },

    UpdateProgress: function (value) {
        var progress = value;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 1) {
            progress = 1;
        }
        var percent = Math.floor(progress * 100);
        // progress = 0.5;
        this.uiProgress.UpdateProgress(progress);
        //下载进度:xxx%
        var str = cc.Language.main().GetString("STR_CLOUDRES_STATUS");
        str = str.replace("xxx", percent.toString());
        this.textStatus.string = str;
    },
    OnCloudResDidFinish: function () {
        cc.Common.SetBoolOfKey(cc.CommonRes.KEY_DOWNLOAD_CLOUNDRES, true);
        if (this.controller != null) {
            this.controller.Close();
        }
    },

    LayOut: function () {
        var size = this.node.getContentSize();

    },


});  