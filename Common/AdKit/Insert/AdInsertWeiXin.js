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
        var adkey = ""; 
        adkey = cc.AdConfig.main().GetAdKey(cc.Source.WEIXIN, cc.AdConfigParser.AdType.INSERT)
//adunit-caab860b86ff5826
        // 创建插屏广告实例，提前初始化
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: adkey
            })
        }

        // 在适合的场景显示插屏广告
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
                console.error(err)
            })

            interstitialAd.onError((errMsg, errCode) => {
                console.log('adinsert weixin 广告加载失败!!!!', errMsg, errCode);
                if (this.objConfig != null) {
                    this.objConfig.Fail();
                }
            })

            interstitialAd.onClose(( ) => { 
                 if (this.objConfig != null) {
                     this.objConfig.Finish();
                 } 
             })

        }
    },
});

cc.AdInsertWeiXin = module.export = AdInsertWeiXin; 
