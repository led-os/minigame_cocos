var UIWordContentBase = require("UIWordContentBase");
var UIWordImageText = cc.Class({
    extends: UIWordContentBase,// cc.ItemInfo, 


    statics: {
        GUANKA_GROUP_ITEM_NUM: 5,
        STR_UNKNOWN_WORD: "__",
        TIME_ANIMATE_ERROR: 2.0,
        COUNT_ANIMATE_ERROR: 10,
    },


    properties: {
        imageBg: cc.Sprite,
        textTitle: cc.Label,
        imagePic: cc.Sprite,
        imagePicBoard: cc.Sprite,
        objText: null,

        // int[] listIndexAnswer;

        //  public List<AnswerInfo> listAnswerInfo;//
    },

    onLoad: function () {

    },

    LayOut() {

    },

});

