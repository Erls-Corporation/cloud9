/**
 * Files List Filter for the Cloud9 IDE
 *
 * @copyright 2010, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
require.def("ext/filesfilter/filesfilter",
    ["core/ide", "core/ext", "core/util", "ext/tree/tree", "text!ext/filesfilter/filesfilter.xml"],
    function(ide, ext, util, tree, markup) {
        
return ext.register("ext/filesfilter/filesfilter", {
    name   : "Files List Filter",
    dev    : "sshwsfc.me",
    alone  : true,
    type   : ext.GENERAL, 
    markup : markup,
    
    nodes : [],
    filte_val : null,
    
    filte: function(val){
    	// xpath not(contains(@name,'.pyc') or contains(@name,'.so'))
    	cs = [];
    	filters = val.split(/[\s\,\;]+/);
    	
    	for(i=0;i<filters.length;i++){
    		cs.push("contains(@name,'"+filters[i]+"')");
    	}
    	xpath = "not("+ cs.join(" or ") +")";
    
    	trFiles.childNodes[0].setAttribute('match', '[folder|file['+ xpath +']|project]');
    	tree.refresh();
    	
    	this.filte_val = val;
    },
    
    hook : function(){
        var _self = this;
        this.nodes.push(
            mnuView.appendChild(new apf.item({
                caption : "Files List Filter...",
                onclick : function(){
                    ext.initExtension(_self);
                    winFileFilter.show();
                }
            }))
        );
        
        ide.addEventListener("loadsettings", function(e){
            var strSettings = e.model.queryValue("auto/filesfilter");
            if (strSettings) {
                _self.filte(strSettings);
            }
        });

        ide.addEventListener("savesettings", function(e){
            
            if(_self.filte_val){
            	var xmlSettings = apf.createNodeFromXpath(e.model.data, "auto/filesfilter/text()");            
            	xmlSettings.nodeValue = _self.filte_val;
            }
            
            return true;
        });
    },
    
    init : function(amlNode){
        this.winFileFilter = winFileFilter;
    },
    
    enable : function(){
        this.nodes.each(function(item){
            item.enable();
        });
    },
    
    disable : function(){
        this.nodes.each(function(item){
            item.disable();
        });
    },
    
    destroy : function(){
        this.nodes.each(function(item){
            item.destroy(true, true);
        });
        this.nodes = [];
    }
});

    }
);
