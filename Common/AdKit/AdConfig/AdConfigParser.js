var Dictionary = require("Dictionary");

var AdType = cc.Enum({
    //区分大小写
    BANNER: 0,
    SPLASH: 1,
    INSERT: 2,
    SPLASH_INSERT: 3,
    NATIVE: 4,
    VIDEO: 5,
    INSERT_VIDEO: 6,
});

var AdConfigParser = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量
        COMMON: "common",
        MAIN: "main",
        callbackFinish: null,
        listLoad: [],
        loadInfo: cc.LoadItemInfo,
        AdType: AdType,
    },


    properties: {
        dicItem: {
            default: null,
            type: Dictionary
        },
        adType: {
            default: AdType.BANNER,
            type: AdType
        },
        listPlatform: {
            default: [],
            type: cc.AdInfo
        },
        listPriorityBanner: {
            default: [],
            type: cc.AdInfo
        },
        listPriorityInsert: {
            default: [],
            type: cc.AdInfo
        },
        listPrioritySplash: {
            default: [],
            type: cc.AdInfo
        },
        listPrioritySplashInsert: {
            default: [],
            type: cc.AdInfo
        },
        listPriorityVideo: {
            default: [],
            type: cc.AdInfo
        },
        listPriorityNative: {
            default: [],
            type: cc.AdInfo
        },


        rootJson: null,
        rootJsonCommon: null,
        rootJsonPriority: null,
        osDefault: "",//Source.IOS, 

        indexPriorityBanner: 0,
        indexPriorityInsert: 0,
        indexPrioritySplash: 0,
        indexPrioritySplashInsert: 0,
        indexPriorityVideo: 0,
        indexPriorityNative: 0,

        adSourceSplash = cc.Source.ADMOB,
        adSourceSplashInsert = cc.Source.ADMOB,
        adSourceInsert = cc.Source.ADMOB,
        adSourceBanner = cc.Source.ADMOB,
        adSourceNative = cc.Source.GDT,
        adSourceVideo = cc.Source.UNITY,

    },

    SetLoadFinishCallBack: function (callback, info) {
        AdConfigParser.callbackFinish = callback;
        AdConfigParser.loadInfo = info;
    },

    InitValue: function () {
        // {
        //     var info = new LoadItemInfo();
        //     info.id = AdConfigParser.COMMON;
        //     info.isLoad = false;
        //     AdConfigParser.listLoad.push(info);
        // }
        {
            var info = new cc.LoadItemInfo();
            info.id = AdConfigParser.MAIN;
            info.isLoad = false;
            AdConfigParser.listLoad.push(info);
        }
    },

    Init: function () {
        if (this.dicItem != null) {
            return;
        }
        this.dicItem = new Dictionary();
    },

    Load: function (file, id) {

        //cc.JsonAsset
        cc.loader.loadRes(file, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.Debug.Log("AdConfigParser:err=" + err);
                // return;
            }

            // cc.Debug.Log("AdConfigParser:rootJson.text=" + rootJson.text);
            if (err == null) {
                this.ParseData(rootJson.json);
            }

            // cc.Debug.Log("id=" + id);
            var info = this.GetLoadInfoById(id);
            if (info != null) {
                info.isLoad = true;
                // cc.Debug.Log("id= info.isLoad=" + info.isLoad);
            }
            this.CheckAllLoad();
        }.bind(this));

        /*
                cc.loader.load(cc.url.raw('resources/AdConfigParser_android.json'), function (err, res) {
                    if (err) {
                        cc.Debug.Log("AdConfigParser:" + err);
                    } else {
                        var list = res;
        
                        cc.Debug.Log("AdConfigParser:load.text=" + res.text);
                        this.ParseData(res);
                    }
        
        
                    // cc.Debug.Log("id=" + id);
                    var info = this.GetLoadInfoById(id);
                    if (info != null) {
                        info.isLoad = true;
                        // cc.Debug.Log("id= info.isLoad=" + info.isLoad);
                    }
                    this.CheckAllLoad();
        
                }.bind(this));
                */

        //cc.Debug.Log("isLoadAll=loadRes end");
    },

    GetLoadInfoById: function (id) {
        for (let info of AdConfigParser.listLoad) {
            if (info.id == id) {
                return info;
            }
        }
        return null;
    },
    CheckAllLoad: function () {
        var isLoadAll = true;
        for (let info of AdConfigParser.listLoad) {
            if (info.isLoad == false) {
                isLoadAll = false;
            }
        }
        // cc.Debug.Log("isLoadAll=" + isLoadAll);
        if (isLoadAll == true) {
            // cc.Debug.Log("isLoadAll= 1 " + isLoadAll);
            if (AdConfigParser.callbackFinish != null) {
                AdConfigParser.loadInfo.isLoad = true;
                // cc.Debug.Log("isLoadAll= 2 " + isLoadAll);
                AdConfigParser.callbackFinish(this);
            } else {
                cc.Debug.Log("AdConfigParser isLoadAll= callbackFinish is null ");
            }
        }
    },
    ParseData: function (json) {
        if (json == null) {
            cc.Debug.Log("AdConfigParser:ParseData=null");
        }
        var appid = json.APPID.huawei;
        cc.Debug.Log("AdConfigParser:appid=" + appid);

    },

    ParseJson: function (ishd) {

        // if (AdConfigParser.callbackFinish != null) {
        //     AdConfigParser.loadInfo.isLoad = true;
        //     // cc.Debug.Log("isLoadAll= 2 " + isLoadAll);
        //     Config.callbackFinish(this);
        // }

        // if (this.rootJson != null) {
        //     return;
        // }

        var strDir = cc.Common.RES_CONFIG_DATA + "/config";

        var fileName = "";

        //Defualt
        fileName = "config_" + this.osDefault;
        if (this.osDefault == cc.Source.ANDROID) {
            fileName = "config_android";
        }
        if (this.osDefault == cc.Source.IOS) {
            fileName = "config_ios";
        }
        if (this.osDefault == cc.Source.WIN) {

        }


        if (cc.Common.main().isAndroid) {
            fileName = "config_android";
        }
        if (cc.Common.isWin) {
            fileName = "config_" + cc.Source.WIN;
            fileName = "config_android";
        }


        if (ishd == true)//AppVersion.appForPad
        {
            fileName += "_hd";
        }
        //fileName += ".json";
        var filepath = strDir + "/" + fileName;
        cc.Debug.Log("AdConfigParser:filepath=" + filepath);
        this.Load(filepath, AdConfigParser.MAIN);
        /*
                string json = FileUtil.ReadStringFromResources(strDir + "/" + fileName);//ReadStringAsset
                rootJson = JsonMapper.ToObject(json);
        
                //appid
        
                JsonData jsonAppId = rootJson["APPID"];
                foreach (string key in jsonAppId.Keys)
                {
                    string value = (string)jsonAppId[key];
                    Debug.Log("APPID:key=" + key + " value=" + value);
                    ItemInfo iteminfo = new ItemInfo();
                    iteminfo.source = key;
                    iteminfo.appid = value;
                    listAppStore.Add(iteminfo);
        
                }
        
        
        
        
        
        
                jsonShare = rootJson["SHARE"];
                jsonPay = rootJson["PAY"];
        
                if (listSharePlatform == null)
                {
                    listSharePlatform = new List<SharePlatformInfo>();
                }
        
                JsonData jsonPlatform = jsonShare["platform"];
                foreach (JsonData data in jsonPlatform)
                {
                    SharePlatformInfo info = new SharePlatformInfo();
                    info.source = (string)data["source"];
                    info.appId = (string)data["id"];
                    info.appKey = (string)data["key"];
                    listSharePlatform.Add(info);
                    if (info.source == Source.WEIXIN)
                    {
                        //同时添加朋友圈
                        AddShareBrother(Source.WEIXINFRIEND, info.appId, info.appKey);
                    }
        
                    if (info.source == Source.QQ)
                    {
                        //同时添加qq空间
                        AddShareBrother(Source.QQZONE, info.appId, info.appKey);
                    }
        
                }
        
                //统一添加email和短信
                AddShareBrother(Source.EMAIL, "0", "0");
                AddShareBrother(Source.SMS, "0", "0");
        
                */
    },

    //return AdInfo
    GetAdInfo: function (source) {
        this.listPlatform.forEach(function (value, index) {
            if (value.source == source) {
                return value;
            }
        }.bind(this));
        return null;
    },
    IsInChina: function () {
        var ret = false;
        // var ret = IPInfo.isInChina;
        // if (Common.isAndroid)
        // {
        //     if (AppVersion.appCheckForXiaomi)
        //     {
        //         //xiaomi 审核中,广告用国外的 admob
        //         // ret = false;
        //     }
        //     ret = true;
        // }

        return ret;
    },

    //return string
    GetAdSource: function (type) {
        var src = AdConfigParser.adSourceBanner;
        switch (type) {
            case AdType.SPLASH:
                src = this.adSourceSplash;

                break;
            case AdType.BANNER:
                src = this.adSourceBanner;

                break;
            case AdType.INSERT:
                src = this.adSourceInsert;
                break;
            case AdType.SPLASH_INSERT:
                src = this.adSourceSplashInsert;
                break;
            case AdType.NATIVE:
                src = this.adSourceNative;
                break;
            case AdType.VIDEO:
                src = this.adSourceVideo;
                break;
        }

        // if (Config.main.channel == Source.INMOB)
        // {
        //     src = Source.INMOB;
        // }
        return src;
    },

    GetAppId: function (source) {
        var ret = "";
        var info = this.GetAdInfo(source);
        if (info != null) {
            ret = info.appid;
        }
        return ret;
    },


    GetAdKey: function (source, type) {
        var ret = "";
        var info = this.GetAdInfo(source);
        if (info != null) {
            switch (type) {
                case AdType.SPLASH:
                    ret = info.key_splash;
                    break;
                case AdType.BANNER:
                    ret = info.key_banner;
                    break;
                case AdType.INSERT:
                    ret = info.key_insert;
                    break;
                case AdType.SPLASH_INSERT:
                    ret = info.key_splash_insert;
                    break;
                case AdType.NATIVE:
                    ret = info.key_native;
                    break;

                case AdType.VIDEO:
                    ret = info.key_video;
                    break;
                case AdType.INSERT_VIDEO:
                    ret = info.key_insert_video;
                    break;
            }
        }
        return ret;
    },

    //return AdInfo
    GetListPriority: function (type) {
        var listPriority = null;
        switch (type) {
            case AdType.SPLASH:
                listPriority = this.listPrioritySplash;
                break;
            case AdType.BANNER:
                listPriority = this.listPriorityBanner;
                break;
            case AdType.INSERT:
                listPriority = this.listPriorityInsert;
                break;
            case AdType.SPLASH_INSERT:
                listPriority = this.listPrioritySplashInsert;
                break;
            case AdType.NATIVE:
                listPriority = this.listPriorityNative;
                break;
            case AdType.VIDEO:
                listPriority = this.listPriorityVideo;
                break;
        }
        return listPriority;
    },

    InitPriority: function (src, type) {

        var listPriority = this.GetListPriority(type);
        listPriority.forEach(function (info, index) {
            if (info.source == src) {
                switch (type) {
                    case AdType.SPLASH:
                        this.indexPrioritySplash = index;
                        break;
                    case AdType.BANNER:
                        this.indexPriorityBanner = index;
                        break;
                    case AdType.INSERT:
                        this.indexPriorityInsert = index;
                        break;
                    case AdType.SPLASH_INSERT:
                        this.indexPrioritySplashInsert = index;
                        break;
                    case AdType.NATIVE:
                        this.indexPriorityNative = index;
                        break;
                    case AdType.VIDEO:
                        this.indexPriorityVideo = index;
                        break;
                }
                break;
            }
        }.bind(this));

    },

    //return AdInfo
    GetNextPriority: function (type) {
        var idx = 0;
        switch (type) {
            case AdType.SPLASH:
                idx = ++this.indexPrioritySplash;
                break;
            case AdType.BANNER:
                idx = ++this.indexPriorityBanner;
                break;
            case AdType.INSERT:
                idx = ++this.indexPriorityInsert;
                break;
            case AdType.SPLASH_INSERT:
                idx = ++this.indexPrioritySplashInsert;
                break;
            case AdType.NATIVE:
                idx = ++this.indexPriorityNative;
                break;
            case AdType.VIDEO:
                idx = ++this.indexPriorityVideo;
                break;
        }
        var listPriority = this.GetListPriority(type);
        cc.Debug.Log("GetNextPriority:listPriority.Count=" + listPriority.Count + " type=" + type + " idx=" + idx);
        if (idx >= listPriority.length) {
            return null;
        }
        var info = listPriority[idx];
        return info;

    },


    StartParseConfig: function (url) {
        cc.Debug.Log("StartParseConfig:" + url);

        //直接从本地读取
        //OnHttpRequestFinished(null, false, null);
        this.ParseJsonDataApp();

        //common 在后面
        this.ParseJsonDataCommon();
        this.ParseJsonPriority();

        // HttpRequest http = new HttpRequest(OnHttpRequestFinished);
        // http.Get(url);



    },

    ParseJsonDataApp: function () {
        var filename = "ad_config_ios";

        if (cc.Common.main().isAndroid) {
            filename = "ad_config_android";
        }
        if (cc.Common.main().isWeiXin) {
            filename = "ad_config_weixin";
        }


        if (cc.Common.main().isWin)
        {
            filename = "ad_config_win"
        } 

        if (cc.AppVersion.main().appForPad) {
            filename = filename + "_hd";
        }
        var filepath = Common.GAME_DATA_DIR + "/adconfig/" + filename + ".json";
        //  byte[] datatmp = FileUtil.ReadDataAuto(filepath);
        //  this.ParseData(datatmp);
    }


});

// AdConfigParser.main = new AdConfigParser();


//单例对象 方法二
AdConfigParser._main = null;
AdConfigParser.main = function () {
    if (!AdConfigParser._main) {
        AdConfigParser._main = new AdConfigParser();
        AdConfigParser._main.InitValue();
        AdConfigParser._main.Init();
    }
    return AdConfigParser._main;
}
cc.AdConfigParser = module.export = AdConfigParser;

