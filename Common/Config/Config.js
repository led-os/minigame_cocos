var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var Config = cc.Class({
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
        appKeyName:
        {
            get: function () {
                return this.rootJsonCommon.APP_NAME_KEYWORD;
            },
        },
        appType:
        {
            get: function () {
                return this.rootJsonCommon.APP_TYPE;
            },
        },
        channel:
        {
            get: function () {
                var ret = cc.Source.XIAOMI;
                if (cc.Common.main().isiOS) {
                    ret = cc.Source.APPSTORE;
                }
                if (cc.Common.main().isAndroid) {
                    //ret = GetStringJson(rootJsonChannel, "channel_android", Source.XIAOMI);
                }
                // if (Common.isWeb) {
                //     ret = cc.Source.FACEBOOK;
                // }
                return ret;
            },
        }
    },

    SetLoadFinishCallBack: function (callback, info) {
        Config.callbackFinish = callback;
        Config.loadInfo = info;
    },

    InitValue: function () {
        {
            var info = new cc.LoadItemInfo();
            info.id = Config.COMMON;
            info.isLoad = false;
            Config.listLoad.push(info);
        }
        {
            var info = new cc.LoadItemInfo();
            info.id = Config.MAIN;
            info.isLoad = false;
            Config.listLoad.push(info);
        }
    },

    Load: function () {

        if (this.dicItem != null) {
            return;
        }
        this.dicItem = new Dictionary();

        var strDir = cc.Common.RES_CONFIG_DATA + "/config";
        var loadInfoId = "";
        var fileName = "";
        if (this == Config._main) {
            loadInfoId = Config.MAIN;
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
            // if (ishd == true)//AppVersion.appForPad
            // {
            //     fileName += "_hd";
            // }
        }

        if (this == Config._common) {
            loadInfoId = Config.COMMON;
            fileName = "config_common";
        }

        //fileName += ".json";
        var filepath = strDir + "/" + fileName;
        cc.log("config:filepath=" + filepath + " loadInfoId=" + loadInfoId);

        //cc.JsonAsset
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {

            if (err) {
                cc.log("config:err=" + err);
                // return;
            }

            // cc.log("config:rootJson.text=" + rootJson.text);
            if (err == null) {
                this.ParseData(rootJson.json);
            }

            cc.log("config:loadInfoId=" + loadInfoId);
            var info = this.GetLoadInfoById(loadInfoId);
            if (info != null) {
                info.isLoad = true;
                // cc.log("id= info.isLoad=" + info.isLoad);
            }
            this.CheckAllLoad();
        }.bind(this));

        /*
                cc.loader.load(cc.url.raw('resources/config_android.json'), function (err, res) {
                    if (err) {
                        cc.log("config:" + err);
                    } else {
                        var list = res;
        
                        cc.log("config:load.text=" + res.text);
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

    GetStringJson: function (json, key, def) {
        cc.log("GetStringJson key=" + key);
        if (json == null) {
            cc.log("GetStringJson json=null");
        }
        var str = def;
        var ishave = cc.Common.main().JsonDataContainsKey(json, key);
        if (ishave == true) {
            // str = json.APP_TYPE;
            cc.log("GetStringJson  JsonDataContainsKey=" + str);
        }
        return str;
    },

    GetStringCommon: function (key, def) {
        cc.log("GetStringJson GetStringCommon key=" + key);
        return this.GetStringJson(this.rootJsonCommon, key, def);
    },
    GetString: function (key, def) {
        return this.GetStringJson(this.rootJson, key, def);
    },

    IsHaveKey(key) {
        return cc.Common.main().JsonDataContainsKey(this.rootJson, key);
    },

    GetLoadInfoById: function (id) {
        for (let info of Config.listLoad) {
            if (info.id == id) {
                return info;
            }
        }
        return null;
    },
    CheckAllLoad: function () {
        var isLoadAll = true;
        for (let info of Config.listLoad) {
            if (info.isLoad == false) {
                isLoadAll = false;
            }
        }
        cc.log("config:isLoadAll=" + isLoadAll);
        if (isLoadAll == true) {
            // cc.log("isLoadAll= 1 " + isLoadAll);
            if (Config.callbackFinish != null) {
                Config.loadInfo.isLoad = true;
                // cc.log("isLoadAll= 2 " + isLoadAll);
                Config.callbackFinish(this);
            } else {
                cc.log("Config isLoadAll= callbackFinish is null ");
            }
        }
    },
    ParseData: function (json) {
        if (json == null) {
            cc.log("config:ParseData=null");
        }

        if (this == Config._main) {
            this.rootJson = json;
            var appid = json.APPID.huawei;
            cc.log("config:appid=" + appid);
        }

        if (this == Config._common) {
            this.rootJsonCommon = json;
            Config._main.rootJsonCommon = json;
            var app_name_keyword = json.APP_NAME_KEYWORD;
            var app_type = json.APP_TYPE;
            cc.log("config:app_name_keyword=" + app_name_keyword + " app_type=" + app_type);
        }


    },



});

// Config.main = new Config();


//单例对象 方法二
Config._main = null;
Config._common = null;
Config.main = function () {
    if (!Config._main) {
        cc.log("_main is null");
        Config._main = new Config();
        Config._main.InitValue();

        Config._common = new Config();


        Config._main.Load();
        Config._common.Load();

    } else {
        cc.log("_main is not null");
    }
    return Config._main;
}

cc.Config = module.export = Config;

