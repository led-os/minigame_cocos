var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GameViewController = require("GameViewController");
var UISetting = require("UISetting");


var UILearnProgressCellItem = cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'), 

    properties: {
        imageBg: cc.UIImage,
        imageIcon: cc.UIImage,
        textTitle: cc.UIText,
        textDetail: cc.UIText,
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
        this.colorSel = cc.Color.RED;
    },

    update() {
    },

    init: function (index, data, reload, group) {
        this.node.active = true;
        this.index = index;
        if (index >= data.array.length) {
            // this.index.string = '越界';
            // this.group.string = group.toString();
            this.node.active = false;
            return;
        }

        this.target = data.target;
        this.info = data.array[index];
        this.itemType = this.target.itemType;
        this.UpdateItem(this.info);


    },
    clicked: function () {
        var uiViewParent = this.GetUIViewParent();// 

    },

    UpdateIcon: function (pic, color) {
        this.imageIcon.UpdateImage({
            pic: pic,
            type: cc.Sprite.Type.SIMPLE,//SLICED 
            success: function () {
                this.imageIcon.LayOut();
            }.bind(this),
        });

        // var mat = this.imageIcon.image.getMaterial(0);
        // mat.setProperty('enableColor', 1.0);
        // mat.setProperty('showColor', color);//cc.Color.WHITE
    },



    UpdateItem: function (info) {

        // var game = GameViewController.main().gameBase;
        // {

        this.UpdateIcon(info.pic, this.colorSel);
        //     var str = game.ShapeTitleOfItem(info);
        //     this.textTitle.text = str;
        //     this.textDetail.text = game.GameStatusOfShape(info);
        //     cc.Debug.Log("textDetail=" + this.textDetail.text);
        // }



        this.UpdateImageBg(UISetting.listImage[this.index % 3]);

        this.LayOut();
    },

    UpdateImageBg: function (pic) {
        this.imageBg.UpdateImageKey(pic);
    },

    LayOut: function () {
    },

});

