
var AdBanner = cc.Class({
	extends: cc.Object,// cc.ItemInfo,
	properties: {
		platform: cc.AdBannerPlatformWrapper,
	},
	statics: {

	},

	Init: function () {
		var p = new cc.AdBannerPlatformWrapper();
		this.platform = p.GetPlatform();
	}, 
	InitAd(source) {

		if (this.platform == null) {
			return;
		}
		// Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_BANNER);
		this.platform.InitAd(source);
	},

	ShowAd(isShow) {
		if (this.platform == null) {
			return;
		}
		this.platform.ShowAd(isShow);
	},


	SetScreenSize(w, h) {
		if (this.platform == null) {
			return;
		}
		this.platform.SetScreenSize(w, h);

	},
	//y 基于屏幕底部
	SetScreenOffset(x, y) {
		if (this.platform == null) {
			return;
		}
		this.platform.SetScreenOffset(x, y);

	},

});

AdBanner._main = null;
AdBanner.main = function () {
	// 
	if (!AdBanner._main) {
		AdBanner._main = new AdBanner();
		AdBanner._main.Init();
	}
	return AdBanner._main;
}
cc.AdBanner = module.export = AdBanner; 
