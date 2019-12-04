

var LanguageManager = cc.Class({
    extends: cc.Object,
    statics: {


    },
    properties: {

        languagePlace: cc.LanguageConfig,
        languageGame: cc.LanguageConfig,

    },
    Init: function () {
        //this.ParseGuanka();
        this.languagePlace = new cc.LanguageConfig();
        this.languageGame = new cc.LanguageConfig();
    },


    LanguageKeyOfPlaceItem(info) {
        return "STR_PLACE_" + info.id;
    },
    LanguageOfPlaceItem(info) {
        var obj =
        {
            key: this.LanguageKeyOfPlaceItem(info),//cc.sys.LANGUAGE_CHINESE
            def: "",
            success: function (str) {
            },
            fail: function () {
            },
        };
        return this.languagePlace.GetString(obj);
    },



    GetStringPlace(obj) {
        this.UpdateLanguagePlace(obj.file);
        this.languagePlace.GetString(obj);
    },
    GetStringGame(obj) {
        this.UpdateLanguageGame(obj.file);
        this.languageGame.GetString(obj);
    },

    UpdateLanguagePlace(file) {
        //game cc.CloudRes.main().rootPath 
        if (cc.Common.isBlankString(file)) {
            this.languagePlace.filepath = cc.Common.GAME_RES_DIR + "/place/language/language.csv";
        } else {
            this.languagePlace.filepath = file;
        }
        var obj =
        {
            key: cc.Language.main().GetLanguage(),//cc.sys.LANGUAGE_CHINESE
            def: "",
            success: function (str) {
            },
            fail: function () {
            },
        };

        this.languagePlace.SetLanguage(obj);
    },

    UpdateLanguageGame(file) {
        //game cc.CloudRes.main().rootPath 
        if (cc.Common.isBlankString(file)) {
            var info = cc.LevelManager.main().GetPlaceItemInfo(cc.LevelManager.main().placeLevel);
            this.languageGame.filepath = cc.Common.GAME_RES_DIR + "/language/" + info.language + ".csv";
        } else {
            this.languageGame.filepath = file;
        }
        var obj =
        {
            key: cc.Language.main().GetLanguage(),//cc.sys.LANGUAGE_CHINESE
            def: "",
            success: function (str) {
            },
            fail: function () {
            },
        };

        this.languageGame.SetLanguage(obj);
    },

});

//单例对象 方法一
//GuankaViewController.main = new GuankaViewController(); 

//单例对象 方法二
LanguageManager._main = null;
LanguageManager.main = function () {
    // 
    if (!LanguageManager._main) {
        cc.Debug.Log("_main is null");
        LanguageManager._main = new LanguageManager();
        LanguageManager._main.Init();
    } else {
        //cc.Debug.Log("_main is not null");
    }

    return LanguageManager._main;
}

cc.LanguageManager = module.export = LanguageManager; 