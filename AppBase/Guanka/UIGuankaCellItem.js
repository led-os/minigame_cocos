var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GameViewController = require("GameViewController");

cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageBg: cc.UIImage,
        textTitle: cc.UIText,
    },

    onLoad: function () {
        this._super();

    },

    init: function(index, data, reload, group) {
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
        this.textTitle.text = index + 1;
        var idx_playing = cc.LevelManager.main().gameLevelFinish + 1;
        var keyPic = "";
        if (index > idx_playing) {
            this.textTitle.node.active = false;
            keyPic = "IMAGE_GUANKA_CELL_ITEM_BG_LOCK";
        }
        else if (index == idx_playing) {
            this.textTitle.node.active = false;
            keyPic =  "IMAGE_GUANKA_CELL_ITEM_BG_PLAY";
        } else {
            this.textTitle.node.active = true;
            keyPic = "IMAGE_GUANKA_CELL_ITEM_BG_UNLOCK";
        }

        this.imageBg.UpdateImageKey(keyPic);

    },
    clicked: function clicked() {

    },

    OnClickItem: function () {
        this.target.GotoGame(this.index);
    },

});

