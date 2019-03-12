var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var GameViewController = require("GameViewController");
//var GameShapeColor = require("GameShapeColor");
var UISetting = require("UISetting");


var UILearnProgressCellItem = cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    statics: {
        ITEM_TYPE_SHAPE: 0,
        ITEM_TYPE_COLOR: 1,

    },

    properties: {
        imageBg: cc.Sprite,
        imageIcon: cc.Sprite,
        textTitle: cc.Label,
        textDetail: cc.Label,
        itemWidth: 0,
        itemHeight: 0,
        itemType: 0,
        indexShape: 0,
        nodeIconContent: cc.Node,
        shaderColor: null,
        colorSel: cc.Color,
        colorUnSel: cc.Color,


    },

    onLoad: function () {
        this._super();
        this.colorSel = cc.Color.RED;
    },

    update() {
        const mat = this.imageIcon.getCurrMaterial();
        if (!mat) {
            return;
        }

        // if (["rainheart", "wave", "Glowing", "Water"].includes(mat.name)) {
        //     const now = Date.now();
        //     const time = (now - this._start) / 1000;
        //     mat.setParamValue('iTime', time);
        // }
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

    UpdateIcon: function (tex, color) {
        // Texture2D texNew = GetIconFillColor(tex, color);
        //imageIcon.sprite = LoadTexture.CreateSprieFromTex(texNew);
        this.imageIcon.spriteFrame = new cc.SpriteFrame(tex);
        //RectTransform rctan = imageIcon.GetComponent<RectTransform>();
        //rctan.sizeDelta = new Vector2(texNew.width, texNew.height);

        {
            const renderEngine = cc.renderer.renderEngine;
            const renderer = renderEngine.renderer;
            const name = 'ShaderShapeColor';
            let mat = this.imageIcon.getMaterial(name);
            if (!mat) {
                const CustomMaterial = require("CustomMaterial");
                mat = new CustomMaterial(name, [
                    { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
                    { name: 'colorShow', type: renderer.PARAM_FLOAT3 },
                ]);
                this.imageIcon.setMaterial(name, mat);
            }
            this.imageIcon.activateMaterial(name);

            var colorShow = new cc.Vec3(color.r / 255, color.g / 255, color.b / 255);
            cc.Debug.Log("colorShow=" + colorShow);
            mat.setParamValue("colorShow", colorShow);
        }

        //this.onClickGrowing();
    },


    onClickGrowing: function () {
        const renderEngine = cc.renderer.renderEngine;
        const renderer = renderEngine.renderer;
        const name = 'Glowing';
        this._start = Date.now();
        let mat = this.imageIcon.getMaterial(name);
        if (!mat) {
            const CustomMaterial = require("CustomMaterial");
            mat = new CustomMaterial(name, [
                { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
                { name: 'iTime', type: renderer.PARAM_FLOAT },
            ]);
            this.imageIcon.setMaterial(name, mat);
        }
        this.imageIcon.node.color = new cc.Color().fromHEX("#1A7ADC")
        this.imageIcon.activateMaterial(name);
        var iResolution = new cc.Vec3(this.imageIcon.node.width, this.imageIcon.node.height, 0);
        mat.setParamValue("iResolution", iResolution);
    },

    UpdateItem: function (info) {

        var game = GameViewController.main().gameBase;
        switch (this.itemType) {
            case UILearnProgressCellItem.ITEM_TYPE_SHAPE:
                {
                    var url = cc.AppRes.main().URL_HTTP_HEAD + info.pic;
                    cc.TextureCache.main.Load(url, function (err, tex) {
                        if (err) {
                            cc.Debug.Log(err.message || err);
                        }
                        //this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
                        this.UpdateIcon(tex, this.colorSel);
                        this.LayOut();
                    }.bind(this));

                    var str = game.ShapeTitleOfItem(info);
                    this.textTitle.string = str;
                    this.textDetail.string = game.GameStatusOfShape(info);
                    cc.Debug.Log("textDetail=" + this.textDetail.string);
                }

                break;
            case UILearnProgressCellItem.ITEM_TYPE_COLOR:
                {

                    this.indexShape = Math.floor(game.listShape.length / 2);
                    var infoshape = game.listShape[this.indexShape];
                    var url = cc.AppRes.main().URL_HTTP_HEAD + infoshape.pic;
                    cc.TextureCache.main.Load(url, function (err, tex) {
                        if (err) {
                            cc.Debug.Log(err.message || err);
                            return;
                        }
                        //this.imageBg.spriteFrame = new cc.SpriteFrame(tex);
                        this.UpdateIcon(tex, info.color);
                        this.LayOut();
                    }.bind(this));

                    var str = game.ColorTitleOfItem(info);
                    this.textTitle.string = str;
                    this.textDetail.string = game.GameStatusOfColor(info);

                }
                break;
        }

        this.UpdateImageBg(UISetting.listImage[this.index % 3]);

        this.LayOut();
    },

    UpdateImageBg: function (pic) {
        //不会保留图片的sliced参数
        // cc.TextureCache.main.Load(pic, function (err, tex) {
        //     if (err) {
        //         cc.Debug.Log(err.message || err);
        //         return;
        //     }
        //     this.imageBg.spriteFrame = new cc.SpriteFrame(tex);

        // }.bind(this));

        //ok  会保留图片的sliced参数
        cc.loader.loadRes(pic, cc.SpriteFrame, function (err, frame) {
            if (err) {
                cc.Debug.Log(err.message || err);

                return ret;
            }
            this.imageBg.spriteFrame = frame;
        }.bind(this));
    },

    LayOut: function () {
    },

});

