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
        listItem: {
            default: [],
            type: cc.Object
        },

        fontSize: {
            get: function () {
                return this.label.fontSize;
            },
            set: function (value) {
                this.label.fontSize = value;
                this.label.lineHeight = value;
                this.LayOut();
            },
        },
        color: {
            get: function () {
                return this.label.node.color;
            },
            set: function (value) {
                this.label.node.color = value;
            },
        },
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
        // if (scrollRect == null) {
        //     scrollRect = GetComponent<ScrollRect>();
        // }

        // //横向滑动
        // int space_x = 10;
        // SegmentItem item = (SegmentItem)GameObject.Instantiate(segmentItem);
        // item.iDelegate = this;
        // item.index = listItem.Count;
        // listItem.Add(item);
        // item.transform.parent = objContent.transform;
        // item.colorSel = colorSel;
        // item.colorUnSel = colorUnSel;
        // item.textTitle.fontSize = itemFontSize;
        // item.UpdateInfo(info);
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


    },

    UpdateList() {
        this.Select(0);
        //numRows = totalItem; 
    },
    GetItem(idx) {
        // SegmentItem item_ret = null;
        // foreach(SegmentItem item in listItem)
        // {
        //     if (idx == item.index) {
        //         item_ret = item;
        //         break;
        //     }
        // }
        // return item_ret;
    },
    Select(idx, isClick = false) {
        // foreach(SegmentItem item in listItem)
        // {
        //     if (idx == item.index) {
        //         item.SetSelect(true);
        //         if (isClick) {
        //             item.OnClick();
        //         }
        //         //break;
        //     }
        //     else {
        //         item.SetSelect(false);
        //     }
        // }
    },

});

cc.UISegment = module.export = UISegment;



