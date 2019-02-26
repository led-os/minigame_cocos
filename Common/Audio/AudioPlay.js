
var AudioPlay = cc.Class({
    extends: cc.Object,
    statics: {

    },
    properties: {

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


