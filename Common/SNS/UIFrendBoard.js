// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var UIView = require("UIView");

cc.Class({
    extends: UIView,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        btnBack: cc.Button,
        tableView: cc.TableView,

        imageBg: cc.Sprite,
        imageBoard: cc.Sprite,
        nodeContent: cc.Node,
        textTitle: cc.Label,
        oneCellNum: 1,
        heightCell: 160,
        listItem: {
            default: [],
            type: cc.Object
        },

        displayOpenData: cc.Sprite,//微信小程序 开放数据域
        texCanvas: cc.Texture2D,
        isShowRanking: false,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.UnifyButtonSprite(this.btnBack);
        this.texCanvas = new cc.Texture2D();
        this.isShowRanking = false;
        if (cc.Common.main().isWeiXin) {
            this.displayOpenData.node.active = true;
            this.nodeContent.active = false;
        } else {
            this.displayOpenData.node.active = false;
            this.nodeContent.active = true;
        }
    },

    start() {
        if (cc.Common.main().isWeiXin) {
            this.Show(true);
        }

    },

    _updaetSubDomainCanvas() {
        if (!this.texCanvas) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.texCanvas.initWithElement(sharedCanvas);
        this.texCanvas.handleLoadedTexture();
        this.displayOpenData.spriteFrame = new cc.SpriteFrame(this.texCanvas);

        //cc.Debug.Log("UIFrendBoard::texCanvas w=" + this.texCanvas.width + " h=" + this.texCanvas.height + " sz = " + this.displayOpenData.node.getContentSize());

    },

    update() {
        if (this.isShowRanking) {
            if (cc.Common.main().isWeiXin) {
                this._updaetSubDomainCanvas();
            }
        }
    },
    messageSharecanvas(type, text) {
        // 排行榜也应该是实时的，所以需要sharedCanvas 绘制新的排行榜
        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            type: type || 'friends',
            text: text,
        });


        // 向子域发送消息 请注意此处key的值，和之前上传的key一致
        // 若实现的是群排行，则需要传shareTicket(可从onShow中获得)
        // wx.getOpenDataContext().postMessage({
        //   keyName: "person_total_money",
        //   shareTicket: this.shareTicket,
        //   keyUsername: "username",
        //   keyUnit: "金蛋",
        // });
        // this.loopRank()
    },

    Show(isShow) {
        this.isShowRanking = isShow;
        if (cc.Common.main().isWeiXin) {
            //this.displayOpenData.node.active = isShow;
            if (isShow) {
                this.messageSharecanvas()
            }
        } else {

        }

    },


    OnClickBtnBack(event, customEventData) {
        if (this.controller != null) {
            this.controller.Close();
        }
    },

});
