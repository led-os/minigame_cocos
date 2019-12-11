var UIView = require("UIView");

var Type = cc.Enum({
    //区分大小写 
    IMAGE: 0,
    IMAGE_TEXT: 1,
    IMAGE_ICON: 2,

});

var UIButton = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UIButton/UIButton",
        help: " ",
        // inspector: ' ',
    },
    statics: {
        Type: Type,
    },
    properties: {
        imageBg: cc.Sprite,
        imageIcon: cc.Sprite,
        textTitle: cc.Label,
        _type: Type.IMAGE,
        type: {
            type: Type,
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
                if (this.imageBg == null) {
                    return;
                }
                if (this.textTitle == null) {
                    return;
                }
                if (this.imageIcon == null) {
                    return;
                }
                this.imageBg.node.active = true;
                cc.log("this._type=" + this._type);

                switch (this._type) {
                    case Type.IMAGE:
                        {
                            this.imageIcon.node.active = false;
                            this.textTitle.node.active = false;

                        }
                        break;
                    case Type.IMAGE_TEXT:
                        {
                            this.imageIcon.node.active = false;
                            this.textTitle.node.active = true;
                        }
                        break;
                    case Type.IMAGE_ICON:
                        {
                            this.imageIcon.node.active = true;
                            this.textTitle.node.active = false;
                        }
                        break;

                }
            },
        },
    },


    onLoad: function () {
        this._super();
        this.type = this._type;
    },

    /*
            { 
                bg: "",
                icon:"",
                def: "",
                type:cc.Sprite.Type.SIMPLE,//SLICED
                left:0,
                right:0,
                top:0,
                bottom:0,
                isUpdateSize:true,
                success: function () {
                },
                fail: function () {
                }, 
            }
        */
    UpdateImage: function (obj) {
        var objBg = {
            sprite: this.imageBg,
            pic: obj.bg,
            def: obj.def,
            type: obj.type,
            left: obj.left,
            right: obj.right,
            top: obj.top,
            bottom: obj.bottom,
            success: function () {
                this.LayOut();
                if (obj.success != null) {
                    obj.success();
                }
            }.bind(this),
            fail: obj.fail,
        };
        cc.TextureUtil.UpdateSpriteImage(objBg);

        if (obj.icon) {
            var objIcon = {
                sprite: this.imageIcon,
                pic: obj.icon,
                def: obj.def,
                success: function () {
                    this.LayOut();
                    if (obj.success != null) {
                        obj.success();
                    }
                }.bind(this),
                fail: obj.fail,
            };
            cc.TextureUtil.UpdateSpriteImage(objIcon);
        }
    },


});

cc.UIButton = module.export = UIButton;



