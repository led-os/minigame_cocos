var UIView = require("UIView");
var Common = require("Common");
cc.Class({
    extends: UIView,
    properties: {
        btnAdVideo: {
            default: null,
            type: cc.Button
        },
        objTopBar: {
            default: null,
            type: cc.Node
        },
        objLayoutBtn: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
        var x, y, w, h;
        // if(AppSceneBase.main==null){
        //     cc.log(" AppSceneBase.main size is null");
        // }else{
        //     cc.log(" AppSceneBase.main size is not null");
        // }
        w = Common.appSceneBase.sizeCanvas.width;
        var size = this.objTopBar.getContentSize();
        h = size.height;
        y = Common.appSceneBase.sizeCanvas.height / 2 - h / 2;
        this.objTopBar.setContentSize(cc.size(w, h));
        this.objTopBar.setPosition(0, y, 0);


        cc.log("objTopBar size=" + size);
        size = this.objLayoutBtn.getContentSize();
        h = size.height;
        y = -Common.appSceneBase.sizeCanvas.height / 2 + h / 2;
        this.objLayoutBtn.setContentSize(cc.size(w, h));
        this.objLayoutBtn.setPosition(0, y, 0);

        cc.log("objLayoutBtn size=" + size);
    },
});

