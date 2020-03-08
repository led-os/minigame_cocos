var UIView = require("UIView");
// var Common = require("Common"); 
//var LayoutScale = require("LayoutScale");
var UIHomeAppCenter = require("UIHomeAppCenter");
var GameViewController = require("GameViewController");

cc.Class({
    extends: UIView,
    properties: {
        btnAdVideo: {
            default: null,
            type: cc.Button
        },
        topBar: {
            default: null,
            type: cc.Node
        },
        layoutBtn: {
            default: null,
            type: cc.Node
        },
        btnFrendBoard: cc.Button,
        imageBg: cc.UIImage,
        imageNameBg: cc.UIImage,// cc.Sprite,
        textName: cc.UIText,//cc.Label,
        uiPrefabAppCenter: cc.Prefab,

    },

    onLoad: function () {
        this._super();
        // this.node.setContentSize(Common.appSceneMain.sizeCanvas); 
        this.node.setContentSize(this.node.parent.getContentSize());
        var x, y, w, h;

        var size = this.node.getContentSize();
        if (this.textName == null) {
            return;
        }
        var name = cc.Language.main().GetString("APP_NAME");
        if (cc.Device.main.isLandscape) {
            name = cc.Language.main().GetString("APP_NAME_HD");
        }
        this.textName.text = name;
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
        cc.Debug.Log("KEY_BACKGROUND_MUSIC home=" + ret);
        if (ret) {
            if (cc.Config.main().APP_FOR_KIDS) {
                //cc.Tts.Speak(name);
            }

        }
        //w = 1024;

        // var oft = 50;
        // cc.TextureUtil.UpdateSpriteImage({
        //     sprite: this.imageNameBg.image,
        //     pic: cc.CloudRes.main().uiRootPath + "/" + cc.AppRes.IMAGE_HOME_NAME_BG,//IMAGE_HOME_NAME_BG
        //     type: cc.Sprite.Type.SLICED,//SLICED
        //     left: oft,
        //     right: oft,
        //     top: oft,
        //     bottom: oft,
        //     success: function () {
        //         this.LayOut();
        //     }.bind(this),
        // });


        // this.LayOut();
        var x_start, y_start;

        h = this.imageNameBg.node.getContentSize().height;
        x_start = 0;
        y_start = size.height / 4;
        this.imageNameBg.node.setPosition(x_start, y_start);

        cc.AudioPlay.main().PlayBgMusic();

        if (cc.Common.main().isWeiXin) {
            //显示分享
            wx.showShareMenu();
            cc.Share.main().SetWeiXinMPShareMenu(cc.AppRes.SHARE_TITLE, cc.AppRes.SHARE_IMAGE_URL);
        }


        //home app center
        this.LoadPrefabAppCenter();

    },

    start() {
        var hteXT = cc.Common.GetTextHeight(this.textName.text, this.textName.fontSize);
    },

    LoadPrefabAppCenter: function () {
        var strPrefab = "Common/Prefab/Home/UIHomeAppCenter";
        cc.PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                cc.Debug.Log("LoadPrefab err:" + err.message || err);
                return;
            }
            this.uiPrefabAppCenter = prefab;
            var node = cc.instantiate(this.uiPrefabAppCenter);
            var ui = node.getComponent(UIHomeAppCenter);
            node.parent = this.node;

        }.bind(this)
        );
    },

    GetTopBarHeight: function () {
        var h = 0;
        if (this.topBar != null) {
            h = this.topBar.getContentSize().height;
        }
        return h;
    },

    GetPosOfImageName: function () {
        var topbar_h = this.GetTopBarHeight();
        var size = this.node.getContentSize();
        var x, y;
        //layoutbtn:
        x = 0;
        y = (size.height / 2 - topbar_h) / 2;
        return new cc.Vec2(x, y);
    },

    LayOut: function () {
        this._super();
        //  LayoutScale.ScaleImage(this.imageBg,true);
        var topbar_h = this.GetTopBarHeight();
        var size = this.node.getContentSize();
        var x, y, w, h;
        //layoutbtn:
        var pt = this.GetPosOfImageName();
        //  this.imageNameBg.node.setPosition(pt.x, pt.y);

        // this.textName.node.setPosition(this.imageNameBg.node.getPosition());

        // var rctran = this.textName.getComponent(cc.RectTransform);
        // if (rctran) {
        //     rctran.LayOut();
        // }
        //TextName
        //   size = this.textName.node.getContentSize();
        //  cc.Debug.Log("size TextName= " + size);

        var ratio = 1.5;
        var fontsize = this.textName.fontSize;
        w = cc.Common.GetTextWidth(this.textName.text, fontsize) + fontsize * 3;
        var w_max = size.width * 0.7;
        if (w > w_max) {
            w = w_max;
            h = fontsize * 3 * ratio;
        } else {
            h = fontsize * ratio;
        }

        this.imageNameBg.SetContentSize(w, h);
    },


    RunActionImageName: function (duration, callback) {
        //动画：https://blog.csdn.net/agsgh/article/details/79447090
        //iTween.ScaleTo(info.obj, new Vector3(0f, 0f, 0f), 1.5f);
        // var dur = 1.0;
        var size = this.node.getContentSize();
        var x_start, y_start, x_end, y_end, w, h;
        var pt = this.GetPosOfImageName();
        x_end = pt.x;
        y_end = pt.y;

        h = this.imageNameBg.node.getContentSize().height;
        x_start = 0;
        y_start = size.height / 2 + h;
        this.imageNameBg.node.setPosition(x_start, y_start);
        cc.Debug.Log("RunActionImageName:x_start=" + x_start + " y_start=" + y_start + " x_end=" + x_end + " y_end=" + y_end + " size=" + size);

        var action = cc.moveTo(duration, x_end, y_end).easing(cc.easeOut(3.0));
        //delay延时
        var time = cc.delayTime(0.1);

        var fun = cc.callFunc(function () {
            if (callback != null) {
                callback();
            }
            // this.LayOut();
        }.bind(this));
        var seq = cc.sequence([time, action, fun]);
        this.imageNameBg.node.runAction(seq);
    },

    OnClickBtnFrendBoard: function (event, customEventData) {
        cc.FrendBoard.main().Show();
    },
});

