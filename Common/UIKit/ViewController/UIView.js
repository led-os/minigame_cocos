var UIViewController = require("UIViewController");
cc.Class({
    extends: cc.Component,
    properties: {
        mainCam: {
            //ui层 必须放在canvas下
            default: null,
            type: cc.Camera//GameObject
        },
        title: 'title',
        controller: {
            default: null,
            type: UIViewController
        }

    },

    //UIViewController
    SetController: function (con) {
        this.controller = con;
        this.node.parent = con.objController;
        con.view = this;
    },

    SetViewParent: function (node) {
        // this.transform.parent = obj.transform;
        // this.transform.localScale = new Vector3(1f, 1f, 1f);
        // this.transform.localPosition = new Vector3(0f, 0f, 0f);
    },
});
 

