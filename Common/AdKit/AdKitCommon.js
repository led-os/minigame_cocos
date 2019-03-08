
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
    },

    //insert
    InitAdInsert: function () {
        if (cc.Common.main().noad) {
            return;
        }
    },


    //Video
    InitAdVideo: function () {
        if (cc.Common.main().noad) {
            return;
        }
    },
    /*
    
    
        public void InitAdBanner()
        {
            if (Common.noad)
            {
                return;
            }
            bool isShowAdBanner = true;
            if (Common.isiOS)
            {
                if (!AppVersion.appCheckHasFinished)
                {
                    //ios app审核不显示banner
                    isShowAdBanner = false;
                }
            }
    
            if (Common.isAndroid)
            {
    
                if (!AppVersion.appCheckHasFinished)
                {
                    //xiaomi app审核不显示banner
                    isShowAdBanner = false;
                }
            }
    
            if (isShowAdBanner)
            {
                AdBanner.SetScreenSize(Screen.width, Screen.height);
                AdBanner.SetScreenOffset(0, Device.heightSystemHomeBar);
                {
                    int type = AdConfigParser.SOURCE_TYPE_BANNER;
                    string source = AdConfig.main.GetAdSource(type);
                    AdBanner.InitAd(source);
                    AdBanner.ShowAd(true);
                }
            }
    
    
    
    
        }
    
        public void InitAdInsert()
        {
            if (Common.noad)
            {
                return;
            }
    
            bool isShowAdInsert = false;
            if (AppVersion.appCheckHasFinished)
            {
                isShowAdInsert = true;
            }
            if (isShowAdInsert)
            {
                AdInsert.SetObjectInfo(this.gameObject.name);
                int type = AdConfigParser.SOURCE_TYPE_INSERT;
                string source = AdConfig.main.GetAdSource(type);
                AdInsert.InitAd(source);
            }
    
        }
    
        public void InitAdVideo()
        {
            if (Common.noad)
            {
                return;
            }
    
            if (AppVersion.appCheckHasFinished)
            {
                AdVideo.SetType(AdVideo.ADVIDEO_TYPE_REWARD);
                int type = AdConfigParser.SOURCE_TYPE_VIDEO;
                string source = AdConfig.main.GetAdSource(type);
                Debug.Log("InitAdVideo AdVideo.InitAd =" + source);
                AdVideo.InitAd(source);
            }
        }
    
        public void ShowAdBanner(bool isShow)
        {
            AdBanner.ShowAd(isShow);
        }
        public void ShowAdVideo()
        {
            //show 之前重新设置广告
            InitAdVideo();
            AdVideo.ShowAd();
        }
    
        public void ShowAdInsert(int rate)
        {
    
            if (!AppVersion.appCheckHasFinished)
            {
                return;
            }
    
            if (Common.noad)
            {
                return;
            }
    
            if (Common.isAndroid)
            {
                if (Common.GetDayIndexOfUse() <= Config.main.NO_AD_DAY)
                {
                    return;
                }
            }
    
    
            int randvalue = Random.Range(0, 100);
            if (randvalue > rate)
            {
                return;
            }
            //show 之前重新设置广告
            //InitAdInsert();
            AdInsert.ShowAd();
        }
    
        //c++调用c#的回调
        public void AdBannerCallbackUnity(string source, string method, int w, int h)
        {
            Debug.Log("AdBannerCallbackUnity method=" + method + "  w=" + w + " h=" + h);
            if ("AdDidFinish" == method)
            {
                AdBannerDidReceiveAd(w + ":" + h);
            }
            if ("AdDidFail" == method)
            {
                AdBannerDidReceiveAdFail(source);
            }
        }
        public void AdBannerDidReceiveAd(string str)
        {
    
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
            if (callbackFinish != null)
            {
                callbackFinish(AdType.BANNER, AdStatus.SUCCESFULL, str);
            }
    
        }
        public void AdBannerDidReceiveAdFail(string adsource)
        {
    
    
            int type = AdConfigParser.SOURCE_TYPE_BANNER;
            AdInfo info = AdConfig.main.GetNextPriority(type);
            if (info != null)
            {
                AdBanner.InitAd(info.source);
                AdBanner.ShowAd(true);
            }
            else
            {
                if (callbackFinish != null)
                {
                    callbackFinish(AdType.BANNER, AdStatus.FAIL, null);
                }
            }
        }
    
        public void AdBannerDidClick(string adsource)
        {
            Debug.Log("AdBannerDidClick adsource=" + adsource);
            if (adsource == Source.MOBVISTA)
            {
                //点击MobVista banner 弹出视频
                // AdKitCommon.main.ShowAdVideo();
                AdKitCommon.main.ShowAdInsert(100);
            }
        }
        //c++调用c#的回调
        public void AdInsertCallbackUnity(string source, string method)
        {
    
            if ("AdDidFinish" == method)
            {
                AdInsertWillShow(source);
            }
            if ("AdDidFail" == method)
            {
                AdInsertDidFail(source);
            }
            if ("AdDidClose" == method)
            {
                AdInsertDidClose(source);
            }
    
        }
    
        public void AdInsertWillShow(string str)
        {
            //Debug.Log(str);
            // PauseGame(true);
    
            if (callbackFinish != null)
            {
                callbackFinish(AdType.INSERT, AdStatus.START, null);
            }
        }
        public void AdInsertDidClose(string str)
        {
            //s Debug.Log(str);
            // PauseGame(false);
            if (callbackFinish != null)
            {
                callbackFinish(AdType.INSERT, AdStatus.CLOSE, null);
            }
        }
    
        public void AdInsertDidFail(string adsource)
        {
    
            int type = AdConfigParser.SOURCE_TYPE_INSERT;
            AdInfo info = AdConfig.main.GetNextPriority(type);
            if (info != null)
            {
                AdInsert.InitAd(info.source);
                AdInsert.ShowAd();
            }
            else
            {
                if (callbackFinish != null)
                {
                    callbackFinish(AdType.INSERT, AdStatus.FAIL, null);
                }
            }
    
        }
    
        //c++调用c#的回调
        public void AdVideoCallbackUnity(string source, string method)
        {
    
            if ("AdDidFinish" == method)
            {
                AdVideoDidFinish(source);
            }
            if ("AdDidFail" == method)
            {
                AdVideoDidFail(source);
            }
            if ("AdDidClose" == method)
            {
                // AdInsertDidClose(source);
            }
    
        }
    
    
        public void AdVideoDidFail(string str)
        {
            int type = AdConfigParser.SOURCE_TYPE_VIDEO;
            AdInfo info = AdConfig.main.GetNextPriority(type);
            if (info != null)
            {
                AdVideo.InitAd(info.source);
                AdVideo.ShowAd();
            }
            else
            {
                if (callbackFinish != null)
                {
                    callbackFinish(AdType.VIDEO, AdStatus.FAIL, null);
                }
            }
        }
    
        public void AdVideoDidStart(string str)
        {
            AudioPlay.main.Pause();
            if (callbackFinish != null)
            {
                callbackFinish(AdType.VIDEO, AdStatus.START, null);
            }
    
        }
    
        //PlayerPrefs.GetInt can only be called from the main thread
        IEnumerator AdVideoDidFinishMainThread(string str)
        {
            yield return null;
            bool ret = Common.GetBool(AppString.STR_KEY_BACKGROUND_MUSIC);
            if (ret)
            {
                AudioPlay.main.Play();
            }
    
            if (callbackFinish != null)
            {
                callbackFinish(AdType.VIDEO, AdStatus.SUCCESFULL, str);
            }
        }
    
    
        void DoAdVideoDidFinish()
        {
            //win10 微軟視頻廣告 播放結束調用需要在main ui thread 否則會crash
            string str = "advideo";
            bool ret = Common.GetBool(AppString.STR_KEY_BACKGROUND_MUSIC);
            if (ret)
            {
                AudioPlay.main.Play();
            }
    
            if (callbackFinish != null)
            {
                callbackFinish(AdType.VIDEO, AdStatus.SUCCESFULL, str);
            }
        }
        //Unity多线程（Thread）和主线程（MainThread）交互使用类——Loom工具分享 http://dsqiu.iteye.com/blog/2028503 
        public void AdVideoDidFinish(string str)
        {
            //  isAdVideoFinish = true;
            //PlayerPrefs.GetInt can only be called from the main thread
            // StartCoroutine(AdVideoDidFinishMainThread(str));
            //Invoke("DoAdVideoDidFinish", 0.2f);
    
            Loom.QueueOnMainThread(() =>
            {
                DoAdVideoDidFinish();
    
            });
        }
    */
});

AdKitCommon.main = new AdKitCommon();

cc.AdKitCommon = module.export = AdKitCommon;

