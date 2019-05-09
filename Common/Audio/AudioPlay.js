//var http = require("http.js")
var AudioPlay = cc.Class({
    extends: cc.Object,
    statics: {

    },
    properties: {

    },
    PlayMusic: function (clip) {
        if (clip == null) {
            return;
        }
        cc.audioEngine.playMusic(clip, false);
    },
    //AudioClip
    PlayAudioClip: function (clip) {
        if (clip == null) {
            return;
        }
        cc.audioEngine.playEffect(clip, false);
    },

    PlayFile: function (file) {
        cc.AudioCache.main.Load(file, function (err, audioClip) {
            if (err) {
                cc.Debug.Log(err.message || err);
                return ret;
            }
            this.PlayAudioClip(audioClip);
        }.bind(this));
    },

    //播放resource资源以外的本地文件
    PlayRawFile: function (file) {
        cc.audioEngine.uncacheAll();
        cc.audioEngine.playEffect(file, false);
    },

    //先下载网络文件到本地再播放
    PlayUrlByDownload: function (url) {
        var httpReq = new cc.HttpRequest();
        httpReq.Get(url, function (err, data) {
            if (err) {
                cc.Debug.Log(err);
                return;
            }
            //console.log(data);
            if (cc.sys.isNative) {
                //https://cocos2d-x.org/reference/html5-js/V3.0/symbols/jsb.fileUtils.html
                var path = jsb.fileUtils.getWritablePath() + "tmp_audio.mp3";
                cc.Debug.Log('PATH: ' + path);
                cc.FileUtil.SaveFile(data, path);
                this.PlayRawFile(path);
                //jsb.fileUtils.removeFile(path);
            }
        }.bind(this));
    },

    //直接播放网络文件不同平台支持的文件格式不一样，一般mp3比较通用
    PlayUrl: function (url) {
        //https://cdn.feilaib.top/img/sounds/bg.mp3
        //cc.loader.load("https://cdn.feilaib.top/img/sounds/bg.mp3", function (err, audio) 
        //cc.loader.load({ id: url+".mp3", type: "mp3" }, function (err, audio) 
        var url_new = url;
        cc.loader.load(url_new, function (err, audio) {
            if (err) {
                cc.Debug.Log(err.message || err);
                cc.Debug.Log("playurl fail:" + url_new);
                return;
            }
            this.PlayAudioClip(audio);

        }.bind(this));
    },


    //背景音乐
    PlayBgMusic: function () {
        var ret = cc.Common.GetBoolOfKey(cc.AppRes.KEY_BACKGROUND_MUSIC, false);
        if (ret) {
            var dirRoot = cc.Common.CLOUD_RES_DIR;
            if (cc.Common.main().isWeiXin) {
                dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
            }
            var url = dirRoot + "/" + cc.AppRes.AUDIO_BG;

            if (cc.Common.main().isWeiXin) {
                this.PlayUrl(url + ".mp3");
                return;
            }

            cc.AudioCache.main.Load(url, function (err, audioClip) {
                if (err) {
                    cc.Debug.Log(err.message || err);
                    return ret;
                }
                this.PlayMusic(audioClip);
            }.bind(this));
        }
    },

    PlayStopBgMusic: function () {
        cc.audioEngine.stopAll();
    },
});

AudioPlay._main = null;
AudioPlay.main = function () {
    if (!AudioPlay._main) {
        AudioPlay._main = new AudioPlay();
    } else {

    }

    return AudioPlay._main;
}

cc.AudioPlay = module.export = AudioPlay;


