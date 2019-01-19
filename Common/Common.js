var Dictionary = require("Dictionary");
//var Config = require("Config");

//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var Common = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        GAME_DATA_DIR: "GameData",//streamingAssetsPath下的游戏配置等数据
        GAME_DATA_DIR_COMMON: "GameData/common",
        GAME_RES_DIR: "GameRes",//streamingAssetsPath 下的游戏图片等资源

        RES_CONFIG_DATA: "ConfigData",
        RES_CONFIG_DATA_COMMON: "ConfigDataCommon",
        THUMB_SUFFIX: "_thumb",
        TOUCH_MOVE_STEP_MIN: 3.0,//6.0f

        isAndroid: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_ANDROID) ? true : false;
            },
            // set: function (value) {
            //     this._width = value;
            // },
        },

        isiOS: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_IOS) ? true : false;
            },
        },


        isWin: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_WINDOWS) ? true : false;
            },

        },

//cocos2d-js中Math对象的常用方法总结
//https://blog.csdn.net/lianghui0811/article/details/76525065?utm_source=blogxgwz4
        GetBestFitScale: function (w_content, h_content, w_rect, h_rect) {
            if ((w_rect == 0) || (h_rect == 0))
            {
                return 1;
            }
            var scalex = w_rect / w_content;
            var scaley = h_rect / h_content;
            var scale = Math.min(scalex, scaley);
             return scale;
        },

        GetMaxFitScale: function (w_content, h_content, w_rect, h_rect) {
            if ((w_rect == 0) || (h_rect == 0))
            {
                return 1;
            }
            var scalex = w_rect / w_content;
            var scaley = h_rect / h_content;
            var scale = Math.max(scalex, scaley); 
            return scale;
        },


        _appSceneBase: null,
        appSceneBase: {
            get: function () {
                return this._appSceneBase;
            },
            set: function (value) {
                this._appSceneBase = value;
            },
        },


    },

    properties: {


    },

    Init: function () {

    },

    JsonDataContainsKey: function (json, key) {
        return true;
        // return (json.key == null ? false : true);
    },


});

//Common.main2 = new Common();
Common._main = null;
Common.main = function () {
    if (!Common._main) {
        cc.log("_main is null");
        Common._main = new Common();
    } else {
        cc.log("_main is not null");
    }
    return Common._main;
}

