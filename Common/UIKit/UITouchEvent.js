var UITouchEvent = cc.Class({
    extends: cc.Component,
    statics: {
        TOUCH_DOWN: 0,
        TOUCH_MOVE: 1,
        TOUCH_UP: 2,
    },
    properties: {

        // uiTabBarPrefab: {
        //     default: null,
        //     type: cc.Prefab,
        // },
        // iDelegate: IPopViewControllerDelegate,

        // (UITouchEvent ev,int status, pos) 
        callBackTouch: null,
    },

    onLoad: function () {
        this.Init();
    },

    Init: function () {
        cc.log("UITouchEvent Init");

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var pos = event.getLocation();//canvas坐标原点在屏幕左下角
            var posnode = this.node.convertTouchToNodeSpace(event.touch);

            cc.log("UITouchEvent OnTouchDown:pos=" + pos+ " posnode="+posnode);
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_DOWN,pos);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var pos = event.getLocation();
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_MOVE,pos);
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var pos = event.getLocation();
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_UP,pos);
            }
        }, this);
    },



});

cc.UITouchEvent = module.export = UITouchEvent;


