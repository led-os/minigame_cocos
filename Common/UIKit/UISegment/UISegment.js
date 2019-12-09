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
        fontsize: 0,
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
        align: {
            default: cc.Align.Horizontal,
            type: cc.Align
        },
    },


    onLoad: function () {
        this._super();
        if (this.align == cc.Align.Horizontal) {
            this.scrollView.horizontal = true;
            this.scrollView.vertical = false;
        }
        if (this.align == cc.Align.Vertical) {
            this.scrollView.vertical = true;
            this.scrollView.horizontal = false;
        }
        this.LayOut();
    },

    LayOut: function () {
        this._super();
        var rctran = this.node.getComponent(cc.RectTransform);
        var w, h;
        var rctranScrollContent = this.scrollContent.getComponent(cc.RectTransform);
        if (this.align == cc.Align.Horizontal) {
            w = rctran.width;
            h = rctran.height;
        }
        if (this.align == cc.Align.Vertical) {
            w = rctran.width;
            h = rctran.height;
        }

        this.scrollContent.setContentSize(new cc.size(w, h));
        rctranScrollContent.LayOut();
    },

    InitValue(font, sel, unsel) {
        this.fontsize = font;
        this.colorSel = sel;
        this.colorUnSel = unsel;
        var lyH = this.node.getComponent(cc.LayOutHorizontal);
        var lyV = this.node.getComponent(cc.LayOutVertical);
        if (this.align == cc.Align.Horizontal) {
            if (lyH != null) {
                lyH.enableLayout = true;
            }
        }
        if (this.align == cc.Align.Vertical) {
            if (lyV != null) {
                lyV.enableLayout = true;
            }
        }
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
                this.Select(item.index);
                if (this.objCallBack != null) {
                    this.objCallBack.OnUISegmentDidClickItem(this, item);
                }
            }.bind(this),
        };
        item.index = this.listItem.length;
        item.colorSel = this.colorSel;
        item.colorUnSel = this.colorUnSel;
        item.fontSize = this.fontSize;

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
        this.LayOut();
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
        cc.Debug.Log("UISegment Select idx=" + idx);
        for (var i = 0; i < this.listItem.length; i++) {
            var item = this.listItem[i];
            if (idx == item.index) {
                item.SetSelect(true);
                if (isClick) {
                    item.OnClickItem(null, null);
                }
            }
            else {
                item.SetSelect(false);
            }
        }

        this.LayOut();
    },


});

cc.UISegment = module.export = UISegment;



