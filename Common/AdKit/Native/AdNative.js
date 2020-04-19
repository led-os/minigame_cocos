


var AdNative = cc.Class({
	extends: cc.Object,// cc.ItemInfo,
	properties: {
		platform: cc.AdNativePlatformWrapper,
	},
	statics: { 
	},

	Init: function () {
		var p = new cc.AdNativePlatformWrapper();
		this.platform = p.GetPlatform();
	},
	InitAd(source) {

		if (this.platform == null) {
			return;
		}
		// Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_BANNER);
		this.platform.InitAd(source);
	},

	ShowAd() {
		if (this.platform == null) {
			return;
		}
		this.platform.ShowAd();
	},

	ShowSplash(source) {

		if (this.platform == null) {
			return;
		}
		// Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_BANNER);
		this.platform.ShowSplashs(source);
	},

});

AdNative._main = null;
AdNative.main = function () {
	// 
	if (!AdNative._main) {
		AdNative._main = new AdNative();
		AdNative._main.Init();
	}
	return AdNative._main;
}
cc.AdNative = module.export = AdNative; 
