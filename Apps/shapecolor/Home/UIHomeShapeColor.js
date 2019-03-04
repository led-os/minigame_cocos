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

        indexAction: 0,
        listBtns: {
            default: [],
            type: cc.Button
        },
        timeAction: 0.3,
        isActionFinish: false,
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

        this.listBtns.length = 0;
        this.listBtns.push(this.btnShape);
        this.listBtns.push(this.btnColor);
        this.listBtns.push(this.btnShapeColor);

        this.isActionFinish = false;
        cc.GameManager.main().ParseGuanka(null);

        if (cc.Common.main().isAndroid) {

        }

        cc.ShaderManager.main().Add(require("ShaderShapeColor"));
        cc.ShaderManager.main().Add(require("Glowing"));

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

        this.LayOut();
        this.InitBtnPos();
        this.indexAction = 0;

        this.RunActionImageName(this.timeAction, function () {
            this.RunActionBtn();
        }.bind(this)
        );
    },

    start: function () {

    },

    LayOut: function () {
        this._super();
        var size = this.node.getContentSize();
        var x, y, w, h;

        var pt = this.imageNameBg.node.getPosition();
        var y_top = pt.y - this.imageNameBg.node.getContentSize().height / 2;
        var y_bottom = -size.height / 2;

        //layoutbtn:
        // x = 0;
        // y = (y_top + y_bottom) / 2;
        // this.layoutBtn.setPosition(x, y);

    },

    GetPosOfBtn: function (btn, idx) {
        var x, y, w, h;
        var size = this.node.getContentSize();
        var pt = this.imageNameBg.node.getPosition();
        var y_top = pt.y - this.imageNameBg.node.getContentSize().height / 2;
        var y_bottom = -size.height / 2;
        var x_center = 0;
        var y_center = (y_top + y_bottom) / 2;

        w = btn.node.getBoundingBox().width;

        var x_space = 16;
        var w_rect = w * this.listBtns.length + (this.listBtns.length - 1) * x_space;
        var x_left = x_center - w_rect / 2;
        x = (x_left + w / 2) + (w + x_space) * idx;
        y = y_center;
        return new cc.Vec2(x, y);
    },

    InitBtnPos() {
        var x, y, w, h;
        var size = this.node.getContentSize();
        for (var i = 0; i < this.listBtns.length; i++) {
            var btn = this.listBtns[i];
            h = btn.node.getBoundingBox().height;
            var pt = this.GetPosOfBtn(btn, i);
            x = pt.x;
            y = -size.height / 2 - h;
            //y = 0;
            btn.node.setPosition(x, y);
        }

    },
    RunActionBtn() {
        //动画：https://blog.csdn.net/agsgh/article/details/79447090
        //iTween.ScaleTo(info.obj, new Vector3(0f, 0f, 0f), 1.5f);
        var duration = this.timeAction;
        var size = this.node.getContentSize();
        var x_start, y_start, x_end, y_end, w, h;
        var btn = this.listBtns[this.indexAction];

        var pt = this.GetPosOfBtn(btn, this.indexAction);
        x_end = pt.x;
        y_end = pt.y;


        cc.log("RunActionBtn:pt=" + pt + " idx=" + this.indexAction);

        var action = cc.moveTo(duration, x_end, y_end).easing(cc.easeOut(3.0));

        var fun = cc.callFunc(function () {
            if (this.indexAction < this.listBtns.length) {
                this.RunActionBtn();
                this.indexAction++;
            } else {
                this.isActionFinish = true;
                this.RunActionUpDown();
            }
        }.bind(this));
        var seq = cc.sequence([action, fun]);
        btn.node.runAction(seq);
    },

    //上下晃动动画
    RunActionUpDown() {
        //动画：https://blog.csdn.net/agsgh/article/details/79447090
        //iTween.ScaleTo(info.obj, new Vector3(0f, 0f, 0f), 1.5f);
        var duration = this.timeAction * 4;
        var size = this.node.getContentSize();
        var w, h;
        // var btn = this.listBtns[this.indexAction];

        // var pt = this.GetPosOfBtn(btn, this.indexAction);
        // x_end = pt.x;
        // y_end = pt.y;

        for (var i = 0; i < this.listBtns.length; i++) {
            var btn = this.listBtns[i];
            h = btn.node.getBoundingBox().height;
            var y_step = h / 10;
            var actionUp = cc.moveBy(duration, 0, y_step);
            var actionDown = cc.moveBy(duration, 0, -y_step);
            var time = cc.delayTime(0.5 * i);
            var seq = cc.sequence([time, actionUp, actionUp.reverse(), actionDown, actionDown.reverse()]);
            btn.node.runAction(seq.repeatForever());
        }
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
        if (!this.isActionFinish) {
            return;
        }
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE);
    },
    OnClickBtnColor: function (event, customEventData) {
        if (!this.isActionFinish) {
            return;
        }
        this.GotoGameByMode(GameShapeColor.GAME_MODE_COLOR);
    },
    OnClickBtnShapeColor: function (event, customEventData) {
        if (!this.isActionFinish) {
            return;
        }
        this.GotoGameByMode(GameShapeColor.GAME_MODE_SHAPE_COLOR);
    },
    OnClickBtnBoard: function (event, customEventData) {

        if (this.controller != null) {
            var navi = this.controller.naviController;
            navi.Push(LearnProgressViewController.main());
        }

    },
});

