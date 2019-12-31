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
        this._super();
        var res = this.GetKeyImage();
        var board = null;
        if (cc.ImageRes.main().ContainsBoard(this.keyImage)) {
            board = cc.ImageRes.main().GetImageBoardSync(this.keyImage);
        }
        if (!cc.Common.isBlankString(res)) {
            this.UpdateImage({
                pic: cc.CloudRes.main().uiRootPath + "/" + res,
                type: board ? cc.Sprite.Type.SLICED : cc.Sprite.Type.SIMPLE,//SLICED
                left: board ? board.x : 0,
                right: board ? board.y : 0,
                top: board ? board.z : 0,
                bottom: board ? board.w : 0,
                success: function () {
                    this.LayOut();
                }.bind(this),
            });
        }

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
                if (this.objCallBack != null) {
                    this.objCallBack.OnUpdateImageFinish(this);
                }
            }.bind(this),
            fail: function () {
                if (obj.fail != null) {
                    obj.fail();
                }
            }.bind(this),
        });
    },

    LayOut() {
        this._super();
    },

});

cc.UIImage = module.export = UIImage;



