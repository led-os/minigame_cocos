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
        colorNormal: cc.Color.WHITE,
        colorFail: cc.Color.RED,
        colorTips: cc.Color.WHITE,//new Color(107 / 255.0f, 1f, 1.0f, 1.0f);

        /*
        { 
        OnGameFinish: function (ui,isFail) {
        }, 
        OnDidBackWord: function (ui,item) {
        }, 

        
        }
        */
        objCallBack: null,


    },
    onLoad: function () {
    },

    update: function () {
        //  this.LayOutInternal();
    },


    LayOut() {
        this._super();
        this.scheduleOnce(this.LayOutInternal, 0.25);
        // this.LayOutInternal();
    },
    LayOutInternal() {
        this._super();
    },


    UpadteItem(info) {
        if (this.listItem.length) {
            //return;
        }
        var strAnswer = cc.GameAnswer.main().GetGuankaAnswer(info);
        var len = strAnswer.length;
        this.wordNumMax = len;
        this.wordNumCur = 0;
        cc.Debug.Log("UpadteItem strAnswer=" + strAnswer);
        this.listItem.forEach(function (value, index) {
            if (value != null) {
                value.node.destroy();
                //value= null;
            }
        }.bind(this));

        this.listItem.length = 0;

        for (var i = 0; i < len; i++) {
            var word = strAnswer.substr(i, 1);
            //     //Debug.Log(word);
            //     UIWordItem item = GameObject.Instantiate(wordItemPrefab);

            var node = cc.instantiate(this.uiWordItemPrefab);
            var item = node.getComponent(UIWordItem);

            node.setParent(this.node);
            item.wordAnswer = word;
            item.index = i;
            item.ClearWord();
            cc.ColorConfig.main().GetColor({
                key: cc.GameRes.KEY_COLOR_BoardTitle,
                def: cc.Color.BLACK,
                success: function (color) {
                    item.SetWordColor(color);
                }.bind(this),
            });
            item.SetFontSize(80);

            item.objCallBack = {
                OnItemDidClick: function (ui) {
                    this.OnWordItemDidClick(ui);
                }.bind(this),
            };

            this.listItem.push(item);

            cc.Debug.Log("UIWordBoard InitItem i=" + i);

        }

        this.LayOut();
    },
    AddWord(word) {
        for (var i = 0; i < this.listItem.length; i++) {
            var item = this.listItem[i];
            if (item != null) {
                if (cc.Common.isBlankString(item.wordDisplay)) {
                    item.UpdateTitle(word);
                    this.wordNumCur++;
                    break;
                }
            }
        }

        if (this.CheckAllFill()) {
            this.CheckAnswer();
        }
    },

    CheckAllFill() {
        var ret = true;
        for (var i = 0; i < this.listItem.length; i++) {
            var item = this.listItem[i];
            if (item != null) {
                if (cc.Common.isBlankString(item.wordDisplay)) {
                    ret = false;
                }
            }
        }
        return ret;
    },

    //判断答案是否正确
    CheckAnswer() {
        this.isAllAnswer = true;
        for (var i = 0; i < this.listItem.length; i++) {
            var item = this.listItem[i];
            if (item != null) {
                if (!item.IsAnswer()) {
                    this.isAllAnswer = false;
                    break;
                }
            }
        }

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
                    item.SetWordColor(this.colorFail);
                    item.StartAnimateError();
                }
            }
        }.bind(this));
        if (this.objCallBack != null) {
            this.objCallBack.OnGameFinish(this, true);
        }

    },
    OnGameWin() {
        if (this.objCallBack != null) {
            this.objCallBack.OnGameFinish(this, false);
        }

    },

    OnWordItemDidClick(item) {
        if (!this.isAllAnswer) {
            if (!cc.Common.isBlankString(item.wordDisplay)) {
                cc.Debug.Log("WordItemDidClick 3");
                //字符退回  
                if (this.objCallBack != null) {
                    this.objCallBack.OnDidBackWord(this, item);
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

