
//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var GameRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: { 
        GAME_Image: "Image", 
        //type 
        GAME_TYPE_IMAGE: "Image",
        GAME_TYPE_TEXT: "Text", 

        

    },

});
 

cc.GameRes = module.export = GameRes;


