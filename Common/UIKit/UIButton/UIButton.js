var UIView = require("UIView");

var Type = cc.Enum({
    //区分大小写 
    IMAGE: 0,
    IMAGE_TEXT: 1,
    IMAGE_ICON: 2,
    IMAGE_SWITCH: 3,
    IMAGE_ICON_SWITCH: 4,

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
        imageBg: cc.UIImage,
        imageIcon: cc.UIImage,
        textTitle: cc.UIText,
        enableFitTextSize: false,
        isSwicthSelect: false,//选中
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
                    case Type.IMAGE_SWITCH:
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
                    case Type.IMAGE_ICON_SWITCH:
                        {
                            this.imageIcon.node.active = true;
                            this.textTitle.node.active = false;
                        }
                        break;

                }
            },
        },


        fontSize: {
            get: function () {
                if (this.textTitle == null) {
                    return 12;
                }
                return this.textTitle.fontSize;
            },
            set: function (value) {
                if (this.textTitle == null) {
                    return;
                }
                this.textTitle.fontSize = value;
                this.LayOut();
            },
        },
        text:
        {
            get: function () {
                if (this.textTitle == null) {
                    return "text";
                }
                return this.textTitle.text;
            },
            set: function (value) {
                this.textTitle.text = value;
                if (this.enableFitTextSize) {
                    var w = cc.Common.GetTextSize(value, this.fontSize).width + this.fontSize;
                    var h = this.node.getContentSize().height;
                    cc.Debug.Log("GetTextSize w = " + w + " h=" + h);
                    this.node.setContentSize(w, h);
                }
                this.LayOut();
            },
        },
        color: {
            get: function () {
                if (this.textTitle == null) {
                    return cc.Color.BLACK;
                }
                return this.textTitle.node.color;
            },
            set: function (value) {
                this.textTitle.node.color = value;
            },
        },
    },

    LayOut() {
        this._super();
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
    UpdateSwitch: function (isSel) {
        this.isSwicthSelect = isSel;
        if (this.isSwicthSelect) {
            this.imageBg.UpdateImageKey(this.imageBg.keyImage);
            this.imageIcon.UpdateImageKey(this.imageIcon.keyImage);
        } else {
            this.imageBg.UpdateImageKey(this.imageBg.keyImage2);
            this.imageIcon.UpdateImageKey(this.imageIcon.keyImage2);
        }
    },

});

cc.UIButton = module.export = UIButton;



