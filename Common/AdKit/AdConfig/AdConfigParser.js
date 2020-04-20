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
        COUNTRY_CN: "cn",
        COUNTRY_OTHER: "other",
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

        adSourceSplash: "",
        adSourceSplashInsert: "",
        adSourceInsert: "",
        adSourceBanner: "",
        adSourceNative: "",
        adSourceVideo: "",

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


    //return AdInfo
    GetAdInfo: function (source) {
        // this.listPlatform.forEach(function (value, index) {
        //     cc.Debug.Log("GetAdInfo source="+value.source+" key_banner="+value.key_banner);
        //     if (value.source == source) {
        //         return value;
        //     }
        // }.bind(this));
        var ret = null;
        for (var i = 0; i < this.listPlatform.length; i++) {
            var info = this.listPlatform[i];
            cc.Debug.Log("GetAdInfo info.source="+info.source+" source="+source);
            if (info.source == source) {
                cc.Debug.Log(" ret GetAdInfo info.source="+info.source+" source="+source);
                ret = info;
                break; 
            }
        }
        return ret;
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
        cc.Debug.Log("GetAdKey source=" + source + " type=" + type);

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
        } else {
            cc.Debug.Log("GetAdKey info=null");
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
        for (var i = 0; i < listPriority.length; i++) {
            var info = listPriority[i];

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
        }

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
        cc.Debug.Log("StartParseConfig: url=" + url);

        //直接从本地读取
        //OnHttpRequestFinished(null, false, null);
        this.StartParseJsonDataApp();

        //common 在后面
        this.StartParseJsonDataCommon();
        this.StartParseJsonPriority();

        // HttpRequest http = new HttpRequest(OnHttpRequestFinished);
        // http.Get(url);



    },



    StartParseJsonDataApp: function () {
        var filename = "ad_config_ios";
        cc.Debug.Log("StartParseJsonDataApp: 1");
        if (cc.Common.main().isAndroid) {
            filename = "ad_config_android";
        }
        if (cc.Common.main().isWeiXin) {
            filename = "ad_config_weixin";
        }


        if (cc.Common.main().isWin) {
            filename = "ad_config_win"
        }
        cc.Debug.Log("StartParseJsonDataApp: 2");
        if (cc.AppVersion.main().appForPad) {
            filename = filename + "_hd";
        }
        var filepath = cc.Common.RES_CONFIG_DATA + "/adconfig/" + filename + ".json";
        //  byte[] datatmp = FileUtil.ReadDataAuto(filepath);
        //  this.ParseData(datatmp);
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.Debug.Log("StartParseJsonDataApp: 4");
                cc.Debug.Log("config:err=" + err);
            }
            if (err == null) {
                cc.Debug.Log("StartParseJsonDataApp: 5");
                this.ParsePlatformData(rootJson.json);
                cc.Debug.Log("StartParseJsonDataApp: 6");
            }
        }.bind(this));
        cc.Debug.Log("StartParseJsonDataApp: 3");
    },

    StartParseJsonDataCommon: function () {

        var filename = "ad_config_common_ios";

        if (cc.Common.main().isAndroid) {
            filename = "ad_config_common_android";
        }
        if (cc.Common.main().isWeiXin) {
            filename = "ad_config_common_weixin";
        }


        if (cc.Common.main().isWin) {
            filename = "ad_config_common_win"
        }

        if (cc.AppVersion.main().appForPad) {
            filename = filename + "_hd";
        }

        var key = AdConfigParser.COUNTRY_CN;
        if (this.IsInChina()) {
            key = AdConfigParser.COUNTRY_CN;
        }
        else {
            key = AdConfigParser.COUNTRY_OTHER;
        }

        var filepath = cc.Common.RES_CONFIG_DATA_COMMON + "/adconfig/" + key + "/" + filename + ".json";


        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.Debug.Log("config:err=" + err);
            }
            if (err == null) {
                var adsource = rootJson.json["ad_source"];
                this.adSourceSplash = cc.JsonUtil.GetItem(adsource, "source_splash", "");
                this.adSourceInsert = cc.JsonUtil.GetItem(adsource, "source_insert", "");
                this.adSourceBanner = cc.JsonUtil.GetItem(adsource, "source_banner", "");
                this.adSourceSplashInsert = cc.JsonUtil.GetItem(adsource, "source_splash_insert", "");
                this.adSourceNative = cc.JsonUtil.GetItem(adsource, "source_native", "");
                this.adSourceVideo = cc.JsonUtil.GetItem(adsource, "source_video", "");

                this.ParsePlatformData(rootJson.json);
            }
        }.bind(this));



    },

    StartParseJsonPriority: function () {
        var filename = "ad_config_priority_ios";

        if (cc.Common.main().isAndroid) {
            filename = "ad_config_priority_android";
        }
        if (cc.Common.main().isWeiXin) {
            filename = "ad_config_priority_weixin";
        }


        if (cc.Common.main().isWin) {
            filename = "ad_config_priority_win"
        }


        var key = AdConfigParser.COUNTRY_CN;
        if (this.IsInChina()) {
            key = AdConfigParser.COUNTRY_CN;
        }
        else {
            key = AdConfigParser.COUNTRY_OTHER;
        }

        var filepath = cc.DATA_COMMON + "/adconfig/" + key + "/" + filename + ".json";

        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.Debug.Log("config:err=" + err);
            }
            if (err == null) {

                var root = rootJson.json;
                this.ParsePriorityItem(this.listPriorityBanner, "priority_banner", root);

                this.ParsePriorityItem(this.listPriorityInsert, "priority_insert", root);

                this.ParsePriorityItem(this.listPrioritySplash, "priority_splash", root);

                this.ParsePriorityItem(this.istPrioritySplashInsert, "priority_splash_insert", root);

                this.ParsePriorityItem(this.listPriorityVideo, "priority_video", root);

                this.ParsePriorityItem(this.listPriorityNative, "priority_native", root);

            }
        }.bind(this));


    },

    ParsePriorityItem: function (ls, key, json) {
        var jsonItems = json[key];
        for (var i = 0; i < jsonItems.length; i++) {
            var info = new cc.AdInfo();
            var current = jsonItems[i];
            info.source = current["source"];
            ls.push(info);
        }
    },

    ParsePlatformData: function (rootData) {
        var key = "platform";
        if (!cc.JsonUtil.ContainsKey(rootData, key)) {
            return;
        }

        var jsonItems = rootData[key];

        for (var i = 0; i < jsonItems.length; i++) {
            var info = new cc.AdInfo();
            var item = jsonItems[i];
            info.source = item["source"];
            if (this.IsInPlatformList(info.source)) {
                continue;
            }

            info.appid = cc.JsonUtil.GetItem(item, "appid", "");
            info.appkey = cc.JsonUtil.GetItem(item, "appkey", "");
            info.key_splash = cc.JsonUtil.GetItem(item, "key_splash", "");
            info.key_splash_insert = cc.JsonUtil.GetItem(item, "key_splash_insert", "");
            info.key_insert = cc.JsonUtil.GetItem(item, "key_insert", "");
            info.key_native = cc.JsonUtil.GetItem(item, "key_native", "");
            info.key_banner = cc.JsonUtil.GetItem(item, "key_banner", "");
            info.key_video = cc.JsonUtil.GetItem(item, "key_video", "");
            info.key_insert_video = cc.JsonUtil.GetItem(item, "key_insert_video", "");
            cc.Debug.Log("ParsePlatformData source=" + info.source + " key_banner=" + info.key_banner);

            this.listPlatform.push(info);

        }
    },

    IsInPlatformList: function (src) {
        var ret = false;
        for (var i = 0; i < this.listPlatform.length; i++) {
            var info = this.listPlatform[i];
            if (info.source == src) {
                ret = true;
                break;
            }
        };
        return ret;
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

