var UIView = require("UIView");
var UIWordItem = require("UIWordItem");

var UIWordBoard = cc.Class({
    extends: UIView,// cc.ItemInfo, 
    properties: {
        uiWordItemPrefab: {
            default: null,
            type: cc.Prefab
        },
        listItem: {
            default: [],
            type: cc.Object
        },

        row: 4,
        col: 6,
        imageBg: cc.Sprite,
    },

    onLoad: function () {
        this.InitItem();
    },
    start: function () {
        this.LayOut();
    },
    update: function () {
        //this.LayOut();
    },
    LayOut() {
        this.scheduleOnce(this.LayOutInternal, 0.25);
    },
    LayOutInternal() {
        {
            var ly = this.node.getComponent(cc.LayOutGrid);
            if (ly != null) {
                ly.LayOut();
            }
        }
    },
    GetItemCount() {
        var count = 0;
        if (this.listItem != null) {
            count = this.listItem.length;
        }
        return count;
    },
    GetItem(idx) {
        // this.listItem.forEach(function (item, index) {
        //     if (item != null) {
        //         if (idx == item.index) {
        //             return item;
        //         }
        //     }
        // }.bind(this));
        return null;
    },

    InitItem() {
        this.row = 3;
        this.col = 8;

        this.listItem.forEach(function (value, index) {
            if (value != null) {
                value.node.destroy();
                //value= null;
            }
        }.bind(this));

        var ly = this.node.getComponent(cc.LayOutGrid);
        if (ly != null) {
            ly.row = this.row;
            ly.col = this.col;
        }

        this.listItem.length = 0;
        var len = this.row * this.col;
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

    UpadteItem(info, strBoard) {
        // foreach (UIWordItem item in listItem)
        // {
        //     item.ShowContent(true);
        // }


        this.listItem.forEach(function (item, index) {
            if (item != null) {
                item.ShowContent(true);
            }
        }.bind(this));

        var idx = 0;
        //ok
        // return;

        for (var i = 0; i < strBoard.length; i++) {
            var word = strBoard.substr(i, 1);
            if (idx >= this.listItem.length) {
                cc.Debug.Log("UIWordBoard idx:" + idx);
                continue;
            }
            var item = this.listItem[idx];//as UIWordItem;
            item.UpdateTitle(word);
            idx++;
        }
    },

    //退回字符
    BackWord(word) {
        // this.listItem.forEach(function (item, index) {
        //     if (item != null) {
        //         if (word == item.wordDisplay) {
        //             item.ShowContent(true);
        //             break;
        //         }
        //     }
        // }.bind(this));
    },

    HideWord(word) {
        // this.listItem.forEach(function (item, index) {
        //     if (item != null) {
        //         if (word == item.wordDisplay) {
        //             item.ShowContent(false);
        //             break;
        //         }
        //     }
        // }.bind(this));
    },

    OnReset() {
        this.listItem.forEach(function (item, index) {
            if (item != null) {
                item.ShowContent(true);
            }
        }.bind(this));
    },

    WordItemDidClick(item) {
        // if (!item.isShowContent) {
        //     return;
        // }


        // if (_delegate != null) {
        //     _delegate.UIWordBoardDidClick(this, item);
        // }


    },
});

