Midas.js
===========

The Midas.js library is a set of parsers for various formats in JS(currently XML, INI, .properties and Smarty). I hope they're useful to you.

![Screenshot](http://patternweaver.com/Midas/Midas.js.png)

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
    
Smarty is a very common templating language in PHP, much reviled for it's percieved poor performance and loved for it's ability to divorce logic and presentation. But this walled garden for designers has been very much interrupted by client logic and asynchronous requests. I've been maintaining a recursive smarty system for over a year now with the goal of eventually pushing the template rendering client side, thus being able to render a whole page or just a 'panel' (subtemplate) or even just refresh panels (poll the server for new data, then redisplay that using the already fetched template). This allows the best of both worlds, designers can still work with simple HTML templates but without crippling our flexibility in JS on the client, all still retaining the ability to render serverside for old clients, non JS browsers, or any other need you can think of.

The first step towards this utopian dream is a Smarty port I can later extend. It's currently only working with a single level of macro nesting and only really supports values, literal blocks, if and foreach but remains useful, nonetheless. So in the name of Christmas, I'm releasing it!

Use it like this

    var smartyParser = new Midas.Smarty();
    smartyParser.assign('title_text', 'Test!');
    smartyParser.assign('body_html', myRenderedBody);
    smartyParser.assign('table_items', ['checkered', 'argyle', 'houndstooth', 'paisley']);
    var myRequest = new Request({
        url: 'test.tpl',
        onSuccess: function(data){
            smartyParser.fetch(data)
        }
    }).send();
    
Don't get too crazy with this one just yet...

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