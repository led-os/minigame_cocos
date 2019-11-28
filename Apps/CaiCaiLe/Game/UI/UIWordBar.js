var UIView = require("UIView");
var UIWordItem = require("UIWordItem");

var UIWordBar = cc.Class({
    extends: UIView,// cc.ItemInfo, 
    properties: {
        uiWordItemPrefab: {
            default: null,
            type: cc.Prefab
        },
        listItem: {
            default: [],
            type: cc.Object//UIWordItem
        },
        wordNumMax: 0,
        wordNumCur: 0,
        isAllAnswer: false,
        colorNormal: cc.color.white,
        colorFail: cc.color.red,
        colorTips: cc.color.white,//new Color(107 / 255.0f, 1f, 1.0f, 1.0f);
    },
    onLoad: function () {
        this.UpadteItem(null);
    },

    LayOut() {

    },
    UpadteItem(info) {
        this.listItem.forEach(function (value, index) {
            if (value != null) {
                value.node.destroy();
                //value= null;
            }
        }.bind(this));
        this.listItem.length = 0;
        var len = 4;
        for (var i = 0; i < len; i++) {
            var word = i.toString();
            //     //Debug.Log(word);
            //     UIWordItem item = GameObject.Instantiate(wordItemPrefab);

            var node = cc.instantiate(this.uiWordItemPrefab);
            var item = node.getComponent(UIWordItem);

            node.setParent(this.node);

            item.index = i;
            //     item.iDelegate = this;
            //     item.transform.SetParent(this.transform);
            //     item.transform.localScale = new Vector3(1.0f, 1.0f, 1.0f);
            item.UpdateTitle(word);
            //     item.imageBg.sprite = spriteBg;
            //     item.SetWordColor(ColorConfig.main.GetColor(GameRes.KEY_COLOR_BoardTitle));
            //     //item.SetFontSize(80);

            this.listItem.push(item);

            cc.Debug.Log("UIWordBoard InitItem i=" + i);

        }

        this.LayOut();
    },
    AddWord(word) {
        this.listItem.forEach(function (item, index) {
            if (item != null) {
                if (cc.Common.isBlankString(item.wordDisplay)) {
                    item.UpdateTitle(word);
                    this.wordNumCur++;
                    break;
                }
            }
        }.bind(this));

        if (this.CheckAllFill()) {
            this.CheckAnswer();
        }
    },

    CheckAllFill() {
        var ret = true;
        this.listItem.forEach(function (item, index) {
            if (item != null) {
                if (cc.Common.isBlankString(item.wordDisplay)) {
                    ret = false;
                }
            }
        }.bind(this));

        return ret;
    },

    //判断答案是否正确
    CheckAnswer() {
        this.isAllAnswer = true;
        this.listItem.forEach(function (item, index) {
            if (item != null) {
                if (!item.IsAnswer()) {
                    this.isAllAnswer = false;
                    break;
                }
            }
        }.bind(this));


        if (this.isAllAnswer) {
            //全部猜对 game win
            this.OnGameWin();

        }
        else {
            //游戏失败
            this.OnGameFail();
        }
    },

    OnGameFail() {
        this.listItem.forEach(function (item, index) {
            if (item != null) {
                if (!item.isWordTips) {
                    item.SetWordColor(colorFail);
                    item.StartAnimateError();
                }
            }
        }.bind(this));
        if (this.callbackGameFinish != null) {
            this.callbackGameFinish(this, true);
        }

    },
    OnGameWin() {
        if (this.callbackGameFinish != null) {
            this.callbackGameFinish(this, false);
        }

    },

    WordItemDidClick(item) {

        if (!this.isAllAnswer) {
            if (!cc.Common.isBlankString(item.wordDisplay)) {
                cc.Debug.Log("WordItemDidClick 3");
                //字符退回 
                if (iDelegate != null) {
                    iDelegate.UIWordBarDidBackWord(this, item.wordDisplay);
                }
                item.ClearWord();
                //item.StopAnimateError();
                this.wordNumCur--;
                if (this.wordNumCur < 0) {
                    this.wordNumCur = 0;
                }
                //恢复颜色 
                this.listItem.forEach(function (item, index) {
                    if (item != null) {
                        item.SetWordColor(this.colorNormal);
                        item.StopAnimateError();
                    }
                }.bind(this));
            }
        }
    },

    //没有答但不是空的   List<UIWordItem> 
    GetNotAnswerList() {
        var listRet = new Array();
        this.listItem.forEach(function (item, index) {
            if (item != null) {
                if (!item.IsAnswer() && !cc.Common.isBlankString(item.wordDisplay)) {
                    listRet.push(item);
                }
            }
        }.bind(this));

        return listRet;
    },

    //空白列表 
    GetBlankList() {
        // List < UIWordItem > listRet = new List<UIWordItem>();
        var listRet = new Array();
        this.listItem.forEach(function (item, index) {
            if (item != null) {
                if (cc.Common.isBlankString(item.wordDisplay)) {
                    listRet.push(item);
                }
            }
        }.bind(this));
        return listRet;
    },


    OnTips() {
        //先提示空白的
        //List < UIWordItem > listRet = GetBlankList();
        var listRet = this.GetBlankList();
        if (listRet.length == 0) {
            listRet = this.GetNotAnswerList();
        }
        if (listRet.length != 0) {
            var rdx = cc.Common.RandomRange(0, listRet.length);
            if (rdx >= 0) {
                var item = listRet[rdx];
                item.SetWordColor(this.colorTips);
                item.UpdateTitle(item.wordAnswer);
                if (iDelegate != null) {
                    iDelegate.UIWordBarDidTipsWord(this, item.wordAnswer);
                }
                item.isWordTips = true;
                cc.Common.gold.gold--;
                if (cc.Common.gold < 0) {
                    cc.Common.gold = 0;
                }

                cc.Debug.Log("Common.gold =" + cc.Common.gold);

                if (this.callbackGold != null) {
                    this.callbackGold(this, true);
                }

                this.listItem.forEach(function (item, index) {
                    if (item != null) {
                        item.StopAnimateError();
                    }
                }.bind(this));

                if (this.CheckAllFill()) {
                    this.CheckAnswer();
                }
            }

        }
    },

});

