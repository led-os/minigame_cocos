
var UIView = require("UIView");
cc.Class({
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
        title: 'title'
    },


    CreateObjController: function () {

        if (this.objController == null) {
            this.objController = new cc.Node('Controller');
            this.ViewDidLoad();
        }

    },

    DestroyObjController: function () {
        this.ViewDidUnLoad();
    },

    //SetViewParent
    SetViewParent: function (node) {

        cc.log("SetViewParent node");
        if (node == null) {
            cc.log("SetViewParent node is null");
        }
        if (this.objController == null) {
            this.CreateObjController();
        }
        if (this.objController == null) {
            cc.log("objController is null");
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
    }


});




// var Shape =cc.Class({
//      extends: UIViewController,

// });  

