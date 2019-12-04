
var LTLocalization = require("LTLocalization");
var LanguageConfig = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量   
    },
    properties: {
        ltLocalization: {
            default: null,
            type: LTLocalization,
        },
        filepath: "",
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

    Load: function (obj, isSetLan) {
        if (cc.Common.isBlankString(this.filepath)) {
            this.filepath = cc.Common.GAME_RES_DIR + "/place/language/language.csv";
        }

        cc.Debug.Log("LanguageConfig:filepath =" + this.filepath);
        //去除后缀
        // filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        cc.loader.loadRes(this.filepath, function (err, file) {
            if (err) {
                cc.Debug.Log("LanguageConfig Load Init2=" + err.message || err);
            }

            if (err == null) {
                this.ParseData(file.text);
            }
            if (isSetLan) {
                this.SetLanguageInternal(obj);
            } else {
                this.GetStringInternal(obj);
            }
        }.bind(this));

    },


    ParseData: function (data) {
        // cc.Debug.Log("LanguageConfig ParseData =" + data);
        this.ltLocalization = new LTLocalization();
        this.ltLocalization.ReadData(data);
    },

    /*
    {
        key: "",
        def: "",
        success: function (str) {
        },
        fail: function () {
        }, 
    }
*/
    GetString(obj) {
        if (this.ltLocalization != null) {
            return this.GetStringInternal(obj);
        } else {
            this.Load(obj, false);
        }
    },
    GetStringInternal(obj) {
        var key = "key";
        if (obj != null) {
            if (obj.def == null) {
                obj.def = key;
            }
            if (obj.key != null) {
                key = obj.key;
            }
        }
        var str = obj.def;
        str = this.ltLocalization.GetText(key);
        //cc.Debug.Log("LanguageConfig GetString key=" + key + " str=" + str);
        if (obj != null) {
            if (obj.success != null) {
                obj.success(str);
            }
        }
        return str;
    },

    /*
   {
       key: "",//cc.sys.LANGUAGE_CHINESE
       def: "",
       success: function (str) {
       },
       fail: function () {
       }, 
   }
*/
    SetLanguage: function (obj) {
        if (this.ltLocalization != null) {
            return this.SetLanguageInternal(obj);
        } else {
            this.Load(obj, true);
        }
    },
    SetLanguageInternal: function (obj) {
        var key = "key";
        if (obj != null) {
            if (obj.key != null) {
                key = obj.key;
            }
        }
        this.ltLocalization.SetLanguage(key);
    },

    GetLanguageInternal: function () {
        if (this.ltLocalization != null) {
            return this.ltLocalization.GetLanguage();
        }
        return cc.sys.LANGUAGE_CHINESE;
    },

    //
    GetReplaceString: function (key, replace, strnew) {
        // string str = GetString(key);
        // str = str.Replace(replace, strnew);
        // return str;
    },

    IsContainsKey: function (key) {
        if (this.ltLocalization != null) {
            return this.ltLocalization.IsContainsKey(key);
        }
        return false;
    },


});

// Config.main = new Config();


//单例对象 方法二
LanguageConfig._main = null;
LanguageConfig.main = function () {
    if (!LanguageConfig._main) {
        LanguageConfig._main = new LanguageConfig();

    } else {
    }
    return LanguageConfig._main;
}

cc.LanguageConfig = module.export = LanguageConfig;

