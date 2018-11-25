

cc.Class({
    extends: cc.Node,
    properties: {
        objController: {
            //ui层 必须放在canvas下
            default: null,
            type: cc.Node//GameObject
        },
        // defaults, set visually when attaching this script to the Canvas
        name: 'UIViewController',
        title: 'title'
    }
});




// var Shape =cc.Class({
//      extends: UIViewController,

// });  

