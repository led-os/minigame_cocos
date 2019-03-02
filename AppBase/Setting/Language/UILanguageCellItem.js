var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,
    },
    //string[] strImageBg = { AppRes.IMAGE_CELL_BG_BLUE, AppRes.IMAGE_CELL_BG_ORINGE, AppRes.IMAGE_CELL_BG_YELLOW };

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
        var uiViewParent = this.GetUIViewParent();// 
        var lan = cc.Language.main();
        cc.log("language id= "+this.info.id);
        lan.SetLanguage(this.info.id);
        cc.Common.SetItemOfKey(cc.AppRes.KEY_LANGUAGE,this.info.id);
        this.target.OnClickBtnBack();
    },
    UpdateItem: function (info) {
        this.textTitle.string = info.title;
    },
});

