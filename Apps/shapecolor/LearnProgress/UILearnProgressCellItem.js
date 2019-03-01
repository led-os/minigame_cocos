var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");

cc.Class({
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
        //public GameObject objIconContent;   
        shaderColor: null;
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
        //this._target = data.target;
        //this._data = data.array[index];
        this.textTitle.string = index;
    },
    clicked: function clicked() {
        var uiViewParent = this.GetUIViewParent();// 

    }
});

