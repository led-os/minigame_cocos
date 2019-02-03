var Dictionary = require("Dictionary");
var Common = require("Common");
var Source = require("Source");
var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var AdConfig = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量
        COMMON: "common",
        MAIN: "main",
        callbackFinish: null,
        listLoad: [],
        loadInfo: LoadItemInfo,
    },
    properties: {
        dicItem: {
            default: null,
            type: Dictionary
        },
        rootJson: null,
        rootJsonCommon: null,
        osDefault: "",//Source.IOS, 
    },

    SetLoadFinishCallBack: function (callback, info) {
        AdConfig.callbackFinish = callback;
        AdConfig.loadInfo = info;
    },

    InitValue: function () {
        // {
        //     var info = new LoadItemInfo();
        //     info.id = AdConfig.COMMON;
        //     info.isLoad = false;
        //     AdConfig.listLoad.push(info);
        // }
        {
            var info = new LoadItemInfo();
            info.id = AdConfig.MAIN;
            info.isLoad = false;
            AdConfig.listLoad.push(info);
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
                cc.log("AdConfig:err=" + err);
                // return;
            }

            // cc.log("AdConfig:rootJson.text=" + rootJson.text);
            if (err == null) {
                this.ParseData(rootJson.json);
            }

            // cc.log("id=" + id);
            var info = this.GetLoadInfoById(id);
            if (info != null) {
                info.isLoad = true;
                // cc.log("id= info.isLoad=" + info.isLoad);
            }
            this.CheckAllLoad();
        }.bind(this));

        /*
                cc.loader.load(cc.url.raw('resources/AdConfig_android.json'), function (err, res) {
                    if (err) {
                        cc.log("AdConfig:" + err);
                    } else {
                        var list = res;
        
                        cc.log("AdConfig:load.text=" + res.text);
                        this.ParseData(res);
                    }
        
        
                    // cc.log("id=" + id);
                    var info = this.GetLoadInfoById(id);
                    if (info != null) {
                        info.isLoad = true;
                        // cc.log("id= info.isLoad=" + info.isLoad);
                    }
                    this.CheckAllLoad();
        
                }.bind(this));
                */

        //cc.log("isLoadAll=loadRes end");
    },

    GetLoadInfoById: function (id) {
        for (let info of AdConfig.listLoad) {
            if (info.id == id) {
                return info;
            }
        }
        return null;
    },
    CheckAllLoad: function () {
        var isLoadAll = true;
        for (let info of AdConfig.listLoad) {
            if (info.isLoad == false) {
                isLoadAll = false;
            }
        }
        // cc.log("isLoadAll=" + isLoadAll);
        if (isLoadAll == true) {
            // cc.log("isLoadAll= 1 " + isLoadAll);
            if (AdConfig.callbackFinish != null) {
                AdConfig.loadInfo.isLoad = true;
                // cc.log("isLoadAll= 2 " + isLoadAll);
                AdConfig.callbackFinish(this);
            } else {
                cc.log("AdConfig isLoadAll= callbackFinish is null ");
            }
        }
    },
    ParseData: function (json) {
        if (json == null) {
            cc.log("AdConfig:ParseData=null");
        }
        var appid = json.APPID.huawei;
        cc.log("AdConfig:appid=" + appid);

    },

    ParseJson: function (ishd) {

        // if (AdConfig.callbackFinish != null) {
        //     AdConfig.loadInfo.isLoad = true;
        //     // cc.log("isLoadAll= 2 " + isLoadAll);
        //     Config.callbackFinish(this);
        // }

        // if (this.rootJson != null) {
        //     return;
        // }

        var strDir = Common.RES_CONFIG_DATA + "/config";

        var fileName = "";

        //Defualt
        fileName = "config_" + this.osDefault;
        if (this.osDefault == Source.ANDROID) {
            fileName = "config_android";
        }
        if (this.osDefault == Source.IOS) {
            fileName = "config_ios";
        }
        if (this.osDefault == Source.WIN) {

        }


        if (Common.isAndroid) {
            fileName = "config_android";
        }
        if (Common.isWin) {
            fileName = "config_" + Source.WIN;
            fileName = "config_android";
        }


        if (ishd == true)//AppVersion.appForPad
        {
            fileName += "_hd";
        }
        //fileName += ".json";
        var filepath = strDir + "/" + fileName;
        cc.log("AdConfig:filepath=" + filepath);
        this.Load(filepath, AdConfig.MAIN);
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
    }

});

// AdConfig.main = new AdConfig();


//单例对象 方法二
AdConfig._main = null;
AdConfig.main = function () {
    if (!AdConfig._main) {
        cc.log("_main is null");
        AdConfig._main = new AdConfig();
        AdConfig._main.InitValue();
        AdConfig._main.Init();
    } else {
        cc.log("_main is not null");
    }
    return AdConfig._main;
}

