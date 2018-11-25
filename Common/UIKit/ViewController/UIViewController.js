

cc.Class({
    extends: cc.Node,
    properties: {
        objController: {
            //ui层 必须放在canvas下
            default: null,
            type: cc.Node//GameObject
        },
        title: 'title'
    },


    CreateObjController: function () {
        ViewDidLoad();
    },

    DestroyObjController: function () {
        ViewDidUnLoad();
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

