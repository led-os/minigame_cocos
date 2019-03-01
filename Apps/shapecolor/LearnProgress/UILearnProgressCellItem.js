var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GameViewController = require("GameViewController");

var UILearnProgressCellItem = cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    statics: {
        ITEM_TYPE_SHAPE: 0,
        ITEM_TYPE_COLOR: 1,

    },

    properties: {
        imageBg: cc.Sprite,
        imageIcon: cc.Sprite,
        textTitle: cc.Label,
        textDetail: cc.Label,
        itemWidth: 0,
        itemHeight: 0,
        itemType: 0,
        indexShape: 0,
        nodeIconContent: cc.Node,
        shaderColor: null,
        colorSel: cc.Color,
        colorUnSel: cc.Color,


    },

    onLoad: function () {
        this._super();

    },

    init: function init(index, data, reload, group) {
        this.node.active = true;
        this.index = index;
        if (index >= data.array.length) {
            // this.index.string = '越界';
            // this.group.string = group.toString();
            this.node.active = false;
            return;
        }
        this.textTitle.string = index;
        var uiViewParent = this.GetUIViewParent();// 
        if (uiViewParent.listItem != null) {
            var info = uiViewParent.listItem[index];
            this.UpdateItem(info);
        }

    },
    clicked: function clicked() {
        var uiViewParent = this.GetUIViewParent();// 

    },
    UpdateIcon: function (tex, color) {
        // Texture2D texNew = GetIconFillColor(tex, color);
        //imageIcon.sprite = LoadTexture.CreateSprieFromTex(texNew);
        this.imageIcon.spriteFrame = new cc.SpriteFrame(tex);
        //RectTransform rctan = imageIcon.GetComponent<RectTransform>();
        //rctan.sizeDelta = new Vector2(texNew.width, texNew.height);
    },
    UpdateItem: function (info) {

        var game = GameViewController.main().gameBase;
        switch (this.itemType) {
            case UILearnProgressCellItem.ITEM_TYPE_SHAPE:
                {
                    cc.TextureCache.main.Load(info.pic, function (err, tex) {
                        if (err) {
                            cc.log(err.message || err);
                        }
                        //this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
                        this.UpdateIcon(tex, this.colorSel);
                        this.LayOut();
                    }.bind(this));

                    var str = game.ShapeTitleOfItem(info);
                    this.textTitle.string = str;
                    this.textDetail.string = game.GameStatusOfShape(info);
                    cc.log("textDetail="+this.textDetail.string);
                }

                break;
            case UILearnProgressCellItem.ITEM_TYPE_COLOR:
                {

                    this.indexShape = Math.floor(game.listShape.length / 2);
                    var infoshape = game.listShape[this.indexShape];
                    cc.TextureCache.main.Load(info.pic, function (err, tex) {
                        if (err) {
                            cc.log(err.message || err);
                            return;
                        }
                        //this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
                        this.UpdateIcon(tex, info.color);
                        this.LayOut();
                    }.bind(this));

                    var str = game.ColorTitleOfItem(info);
                    this.textTitle.string = str;
                    this.textDetail.string = game.GameStatusOfColor(info);

                }
                break;
        }
        this.LayOut();
    },
    LayOut: function () {
    },

});

