Midas.js
===========

The Midas.js library is a set of parsers for various formats in JS(currently XML, INI, .properties and Smarty). I hope they're useful to you.

![Screenshot](http://patternweaver.com/Midas/Midas.js.png)

How to use
----------

I've long wanted to be able to just parse a CSS file and be able to apply it to the page, using the this parser and MooTools native selector engine, you can do just that!

    var styleParser = new Midas.CSSParser();
    var myRequest = new Request({
        url: 'test.css',
        onSuccess: function(data){
            styleParser.apply(data);
        }
    }).send();
    
if, instead you just want the parsed CSS you can instead use:

    var styleParser = new Midas.CSSParser();
    var css = styleParser.parse(text);

Wouldn't it be nice if we could also fetch a page and construct a DOM without the browser? Well, we can:

Existing XML parsing techniques use DOM injection, which is very limited, can suppress nodes, error or produce unexpected results. So I ran across David Joham and Scott Severtson's old JS parser on sourceforge, and while it's interface is thorough, it's a little arcane. So I wrapped it in a more modern MooTools interface, allowing you to just extend the 'open', 'close' and 'content' functions to build your parser. This should make it pretty simple to use.

So let's build a *real* toDOM function... one that parses the full HTML document and constructs a complete DOM tree independent of the window's document, so it's not subject to the quirks of legal tags at the point of injection.

    var HTMLParser = new Class({
        Extends : Midas.SAXParser,
        stack : [],
        root : false,
        open : function(name, attrs){ // tag open
            var node = new Element(name, attrs);
            if(this.stack.length > 0) this.stack.getLast().appendChild(node);
            this.stack.push(node);
        },
        content : function(text){
            if(this.stack.length > 0) this.stack.getLast().appendText(text);
        },
        close : function(name){
            this.root = this.stack.pop();
        },
        parse : function(html){
            this.parent(html);
            return this.root;
        }
    });
    String.implement({
        toDOM: function(mode) {
            var pageParser = new HTMLParser();
            return pageParser.parse(this);
        }
    });
    
Not too bad, right? Now... let's take a crack at templating languages!
    
Smarty is a very common templating language in PHP, much reviled for it's percieved poor performance and loved for it's ability to divorce logic and presentation. But this walled garden for designers has been very much interrupted by client logic and asynchronous requests. I've been maintaining a recursive smarty system for over a year now with the goal of eventually pushing the template rendering client side, thus being able to render a whole page or just a 'panel' (subtemplate) or even just refresh panels (poll the server for new data, then redisplay that using the already fetched template). This allows the best of both worlds, designers can still work with simple HTML templates but without crippling our flexibility in JS on the client, all still retaining the ability to render serverside for old clients, non JS browsers, or any other need you can think of.

The first step towards this utopian dream is a Smarty port I can later extend. It currently only really supports values, literal blocks, if and foreach but remains useful, nonetheless. It's now been upgraded to support any amount of macro nesting (up to what the client can handle), so nest to your heart's content!

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