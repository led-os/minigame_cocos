var AdVideoWeiXin = cc.Class({
    extends: cc.AdVideoPlatformWrapper,// cc.ItemInfo,
    properties: {

    },
    statics: {




    },
    SetObjectInfo(objName, objMethod) {

    },
    SetType(type) {

    },
    InitAd(source) {

    },
    PreLoad(source) {

    },

    ShowAd() {
        var adkey = "";
        adkey = cc.AdConfig.main().GetAdKey(cc.Source.WEIXIN, cc.AdConfigParser.AdType.VIDEO)
        //adunit-0c824880e72a5602
        // 创建激励视频广告实例，提前初始化
        let videoAd = wx.createRewardedVideoAd({
            adUnitId: adkey
        })
        videoAd.onError((errMsg, errCode) => {
            console.log('video weixin 广告加载失败!!!!', errMsg, errCode);
            if (this.objConfig != null) {
                this.objConfig.Fail();
            }
        })
        videoAd.onClose((res) => {
            // isEnded	boolean	视频是否是在用户完整观看的情况下被关闭的
            console.log('video onClose isEnded=', res.isEnded);
            if (res.isEnded) {
                //视频完整观看
                if (this.objConfig != null) {
                    console.log('video onClose objConfig=Finish');
                    this.objConfig.Finish();
                } else {
                    console.log('video onClose objConfig=null');
                }
            }
        })
        // 用户触发广告后，显示激励视频广告
        videoAd.show().catch(() => {
            // 失败重试
            videoAd.load()
                .then(() => videoAd.show())
                .catch(err => {
                    console.log('激励视频 广告显示失败')
                })
        })
    },
    OnClickAd() {

    },
});

cc.AdVideoWeiXin = module.export = AdVideoWeiXin; 
