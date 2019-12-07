

var AnimateButton = cc.Class({
    extends: cc.Button,
    editor: CC_EDITOR && {
        menu: "UIKit/UIButton/AnimateButton",
        help: " ",
        // inspector: ' ',
    },

    statics: {

    },
    properties: {
        /**
             * !#en If Button is clicked, it will trigger event's handler
             * !#zh 按钮的点击事件列表。
             * @property {Component.EventHandler[]} clickEvents
             */
        clickAnimateEvents: {
            default: [],
            type: cc.Component.EventHandler,
            // tooltip: CC_DEV && 'i18n:COMPONENT.button.click_events',
        }
    },


    onLoad: function () {

    },

    OnClickItem: function (event, customEventData) {
        cc.Debug.Log("AnimateButton OnClickItem");
        var duration = 0.2;

        var actionTo1 = cc.scaleTo(duration, 0.5);
        var actionTo2 = cc.scaleTo(duration, 1);
        //delay延时
        var time = cc.delayTime(0.1);
        var seq = cc.sequence([time, actionTo1, actionTo2, cc.callFunc(function () {
            this.DoClickItem(event, customEventData);
        }.bind(this))]);
        this.node.runAction(seq);

    },

    DoClickItem: function (event, customEventData) {
        cc.Component.EventHandler.emitEvents(this.clickAnimateEvents, event);
        //this.node.emit('click', this);
        // event.stopPropagation();
    },

});

cc.AnimateButton = module.export = AnimateButton;



