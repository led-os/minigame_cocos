var Tts = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        GetTextUrl: function (str) {
            //百度
            //https://www.cnblogs.com/kasher/p/8483274.html
            //MP3:https://blog.csdn.net/zhang_ruiqiang/article/details/50774570
            //mpga 格式：https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=
            var url = "https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" + str;
            cc.Debug.Log(url);
            return url;
        },

        Speak: function (str, isnet) {
            if (cc.Common.main().isWeiXin) {
                cc.TtsWeiXin.Speak(Tts.GetTextUrl(str));
            } else {
                if (isnet) {
                    if (cc.sys.isNative) {
                        cc.AudioPlay.main().PlayUrl(Tts.GetTextUrl(str));
                    }
                }
            }

        },
    },
});

cc.Tts = module.export = Tts; 
