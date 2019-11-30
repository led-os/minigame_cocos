
var GameAnswer = cc.Class({
    extends: cc.Object,
    properties: {
        strWordAnswer: "",
        languageWord: null,
    },

    //判断时候英文 bool
    IsEnglshString(str) {
        var ret = false;
        // Regex regEnglish = new Regex("[a-zA-Z]");
        // if (regEnglish.IsMatch(str)) {
        //     ret = true;
        // } 
        //var reg = RegExp([a-zA-Z]);
        var reg = new RegExp("^[a-zA-Z]+$");
        if (str.match(reg)) {
            ret = true;
        }
        cc.Debug.Log("IsEnglshString str=" + str + " ret=" + ret);
        return ret;
    },

    UpdateLanguageWord() {
        // ItemInfo info = LevelManager.main.GetPlaceItemInfo(LevelManager.main.placeLevel);
        // string strlan = Common.GAME_RES_DIR + "/language/" + info.language + ".csv";
        // languageWord = new Language();
        // languageWord.Init(strlan);
        // languageWord.SetLanguage(SystemLanguage.Chinese);

    },

    GetGuankaAnswer(info, isRandom = true) {
        var str = "";
        //真正的答案
        if ((info.gameType == cc.GameRes.GAME_TYPE_IMAGE) || (info.gameType == cc.GameRes.GAME_TYPE_IMAGE_TEXT)) {
            //
            str = info.id;
            if (cc.Config.main().appKeyName == cc.GameRes.GAME_ANIMAL) {
                str = this.languageWord.GetString(info.id);
            }
            //歇后语
            if ((!cc.Common.isBlankString(info.head)) && (!cc.Common.isBlankString(info.end))) {
                return info.end;
            }
        }
        if (info.gameType == cc.GameRes.GAME_TYPE_TEXT) {
            str = cc.GameAnswer.main.strWordAnswer;
        }
        if (info.gameType == cc.GameRes.GAME_TYPE_CONNECT) {
            for (var i = 0; i < info.listWordAnswer.length; i++) {
                var idx = info.listWordAnswer[i];
                var word = info.listWord[idx];
                var rdm = cc.Common.RandomRange(0, str.Length);
                //是否打乱
                if (!isRandom) {
                    rdm = str.Length;
                    if (rdm < 0) {
                        rdm = 0;
                    }
                }
                //str = str.Insert(rdm, word);
                str = str.splice(rdm, 0, word);
                cc.Debug.Log("GetGuankaAnswer rdm=" + rdm + " word=" + word + " str=" + str);
            }
        }
        return str;
    },

    //从str2中过滤在str1重复的字
    RemoveSameWord(str1, str2) {
        var ret = "";
        var len = str2.Length;
        for (var i = 0; i < str2.Length; i++) {
            var word = str2.substr(i, 1);
            var idx = str1.indexOf(word);
            if (idx < 0) {
                ret += word;
            }
        }
        return ret;
    },
    GetOtherGuankaIndex() {
        var idx = 0;
        var gamelevel = cc.LevelManager.main().gameLevel;
        var total = cc.LevelManager.main().maxGuankaNum;
        if (total > 1) {

            var size = total - 1;
            var idxTmp = new Array()
            //  var idxTmp = new int[size];// int[]
            for (var i = 0; i < total; i++) {
                i
                if (i != gamelevel) {
                    // idxTmp[idx++] = i;
                    idxTmp.push(i);
                }
            }

            var rdm = cc.Common.RandomRange(0, size);
            if (rdm >= size) {
                rdm = size - 1;
            }
            idx = idxTmp[rdm];
        }
        return idx;
    },



    GetWordBoardString(info, row, col) {
        var ret = "";
        var answer = this.GetInsertToBoardAnswer(info);
        var len = answer.length;
        var total = row * col;
        cc.Debug.Log("UIWordBoard GetWordBoardString:" + answer + " answer.len=" + len);
        var strAllWord = this.GetAllWordWithoutAnswer(answer);
        var strRandom = this.GetRandomWordFromAllWord(total - len, strAllWord);
        ret = answer + strRandom;
        ret = cc.Common.RandomString(ret);
        cc.Debug.Log("UIWordBoard GetWordBoardString:" + " total=" + total + " ret=" + ret + " ret.count=" + ret.Length);
        return ret;
    },

    //从常用3500的汉字中去除答案字符 避免重复
    GetAllWordWithoutAnswer(answer) {
        var ret = "";
        var strAllWord = cc.GameLevelParse.main().strWord3500;
        if (this.IsEnglshString(answer)) {
            strAllWord = cc.GameLevelParse.main().strWordEnglish;
        }

        for (var i = 0; i < strAllWord.length; i++) {
            var word = strAllWord.substr(i, 1);
            var idx = answer.indexOf(word);
            if (idx < 0) {
                ret += word;
            }

        }
        return ret;
    },


    //从allword中随机抽取count个word
    GetRandomWordFromAllWord(count, strAll) {
        var strret = "";
        var indexSel = cc.Common.RandomIndex(strAll.length, count);
        for (var i = 0; i < indexSel.length; i++) {
            var idx = indexSel[i];
            var str = strAll.substr(idx, 1);
            strret += str;
        }
        return strret;
    },

    //插入Board的答案
    GetInsertToBoardAnswer(info) {
        //真正的答案
        var str = this.GetGuankaAnswer(info);
        Debug.Log("UIWordBoard GetGuankaAnswer:" + str);
        switch (info.gameType) {
            case cc.GameRes.GAME_TYPE_TEXT:
                {
                    str = this.strWordAnswer;
                }
                break;
            case cc.GameRes.GAME_TYPE_CONNECT:
                {
                    //str = GameAnswer.main.GetGuankaAnswer(info);
                }
                break;
            case cc.GameRes.GAME_TYPE_IMAGE:
                {
                    //随机抽取其他关卡的答案
                    var total = cc.LevelManager.main().maxGuankaNum;
                    if (total > 1) {
                        var idx = this.GetOtherGuankaIndex();
                        var infoOther = cc.GameLevelParse.main().GetLevelItemInfo(idx);
                        if (infoOther != null) {
                            var strOther = this.GetGuankaAnswer(infoOther);
                            var strtmp = this.RemoveSameWord(str, strOther);
                            str += strtmp;
                            cc.Debug.Log("UIWordBoard other strOther=:" + strOther + " RemoveSameWord:" + strtmp);
                        }

                    }
                }
                break;

        }

        return str;
    },
});

GameAnswer._main = null;
GameAnswer.main = function () {
    // 
    if (!GameAnswer._main) {
        GameAnswer._main = new GameAnswer();
        GameAnswer._main.UpdateLanguageWord();
    }
    return GameAnswer._main;
}

cc.GameAnswer = module.export = GameAnswer;


