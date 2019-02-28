var UIViewController = require("UIViewController");
// var Common = require("Common");

cc.Class({
    extends: cc.Component,
    properties: {
        mainCam: {
            //ui层 必须放在canvas下
            default: null,
            type: cc.Camera//GameObject
        },
        controller: {
            default: null,
            type: UIViewController,
        },

        frame: {
            default: null,
            type: cc.rect,
        },
        title: 'title',
        objTag: cc.Object,
    },

    onLoad: function () {
        //this._super();
        //this.node.setContentSize(this.node.parent.getContentSize());
    },

    //UIViewController
    SetController: function (con) {
        this.controller = con;
        this.node.parent = con.objController;
        con.view = this;

        // this.node.setContentSize(Common.appSceneMain.sizeCanvas); 
        // this.node.setPosition(0, 0, 0);

    },

    SetViewParent: function (node) {
        // this.transform.parent = obj.transform;
        // this.transform.localScale = new Vector3(1f, 1f, 1f);
        // this.transform.localPosition = new Vector3(0f, 0f, 0f);
        this.node.parent = node;
    },

    LayOut: function () {

    },

    //统一按钮状态图片
    UnifyButtonSprite: function (btn) {
        if (btn != null) {
            btn.pressedSprite = btn.normalSprite;
            btn.hoverSprite = btn.normalSprite;
        }
    },
});


