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
    },

    onLoad: function () {

    },

    LayOut() {

    },

    UpdateTitle(str) {
        this.textTitle.string = str;
    },


});

