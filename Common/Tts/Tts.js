var Tts = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        accessToken: "",
        textSpeak: "",
        GetTextUrl: function (str) {
            //百度语音官方文档 http://yuyin.baidu.com/docs/tts/133
            //https://www.cnblogs.com/kasher/p/8483274.html
            //MP3:https://blog.csdn.net/zhang_ruiqiang/article/details/50774570
            //mpga 格式：https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=
            // var url = "https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" + str;


            //需要对tsn接口的文本字符串参数进行编码 没有做编码，直接上文本的，也会出现安卓正常IOS没有声音的情况
            var strencode = encodeURIComponent(str);
            //strencode = str;

            //var url = "https://tsn.baidu.com/text2audio?&lan=zh&cuid=moon&ctp=1&tok=24.b79c9ea129a4009fc20b0b542d1aa8e4.2592000.1554471263.282335-15699370&tex=" + strencode;
            var url = "https://tsn.baidu.com/text2audio?&lan=zh&cuid=moon&ctp=1&tok=" + Tts.accessToken + "&tex=" + strencode;
            if ((cc.sys.isBrowser) || (cc.Common.main().isWeiXin)) {
                //openapi.baidu.com/oauth浏览器不能跨域访问
                url = "https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" + strencode;
            }

            cc.Debug.Log(url);
            return url;
        },


        AnsiToStr: function (array) {
            var out, i, len, c;
            var char2, char3;

            out = "";
            len = array.length;
            i = 0;
            while (i < len) {
                c = array[i++];
                out += String.fromCharCode(c);
            }

            return out;
        },


        //认证权限access_token 
        GetBaiDuAccessToken: function () {

            //app: 儿童游戏
            var url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=5kkNuRq7npqTCEUMojvyoyX3&client_secret=rod6yBGG7HobkYVKUci2Z1GQ0zGkzwnZ";
            // var url = "https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/ConfigData/config/config_android.json";//?sign=091a9466897a9f8ad7ab08ce048ada7f&t=1551928854
            //var url = "https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/ConfigData/language/language.csv?sign=bba03f0107d858fb133c429d0db8f713&t=1551933465";

            // cc.loader.load(url, function (err, rootJson) {
            //     if (err) {
            //         cc.Debug.Log("GetBaiDuAccessToken fail：err=" + err.message);
            //         cc.Debug.Log(err.message || err);
            //         return;
            //     }
            //     //  this.ParseData(rootJson);

            // }.bind(this));

            var httpReq = new cc.HttpRequest();
            httpReq.Get(url, function (err, data) {
                if (err) {
                    cc.Debug.Log("GetBaiDuAccessToken err=" + err);
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
                var byte = new Uint8Array(data);

                if (cc.sys.isNative) {
                    //https://cocos2d-x.org/reference/html5-js/V3.0/symbols/jsb.fileUtils.html
                    var path = jsb.fileUtils.getWritablePath() + "shapecolor.txt";
                    cc.Debug.Log('PATH: ' + path);
                    cc.FileUtil.SaveFile(data, path);
                }

                //  var str = this.Utf8ArrayToStr(byte); //;String.fromCharCode.apply(String, new Uint8Array(data));
                var str = String.fromCharCode.apply(null, new Uint8Array(data));
                var rootJson = JSON.parse(str);
                this.ParseData(rootJson);
                //var str = this.AnsiToStr(byte);
                // str ="中国\n人民"
                console.log("GetBaiDuAccessToken str.length=" + str.length + " str=" + str);

                this.SpeakInternal(Tts.textSpeak);

            }.bind(this));
        },

        ParseData: function (json) {
            if (json == null) {
                cc.Debug.Log("ParseData=null");
                return;
            }
            //var v = json["access_token"];
            var v = json.access_token;
            cc.Debug.Log("access_token=" + v);
            Tts.accessToken = v;


        },
        Speak: function (str) {
            Tts.textSpeak = str;

            if ((cc.sys.isBrowser) || (cc.Common.main().isWeiXin)) {
                Tts.accessToken = "24.b79c9ea129a4009fc20b0b542d1aa8e4.2592000.1554471263.282335-15699370";
            }


            if (cc.Common.isBlankString(Tts.accessToken)) {
                this.GetBaiDuAccessToken();
            } else {
                this.SpeakInternal(str);
            }

        },
        SpeakInternal: function (str) {
            var url = Tts.GetTextUrl(str);

            if (cc.Common.main().isWeiXin) {
                cc.TtsWeiXin.Speak(url);
                // cc.AudioPlay.main().PlayUrl(url);
            } else if (cc.sys.isBrowser) {
                this.SpeakWeb(url);
            }

            else {
                //cc.AudioPlay.main().PlayUrl(url);
                if (cc.sys.isNative) {
                    cc.AudioPlay.main().PlayUrlByDownload(url);
                }
            }

        },


        SpeakWeb: function (url) {
            //添加mp3后缀 让cc.loader.load认为加载声音资源
            var ext = "&1.mp3";
            var url_new = url + ext;
            cc.Debug.Log(url_new);
            //url = "https://cdn.feilaib.top/img/sounds/bg.mp3";
            cc.AudioPlay.main().PlayUrl(url_new);
        },
    },
});

cc.Tts = module.export = Tts; 
