var http = require("http.js")
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
                cc.log(err.message || err);
                return ret;
            }
            this.PlayAudioClip(audioClip);
        }.bind(this));
    },

    //播放resource资源以外的本地文件
    PlayRawFile: function (file) {
        cc.audioEngine.playEffect(file, false);
    },

    //网络文件
    PlayUrl: function (url) {
        http.get(url, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            //console.log(data);
            if (cc.sys.isNative) {

                cc.log('PATH: ' + path);
                cc.FileUtil.SaveFile(data, path);
                this.PlayRawFile(path);
            }
        }.bind(this));
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


