var UIView = require("UIView");
var UIAppIcon = cc.Class({
    extends: UIView,
    properties: {
        imageIcon: cc.UIImage,
        infoItem: cc.ItemInfo,
    },
  
    onLoad: function () {
        this._super();

    },
    LayOut: function () {
        this._super();
    },


    UpdateItem: function (info) {
        this.infoItem = info;
        this.imageIcon.UpdateImage({
            pic: info.pic,
            type: cc.Sprite.Type.SIMPLE,//SLICED 
            success: function () {
                this.LayOut();
            }.bind(this),
        });
    },

    OnClickItem: function (event, customEventData) { 
        cc.Common.OpenApp(this.infoItem.id);
    }
}); 