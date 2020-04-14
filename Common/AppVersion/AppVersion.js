var AppVersionBase = require("AppVersionBase");
var AppVersion = cc.Class({
    extends: cc.Object,
    statics: {
        //包名	商店
        //com.android.vending	Google Play
        //com.tencent.android.qqdownloader	应用宝
        //com.qihoo.appstore	360手机助手
        //com.baidu.appsearch	百度手机助
        //com.xiaomi.market	小米应用商店
        //com.wandoujia.phoenix2	豌豆荚
        //com.huawei.appmarket	华为应用市场
        //com.taobao.appcenter	淘宝手机助手
        //com.hiapk.marketpho	安卓市场
        PACKAGE_APPSTORE_HUAWEI: "com.huawei.appmarket",
        PACKAGE_APPSTORE_XIAOMI: "com.xiaomi.market",
        PACKAGE_APPSTORE_GP: "com.android.vending",
        PACKAGE_APPSTORE_TAPTAP: "com.taptap.market",

        STRING_KEY_APP_CHECK_FINISHED: "app_check_finished",
    },
    properties: {
        appVersionBase: AppVersionBase,
        appCheckHasFinished: {
            get: function () {
                if (cc.Common.main().isAndroid) {
                    if (cc.Config.main().channel == cc.Source.TAPTAP) {
                        return true;
                    }
                    // if (!IPInfo.isInChina)
                    // {
                    //     //android 国外 直接当作 审核通过
                    //   //  return true;
                    // }
                }
                var ret = cc.Common.GetItemOfKey(AppVersion.STRING_KEY_APP_CHECK_FINISHED, false);
                return ret;
            },

        },

        appForPad: {
            get: function () {
                var str = cc.Common.main().GetAppPackage();
                var ret = false;
                if (str.Contains(".pad") || str.Contains(".ipad")) {
                    ret = true;
                }
                if (Common.isWinUWP) {
                    if (Common.GetAppName().ToLower().Contains("hd")) {
                        ret = true;
                    }

                }

                return ret;
            },

        },

        appNeedUpdate: {
            get: function () {
                var ret = false;
                if (appVersionBase != null) {
                    ret = appVersionBase.appNeedUpdate;
                }
                return ret;
            },

        },

        strUpdateNote: {
            get: function () {
                var ret = "";
                if (appVersionBase != null) {
                    ret = appVersionBase.strUpdateNote;
                }
                return ret;
            },

        },

        strUrlComment: {
            get: function () {
                var ret = "";
                if (appVersionBase != null) {
                    ret = appVersionBase.strUrlComment;
                }
                return ret;
            },

        },



        strUrlAppstore: {
            get: function () {
                var ret = "";
                if (appVersionBase != null) {
                    ret = appVersionBase.strUrlAppstore;
                }
                return ret;
            },

        },


        Init: function () {
            Debug.Log("AppVersion Init");
            // appNeedUpdate = false;
            // isFirstCreat = false;
            // appCheckForAppstore = false;

        },


        GetUrlOfComment: function (source) {
            var url = "";
            var strappid = Config.main.appId;
            switch (source) {
                case cc.Source.APPSTORE:
                    {
                        url = "https://itunes.apple.com/cn/app/id" + strappid;
                        if (!IPInfo.isInChina) {
                            url = "https://itunes.apple.com/us/app/id" + strappid;
                        }
                    }
                    break;
                case cc.Source.TAPTAP:
                    {
                        url = "https://www.taptap.com/app/" + strappid + "/review";
                    }
                    break;
                case cc.Source.XIAOMI:
                    {
                        url = "http://app.xiaomi.com/details?id=" + Common.GetAppPackage();
                    }
                    break;
                case cc.Source.HUAWEI:
                    {
                        //http://appstore.huawei.com/app/C100270155
                        url = "http://appstore.huawei.com/app/C" + strappid;
                    }
                    break;


            }
            return url;
        },


        OnUICommentDidClick: function (item) {
            if (callBackCommentClick != null) {
                callBackCommentClick(item);
            }
        },

        OnComment: function () {
            //if (Common.isAndroid)
            if (Config.main.listAppStore.Count > 1) {
                CommentViewController.main.callBackClick = OnUICommentDidClick;
                CommentViewController.main.Show(null, null);
                return;
            }
            var info = Config.main.listAppStore[0];
            DoComment(info);
        },
        GotoComment: function () {
            var appstorePackage = "";
            var appstore = cc.Source.APPSTORE;
            if (Common.isAndroid) {
                if (Config.main.channel == cc.Source.TAPTAP) {
                    appstore = cc.Source.TAPTAP;
                    appstorePackage = AppVersion.PACKAGE_APPSTORE_TAPTAP;
                }

                if (Config.main.channel == cc.Source.XIAOMI) {
                    appstore = cc.Source.XIAOMI;
                    appstorePackage = AppVersion.PACKAGE_APPSTORE_XIAOMI;
                }
                if (Config.main.channel == cc.Source.HUAWEI) {
                    appstore = cc.Source.HUAWEI;
                    appstorePackage = AppVersion.PACKAGE_APPSTORE_HUAWEI;
                }

            }

            GotoToAppstoreApp(appstore, Common.GetAppPackage(), appstorePackage, GetUrlOfComment(appstore));
        },

        //https://blog.csdn.net/pz789as/article/details/78223517
        //跳转到appstore写评论
        GotoToAppstoreApp: function (appstore, appPackage, marketPkg, url) {
            cc.Debug.Log("GotoToAppstoreApp appstore=" + appstore + " appPackage=" + appPackage + " marketPkg=" + marketPkg + " url" + url);
            if (Common.isAndroid) {
                if (appstore != cc.Source.TAPTAP) {
                    AndroidJavaClass intentClass = new AndroidJavaClass("android.content.Intent");
                    AndroidJavaObject intentObject = new AndroidJavaObject("android.content.Intent");
                    intentObject.Call<AndroidJavaObject>("setAction", intentClass.GetStatic<string>("ACTION_VIEW"));
                    AndroidJavaClass uriClass = new AndroidJavaClass("android.net.Uri");
                    AndroidJavaObject uriObject = uriClass.CallStatic<AndroidJavaObject>("parse", "market://details?id=" + appPackage);
                    intentObject.Call<AndroidJavaObject>("setData", uriObject);
                    intentObject.Call<AndroidJavaObject>("setPackage", marketPkg);
                    AndroidJavaClass unity = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
                    AndroidJavaObject currentActivity = unity.GetStatic<AndroidJavaObject>("currentActivity");
                    currentActivity.Call("startActivity", intentObject);

                    return;
                }

            }


            if (!Common.BlankString(url)) {
                Application.OpenURL(url);
            }

        },
        DoComment: function (info) {
            var strappid = Config.main.GetAppIdOfStore(info.source);
            var strUrlComment = "";
            var appstorePackage = "";
            switch (info.source) {
                case cc.Source.APPSTORE:
                    {
                        strUrlComment = "https://itunes.apple.com/cn/app/id" + strappid;
                        if (!IPInfo.isInChina) {
                            strUrlComment = "https://itunes.apple.com/us/app/id" + strappid;
                        }
                    }
                    break;
                case cc.Source.TAPTAP:
                    {
                        strUrlComment = "https://www.taptap.com/app/" + strappid + "/review";
                        appstorePackage = PACKAGE_APPSTORE_TAPTAP;
                    }
                    break;
                case cc.Source.XIAOMI:
                    {
                        strUrlComment = "http://app.xiaomi.com/details?id=" + Common.GetAppPackage();
                        appstorePackage = PACKAGE_APPSTORE_XIAOMI;
                    }
                    break;
                case cc.Source.HUAWEI:
                    {
                        //http://appstore.huawei.com/app/C100270155
                        strUrlComment = "http://appstore.huawei.com/app/C" + strappid;
                        appstorePackage = PACKAGE_APPSTORE_HUAWEI;
                    }
                    break;


            }



            var url = strUrlComment;
            if (!Common.BlankString(url)) {
                OnUICommentDidClick(null);
                Debug.Log("strUrlComment::" + url);
            }
            else {
                Debug.Log("strUrlComment is Empty");
            }
            GotoToAppstoreApp(info.source, Common.GetAppPackage(), appstorePackage, url);

        },
        StartParseVersion: function () {
            //   startParserVersionXiaomi();
            //   return;
            //android
            if (Common.isAndroid) {
                switch (Config.main.channel) {
                    case cc.Source.XIAOMI:
                        {
                            appVersionBase = new AppVersionXiaomi();
                            break;
                        }
                    case cc.Source.TAPTAP:
                        {
                            appVersionBase = new AppVersionTaptap();
                            break;
                        }
                    case cc.Source.HUAWEI:
                        {
                            appVersionBase = new AppVersionHuawei();
                            break;
                        }
                    case cc.Source.GP:
                        {
                            appVersionBase = new AppVersionGP();
                            break;
                        }
                    default:
                        {
                            appVersionBase = new AppVersionBase();
                        }
                        break;

                }

            }
            else if (Common.isiOS) {
                appVersionBase = new AppVersionAppstore();
            }

            else if (Common.isWinUWP) {
                appVersionBase = new AppVersionWin();
            }
            else {
                appVersionBase = new AppVersionBase();
            }

            //appVersionBase = new AppVersionXiaomi();

            appVersionBase.callbackFinished = OnAppVersionBaseFinished;
            appVersionBase.Init();
            appVersionBase.StartParseVersion();
        },



        OnAppVersionBaseFinished: function (app) {
            if (this.callbackFinished != null) {
                this.callbackFinished(this);
            }
        },



    },


});

AppVersion._main = null;
AppVersion.main = function () {
    if (!AppVersion._main) {
        AppVersion._main = new AppVersion();
    } else {

    }

    return AppVersion._main;
}
cc.AppVersion = module.export = AppVersion;



