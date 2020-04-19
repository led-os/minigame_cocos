

var VideoType = cc.Enum({
	//区分大小写
	NSERT: 0,//插屏视频 
	REWARD: 1,//激励视频  

});

var AdVideo = cc.Class({
	extends: cc.Object,// cc.ItemInfo,
	properties: {
		platform: cc.AdVideoPlatformWrapper,
	},
	statics: {
		VideoType: VideoType,
	},

	Init: function () {
		var p = new cc.AdVideoPlatformWrapper();
		this.platform = p.GetPlatform();
	}, 
	// public const int ADVIDEO_TYPE_INSERT = 0;//插屏视频
	//   public const int ADVIDEO_TYPE_REWARD = 1;//激励视频

	//static bool isHasInit = false;
	SetObjectInfo(objName, objMethod) {
		if (this.platform == null) {
			return;
		}
		this.platform.SetObjectInfo(objName, objMethod);
	},
	SetType(type) {
		if (this.platform == null) {
			return;
		}
		this.platform.SetType(type);
	},
	InitAd(source) {
		if (this.platform == null) {
			return;
		}
		// Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_VIDEO);
		this.platform.InitAd(source);
	},
	PreLoad(source) {
		if (this.platform == null) {
			return;
		}
		this.platform.PreLoad(source);
	},

	ShowAd() {
		if (this.platform == null) {
			return;
		}
		this.platform.ShowAd();
	},
	OnClickAd() {
		if (this.platform == null) {
			return;
		}
		this.platform.OnClickAd();
	},




});

AdVideo._main = null;
AdVideo.main = function () {
	// 
	if (!AdVideo._main) {
		AdVideo._main = new AdVideo();
		AdVideo._main.Init();
	}
	return AdVideo._main;
}
cc.AdVideo = module.export = AdVideo; 
