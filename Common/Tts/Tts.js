var Tts = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        accessToken: "",
        GetTextUrl: function (str) {
            //百度语音官方文档 http://yuyin.baidu.com/docs/tts/133
            //https://www.cnblogs.com/kasher/p/8483274.html
            //MP3:https://blog.csdn.net/zhang_ruiqiang/article/details/50774570
            //mpga 格式：https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=
            // var url = "https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" + str;

            var url = "https://tsn.baidu.com/text2audio?&lan=zh&cuid=moon&ctp=1&tok=24.b79c9ea129a4009fc20b0b542d1aa8e4.2592000.1554471263.282335-15699370&tex=" + str;
            cc.Debug.Log(url);
            return url;
        },
        //认证权限access_token 
        GetBaiDuAccessToken: function () {

            //app: 儿童游戏
            var url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=5kkNuRq7npqTCEUMojvyoyX3&client_secret=rod6yBGG7HobkYVKUci2Z1GQ0zGkzwnZ";

            // cc.loader.load(url, function (err, rootJson) {
            //     if (err) {
            //         cc.Debug.Log("GetBaiDuAccessToken fail");
            //         cc.Debug.Log(err.message || err);
            //         return;
            //     }
            //     this.ParseData(rootJson);

            // }.bind(this));

            var httpReq = new cc.HttpRequest();
            httpReq.Get(url, function (err, data) {
                if (err) {
                    cc.Debug.Log("GetBaiDuAccessToken err");
                    cc.Debug.Log(err);
                    return;
                }
                console.log("GetBaiDuAccessToken=" + data);

                // var b = new Blob([data]);
                // var r = new FileReader();
                // r.readAsText(b, 'utf-8');
                // r.onload = function (e) {
                //     console.log("GetBaiDuAccessToken r=" + r.result);
                // };

                var str = String.fromCharCode.apply(null, new Uint8Array(data));
                console.log("GetBaiDuAccessToken str=" + str);
            }.bind(this));
        },

        ParseData: function (json) {
            if (json == null) {
                cc.Debug.Log("ParseData=null");
                return;
            }

            var v = json.access_token;
            cc.Debug.Log("access_token=" + v);
            Tts.accessToken = v;


        },

        Speak: function (str, isnet) {
            this.GetBaiDuAccessToken();

            var url = Tts.GetTextUrl(str);
            if (cc.Common.main().isWeiXin) {
                cc.TtsWeiXin.Speak(url);
            } else if (cc.sys.isBrowser) {
                this.SpeakWeb(str);
            }

            else {
                //  this.SpeakWeb(str);
                //cc.AudioPlay.main().PlayUrl(url);
                if (isnet) {
                    if (cc.sys.isNative) {
                        cc.AudioPlay.main().PlayUrlByDownload(url);
                    }
                }
            }

        },


        SpeakWeb: function (str) {
            //添加mp3后缀 让cc.loader.load认为加载声音资源
            var ext = "&1.mp3";
            var url = Tts.GetTextUrl(str + ext);
            //url = "https://cdn.feilaib.top/img/sounds/bg.mp3";
            cc.AudioPlay.main().PlayUrl(url);
        },
    },
});

cc.Tts = module.export = Tts; 
