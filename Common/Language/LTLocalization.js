//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
cc.Class({
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
        dataContent: null,// byte[]
        KEY_CODE: "KEY",
        FILE_PATH: "Language/test_utf8",// test_utf8 LTLocalization/localization

        // private SystemLanguage language = SystemLanguage.Chinese;
        language: cc.sys.LANGUAGE_CHINESE,
        //  private Dictionary<string, string> textData = new Dictionary<string, string>();
    },
    ReadData: function (data) {
        this.dataContent = data;

        //         textData.Clear();
        //         //string fileName = Application.dataPath + "/Resources/LTLocalization/localization.csv";
        //         //FILE_PATH 
        //         string csvStr = Encoding.UTF8.GetString(dataContent);
        //         //Debug.Log(csvStr);
        //         LTCSVLoader loader = new LTCSVLoader();
        //         // loader.ReadFile(fileName);
        //         loader.ReadMultiLine(csvStr);
        //         int languageIndex = loader.GetFirstIndexAtRow(GetLanguageAB(language), 0);
        //         if (- 1 == languageIndex) {
        //             Debug.LogError("未读取到" + language + "任何数据，请检查配置表");
        //             return;
        //         }
        //         int tempRow = loader.GetRow();
        //         for (int i = 0; i < tempRow; ++i)
        // {
        //     textData.Add(loader.GetValueAt(0, i), loader.GetValueAt(languageIndex, i));
        // }
    },
    SetLanguage: function (lan) {
        this.language = lan;
    },
    GetLanguage: function () {
        return this.language;
    },

    GetText: function (key) {

        // if (null == mInstance)
        // {
        //     Debug.Log("LTLocalization Init");
        //     Init();
        // }
        //Debug.Log("LTLocalization ContainsKey");
        // if (this.textData.ContainsKey(key)) {
        //     //Debug.Log("LTLocalization ContainsKey yes");
        //     return this.textData[key];
        // }

        // //Debug.Log("LTLocalization ContainsKey NO");
        // return "[NoDefine]" + key;
    },

    IsContainsKey: function (key) {
        // return this.textData.ContainsKey(key);
    },


});


