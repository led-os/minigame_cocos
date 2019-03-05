var Tts = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        GetTextUrl: function (str) {
            //百度
            var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" + str;
            cc.Debug.Log(url);
            return url;
        },

        Speak: function (str, isnet) {
            if (isnet) {
                if (cc.sys.isNative) {
                    cc.AudioPlay.main().PlayUrl(Tts.GetTextUrl(str));
                }
            }

        },
    },
});

cc.Tts = module.export = Tts; 
