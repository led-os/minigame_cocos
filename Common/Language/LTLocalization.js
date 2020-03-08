//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var CSVParser = require("CSVParser");
var Dictionary = require("Dictionary");
var LTLocalization = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量 
        ENGLISH: "EN",
        CHINESE: "CN",
        JAPANESE: "JP",
        FRENCH: "FR",
        GERMAN: "GE",
        ITALY: "IT",
        KOREA: "KR",
        RUSSIA: "RU",
        SPANISH: "SP",
    },

    properties: {
        dicData: {
            default: null,
            type: Dictionary
        },
        KEY_CODE: "KEY",
        indexLanguage: 0,
        csvParser: {
            default: null,
            type: CSVParser
        },
        // private SystemLanguage language = SystemLanguage.Chinese;
        language: cc.sys.LANGUAGE_CHINESE,
        //  private Dictionary<string, string> textData = new Dictionary<string, string>();
    },

    GetLanguageKeyName: function (lan) {
        var ret = LTLocalization.CHINESE;
        // if (lan == cc.sys.LANGUAGE_ENGLISH) {
        //     ret = LTLocalization.ENGLISH;
        // }
        // if (lan == cc.sys.LANGUAGE_CHINESE) {
        //     ret = LTLocalization.CHINESE;
        // }
        switch (lan) {
            case cc.sys.LANGUAGE_CHINESE:
                {
                    ret = LTLocalization.CHINESE;
                }
                break;
            case cc.sys.LANGUAGE_ENGLISH:
                {
                    ret = LTLocalization.ENGLISH;
                }
                break;
        }

        return ret;
    },

    GetLanguageIndexByName: function (str) {
        var listTable = this.csvParser.listTable;
        var list = listTable[0];
        for (var i = 1; i < list.length; i++) {
            //cc.Debug.Log("GetLanguageIndexByName indexLanguage i=" + i + " list[i]=" + list[i] + " str=" + str);
            if (list[i] == str) {
                // cc.Debug.Log("indexLanguage i=" + i + " list[i]=" + list[i] + " str=" + str);
                return i;
            }
        }
        return 1;
    },
    ReadData: function (data) {
        //  cc.Debug.Log("LTLocalization=" + data); 
        this.dicData = new Dictionary();
        this.csvParser = new CSVParser();
        this.csvParser.ReadData(data);
        this.SetLanguage(this.language);

    },

    SetLanguage: function (lan) {
        this.language = lan;
        if (this.dicData == null) {
            return;
        }
        this.dicData.Clear();
        var key_lan = this.GetLanguageKeyName(lan);
        this.indexLanguage = this.GetLanguageIndexByName(key_lan);

        //var row_count = this.csvParser.listTable.length;
        var row_count = this.csvParser.GetRowCount();

        cc.Debug.Log("indexLanguage=" + this.indexLanguage + " key_lan=" + key_lan);

        for (var row = 0; row < row_count; row++) {
            var key = this.csvParser.GetText(row, 0);
            var value = this.csvParser.GetText(row, this.indexLanguage);
            //cc.Debug.Log("dicData.Add key=" + key + " value=" + value);
            this.dicData.Add(key, value);
        }
    },
    GetLanguage: function () {
        return this.language;
    },

    GetText: function (key) {
        if (this.IsContainsKey(key)) {
            return this.dicData.Get(key);
        }
        return "[NoDefine]" + key;
    },

    IsContainsKey: function (key) {
        if (this.dicData == null) {
            return false;
        }
        var ret = this.dicData.Contains(key);
        //cc.Debug.Log("IsContainsKey ret=" + ret);
        return ret;
    },


});


