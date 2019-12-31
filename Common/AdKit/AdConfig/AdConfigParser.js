var Dictionary = require("Dictionary");
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


