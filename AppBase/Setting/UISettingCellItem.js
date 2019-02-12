var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");

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

