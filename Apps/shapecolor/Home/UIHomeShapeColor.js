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
        //     // cc.Debug.Log('Should load a texture from RESTful API by specify the type: ' + (tex instanceof cc.Texture2D));

        //     if (err) {
        //         cc.Debug.Log("cc.loader.load err start");
        //         cc.Debug.Log(err.message || err);
        //         cc.Debug.Log("cc.loader.load err end");
        //     } else {
        //         cc.Debug.Log("cc.loader.load");
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

        var key = "keyddd2";
        var v = cc.sys.localStorage.getItem(key);
        cc.Debug.Log("testkey=" + key + " v=" + v);
        cc.sys.localStorage.setItem(key, true);
        var v1 = cc.sys.localStorage.getItem(key);
        cc.Debug.Log("testkey2=" + key + " v=" + v1);

        if (cc.Common.main().isWeiXin) {
            //https://blog.csdn.net/u014466109/article/details/81100304
            //video :https://blog.csdn.net/haibo19981/article/details/81251882
            // let winSize = wx.getSystemInfoSync();

            // console.log(winSize);
            // let bannerHeight = 80;
            // let bannerWidth = 300;

            // this._bannerAd = wx.createBannerAd({
            //     adUnitId: 'adunit-549b2e8b53ad8e21', //填写广告id
            //     style: {
            //         left: (winSize.windowWidth - bannerWidth) / 2,
            //         top: winSize.windowHeight - bannerHeight,
            //         width: bannerWidth,
            //     }
            // });
            // this._bannerAd.show(); //banner 默认隐藏(hide) 要打开
            // //微信缩放后得到banner的真实高度，从新设置banner的top 属性
            // this._bannerAd.onResize(res => {
            //     this._bannerAd.style.top = winSize.windowHeight - this._bannerAd.style.realHeight;
            // });
        }

        /*
        var JSZip = require('jszip');
        var zip = new JSZip();

        zip.file("Hello.txt", "Hello World\n");

        // var img = zip.folder("images");
        // img.file("smile.gif", imgData, { base64: true });


        // 压缩
        // zip.generateAsync({
        //     // 压缩类型选择nodebuffer，在回调函数中会返回zip压缩包的Buffer的值，再利用fs保存至本地
        //     type: "blob",//blob nodebuffer
        //     // 压缩算法
        //     compression: "DEFLATE",
        //     compressionOptions: {
        //         level: 9
        //     }

        zip.generateAsync({ type: 'blob' })
            .then(function (content) {
                cc.Debug.Log("zip generateAsync ok" + " type=" + typeof content + " content=" + content);
                // 写入磁盘 
                //if (cc.sys.isNative) 
                {
                    //https://cocos2d-x.org/reference/html5-js/V3.0/symbols/jsb.fileUtils.html
                    //  var path = jsb.fileUtils.getWritablePath() + "tmp_test.zip";
                    // cc.Debug.Log('zip PATH: ' + path);



                    //                 var reader = new FileReader()
                    //                 reader.onload = function () {
                    //                     var buffer = new Buffer(reader.result)
                    //                     //temp文件夹应已存在
                    //                     fs.writeFile(`temp/${Date.now()}.mp4`, buffer, {}, (err, res) =& gt; {
                    //                         if (err) {
                    //                             console.error(err)
                    //                             return
                    //                         }
                    //                         console.log('video saved')
                    //                     })
                    // } 
                   // saveAs(content, "example.zip");

                    var blob = new Blob(['中文字符串'], {
                        type: 'text/plain'
                    });
                    var r = new FileReader();
                    r.onload = function (e) {
                        console.log("zip r=" + r.result);
                        console.info("zip info r=" +r.result);
                        //  jsb.fileUtils.writeDataToFile(new Uint8Array(r.result), path);

                        // var buf = new Uint8Array(r.result);
                        // console.info(buf); //[228, 184, 173, 230, 150, 135, 229, 173, 151, 231, 172, 166, 228, 184, 178]
                        // r.readAsText(new Blob([buf]), 'utf-8');
                        // r.onload = function () {
                        //     console.info("zip text="+r.result); //中文字符串
                        // };
                    };
                    r.readAsArrayBuffer(content);
                    console.log("zip readAsArrayBuffer end=" + r.result);
                }

            });
            */


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


        cc.Debug.Log("RunActionBtn:pt=" + pt + " idx=" + this.indexAction);

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

        if (cc.Config.main().appKeyName == cc.AppType.SHAPECOLOR) {
            cc.GameManager.placeLevel = mode;
        }

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

