var UIWordContentBase = require("UIWordContentBase");
var UIWordImageText = cc.Class({
    extends: UIWordContentBase,// cc.ItemInfo
    statics: {
        GUANKA_GROUP_ITEM_NUM: 5,
        STR_UNKNOWN_WORD: "__",
        TIME_ANIMATE_ERROR: 2.0,
        COUNT_ANIMATE_ERROR: 10,
    },


    properties: {

        imageBg: cc.Sprite,
        textTitle: cc.Label,
        imagePic: cc.Sprite,
        imagePicBoard: cc.Sprite,
        objText: null,
        listIndexAnswer: {
            default: [],
            type: cc.Object//int
        },
        // int[] listIndexAnswer;


        listAnswerInfo: {
            default: [],
            type: cc.Object//AnswerInfo
        },

    },

    onLoad: function () {
        // var info = cc.GameLevelParse.main().GetItemInfo();
        // if (info.gameType == cc.GameRes.GAME_TYPE_TEXT) {
        //     this.imagePic.node.active = false;
        // }
        // else {
        //     this.imagePic.node.active = true;
        // }

        //this.textTitle.color = ColorConfig.main.GetColor(GameRes.KEY_COLOR_GameText);
    },

    LayOut() {

        //imagePicBoard
        // {
        //     RectTransform rctran = imagePicBoard.GetComponent<RectTransform>();
        //     float oft = 16;
        //     rctran.offsetMin = new Vector2(oft, oft);
        //     rctran.offsetMax = new Vector2(-oft, -oft);
        // }
        // if (Common.appKeyName == GameRes.GAME_IDIOM) {
        //     LayOutScale ls = imagePic.GetComponent<LayOutScale>();
        //     if (ls != null) {
        //         ls.ratio = 0.5f;
        //         ls.LayOut();
        //     }
        // }
    },

    //


    //base
    UpdateGuankaLevel(level) {
    },
    OnTips() {
    },

    OnAddWord(word) {
    },
    OnReset() {
    },


    CheckAllFill() {

    },
    CheckAllAnswerFinish() {

    },
    UpdateWord() {
    },

    UpdateGuankaLevel(level) {
        this.UpdateItem();
    },
    UpdateImage: function (pic) {
        cc.Debug.Log("UpdateImage pic=" + pic);
        cc.TextureCache.main.Load(pic, function (err, tex) {
            if (err) {
                return;
            }
            this.imagePic.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            if (lyscale) {
                lyscale.LayOut();
            }
        }.bind(this));
    },
    UpdateItem() {
        var info = cc.GameLevelParse.main().GetItemInfo();
        this.textTitle.node.active = true;
        if (info.gameType == cc.GameRes.GAME_TYPE_TEXT) {

            //             if (Common.appKeyName == GameRes.GAME_POEM) {

            //                 PoemContentInfo infopoem0 = info.listPoemContent[0];
            //                 string strPoem = infopoem0.content;
            //                 //过虑标点符号
            //                 List < int > listIndexGuanka = GameLevelParse.main.IndexListNotPunctuation(strPoem);
            //                 //GUANKA_GROUP_ITEM_NUM
            //                 int[] fillWordNum = { 1, 1, 2, 2, 3 };
            //                 int idxfill = LevelManager.main.gameLevel % GUANKA_GROUP_ITEM_NUM;
            //                 //
            //                 listIndexAnswer = Util.main.RandomIndex(listIndexGuanka.Count, fillWordNum[idxfill]);
            //                 ListSorter.EbullitionSort(listIndexAnswer);

            //                 listAnswerInfo = new List<AnswerInfo>();
            //                 GameAnswer.main.strWordAnswer = "";
            //                 for (int i = 0; i < listIndexAnswer.Length; i++)
            // {
            //     int idx = listIndexGuanka[listIndexAnswer[i]];
            //     string word_answer = strPoem.Substring(idx, 1);
            //     GameAnswer.main.strWordAnswer += word_answer;

            //     AnswerInfo infoanswer = new AnswerInfo();
            //     infoanswer.word = word_answer;
            //     infoanswer.index = idx;
            //     infoanswer.isFinish = false;
            //     infoanswer.isFillWord = false;
            //     listAnswerInfo.Add(infoanswer);
            //     Debug.Log("listAnswerInfo add " + word_answer);
            // }
            //             }
        }

        else if (info.gameType == cc.GameRes.GAME_TYPE_IMAGE) {
            this.textTitle.node.active = false;
            this.UpdateImage(info.pic);
        }
        else if (info.gameType == cc.GameRes.GAME_TYPE_IMAGE_TEXT) {
            this.textTitle.node.active = true;
            this.UpdateImage(info.pic);
        }

        //         if (cc.Config.main().appKeyName == cc.GameRes.GAME_RIDDLE) {

        //     listAnswerInfo = new List<AnswerInfo>();
        //     GameAnswer.main.strWordAnswer = info.end;
        //     for (int i = 0; i < GameAnswer.main.strWordAnswer.Length; i++)
        //     {
        //         int idx = i;
        //         string word_answer = GameAnswer.main.strWordAnswer.Substring(idx, 1);
        //         AnswerInfo infoanswer = new AnswerInfo();
        //         infoanswer.word = word_answer;
        //         infoanswer.index = idx;
        //         infoanswer.isFinish = false;
        //         infoanswer.isFillWord = false;
        //         listAnswerInfo.Add(infoanswer);
        //         Debug.Log("listAnswerInfo add " + word_answer);
        //     }


        // }

    },


    GetFirstUnFillAnswer() {
        var idx = 0;
        // this.listAnswerInfo.forEach(function (info, index) {
        //     if (info != null) {
        //         if (info.isFillWord == false) {
        //             break;
        //         }
        //         idx++;
        //     }
        // }.bind(this));
        return idx;
    },

    GetFirstUnFinishAnswer() {
        var idx = 0;
        // this.listAnswerInfo.forEach(function (info, index) {
        //     if (info != null) {
        //         if (info.isFinish == false) {
        //             break;
        //         }
        //         idx++;
        //     }
        // }.bind(this));
        return idx;
    },

    CheckAllFill() {
        var isAllFill = true;
        this.listAnswerInfo.forEach(function (info, index) {
            if (info != null) {
                if (info.isFillWord == false) {
                    isAllFill = false;
                }
            }
        }.bind(this));
        return isAllFill;
    },
    CheckAllAnswerFinish() {
        var ret = true;
        // this.listAnswerInfo.forEach(function (info, index) {
        //     if (info != null) {
        //         if (info.isFinish == false) {
        //             ret = false;
        //             break;
        //         }
        //     }
        // }.bind(this));
        return ret;
    },

    UpdateGameWordString(str) {
        this.textTitle.string = str;
    },
    UpdateWord() {
        var info = cc.GameLevelParse.main().GetItemInfo();

        if (info.gameType == cc.GameRes.GAME_TYPE_TEXT) {
            this.textTitle.string = this.GetDisplayText(false, false, 0, "");
            // PoemContentInfo infopoem1 = info.listPoemContent[1];  
            // textLine1.text = infopoem1.content;
        }
        else {
            if ((!cc.Common.isBlankString(info.head)) && (!cc.Common.isBlankString(info.end))) {

                // textXieHouYu.gameObject.SetActive(true);
                // textXieHouYu.text = GetDisplayText(false, false, 0, "");
            }
        }

    },

    GetDisplayText(isAnswr, isSucces, indexAnswer, word) {
        var info = cc.GameLevelParse.main().GetItemInfo();
        if ((!cc.Common.isBlankString(info.head)) && (!cc.Common.isBlankString(info.end))) {
            if (cc.Config.main().appKeyName == cc.GameRes.GAME_RIDDLE) {
                return info.head + "\n" + "(" + info.type + ")";
            }

            return info.head;
        }

        var infopoem0 = info.listPoemContent[0];
        var strPoem = infopoem0.content;

        //过虑标点符号
        var listIndexGuanka = cc.GameLevelParse.main().IndexListNotPunctuation(strPoem);
        var listStr = GetSplitStringByAnswerIndex(listIndexAnswer, listIndexGuanka);
        var strShow = "";
        for (var i = 0; i < listStr.length; i++) {
            var tmp = listStr[i];
            if (i == (listStr.Count - 1)) {
                strShow += tmp;
            }
            else {
                if (isAnswr) {
                    var infoanswer = this.listAnswerInfo[i];

                    if ((infoanswer.isFinish)) {
                        strShow += (tmp + infoanswer.word);
                    }
                    else {
                        var infotmp = this.listAnswerInfo[indexAnswer];
                        if (indexAnswer == i) {
                            infotmp.isFillWord = true;
                            Debug.Log("GetDisplayText isFillWord  i=" + i);
                            var word_show = "";
                            if (isSucces) {
                                word_show = infotmp.word;
                            }
                            else {
                                word_show = word;
                            }

                            //<color=#00ffffff>TestTest</color>
                            var color = new Color32(255, 0, 0, 255);
                            word_show = "<color=#" + ColorUtility.ToHtmlStringRGBA(color) + ">" + word_show + "</color>";
                            strShow += (tmp + word_show);
                            infotmp.wordFill = word_show;
                        }
                        else {
                            if (infoanswer.isFillWord) {
                                strShow += (tmp + infoanswer.wordFill);
                            }
                            else {
                                strShow += (tmp + STR_UNKNOWN_WORD);
                            }


                        }

                    }

                }

                else {
                    strShow += (tmp + STR_UNKNOWN_WORD);
                }
            }

        }
        return strShow;
    },

    //List < string > 

    GetSplitStringByAnswerIndex(listIndex, listIndexGuanka) {
        var info = cc.GameLevelParse.main().GetItemInfo();
        var infopoem0 = info.listPoemContent[0];
        var strPoem = infopoem0.content;


        var listStr = new Array();
        for (var i = 0; i < listIndex.length; i++) {
            var idx = listIndexGuanka[listIndex[i]];
            var idx_pre = 0;
            if (i > 0) {
                idx_pre = listIndexGuanka[listIndex[i - 1]] + 1;
            }
            var len = idx - idx_pre;
            var str = strPoem.Substring(idx_pre, len);
            listStr.Add(str);
            //最后一个
            if (i == listIndex.Length - 1) {
                len = (strPoem.Length - 1) - idx;
                if (len > 0) {
                    str = strPoem.Substring(idx + 1, len);
                    listStr.push(str);
                }
            }

        }
        return listStr;
    },

    ClearWord() {
    },
    SetWordColor(color) {
        this.textTitle.node.color = color;
    },

    SetFontSize(size) {
        // textTitle.fontSize = size;
    },

    OnTips() {
        var index = this.GetFirstUnFinishAnswer();
        var info = this.listAnswerInfo[index];
        this.UpdateGameWordString(this.GetDisplayText(true, true, index, ""));
        info.isFinish = true;
    },

    OnAddWord(word) {
        var isInAnswerList = false;
        var index = 0;

        // this.listAnswerInfo.forEach(function (info, idx) {
        //     if (info != null) {
        //         if (info.word == word) {
        //             //回答正确
        //             cc.Debug.Log("GetDisplayText ok index =" + index);
        //             this.UpdateGameWordString(this.GetDisplayText(true, true, index, ""));
        //             info.isFinish = true;
        //             isInAnswerList = true;
        //             break;

        //         }
        //         index++;
        //     }
        // }.bind(this));


        if (!isInAnswerList) {
            //回答错误
            index = this.GetFirstUnFillAnswer();
            cc.Debug.Log("GetDisplayText error index=" + index);
            this.UpdateGameWordString(this.GetDisplayText(true, false, index, word));
        }
    },

    OnClickItem() {

    },


});

