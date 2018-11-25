var UIViewController = require("UIViewController");
cc.Class({
    extends: cc.Object,
    properties: {
        mainCam: {
            //ui层 必须放在canvas下
            default: null,
            type: cc.Camera//GameObject
        },
        // defaults, set visually when attaching this script to the Canvas
        name: 'UIView',
        title: 'title',
        controller: {
            default: null,
            type: UIViewController
        }

    }
});




// var Shape =cc.Class({
//      extends: UIViewController,

// });  

