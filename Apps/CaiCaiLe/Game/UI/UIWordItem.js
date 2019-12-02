var UIView = require("UIView");
var UIWordItem = cc.Class({
    extends: UIView,// cc.ItemInfo, 
    properties: {
        // public const float TIME_ANIMATE_ERROR = 2.0f;
        // public const int COUNT_ANIMATE_ERROR = 10;
        imageBg: cc.Sprite,
        textTitle: cc.Label,
        index: 0,
        wordDisplay: "",
        wordAnswer: "",//答案字符
        isShowContent: true,
        //  timerAnimate: TIME_ANIMATE_ERROR / COUNT_ANIMATE_ERROR,
        enableAnimate: false,
        countTemp: 0,

        isWordTips: false,
        /* 
           { 
           OnItemDidClick: function (ui) {
           }, 
           }
           */
        objCallBack: null,
    },

    onLoad: function () {

    },

    LayOut() {

    },

    UpdateTitle(str) {
        this.wordDisplay = str;
        this.textTitle.string = str;
    },
    ShowContent(isShow) {
        this.isShowContent = isShow;
        this.imageBg.node.active = isShow;
        this.textTitle.node.active = isShow;
    },
    //是否答对
    IsAnswer() {
        var ret = false;
        if (this.wordDisplay == this.wordAnswer) {
            ret = true;
        }
        return ret;
    },
    ClearWord() {
        this.UpdateTitle("");
    },
    SetWordColor(color) {
        this.textTitle.node.color = color;
    },

    SetFontSize(size) {
        this.textTitle.fontSize = size;
    },

    OnClickItem: function (event, customEventData) {
        if (this.isWordTips) {
            //提示字  不响应
            return;
        }
        if (this.objCallBack != null) {
            this.objCallBack.OnItemDidClick(this);
        }


    },

    StartAnimateError() {
        // enableAnimate = true;
        // countTemp = 0;
        // timerAnimate = TIME_ANIMATE_ERROR / COUNT_ANIMATE_ERROR;
    },

    StopAnimateError() {
        // if (enableAnimate)
        // {
        //     enableAnimate = false;
        //     StartCoroutine(TimerDidStop());
        //     Debug.Log("StopAnimateError");
        // }

    },
});

