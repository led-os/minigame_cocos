

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
        if (this.clickEvents.length) {
            var ev = this.clickEvents[0];
            ev.target = this.node;
            ev.component = "AnimateButton";
            ev.handler = "OnClickItem";
        }

    },

    OnClickItem: function (event, customEventData) {
        cc.Debug.Log("AnimateButton OnClickItem");
        var duration = 0.2;

        var actionTo1 = cc.scaleTo(duration / 2, 1.2);
        var actionTo2 = cc.scaleTo(duration / 2, 1);
        //delay延时
        var time = cc.delayTime(0.01);
        var seq = cc.sequence([time, actionTo1, actionTo2, cc.callFunc(function () {
            this.DoClickItem(event, customEventData);
        }.bind(this))]);
        this.node.runAction(seq);

        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            cc.AudioPlay.main().PlayCloudAudio("BtnClick.mp3");
        }

    },

    DoClickItem: function (event, customEventData) {
        cc.Component.EventHandler.emitEvents(this.clickAnimateEvents, event);
        //this.node.emit('click', this);
        // event.stopPropagation();
    },

});

cc.AnimateButton = module.export = AnimateButton;



