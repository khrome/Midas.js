Midas.js
===========

The Midas.js library is a set of parsers for various formats in JS(currently XML, INI, .properties, CSS, SASS SCSS and Smarty).

![Screenshot](http://patternweaver.com/Midas/Midas.js.png)

How to use
----------

SASS SCSS offers many language features over CSS itself producing smaller, more maintainable files, but like everthing else... I'd like to push that work client side. So here's a parser/transformer for exactly that purpose.

You can directly work with the SCSS yourself

    var myRequest = new Request({
        url: 'test.scss',
        onSuccess: function(data){
            var sassParser = new Midas.SCSSParser();
            var css = sassParser.convertScssToCss(data);
            //now we'll use the css object to directly apply the styles to DOM elements
            var styleParser = new Midas.CSSParser();
            styleParser.apply(data);
        }
    }).send();
    
or you can rely on the library to do the work for you, just make sure to include the Midas.SCSSParser in the head and include any scss style like:
    
    <style type="text/scss">
        table.hl {
          margin: 2em 0;
          td.ln {
            text-align: right;
          }
        }
        
        li {
          font: {
            family: serif;
            weight: bold;
            size: 1.2em;
          }
        }
        
        $blue: #3bbfce;
        $margin: 16px;
        
        .content-navigation {
          border-color: $blue;
          color:
            darken($blue, 9%);
        }
        
        .border {
          padding: $margin / 2;
          margin: $margin / 2;
          border-color: $blue;
        }
    </style>
    
And it'll get picked up, converted and injected:

    <style type="text/css">
        table.hl{
           margin:2em 0;
        }
        table.hl td.ln{
           text-align:right;
        }
        li{
           font-family:serif;
           font-weight:bold;
           font-size:1.2em;
        }
        .content-navigation{
           border-color:#3bbfce;
           color:#35ADBB;
        }
        .border{
           padding:8px;
           margin:8px;
           border-color:#3bbfce;
        }
    </style>
    
I tend to like SASS more in the client and although all of the support functions aren't yet implemented(only darken), They'll be along shortly and in the meantime, you can always extend it yourself:

    Midas.SASSFunctions.myFunctionName = function(arg1, arg2){
        //do work here
    }
    
which will make it available during evaluation! Enjoy!

I've also long wanted to be able to just parse a CSS file and be able to apply it to the page, using the this parser and MooTools native selector engine, you can do just that!

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

The first step towards this utopian dream is a Smarty port I'm also extending to support the previously mentioned recursive template framework. It currently only really supports values, rdelim/ldelim, literal blocks, if and foreach but remains useful, nonetheless. It's now been upgraded to support any amount of macro nesting (up to what the client can handle), so nest to your heart's content!

Initialize it like this:

    var smartyParser = new Midas.Smarty({
        template_directory : '/templates/'
    });
    
    
Then use it locally like:
    smartyParser.assign('key', <value> );
    ...
    smartyParser.assign('keyN', <valueN> );
    smartyParser.fetch('test.tpl', function(html){
        myContainer.adopt(html.toDOM());
    });
    
Or request your data from the server:

    var myRequest = new Request.JSON({
        url: 'test.json',
        onSuccess: function(data){
            for(key in data) smartyParser.assign(key, data[key] );
            smartyParser.fetch('test.tpl', function(html){
                //or alternatively, you could do innerHTML or an innerHTML transfer here
                myContainer.adopt(html.toDOM());
            });
        }
    }).send();
    
This version is much more usable than the last, go nuts.

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