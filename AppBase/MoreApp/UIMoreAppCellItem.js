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
        this.textTitle.node.active = false;
        this.UpdateImage(this.info.pic);

    },

    UpdateImage: function (pic) {
        cc.TextureCache.main.Load(pic, function (err, tex) {
            if (err) {
                cc.Debug.Log("UpdateImage:" + err.message || err);
                return;
            }
            this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
            var lyscale = this.imageBg.node.getComponent(cc.LayoutScale);
            if (lyscale) {
                lyscale.LayOut();
            }
        }.bind(this));
    },

    clicked: function () {
        cc.Debug.Log('下标:' + this.textTitle.string);
        // if(this.onClickCallBack!=null)
        // {
        //     this.onClickCallBack(this);
        // }
        cc.LevelManager.main().placeLevel = this.index;

        if (this.target.controller != null) {
            var navi = this.target.controller.naviController;
            cc.Debug.Log('goto GuankaViewController');
            // navi.Push(GuankaViewController.main());
        }
    }
});

