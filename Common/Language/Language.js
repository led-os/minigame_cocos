var Dictionary = require("Dictionary");
var Common = require("Common");
var Source = require("Source");
var LTLocalization = require("LTLocalization");

//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var Language = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量
        // _common:Language,

    },
    properties: {
        // ltLocalization: LTLocalization,
        ltLocalization: {
            default: null,
            type: LTLocalization,
        },
    },
    Init: function (file) {
        this.ltLocalization = new LTLocalization();
        cc.loader.loadRes(file, function (err, file) {
             //cc.log(file.text);
            this.ltLocalization.ReadData(file.text);
        }.bind(this));
    },

    SetLanguage: function (lan) {
        this.ltLocalization.SetLanguage(lan);
        Language._common.ltLocalization.SetLanguage(lan);
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
            str = this.ltLocalization.GetText(key);
        }
        else {
           str = Language._common.ltLocalization.GetText(key);
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
        cc.log("Language _main is null");

        Language._common = new Language();
        var fileName = Common.RES_CONFIG_DATA_COMMON + "/language/language.csv";
        Language._common.Init(fileName);

        Language._main = new Language();
        fileName = Common.RES_CONFIG_DATA + "/language/language.csv";
        Language._main.Init(fileName);
        Language._main.SetLanguage(cc.sys.LANGUAGE_CHINESE);


    } else {
        cc.log("Language _main is not null");
    }
    return Language._main;
}



Language._game = null;
Language.game = function () {
    if (!Language._game) {
        cc.log("Language _game is null");
        Language._game = new Language();
        // Language._game.Init();
    } else {
        cc.log("Language _game is not null");
    }
    return Language._game;
}



