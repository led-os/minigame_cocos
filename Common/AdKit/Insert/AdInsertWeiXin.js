var AdInsertWeiXin = cc.Class({
    extends: cc.AdInsertPlatformWrapper,// cc.ItemInfo,
    properties: {

    },
    statics: {


    },

    InitAd(source) {

    },
    SetObjectInfo(objName) {

    }
    ,
    ShowAd() {
        // 定义插屏广告
        let interstitialAd = null
        console.log('ShowAd weixin adinsert')
        // 创建插屏广告实例，提前初始化
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-caab860b86ff5826'
            })
        }

        // 在适合的场景显示插屏广告
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
                console.error(err)
            })
        }
    },
});

cc.AdInsertWeiXin = module.export = AdInsertWeiXin; 
