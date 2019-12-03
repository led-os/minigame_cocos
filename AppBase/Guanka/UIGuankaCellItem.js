var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GameViewController = require("GameViewController");

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
        this.target = data.target;
        this.info = data.array[index];
        this.textTitle.string = index + 1;
        var idx_playing = cc.LevelManager.main().gameLevelFinish + 1;
        var strPic = "";
        if (index > idx_playing) {
            this.textTitle.node.active = false;
            strPic = cc.AppRes.IMAGE_GUANKA_CELL_ITEM_BG_LOCK;
        }
        else if (index == idx_playing) {
            this.textTitle.node.active = false;
            strPic = cc.AppRes.IMAGE_GUANKA_CELL_ITEM_BG_PLAY;
        } else {
            this.textTitle.node.active = true;
            strPic = cc.AppRes.IMAGE_GUANKA_CELL_ITEM_BG_UNLOCK;
        }

        cc.TextureUtil.UpdateSpriteImage({
            sprite: this.imageBg,
            pic: cc.CloudRes.main().rootPath + "/" + strPic,
            success: function () {
            }.bind(this),
        });

    },
    clicked: function clicked() {
        this.target.GotoGame(this.index);
    },

});

