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

        // (UITouchEvent ev,int status, resource: any) 
        callBackTouch: null,
    },

    onLoad: function () {
        this.Init();
    },

    Init: function () {
        cc.log("UITouchEvent Init");

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.log("UITouchEvent OnTouchDown");
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_DOWN);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_MOVE);
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_UP);
            }
        }, this);
    },



});

cc.UITouchEvent = module.export = UITouchEvent;



