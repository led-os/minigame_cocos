var Dictionary = require("Dictionary");
var Common = require("Common");
var Source = require("Source");

//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var Config = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    properties: {
        dicItem: {
            default: null,
            type: Dictionary
        },
        rootJson: null,
        rootJsonCommon: null,
        osDefault: "",//Source.IOS,
    },
    Init: function () {
        if (this.dicItem != null) {
            return;
        }
        this.dicItem = new Dictionary();
    },

    // * loadRes(url: string, completeCallback: (error: Error, resource: any) => void): void
    //Texture2D
    Load: function (filepath, completeCallback) {

        return ret;

    },
    ParseJson: function (ishd) {
        if (this.rootJson != null) {
            return;
        }

        var strDir = Common.main.RES_CONFIG_DATA + "/config";

        var fileName = "config_ios";

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
        if (Common.isWinUWP) {
            fileName = "config_" + Source.WIN;
        }

        if (ishd == true)//AppVersion.appForPad
        {
            fileName += "_hd";
        }
        fileName += ".json";
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

// Config.main = new Config();


//单例对象 方法二
Config._main = null;
Config.main = function () {
    if (!Config._main) {
        cc.log("_main is null");
        Config._main = new Config();
        Config._main.Init();
    } else {
        cc.log("_main is not null");
    }
    return Config._main;
}


