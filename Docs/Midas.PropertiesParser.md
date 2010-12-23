Midas.PropertiesParser
===========

A .properties parser

How to use
----------

This just initializes the parser and call parse on the data in question.

var propsParser = new Midas.PropertiesParser();
propsParser.parse(data);

or more likely as part of an AJAX call:

var propsParser = new Midas.PropertiesParser();
var myRequest = new Request({
    url: 'test.properties',
    onSuccess: function(data){
        var data = propsParser.parse(data);
    }
}).send();

enjoy.