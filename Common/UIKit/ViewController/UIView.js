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
        keyText: "",
        keyColor: "",
        keyImage: "",
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

    LayOut() {
        this.LayOutInternal();
    },

    LayOutNode(node) {
        {
            var list = node.getComponents(cc.LayOutBase);
            for (let ly of list) {
                if (ly) {
                    ly.LayOut();
                }
            }
            var rctran = node.getComponent(cc.RectTransform);
            if (rctran) {
                rctran.LayOut();
            }
        }
    },

    LayOutInternal() {
        //self 
        this.LayOutNode(this.node);

        //child
        var children = this.node._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            this.LayOutNode(child);
        }
    },

    LayOutDidFinish: function () {

    },

    //统一按钮状态图片
    UnifyButtonSprite: function (btn) {
        if (btn != null) {
            btn.pressedSprite = btn.normalSprite;
            btn.hoverSprite = btn.normalSprite;
        }
    },

    SetContentSize: function (w, h) {
        this.node.setContentSize(w, h);
        this.LayOut();
    },

    //js 默认参数方法： https://www.cnblogs.com/luotingliang/p/7250990.html
    GetKeyColor(def) {
        var ret = cc.Color.BLACK;
        if (def) {
            ret = def;
        }
        if (!cc.Common.isBlankString(this.keyColor)) {
            ret = cc.ColorConfig.main().GetColorSync(this.keyColor);
        }
        return ret;
    },
    GetKeyText() {
        var ret = "";
        if (!cc.Common.isBlankString(this.keyText)) {
            ret = cc.Language.main().GetString(this.keyText);
        }
        return ret;
    },

});


