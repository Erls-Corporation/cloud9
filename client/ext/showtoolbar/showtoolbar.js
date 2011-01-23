/**
 * Code Editor for the Cloud9 IDE
 *
 * @copyright 2010, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
require.def("ext/showtoolbar/showtoolbar",
    ["core/ide", "core/ext", "core/util", "ext/settings/settings"],
    function(ide, ext, util, settings) {

return ext.register("ext/showtoolbar/showtoolbar", {
    name    : "Show Toolbar",
    dev     : "sshwsfc.me",
    alone   : true,
    type    : ext.GENERAL,
    nodes   : [],

    hook : function(){
        var _self = this;
        
        this.nodes.push(
            mnuView.appendChild(new apf.item({
                id : "showtoolbar",
                caption : "Show/Hide Toolbar",
                onclick : function(e){
                    barTools.visible?barTools.hide():barTools.show();
                }
            }))
        );
    },

    enable : function(){
    },

    disable : function(){
    },

    destroy : function(){
    }
});

});