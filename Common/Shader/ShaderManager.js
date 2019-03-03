
var ShaderManager = cc.Class({
    extends: cc.Object,

    statics: {

    },

    properties: {
        shaderLib: require("ShaderLib"),
    },

    Init: function () {
        require("SpriteHook").init();
        this.shaderLib = require("ShaderLib");
    },

    Add(shader) {
        //require("ShaderShapeColor")
        this.shaderLib.addShader(shader);
        // TODO: 加更多Shader
    },

});

ShaderManager._main = null;
ShaderManager.main = function () {
    // 
    if (!ShaderManager._main) {
        ShaderManager._main = new ShaderManager();
        ShaderManager._main.Init();
    }
    return ShaderManager._main;
}

cc.ShaderManager = module.export = ShaderManager; 
