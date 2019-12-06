var UIView = require("UIView");
var UISegment = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UISegment/UISegment",
        help: " ",
        // inspector: ' ',
    },
    statics: {

    },
    properties: {
        scrollView: cc.ScrollView,
        scrollContent: cc.Node,
        colorSel: cc.Color.RED,
        colorUnSel: cc.Color.WHITE,

        listItem: {
            default: [],
            type: cc.Object
        },
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        /*
            { 
                OnUISegmentDidClickItem: function (ui,item) {
                },  
            }
            */
        objCallBack: null,
    },


    onLoad: function () {
        this._super();
    },

    LayOut: function () {
        this._super();
    },

    InitValue(fontsize, sel, unsel) {
        // itemFontSize = fontsize;
        // colorSel = sel;
        // colorUnSel = unsel;
    },
    AddItem(info) {

        // if (listItem.Count == 0) {
        //     totalStringWidth = 0;
        // }


        // //横向滑动
        // int space_x = 10; 
        var node = cc.instantiate(this.itemPrefab);
        node.setParent(this.scrollContent);
        var item = node.getComponent(cc.UISegmentItem);
        item.objCallBack = {
            OnDidClickItem: function (ui) {
                if (this.objCallBack != null) {
                    this.objCallBack.OnUISegmentDidClickItem(this, item);
                }
            }.bind(this),
        };
        item.index = this.listItem.length;
        item.colorSel = this.colorSel;
        item.colorUnSel = this.colorUnSel;
        // item.textTitle.fontSize = itemFontSize;

        // int str_width = Common.GetStringLength(info.title, AppString.STR_FONT_NAME, itemFontSize);
        // int offsetx = space_x * listItem.Count + totalStringWidth;
        // totalStringWidth += str_width;
        // RectTransform rctranContent = objContent.transform as RectTransform;
        // float left_x = -rctranContent.rect.width / 2;

        // RectTransform rctran = item.transform as RectTransform;
        // rctran.sizeDelta = new Vector2(str_width, rctranContent.rect.height);
        // float x = left_x + offsetx + rctran.sizeDelta.x / 2;
        // Vector2 pos = new Vector2(x, 0);
        // //item.transform.position = pos;

        // rctran.localScale = new Vector3(1f, 1f, 1f);
        item.UpdateItem(info);
        this.listItem.push(item);
    },

    UpdateList() {
        this.Select(0);
        //numRows = totalItem; 
    },
    GetItem(idx) {
        var item = this.listItem[idx];
        return item;
    },
    Select(idx, isClick = false) {
        for (var i = 0; i < this.listItem.length; i++) {
            var item = this.listItem[i];
            if (idx == item.index) {
                item.SetSelect(true);
                if (isClick) {
                    item.OnClick();
                }
            }
            else {
                item.SetSelect(false);
            }
        }
    },


});

cc.UISegment = module.export = UISegment;



