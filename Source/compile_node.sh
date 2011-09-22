#!/bin/sh
dr=`dirname "$0"`
name=$2
moduleList=$1
if [$2 -eq '']; then
name="Midas.node.js"
fi 
filename="$dr/$name"
echo "var GLOBAL_ITEMS = function(){
    var items = [];
    for (var key in this) items.push(key);
    return items;
}();
" > $filename
moduleList=$1
if [$moduleList -eq '']; then
moduleList="Array.extensions,Element.extensions,NodeList.extensions,Function.extensions,Number.extensions,Midas.CSSParser,Object.extensions,Midas.INIParser,Request.Pool,Midas.OrderedINIParser,Request.Stable,Midas.PropertiesParser,Request.extensions,Midas.SAXParser,String.extensions,Midas.SCSSParser,Midas.Smarty,Midas.XMLParser"
fi 
echo "(function(){" >> $filename
old_IFS=${IFS}
IFS=","
for v in $moduleList; do
    cat "$dr/$v.js" >>$filename
done
IFS=${old_IFS}
echo "this.Midas = Midas; })();" >> $filename
echo "if (typeof exports != 'undefined') (function(){
    for (var key in this) if (!GLOBAL_ITEMS.contains(key)){
        exports[key] = this[key];
    }
    exports.apply = function(object){
        Object.append(object, exports);
    };
})();
" >> $filename