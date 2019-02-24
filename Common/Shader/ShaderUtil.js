
//http://gad.qq.com/article/detail/37705
//对齐
var ShaderUtil = cc.Class({
    extends: cc.Object,

    statics: {

    },

    properties: {

    },
    shaderPrograms: {},
    setShader: function (sprite, shaderName) {
        // var glProgram = this.shaderPrograms[shaderName];
        // if (glProgram == null) 
        {
            glProgram = new cc.GLProgram();
            var vert = require(cc.js.formatStr("%s.vert", shaderName));
            var frag = require(cc.js.formatStr("%s.frag", shaderName));
            if (cc.sys.isNative) {
                glProgram.initWithString(vert, frag);
            } else {
                glProgram.initWithVertexShaderByteArray(vert, frag);
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
                glProgram.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            }
            glProgram.link();
            glProgram.updateUniforms();
            // this.shaderPrograms[shaderName] = glProgram;
        }

        sprite._sgNode.setShaderProgram(glProgram);

    },



});

ShaderUtil._main = null;
ShaderUtil.main = function () {
    // 
    if (!ShaderUtil._main) {
        ShaderUtil._main = new ShaderUtil();
    }
    return ShaderUtil._main;
}

cc.ShaderUtil = module.export = ShaderUtil; 
