var UIHomeBase = require("UIHomeBase");
var AppRes = require("AppRes");
//var LayoutScale = require("LayoutScale");
// var Common = require("Common");
var PlaceViewController = require("PlaceViewController");
var GuankaViewController = require("GuankaViewController");
//var NaviViewController = require("NaviViewController"); 
var GameShapeColor = require("GameShapeColor");
var LearnProgressViewController = require("LearnProgressViewController");

cc.Class({
    extends: UIHomeBase,
    properties: {
        btnShape: {
            default: null,
            type: cc.Button
        },
        btnColor: {
            default: null,
            type: cc.Button
        },
        btnShapeColor: {
            default: null,
            type: cc.Button
        },
        btnBoard: {
            default: null,
            type: cc.Button
        },
    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        //物理系统默认是关闭的，手动开启物理系统
        cc.Common.EnablePhysic(true, false);

        this.UnifyButtonSprite(this.btnShape);
        this.UnifyButtonSprite(this.btnColor);
        this.UnifyButtonSprite(this.btnShapeColor);
        this.UnifyButtonSprite(this.btnBoard);
        cc.GameManager.main().ParseGuanka(null);
        
        if (cc.Common.main().isAndroid) {

        }

        //var ev = this.node.addComponent(cc.UITouchEvent);

        // cc.AudioPlay.main().PlayFile("App/Audio/BtnClick");
        // cc.loader.load(cc.url.raw('resources/App/Audio/BtnClick.mp3'), function (err, audio) {
        //     cc.AudioPlay.main().PlayAudioClip(audio);
        // }.bind(this));

        // cc.loader.load({ url: 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=你要转换的文字 ', type: 'mp3' }, function (err, data) {
        //     // cc.log('Should load a texture from RESTful API by specify the type: ' + (tex instanceof cc.Texture2D));

        //     if (err) {
        //         cc.log("cc.loader.load err start");
        //         cc.log(err.message || err);
        //         cc.log("cc.loader.load err end");
        //     } else {
        //         cc.log("cc.loader.load");
        //         //cc.AudioPlay.main().PlayAudioClip(audio);
        //         var no = new cc.Node();
        //         var component = no.addComponent(cc.AudioSource);
        //         component.clip = data;
        //         component.play();
        //         // self.node.addChild(no);
        //     }



        // }.bind(this));




        // {


        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange = function () {
        //         cc.log("xhr.readyState  " + xhr.readyState);
        //         cc.log("xhr.status  " + xhr.status);
        //         if (xhr.readyState === 4) {
        //             if (xhr.status === 200) {
        //                 //responseType一定要在外面设置
        //                 // xhr.responseType = 'arraybuffer'; 
        //                 this.saveFile(xhr.response, path);
        //             } else {

        //             }
        //         }
        //     }.bind(this);
        //     //responseType一定要在外面设置
        //     xhr.responseType = 'arraybuffer';
        //     xhr.open("GET", url, true);
        //     xhr.send();
        // }
    },




    LayOut: function () {
    },
    GotoGameByMode: function (mode) {
        //AudioPlay.main.PlayFile(AppCommon.AUDIO_BTN_CLICK);
        cc.GameManager.gameMode = mode;
        //cc.GameManager.placeLevel = mode;
        if (this.controller != null) {
            var navi = this.controller.naviController;
            var total = cc.GameManager.placeTotal;
            if (cc.Config.main().appKeyName != cc.AppType.SHAPECOLOR) {
                total = 0;
            }
            if (total > 1) {
                if (navi != null) {
                    navi.Push(PlaceViewController.main());
                }

            }
            else {
                navi.Push(GuankaViewController.main());
            }
        }
    },

    OnClickBtnShape: function (event, customEventData) {
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE);
    },
    OnClickBtnColor: function (event, customEventData) {
        this.GotoGameByMode(GameShapeColor.GAME_MODE_COLOR);
    },
    OnClickBtnShapeColor: function (event, customEventData) {
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE_COLOR);
    },
    OnClickBtnBoard: function (event, customEventData) {

        if (this.controller != null) {
            var navi = this.controller.naviController;
            navi.Push(LearnProgressViewController.main());
        }

    },
});

