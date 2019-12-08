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
        this.DoClose();
    },


    DoClose() {
        // PopUpManager.main.OnClose();
        // DestroyImmediate(gameObject);
        this.node.destroy();
    },

    /// <summary>
    /// Utility coroutine to automatically destroy the popup after its closing animation has finished.
    /// </summary>
    /// <returns>The coroutine.</returns>
    DestroyPopup() {
        // yield return new WaitForSeconds(0.5f);
        this.DoClose();
    },


});

//cc.UIViewPop = module.export = UIViewPop;


