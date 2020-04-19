
//https://blog.csdn.net/pikefish/article/details/88895851
var AdBannerWeiXin = cc.Class({
    extends: cc.AdBannerPlatformWrapper,// cc.ItemInfo,
    properties: {

    },
    statics: {




    },

    InitAd(source) {

    },

    ShowAd(isShow) {
        // 创建 Banner 广告实例，提前初始化
        let bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-663159c8925f939f',
            style: {
                left: 0,
                top: 0,
                width: 350
            }
        })
        bannerAd.onError((errMsg, errCode) => {
            console.log('banner广告加载失败!!!!', errMsg, errCode);
        })
        bannerAd.onResize((res) => {

            
            console.log('onResize pixelRatio=', wx.getSystemInfoSync().pixelRatio);
            
            console.log('onResize screen w=', wx.getSystemInfoSync().screenWidth);
            console.log('onResize screen h=', wx.getSystemInfoSync().screenHeight);
            console.log('onResize window w=', wx.getSystemInfoSync().windowWidth);
            console.log('onResize window h=', wx.getSystemInfoSync().windowHeight);

            console.log('onResize banner w=', res.width);
            console.log('onResize banner h=', res.height);
        })
        // 在适合的场景显示 Banner 广告
        bannerAd.show()
    },

    ShowAd2(isShow) {
        // 创建格子广告实例，提前初始化
        let gridAd = wx.createGridAd({
            adUnitId: 'adunit-95b9934d188646b4',
            adTheme: 'white',
            gridCount: 5,
            style: {
                left: 0,
                top: 0,
                width: 330,
                opacity: 0.8
            }
        })
        gridAd.onError((errMsg, errCode) => {
            console.log(' gridAd 广告加载失败!!!!', errMsg, errCode);
        })
        // 在适合的场景显示格子广告
        gridAd.show()
    },


    SetScreenSize(w, h) {

    },
    //y 基于屏幕底部
    SetScreenOffset(x, y) {

    },
});

cc.AdBannerWeiXin = module.export = AdBannerWeiXin; 
