var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ColorConfig = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量  
        callbackFinish: null,
    },
    properties: {
        jsonRoot: null,
    },

    SetLoadFinishCallBack: function (callback, info) {
        // Config.callbackFinish = callback;
        // Config.loadInfo = info;
    },


    // 255,100,200,255 to color return cc.Color 47,47,47,255

    RGBString2ColorA: function (strrgba) {
        var r, g, b, a;
        var strsplit = ",";
        var list = strrgba.split(strsplit);
        var index = 0;
        //cc.Debug.Log("RGBString2Color:list="+list.length);

        for (let value of list) {
            if (index == 0) {
                r = parseInt(value);
            }
            if (index == 1) {
                g = parseInt(value);
            }
            if (index == 2) {
                b = parseInt(value);
            }
            if (index == 3) {
                a = parseInt(value);
            }
            index++;
        }

        var color = new cc.Color(r, g, b, a);
        return color;
    },

    Load: function (obj) {
        var filepath = cc.Common.RES_CONFIG_DATA + "/Color/Color";//.json
        // filepath = cc.Common.RES_CONFIG_DATA + "/config/config_android";

        cc.Debug.Log("ColorConfig:filepath =" + filepath);
        //去除后缀
        // filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        //cc.JsonAsset
        cc.loader.loadRes(filepath, cc.JsonAsset, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("ColorConfig:err=" + err);
                // return;
            }
            cc.Debug.Log("ColorConfig:rootJson=" + rootJson);
            if (err == null) {
                this.ParseData(rootJson.json);
            }
            this.GetColorInternal(obj);
        }.bind(this));
    },


    ParseData: function (json) {
        if (json == null) {
            cc.Debug.Log("config:ParseData=null");
        }
        this.jsonRoot = json;

    },


    /*
    {
        key: "",
        def: cc.Color,
        success: function (color) {
        },
        fail: function () {
        }, 
    }
*/
    GetColor(obj) {
        if (this.jsonRoot != null) {
            return this.GetColorInternal(obj);
        } else {
            this.Load(obj);
        }
    },

    GetColorInternal(obj) {
        var cr = cc.Color.BLACK;
        var key = "key";
        if (obj != null) {
            if (obj.def == null) {
                obj.def = cc.Color.BLACK;
            }
            cr = obj.def;
            key = obj.key;
        }

        // key = "PlaceItemTitle";
        // key = "APP_TYPE";
        /*
js中的变量作为json的key 的语法：https://blog.csdn.net/xiaomanonyo/article/details/78642148
*/

        if (this.jsonRoot != null) {
            if (this.jsonRoot[key] != null) {
                var str = this.jsonRoot[key];
                cr = this.RGBString2ColorA(str);
            }
            else {
                cc.Debug.Log("ColorConfig ContainsKey no key =" + key);
            }
        }

        if (obj != null) {
            if (obj.success != null) {
                obj.success(cr);
            }
        }
        return cr;
    },


});

// Config.main = new Config();


//单例对象 方法二
ColorConfig._main = null;
ColorConfig.main = function () {
    if (!ColorConfig._main) {
        cc.Debug.Log("_main is null");
        ColorConfig._main = new ColorConfig();
        //ColorConfig._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ColorConfig._main;
}

cc.ColorConfig = module.export = ColorConfig;

