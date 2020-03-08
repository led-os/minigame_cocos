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
        keyImage2: "",
    },


    onLoad: function () {
        this._super();
        this.UpdateImageKey(this.keyImage);
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

    UpdateImageKey: function (key) {
        //this.keyImage = key;
        var pic = this.GetImageOfKey(key);
        var board = null;
        if (cc.ImageRes.main().ContainsBoard(key)) {
            board = cc.ImageRes.main().GetImageBoardSync(key);
        }
        if (!cc.Common.isBlankString(pic)) {
            this.UpdateImage({
                pic: cc.CloudRes.main().uiRootPath + "/" + pic,
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
    }
    ,
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



