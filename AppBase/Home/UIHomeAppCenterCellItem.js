var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");

cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageItem: cc.Sprite,
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
        this.target = data.target;
        this.info = data.array[index];
        this.UpdateItem(this.info);
    },

    clicked: function () {
        cc.Common.OpenApp(this.info.id);
    },


    UpdateItem: function (info) {
        this.UpdateImageItem(info.pic);
    },

    UpdateImageItem: function (pic) {
        //不会保留图片的sliced参数
        cc.TextureCache.main.Load(pic, function (err, tex) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return;
            }
            this.imageItem.spriteFrame = new cc.SpriteFrame(tex);

        }.bind(this));
    },

    OnClickBtnItem: function (event, customEventData) {

    },
});

