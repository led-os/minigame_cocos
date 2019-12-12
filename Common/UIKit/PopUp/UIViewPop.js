var UIView = require("UIView");

var UIViewPop = cc.Class({
    extends: UIView,
    editor: CC_EDITOR && {
        menu: "UIKit/PopUp/UIViewPop",
        help: " ",
        // inspector: ' ',
    },

    properties: {

    },

    onLoad: function () {
        this._super();
    },


    Close() {
        // AudioPlay.main.PlayFile(AppRes.Audio_PopupClose);
        // if (onClose != null) {
        //     onClose.Invoke();
        // } 
        // PopUpManager.main.ClosePopup();
        // if (animator != null) {
        //     animator.Play("Close");
        //     StartCoroutine(DestroyPopup());
        // }
        // else {
        //     DoClose();
        // }

        cc.PopUpManager.main().ClosePopup();
     
    },


    DoClose() {
        // PopUpManager.main.OnClose();
        // DestroyImmediate(gameObject);
        this.node.destroy();
    },
 

});

cc.UIViewPop = module.export = UIViewPop;


