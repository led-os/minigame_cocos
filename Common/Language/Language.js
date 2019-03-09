var Dictionary = require("Dictionary");
// var Common = require("Common");
var Source = require("Source");
var LTLocalization = require("LTLocalization");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var Language = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量
        LANGUAGE_COMMON: "language_common",
        LANGUAGE_MAIN: "language_main",
        LANGUAGE_GAME: "language_game",
        callbackFinish: null,
        listLoad: [],
        loadInfo: cc.LoadItemInfo,

    },
    properties: {
        // ltLocalization: LTLocalization,
        ltLocalization: {
            default: null,
            type: LTLocalization,
        },

        defaultLanId:
        {
            get: function () {
                var ret = cc.sys.LANGUAGE_CHINESE;
                if (cc.sys.platform == cc.sys.MOBILE_BROWSER) {
                    ret = cc.sys.LANGUAGE_ENGLISH;
                }
                return ret;
            },
        },
    },
    InitValue: function () {
        {
            var info = new cc.LoadItemInfo();
            info.id = Language.LANGUAGE_COMMON;
            info.isLoad = false;
            Language.listLoad.push(info);
        }
        {
            var info = new cc.LoadItemInfo();
            info.id = Language.LANGUAGE_MAIN;
            info.isLoad = false;
            Language.listLoad.push(info);
        }

        {
            var info = new cc.LoadItemInfo();
            info.id = Language.LANGUAGE_GAME;
            info.isLoad = false;
            Language.listLoad.push(info);
        }
    },

    // * completeCallback: (Error, Language) => void)
    SetLoadFinishCallBack: function (callback, info) {
        Language.callbackFinish = callback;
        Language.loadInfo = info;
    },
    Init: function (file) {
        this.ltLocalization = new LTLocalization();
        //cc.Debug.Log("isLoadAll=loadRes start");
        cc.loader.loadRes(file, function (err, file) {
            //cc.Debug.Log(file.text);
            this.ltLocalization.ReadData(file.text);
            // cc.Debug.Log("isLoadAll=loadRes finish callback");
            var id = "";
            if (this == Language._common) {
                id = Language.LANGUAGE_COMMON;
            }
            if (this == Language._main) {
                id = Language.LANGUAGE_MAIN;
            }
            if (this == Language._game) {
                id = Language.LANGUAGE_GAME;
            }

            // cc.Debug.Log("id=" + id);
            var info = this.GetLoadInfoById(id);
            if (info != null) {
                info.isLoad = true;
                // cc.Debug.Log("id= info.isLoad=" + info.isLoad);
            }
            this.CheckAllLoad();
        }.bind(this));

        //cc.Debug.Log("isLoadAll=loadRes end");
    },
    CheckAllLoad: function () {
        var isLoadAll = true;
        for (let info of Language.listLoad) {
            if (info.isLoad == false) {
                isLoadAll = false;
            }
        }
        // cc.Debug.Log("isLoadAll=" + isLoadAll);
        if (isLoadAll == true) {
            // cc.Debug.Log("isLoadAll= 1 " + isLoadAll);
            if (Language.callbackFinish != null) {
                Language.loadInfo.isLoad = true;
                // cc.Debug.Log("isLoadAll= 2 " + isLoadAll);
                Language.callbackFinish(this);
            } else {
                cc.Debug.Log("isLoadAll= callbackFinish is null ");
            }
        }
    },

    GetLoadInfoById: function (id) {
        for (let info of Language.listLoad) {
            if (info.id == id) {
                return info;
            }
        }
        return null;
    },

    SetLanguage: function (lan) {
        this.ltLocalization.SetLanguage(lan);
        if (Language._common != null) {
            Language._common.ltLocalization.SetLanguage(lan);
        }
        if (Language._game != null) {
            Language._game.ltLocalization.SetLanguage(lan);
        }
    },

    GetLanguage: function () {
        return this.ltLocalization.GetLanguage();

    },
    GetString: function (key) {

        var str = "0";
        if (this.IsContainsKey(key)) {
            // cc.Debug.Log("GetString: IsContainsKey key=" + key);
            str = this.ltLocalization.GetText(key);
        }
        else {
            // cc.Debug.Log("GetString: IsContainsKey not key=" + key);
            if (Language._common != null) {
                str = Language._common.ltLocalization.GetText(key);
            }
        }
        return str;

    },


    //
    GetReplaceString: function (key, replace, strnew) {
        // string str = GetString(key);
        // str = str.Replace(replace, strnew);
        // return str;
    },

    IsContainsKey: function (key) {
        return this.ltLocalization.IsContainsKey(key);
    },

});




//单例对象 方法二
Language._common = null;
Language._main = null;
Language.main = function () {
    if (!Language._main) {
        cc.Debug.Log("Language _main is null");
        var fileName = "";

        Language._main = new Language();
        Language._main.InitValue();


        fileName = cc.Common.RES_CONFIG_DATA + "/language/language.csv";
        Language._main.Init(fileName);
        //Language._main.SetLanguage(cc.sys.LANGUAGE_CHINESE);

        fileName = cc.Common.RES_CONFIG_DATA_COMMON + "/language/language.csv";
        Language._common = new Language();
        Language._common.Init(fileName);

        //game
        fileName = cc.Common.GAME_RES_DIR + "/language/language.csv";
        Language._game = new Language();
        Language._game.Init(fileName);
        //Language._game.SetLanguage(cc.sys.LANGUAGE_CHINESE);

    } else {
        //cc.Debug.Log("Language _main is not null");
    }
    return Language._main;
}



Language._game = null;
Language.game = function () {
    return Language._game;
}

cc.Language = module.export = Language;

