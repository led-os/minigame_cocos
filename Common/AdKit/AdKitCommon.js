
var AdType = cc.Enum({
    //区分大小写
    BANNER: 0,
    INSERT: 1,
    NATIVE: 2,
    VIDEO: 3,
});

var AdStatus = cc.Enum({
    //区分大小写
    FAIL: 0,
    SUCCESFULL: 1,
    START: 2,
    CLOSE: 3,
});

var AdKitCommon = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量 
        //enum
        AdType: AdType,
        AdStatus: AdStatus,
    },
    properties: {
        //get 和 set 函数不能放在statics里
        /*
             this.callbackFinish({
                type: AdType.BANNER,
                status:AdStatus.SUCCESFULL, 
                width:w,
                height:h,
            });
            */
        callbackFinish: null, 

        heightAdScreen:0,
        heightAdCanvas:0, 

    },

    //banner
    InitAdBanner: function () {
        if (cc.Common.main().noad) {
            return;
        }
        var isShowAdBanner = true;
        if (cc.Common.main().isiOS) {
            if (!cc.AppVersion.main().appCheckHasFinished) {
                //ios app审核不显示banner
                isShowAdBanner = false;
            }
        }

        if (cc.Common.main().isAndroid) {

            if (!cc.AppVersion.main().appCheckHasFinished) {
                //xiaomi app审核不显示banner
                isShowAdBanner = false;
            }
        }
        isShowAdBanner = true;
        if (isShowAdBanner) {
            cc.AdBanner.main().SetConfig({
                adKey: "",
                DidReceiveAdFail: function () {
                    this.AdBannerDidReceiveAdFail();
                }.bind(this),
                DidReceiveAd: function (w, h) {
                    this.AdBannerDidReceiveAd(w, h);
                }.bind(this),

            });

            //cc.AdBanner.main().SetScreenSize(Screen.width, Screen.height);
            //  cc.AdBanner.main().SetScreenOffset(0, Device.heightSystemHomeBar);
            {
                var type = cc.AdConfigParser.AdType.BANNER;
                var source = cc.AdConfig.main().GetAdSource(type);
                cc.AdBanner.main().InitAd(source);
                cc.AdBanner.main().ShowAd(true);
            }
        }


    },

    //insert
    InitAdInsert: function () {
        if (cc.Common.main().noad) {
            return;
        }
        var isShowAdInsert = false;
        // if (cc.AppVersion.main().appCheckHasFinished) {
        //     isShowAdInsert = true;
        // }
        isShowAdInsert = true;
        if (isShowAdInsert) {

            cc.AdInsert.main().SetConfig({
                adKey: "",
                Finish: function () {
                    this.AdInsertWillShow();
                }.bind(this),
                Fail: function (w, h) {
                    this.AdInsertDidFail();
                }.bind(this),

            });
            // cc.AdInsert.main().SetObjectInfo(this.gameObject.name);
            var type = cc.AdConfigParser.AdType.INSERT;
            var source = cc.AdConfig.main().GetAdSource(type);
            cc.AdInsert.main().InitAd(source);
        }
    },


    //Video
    InitAdVideo: function () {
        if (cc.Common.main().noad) {
            return;
        }
        // if (cc.AppVersion.main().appCheckHasFinished) 
        {
            cc.AdVideo.main().SetConfig({
                adKey: "",
                Finish: function () {
                    cc.Debug.Log("InitAdVideo Finish =");
                    this.AdVideoDidFinish();
                }.bind(this),
                Fail: function (w, h) {
                    this.AdVideoDidFail();
                }.bind(this),

            });

            cc.AdVideo.main().SetType(cc.AdVideo.VideoType.REWARD);
            var type = cc.AdConfigParser.AdType.VIDEO;
            var source = cc.AdConfig.main().GetAdSource(type);
            cc.Debug.Log("InitAdVideo AdVideo.InitAd =" + source);
            cc.AdVideo.main().InitAd(source);
        }
    },



    ShowAdBanner: function (isShow) {
        cc.AdBanner.main().ShowAd(isShow);
    },
    ShowAdVideo: function () {
        //show 之前重新设置广告
        this.InitAdVideo();
        cc.AdVideo.main().ShowAd();
    },

    ShowAdInsert: function (rate) {

        // if (!cc.AppVersion.main().appCheckHasFinished) {
        //     return;
        // }

        if (cc.Common.main().noad) {
            return;
        }

        // if (cc.Common.main().isAndroid) {
        //     if (Common.GetDayIndexOfUse() <= Config.main.NO_AD_DAY) {
        //         return;
        //     }
        // }


        var randvalue = cc.Common.RandomRange(0, 100);
        if (randvalue > rate) {
            return;
        }
        //show 之前重新设置广告
        //InitAdInsert();
        cc.AdInsert.main().ShowAd();

    },

    //原生开机广告
    ShowAdNativeSplash: function (source) {
        if (!cc.AppVersion.main().appCheckHasFinished) {
            return;
        }

        if (cc.Common.main().noad) {
            return;
        }
        cc.AdNative.main().ShowSplash(source);

    },


    AdBannerDidReceiveAd: function (w, h) {  
        cc.Debug.Log("AdBannerDidReceiveAd::w=" + w + " h=" + h); 

        if (this.callbackFinish != null) {
            // this.callbackFinish(AdType.BANNER, AdStatus.SUCCESFULL, str);
            this.callbackFinish({
                type: AdType.BANNER,
                status:AdStatus.SUCCESFULL, 
                width:w,
                height:h,
            });
        }

    

    },
    AdBannerDidReceiveAdFail: function (adsource) {

        var type = cc.AdConfigParser.AdType.BANNER;
        var info = cc.AdConfig.main().GetNextPriority(type);
        if (info != null) {
            cc.AdBanner.main().InitAd(info.source);
            cc.AdBanner.main().ShowAd(true);
        }
        else {
            if (this.callbackFinish != null) {
                // this.callbackFinish(AdType.BANNER, AdStatus.FAIL, null);
                this.callbackFinish({
                    type: AdType.BANNER,
                    status:AdStatus.FAIL,  
                });
            }
        }

    },

    AdBannerDidClick: function (adsource) {

    },
    AdInsertWillShow: function (str) {

        if (this.callbackFinish != null) {
           // this.callbackFinish(AdType.INSERT, AdStatus.START, null);
           this.callbackFinish({
            type: AdType.INSERT,
            status:AdStatus.START,  
        });
        }
    },
    AdInsertDidClose: function (str) {
        if (this.callbackFinish != null) {
           // this.callbackFinish(AdType.INSERT, AdStatus.CLOSE, null);
           this.callbackFinish({
            type: AdType.INSERT,
            status:AdStatus.CLOSE,  
        });
        }
    },

    AdInsertDidFail: function (adsource) {
        var type = cc.AdConfigParser.AdType.INSERT;
        var info = cc.AdConfig.main().GetNextPriority(type);
        if (info != null) {
            cc.AdInsert.main().InitAd(info.source);
            cc.AdInsert.main().ShowAd();
        }
        else {
            if (this.callbackFinish != null) {
                //this.callbackFinish(AdType.INSERT, AdStatus.FAIL, null);
                this.callbackFinish({
                    type: AdType.INSERT,
                    status:AdStatus.FAIL,  
                });
            }
        }

    },


    AdVideoDidFail: function () {
        var type = cc.AdConfigParser.AdType.VIDEO;
        var info = cc.AdConfig.main().GetNextPriority(type);
        if (info != null) {
            cc.AdVideo.main().InitAd(info.source);
            cc.AdVideo.main().ShowAd();
        }
        else {
            if (this.callbackFinish != null) {
               // this.callbackFinish(AdType.VIDEO, AdStatus.FAIL, null);
                this.callbackFinish({
                    type: AdType.VIDEO,
                    status:AdStatus.FAIL, 
                });
            }
        }
    },

    AdVideoDidStart: function (str) {
        // AudioPlay.main.Pause();
        if (this.callbackFinish != null) {
           // this.callbackFinish(AdType.VIDEO, AdStatus.START, null);
            this.callbackFinish({
                type: AdType.VIDEO,
                status:AdStatus.START, 
            });
        }

    },


    DoAdVideoDidFinish: function () {
        //win10 微軟視頻廣告 播放結束調用需要在main ui thread 否則會crash
        var str = "advideo";
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
        if (ret) {
            //  cc.AudioPlay.main().Play();
        }
    cc.Debug.Log("DoAdVideoDidFinish ");
        if (this.callbackFinish != null) {
           // this.callbackFinish(AdType.VIDEO, AdStatus.SUCCESFULL, str);
            this.callbackFinish({
                type: AdType.VIDEO,
                status:AdStatus.SUCCESFULL, 
            });
        }
    },

    AdVideoDidFinish: function () {

        this.DoAdVideoDidFinish();

    },

});

AdKitCommon.main = new AdKitCommon();
cc.AdKitCommon = module.export = AdKitCommon;

