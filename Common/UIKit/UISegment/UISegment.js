var UIView = require("UIView");
var UISegmentItem = require("UISegmentItem");

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
        fontSize: 0,
        listItem: {
            default: [],
            type: cc.Object
        },
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        itemPrefab2: {
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
        this.fontSize = font;
        cc.Debug.Log("item.fontSize InitValue=" + this.fontSize + " font=" + font);
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
        // var strPrefab = "Common/Prefab/UIKit/UISegment/UISegmentItem";
        // cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
        //     if (err) {
        //         cc.Debug.Log("LoadGamePrefab err=" + err.message || err);
        //         return;
        //     }
        //     this.itemPrefab2 = prefab;
        //     this.AddItemInternal(info);
        // }.bind(this)
        // );
        //  this.scheduleOnce(this.LayOutInternal, 0.25);
        this.AddItemInternal(info);
    },

    AddItemInternal(info) {

        // if (listItem.Count == 0) {
        //     totalStringWidth = 0;
        // }


        // //横向滑动
        // int space_x = 10; 
        var nodeItem = cc.instantiate(this.itemPrefab);
        nodeItem.setParent(this.scrollContent);
        var item = nodeItem.getComponent(UISegmentItem);
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
        cc.Debug.Log("item.fontSize =" + item.fontSize);
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
        this.Select(0,true);
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



