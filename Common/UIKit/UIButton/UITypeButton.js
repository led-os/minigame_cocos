var UIView = require("UIView");

var Type = cc.Enum({
    //区分大小写 
    IMAGE: 0,
    IMAGE_TEXT: 1,
    IMAGE_ICON: 2,

});

var UITypeButton = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UIButton/UITypeButton",
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
        //cc.Button
        var btn = this.node.getComponent(cc.Button);
        this.UnifyButtonSprite(btn);
        this.type = this._type;

    },


    /*
            { 
                bg: "",
                icon:"",
                def: "",
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
            success: obj.success,
            fail: obj.fail,
        };
        cc.TextureUtil.UpdateSpriteImage(objBg);

        if (obj.icon) {
            var objIcon = {
                sprite: this.imageIcon,
                pic: obj.icon,
                def: obj.def,
                success: obj.success,
                fail: obj.fail,
            };
            cc.TextureUtil.UpdateSpriteImage(objIcon);
        }
    },


});

cc.UITypeButton = module.export = UITypeButton;



