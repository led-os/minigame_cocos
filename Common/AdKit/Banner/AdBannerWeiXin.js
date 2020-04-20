
//https://blog.csdn.net/pikefish/article/details/88895851
var AdBannerWeiXin = cc.Class({
    extends: cc.AdBannerPlatformWrapper,// cc.ItemInfo,
    properties: {
        bannerAd: null,
    },
    statics: {

    },



    InitAd(source) {
        // 创建 Banner 广告实例，提前初始化
        var adkey = "";
        // if (this.objConfig != null) {
        //     adkey = this.objConfig.adKey;
        // }
        console.log('InitAd banner adkey=', adkey);
        adkey = cc.AdConfig.main().GetAdKey(cc.Source.WEIXIN, cc.AdConfigParser.AdType.BANNER)

        console.log('banner adkey=', adkey);
        // adkey = "adunit-663159c8925f939f";

        this.bannerAd = wx.createBannerAd({
            adUnitId: adkey,//'adunit-663159c8925f939f'
            style: {
                left: 0,
                top: 0,
                width: 350
            }
        })
        this.bannerAd.onError((errMsg, errCode) => {
            console.log('banner广告加载失败!!!!', errMsg, errCode);
            if (this.objConfig != null) {
                this.objConfig.DidReceiveAdFail();
            }
        })
        this.bannerAd.onResize((res) => {
            console.log('onResize pixelRatio=', wx.getSystemInfoSync().pixelRatio);

            console.log('onResize screen w=', wx.getSystemInfoSync().screenWidth);
            console.log('onResize screen h=', wx.getSystemInfoSync().screenHeight);
            console.log('onResize window w=', wx.getSystemInfoSync().windowWidth);
            console.log('onResize window h=', wx.getSystemInfoSync().windowHeight);

            console.log('onResize banner w=', res.width);
            console.log('onResize banner h=', res.height);
            var scale = wx.getSystemInfoSync().pixelRatio;
            var w = res.width;
            var h = res.height;
            this.UpdatePositon(this.bannerAd, w, h);
            if (this.objConfig != null) {
                this.objConfig.DidReceiveAd(w * scale, h * scale);
            }
        })
    },

    UpdatePositon(banner, w, h) {
        var scale = wx.getSystemInfoSync().pixelRatio;
        var w_screen = wx.getSystemInfoSync().screenWidth;
        var h_screen = wx.getSystemInfoSync().screenHeight;
        var x = (w_screen - w) / 2;
        var y = (h_screen - h);
        banner.style.left = x;
        banner.style.top = y;
        console.log('onResize banner x=', x, " y=", y);
    },

    ShowAd(isShow) {
        if (this.bannerAd == null) {
            return;
        }
        // 在适合的场景显示 Banner 广告
        if (isShow) {
            this.bannerAd.show()
        } else {
            this.bannerAd.hide()
        }

        var scale = wx.getSystemInfoSync().pixelRatio;
        var w = this.bannerAd.style.width * scale;
        var h = this.bannerAd.style.height * scale;
        // this.UpdatePositon(this.bannerAd,w,h);


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
