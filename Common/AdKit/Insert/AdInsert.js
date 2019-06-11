
var AdInsert = cc.Class({
	extends: cc.Object,// cc.ItemInfo,
	properties: {
		platform: cc.AdInsertPlatformWrapper,
	},
	statics: {

	},

	Init: function () {
		var p = new cc.AdInsertPlatformWrapper();
		this.platform = p.GetPlatform();
	},
	InitAd(source) {

		if (this.platform == null) {
			return;
		}
		// Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_INSERT);
		this.platform.InitAd(source);
	},
	SetObjectInfo(objName) {
		if (this.platform == null) {
			return;
		}
		this.platform.SetObjectInfo(objName);
	}
	,
	ShowAd() {
		if (this.platform == null) {
			return;
		}
		this.platform.ShowAd();
	},

});

AdInsert._main = null;
AdInsert.main = function () {
	// 
	if (!AdInsert._main) {
		AdInsert._main = new AdInsert();
		AdInsert._main.Init();
	}
	return AdInsert._main;
}
cc.AdInsert = module.export = AdInsert; 
