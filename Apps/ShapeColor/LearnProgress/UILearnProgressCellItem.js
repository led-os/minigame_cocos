var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GameViewController = require("GameViewController");
var GameShapeColor = require("GameShapeColor");
var UISetting = require("UISetting");


var UILearnProgressCellItem = cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    statics: {
        ITEM_TYPE_SHAPE: 0,
        ITEM_TYPE_COLOR: 1,

    },

    properties: {
        imageBg: cc.UIImage,
        imageIcon: cc.UIImage,
        textTitle: cc.UIText,
        textDetail: cc.UIText,
        itemWidth: 0,
        itemHeight: 0,
        itemType: 0,
        indexShape: 0,
        nodeIconContent: cc.Node,
        shaderColor: null,
        colorSel: cc.Color,
        colorUnSel: cc.Color,
        languageColor: null,
  
    },

    onLoad: function () {
        this._super();
        this.colorSel = cc.Color.RED;
    },

    update() {
    },
    LoadLanguageColor: function (callback) {
        var filepath = cc.Common.GAME_RES_DIR + "/language/language_color.csv";
        if (this.languageColor != null) {
            if (callback != null) {
                callback(this);
            }
            return;
        }
        this.languageColor = new cc.Language();
        this.languageColor.Init2(filepath, callback);
    },

    UpdateColorTitleOfItem: function (info) {
        var str = "unknown";
        if (this.languageColor != null) {
            str = this.languageColor.GetString(info.id);
            this.textTitle.text = str;
        } else {
            this.LoadLanguageColor(function (p) {
                str = this.languageColor.GetString(info.id);
                this.textTitle.text = str;
            });
        }
        return str;
    },

    init: function (index, data, reload, group) {
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
        this.itemType = this.target.itemType;
        this.UpdateItem(this.info);


    },
    clicked: function () {
        var uiViewParent = this.GetUIViewParent();// 

    },

    UpdateIcon: function (pic, color) {
        // Texture2D texNew = GetIconFillColor(tex, color);
        //imageIcon.sprite = LoadTexture.CreateSprieFromTex(texNew);
        // this.imageIcon.spriteFrame = new cc.SpriteFrame(tex);
        //RectTransform rctan = imageIcon.GetComponent<RectTransform>();
        //rctan.sizeDelta = new Vector2(texNew.width, texNew.height);

        // {
        //     const renderEngine = cc.renderer.renderEngine;
        //     const renderer = renderEngine.renderer;
        //     const name = 'ShaderShapeColor';
        //     let mat = this.imageIcon.getMaterial(name);
        //     if (!mat) {
        //         const CustomMaterial = require("CustomMaterial");
        //         mat = new CustomMaterial(name, [
        //             { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
        //             { name: 'colorShow', type: renderer.PARAM_FLOAT3 },
        //         ]);
        //         this.imageIcon.setMaterial(name, mat);
        //     }
        //     this.imageIcon.activateMaterial(name);

        //     var colorShow = new cc.Vec3(color.r / 255, color.g / 255, color.b / 255);
        //     cc.Debug.Log("colorShow=" + colorShow);
        //     mat.setParamValue("colorShow", colorShow);
        // }

        //this.onClickGrowing();

        this.imageIcon.UpdateImage({
            pic: pic,
            type: cc.Sprite.Type.SIMPLE,//SLICED 
            success: function () {
                this.imageIcon.LayOut();
            }.bind(this),
        });

        var mat = this.imageIcon.image.getMaterial(0);
        mat.setProperty('enableColor', 1.0);
        mat.setProperty('showColor', color);//cc.Color.WHITE
    },


    onClickGrowing: function () {
        // const renderEngine = cc.renderer.renderEngine;
        // const renderer = renderEngine.renderer;
        // const name = 'Glowing';
        // this._start = Date.now();
        // let mat = this.imageIcon.getMaterial(name);
        // if (!mat) {
        //     const CustomMaterial = require("CustomMaterial");
        //     mat = new CustomMaterial(name, [
        //         { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
        //         { name: 'iTime', type: renderer.PARAM_FLOAT },
        //     ]);
        //     this.imageIcon.setMaterial(name, mat);
        // }
        // this.imageIcon.node.color = new cc.Color().fromHEX("#1A7ADC")
        // this.imageIcon.activateMaterial(name);
        // var iResolution = new cc.Vec3(this.imageIcon.node.width, this.imageIcon.node.height, 0);
        // mat.setParamValue("iResolution", iResolution);
    },

    UpdateItem: function (info) {

        var game = GameViewController.main().gameBase;
        switch (this.itemType) {
            case UILearnProgressCellItem.ITEM_TYPE_SHAPE:
                {
                    this.UpdateIcon(info.pic, this.colorSel);
                    var str = game.ShapeTitleOfItem(info);
                    this.textTitle.text = str;
                    this.textDetail.text = game.GameStatusOfShape(info);
                    cc.Debug.Log("textDetail=" + this.textDetail.text);
                }

                break;
            case UILearnProgressCellItem.ITEM_TYPE_COLOR:
                {
                    var listShape = cc.GameLevelParse.main().listShape;
                    this.indexShape = Math.floor(listShape.length / 2);
                    var infoshape = listShape[this.indexShape];
                    this.UpdateIcon(infoshape.pic, info.color);
                    this.UpdateColorTitleOfItem(info);
                    this.textDetail.text = game.GameStatusOfColor(info);

                }
                break;
        }

        this.UpdateImageBg(UISetting.listImage[this.index % 3]);

        this.LayOut();
    },

    UpdateImageBg: function (pic) {
        this.imageBg.UpdateImageKey(pic);
    },

    LayOut: function () {
    },

});

