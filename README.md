Midas.js
===========

The Midas.js library is a set of parsers for various formats in JS(currently XML, INI and .properties). I hope they're useful to you.

How to use
----------

Existing XML parsing techniques use DOM injection, which is very limited, can suppress nodes, error or produce unexpected results. So I ran across David Joham and Scott Severtson old JS parser on sourceforge, and while it's interface is thorough, it's a little arcane to use. So I wrapped it in a more modern MooTools interface, allowing you to just extend the 'open', 'close' and 'content' functions to build your parser. This should make it pretty simple to use.

the most simple case of this is

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

To use the .properties parser just initialize the parser and call parse on the data in question.

    var propsParser = new Midas.PropertiesParser();
    propsParser.parse(data);

or more likely as part of an AJAX call

    var propsParser = new Midas.PropertiesParser();
    var myRequest = new Request({
        url: 'test.properties',
        onSuccess: function(data){
            var data = propsParser.parse(data);
        }
    }).send();

And using the INI parser is much the same

    var iniParser = new Midas.INIParser();
    iniParser.parse(data);

or more likely as part of an AJAX call

    var iniParser = new Midas.INIParser();
    var myRequest = new Request({
        url: 'test.ini',
        onSuccess: function(data){
            var data = iniParser.parse(data);
        }
    }).send();

and that's about it. enjoy.

Abbey Hawk Sparrow