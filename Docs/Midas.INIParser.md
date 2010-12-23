Midas.INIParser
===========

A parser for INI files

How to use
----------

This just initialize the parser and call parse on the data in question.

var iniParser = new Midas.INIParser();
iniParser.parse(data);

or more likely as part of an AJAX call:

var iniParser = new Midas.INIParser();
var myRequest = new Request({
    url: 'test.ini',
    onSuccess: function(data){
        var data = iniParser.parse(data);
    }
}).send();

enjoy.