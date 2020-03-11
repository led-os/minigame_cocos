var UIViewController = require("UIViewController");
// var Common = require("Common");

var UIView = cc.Class({
    extends: cc.Component,
    properties: {
        mainCam: {
            //ui层 必须放在canvas下
            default: null,
            type: cc.Camera//GameObject
        },
        _controller: {
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

        controller: {
            get: function () {
                if (this._controller == null) {
                    var max = 100;
                    var i = 0;
                    while (i < max) {
                        i++;
                        var par = this.node.parent;
                        // cc.Debug.Log("UIHomeCenterBar controller ");
                        if (par == null) {
                            cc.Debug.Log("UIView controller par is null");
                            break;
                        } else {
                            cc.Debug.Log("UIView controller par");
                        }
                        var view = par.getComponent(UIView);
                        //view = par.view;
                        if (view != null) {
                            var type = typeof view;
                            cc.Debug.Log("UIView type=" + type);
                            this._controller = view._controller;
                            if (this._controller != null) {
                                break;
                            }
                        } else {
                            break;
                        }

                    }
                }
                return this._controller;
            },
            set: function (value) {
                this._controller = value;
            },
        },


        /*
     { 
     OnUpdateImageFinish: function (ui) {
     },  
 
     }
     */
        objCallBack: null,
    },

    onLoad: function () {
        //this._super();
        //this.node.setContentSize(this.node.parent.getContentSize());
        // this.node.view = this;
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

    GetKeyImage() {
        var ret = "";
        if (!cc.Common.isBlankString(this.keyImage)) {
            ret = cc.ImageRes.main().GetImageSync(this.keyImage);
        }
        return ret;
    },

    GetImageOfKey(key) {
        var ret = "";
        if (!cc.Common.isBlankString(key)) {
            ret = cc.ImageRes.main().GetImageSync(key);
        }
        return ret;
    },

    UpdateLanguage() {

    },


    AddChild(child) {
        child.node.setParent(this.node);
        this.LayOut();
    },
});


