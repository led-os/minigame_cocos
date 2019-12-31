
var UIView = require("UIView");
// var Common = require("Common");

//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    properties: {
        objController: {
            //ui层 必须放在canvas下
            default: null,
            type: cc.Node//GameObject
        },
        view: {
            default: null,
            type: UIView
        },
        naviController: null,

        title: 'title'
    },


    CreateObjController: function () {

        if (this.objController == null) {
            this.objController = new cc.Node('Controller');
            this.objController.setContentSize(cc.Common.appSceneMain.sizeCanvas);

        }
        this.ViewDidLoad();


    },

    DestroyObjController: function () {
        this.ViewDidUnLoad();
        if (this.objController != null) {
            this.objController.destroy();
            this.objController = null;
        }
    },

    //SetViewParent
    SetViewParent: function (node) {

        cc.Debug.Log("SetViewParent node");
        if (node == null) {
            cc.Debug.Log("SetViewParent node is null");
        }
        if (this.objController == null) {
            this.CreateObjController();
        }
        if (this.objController == null) {
            cc.Debug.Log("objController is null");
        }
        this.objController.parent = node;
    },

    //UIView view
    AddView: function (view) {
    },

    //virtual
    LayOutView: function () {
    },
    ViewDidLoad: function () {
    },

    ViewDidUnLoad: function () {
    },
    UpdateLanguage() {
        if (this.view == null) {
            return;
        }
        //child
        var children = this.objController._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var viewchild = child.getComponent(cc.UIView);
            if (viewchild != null) {
                viewchild.UpdateLanguage();
            }
        }
    },

});




// var Shape =cc.Class({
//      extends: UIViewController,

// });  

