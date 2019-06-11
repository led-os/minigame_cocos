
var AdType = cc.Enum({
    //区分大小写
    BANNER: 0,
    INSERT: 1,
    VIDEO: 2,
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


    },

    //banner
    InitAdBanner: function () {
        if (cc.Common.main().noad) {
            return;
        }
        var isShowAdBanner = true;
        // if (Common.isiOS) {
        //     if (!AppVersion.appCheckHasFinished) {
        //         //ios app审核不显示banner
        //         isShowAdBanner = false;
        //     }
        // }

        // if (Common.isAndroid) {

        //     if (!AppVersion.appCheckHasFinished) {
        //         //xiaomi app审核不显示banner
        //         isShowAdBanner = false;
        //     }
        // }

        // if (isShowAdBanner) {
        //     AdBanner.SetScreenSize(Screen.width, Screen.height);
        //     AdBanner.SetScreenOffset(0, Device.heightSystemHomeBar);
        //     {
        //         var type = AdConfigParser.SOURCE_TYPE_BANNER;
        //         string source = AdConfig.main.GetAdSource(type);
        //         AdBanner.InitAd(source);
        //         AdBanner.ShowAd(true);
        //     }
        // }


    },

    //insert
    InitAdInsert: function () {
        if (cc.Common.main().noad) {
            return;
        }
        var isShowAdInsert = false;
        // if (AppVersion.appCheckHasFinished) {
        //     isShowAdInsert = true;
        // }
        // if (isShowAdInsert) {
        //     AdInsert.SetObjectInfo(this.gameObject.name);
        //     int type = AdConfigParser.SOURCE_TYPE_INSERT;
        //     string source = AdConfig.main.GetAdSource(type);
        //     AdInsert.InitAd(source);
        // }
    },


    //Video
    InitAdVideo: function () {
        if (cc.Common.main().noad) {
            return;
        }
        // if (AppVersion.appCheckHasFinished) {
        //     AdVideo.SetType(AdVideo.ADVIDEO_TYPE_REWARD);
        //     int type = AdConfigParser.SOURCE_TYPE_VIDEO;
        //     string source = AdConfig.main.GetAdSource(type);
        //     Debug.Log("InitAdVideo AdVideo.InitAd =" + source);
        //     AdVideo.InitAd(source);
        // }
    },



    ShowAdBanner(isShow) {
        // AdBanner.ShowAd(isShow);
    },
    ShowAdVideo() {
        //show 之前重新设置广告
        // InitAdVideo();
        // AdVideo.ShowAd();
    },

    ShowAdInsert(rate) {
        /*
                if (!AppVersion.appCheckHasFinished) {
                    return;
                }
        
                if (Common.noad) {
                    return;
                }
        
                if (Common.isAndroid) {
                    if (Common.GetDayIndexOfUse() <= Config.main.NO_AD_DAY) {
                        return;
                    }
                }
        
        
                int randvalue = Random.Range(0, 100);
                if (randvalue > rate) {
                    return;
                }
                //show 之前重新设置广告
                //InitAdInsert();
                AdInsert.ShowAd();
                */
    },


    AdBannerDidReceiveAd(str) {
        /*
                int w = 0;
                int h = 0;
                int idx = str.IndexOf(":");
                string strW = str.Substring(0, idx);
                int.TryParse(strW, out w);
                string strH = str.Substring(idx + 1);
                int.TryParse(strH, out h);
                Debug.Log("AdBannerDidReceiveAd::w=" + w + " h=" + h);
                // if (gameBaseRun != null)
                // {
                //     gameBaseRun.AdBannerDidReceiveAd(w, h);
                // }
                if (callbackFinish != null) {
                    callbackFinish(AdType.BANNER, AdStatus.SUCCESFULL, str);
                }
        */
    },
    AdBannerDidReceiveAdFail(adsource) {

        /*
                int type = AdConfigParser.SOURCE_TYPE_BANNER;
                AdInfo info = AdConfig.main.GetNextPriority(type);
                if (info != null) {
                    AdBanner.InitAd(info.source);
                    AdBanner.ShowAd(true);
                }
                else {
                    if (callbackFinish != null) {
                        callbackFinish(AdType.BANNER, AdStatus.FAIL, null);
                    }
                }
                */
    },

    AdBannerDidClick(adsource) {
      
    },
    AdInsertWillShow(str) {
        //Debug.Log(str);
        // PauseGame(true);

        if (callbackFinish != null) {
            callbackFinish(AdType.INSERT, AdStatus.START, null);
        }
    },
    AdInsertDidClose(str) {
        //s Debug.Log(str);
        // PauseGame(false);
        if (callbackFinish != null) {
            callbackFinish(AdType.INSERT, AdStatus.CLOSE, null);
        }
    },

    AdInsertDidFail(adsource) {

        // int type = AdConfigParser.SOURCE_TYPE_INSERT;
        // AdInfo info = AdConfig.main.GetNextPriority(type);
        // if (info != null) {
        //     AdInsert.InitAd(info.source);
        //     AdInsert.ShowAd();
        // }
        // else {
        //     if (callbackFinish != null) {
        //         callbackFinish(AdType.INSERT, AdStatus.FAIL, null);
        //     }
        // }

    },


    AdVideoDidFail(str) {
        // int type = AdConfigParser.SOURCE_TYPE_VIDEO;
        // AdInfo info = AdConfig.main.GetNextPriority(type);
        // if (info != null) {
        //     AdVideo.InitAd(info.source);
        //     AdVideo.ShowAd();
        // }
        // else {
        //     if (callbackFinish != null) {
        //         callbackFinish(AdType.VIDEO, AdStatus.FAIL, null);
        //     }
        // }
    },

    AdVideoDidStart(str) {
        // AudioPlay.main.Pause();
        // if (callbackFinish != null) {
        //     callbackFinish(AdType.VIDEO, AdStatus.START, null);
        // }

    },


    // void DoAdVideoDidFinish()
    // {
    //     //win10 微軟視頻廣告 播放結束調用需要在main ui thread 否則會crash
    //     string str = "advideo";
    //     bool ret = Common.GetBool(AppString.STR_KEY_BACKGROUND_MUSIC);
    //     if (ret) {
    //         AudioPlay.main.Play();
    //     }

    //     if (callbackFinish != null) {
    //         callbackFinish(AdType.VIDEO, AdStatus.SUCCESFULL, str);
    //     }
    // } 

    AdVideoDidFinish(str) {

        this.DoAdVideoDidFinish();

    },

});

AdKitCommon.main = new AdKitCommon();

cc.AdKitCommon = module.export = AdKitCommon;

