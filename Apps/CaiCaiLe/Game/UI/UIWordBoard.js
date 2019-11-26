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

    LayOut() {
        var ly = this.node.getComponent(cc.LayOutGrid);
        if (ly != null) {
            // ly.LayOut();
        }
    },
    InitItem() {
        this.row = 4;
        this.col = 6;

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




});

