var TtsUtil = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        GetTextUrl: function (str) {
            //百度
            return "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" + str;
        },

    },
});

cc.TtsUtil = module.export = TtsUtil; 
