var UIView = require("UIView");


var UIImage = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UIImage/UIImage",
        help: " ",
        // inspector: ' ',
    },
    statics: {

    },
    properties: {
        image: cc.Sprite,
    },


    onLoad: function () {
        this.Init();
    },

    Init: function () {

    },


    /*
      { 
          pic: "",
          def: "",
          type:cc.Sprite.Type.SIMPLE,//SLICED
          left:0,
          right:0,
          top:0,
          bottom:0,
          success: function () {
          },
          fail: function () {
          }, 
      }
  */
    UpdateImage: function (obj) {
        cc.TextureUtil.UpdateSpriteImage({
            sprite: this.image,
            pic: obj.pic,
            type: obj.type,//SLICED
            left: obj.left,
            right: obj.right,
            top: obj.top,
            bottom: obj.bottom,
            success: function () {
                if (obj.success != null) {
                    obj.success();
                }
            }.bind(this),
            fail: function () {
                if (obj.fail != null) {
                    obj.fail();
                }
            }.bind(this),
        });
    },



});

cc.UIImage = module.export = UIImage;



