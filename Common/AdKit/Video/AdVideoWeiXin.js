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
        // 创建激励视频广告实例，提前初始化
        let videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-0c824880e72a5602'
        })
        videoAd.onError((errMsg, errCode) => {
            console.log('video weixin 广告加载失败!!!!', errMsg, errCode);
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
