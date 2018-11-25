var TabBarViewController = require("TabBarViewController"); 
// var Singleton = require("Singleton");
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

   

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text; 
        //cc.director.loadScene("MyScene"); 
        cc.log("hello world onLoad");   
      TabBarViewController.main.test();
      
    
    },

    // called every frame
    update: function (dt) {

    },
});
