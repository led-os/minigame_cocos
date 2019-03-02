var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GuankaViewController = require("GuankaViewController");
//var GameManager = require("GameManager");
cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,
    },

    onLoad: function () {
        this._super();

    },

    //init: function init(index, data, reload, group) 
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
        this.textTitle.string = index;

        //  this.node.clicked = this.OnItemclicked.bind(this);
    },
    clicked: function () {
        cc.log('下标:' + this.textTitle.string);
        // if(this.onClickCallBack!=null)
        // {
        //     this.onClickCallBack(this);
        // }
        cc.GameManager.placeLevel = this.index;
        var uiViewParent = this.GetUIViewParent();//UIPlace

        if (this.target.controller != null) {
            var navi = this.target.controller.naviController;
            cc.log('goto GuankaViewController');
            navi.Push(GuankaViewController.main());
        }
    }
});

