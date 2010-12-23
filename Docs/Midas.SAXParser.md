Midas.SAXParser
===========

A base class to build SAX parsers

How to use
----------

Existing XML parsing techniques use DOM injection, which is very limited, can suppress nodes, error or produce unexpected results. So I ran across David Joham and Scott Severtson old JS parser on sourceforge, and while it's interface is thorough, it's a little arcane to use. So I wrapped it in a more modern MooTools interface, allowing you to just extend the 'open', 'close' and 'content' functions to build your parser. This should make it pretty simple to use.

the most simple case of this is:

var SampleSAXParser = new Class({
    Extends : Midas.SAXParser,
    open : function(name, attrs){ // tag open
        console.log([name, attrs]);
    },
    content : function(text){ 
        console.log(text);
    },
    close : function(name){
        console.log(['close', name]);
    },
});

var myParser = SampleSAXParser();
myParser.parse(data);

and that's about it. enjoy.