KISSY.config('packages', {
    mosaics: {
        base: 'http://g.tbcdn.cn/thx/m',
        combine: true,
        debug: false,
        tag: '20130905'
    }
})

KISSY.use('brix/app', function(S, app) {
    app.config({
        imports: {
            mosaics: {
                stoc: '0.0.1/js'
            }
        }
    })

    app.bootStyle(function() {
        app.boot()
    })
})

var duoshuoQuery = {short_name:"thx"};
KISSY.use('node', function(S) {
    KISSY.ready(function(S) {
        if (S.one('.ds-thread'))
            S.getScript('http://static.duoshuo.com/embed.js')
    })
})

/* add ace editor to make the demo more interactive for uses
<div class="inline-editor" style="height:550px" data-autorun="1"></p>
  <pre data-type="html">&lt;div id="main"&gt;
    &lt;div class="tooltip"&gt;
       Any changes to the text field will automatically update the value, and
       all other bindings on the page that depend on it.  --&gt;
      &lt;input type="text" /&gt;
    &lt;/div&gt;
  &lt;/div&gt;</pre>
  <pre data-type="js">function add(x, y) {
    var resultString = "Hello, ACE! The result of your math is: ";
    var result = x + y;
    return resultString + result;
  }</pre>
  <pre data-type="css">*{
    margin:0;
    padding:0;
  }</pre>
<p></div>
*/

KISSY.use('node', function(S) {
    KISSY.ready(function(S) {
        var $ = S.Node.all

        // Inline code editor
        $('.inline-editor').each(function(editor, index){
            var editor = $(editor)
            editor.append($('<div class="toolbar"></div>'))
            var toolbar = editor.one('.toolbar')
            // Create the ace editor
            var elem = $('<div>').appendTo(editor)
            var aceEditor = ace.edit(elem[0])
            aceEditor.setTheme('ace/theme/tomorrow')

            // Result holder
            var result = $('<div class="result">').appendTo(editor)
            result.append('<div class="inline-log"></div>')
            result.append('<a class="button blue">Edit</a>')

            result.one('.button').on('click', function(){
                result.animate({top:'100%'},'fast', function(){
                    result.one('iframe').remove()
                    result.one('.inline-log').empty()
                })
            })

            window['inlineEditorMessage' + index] = function(arr, type){

                if (type == 'error') {
                    result.one('.inline-log')
                    .append('<div class="error">' + arr[0] + ' on line ' + arr[2] + '</div>')
                }
                else {
                    var arr = Array.prototype.slice.call(arr)

                    try {
                        S.each(arr, function(k) {
                            if (S.isPlainObject(this) || S.isArray(this)) {
                                arr[k] = JSON.stringify(this)
                            }
                        })

                    } catch (e) {}

                    result
                        .one('.inline-log')
                        .append('<div class="log">' + arr.join(' ').replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;') + '</div>')
                    window.console && console.log.apply(console, arr)
                }
            }


            // Monitor clicks on the span tabs
            toolbar.delegate('click', 'span', function(e, simulated){

                toolbar.one('span').removeClass('active')

                var tab = $(e.currentTarget)

                aceEditor.setSession(tab.attr('data-session'))
                aceEditor.resize();

                tab.addClass('active').attr('data-editor')

                if (!simulated) {
                    aceEditor.focus()
                }
            })

            rebuildTabs()

            // Add the reset button
            $('<div class="reset" title="Reset"></div>').on('click', function() {
                if(confirm('Reset the editor? All your changes will be lost.')){
                    rebuildTabs()
                }
            }).appendTo(toolbar)

            // The Run button
            var btn = $('<a class="button blue">Run</a>').appendTo(editor)
            btn.on('click', function() {

                var code = {}

                toolbar.all('span').each(function(tab){
                    var tab = $(tab)

                    code[S.trim(tab.text())] = tab.attr('data-session')
                })

                var html = buildPageMarkup(code, editor.attr('data-includes'))

                // Create the iframe
                var iframe = document.createElement('iframe')

                iframe.src = 'about:blank'
                iframe.frameBorder = "0"
                iframe.height = result.outerHeight() - 85

                if (result.one('iframe')) {
                    result.one('iframe').remove()
                }
                result.append(iframe)

                iframe.contentWindow.document.open('text/html', 'replace')
                iframe.contentWindow.document.write(html)
                iframe.contentWindow.document.close()

                result.animate({top:0}, 'fast')

            }).appendTo(editor)

            if(editor.attr('data-autorun')){
                setTimeout(function(){
                    S.Event.fire(btn, 'click')
                }, 250 + (250 * index))
            }

            function rebuildTabs() {
                if (toolbar.one('span')) {
                    toolbar.all('span').remove()
                }

                editor.all('pre').each(function(pre) {

                    var pre = $(pre)
                    var type = S.trim(pre.attr('data-type'))
                    var language = type.replace('js', 'javascript')

                    // Create the tabs
                    var tab = $('<span>' + type + '</span>')

                    tab.attr('data-session', createEditSession(pre.text(), language))
                    tab.attr('data-original-content', pre.text())

                    tab.appendTo(toolbar)
                })

                // Simulate a click on the first tab
                S.Event.fire(toolbar.one('span'),'trigger')
            }

            function createEditSession(text, mode){
                // Initialize a new edit session
                var EditSession = ace.require('ace/edit_session').EditSession
                var UndoManager = ace.require('ace/undomanager').UndoManager

                var session = new EditSession(text, 'ace/mode/' + mode)
                session.setUndoManager(new UndoManager())

                return session
            }

            function buildPageMarkup(code, includes){

                var headjs = '<script>{js}</script>'

                if (S.isArray(includes) && includes.length > 0) {
                    headjs = '<script src="http://cdnjs.cloudflare.com/ajax/libs/headjs/0.99/head.min.js"></script>'
                    headjs += '<script>head.js("' + includes.join('", "') +'", function(){ {js} });</script>'
                }

                if (code.js) {
                    // add line checking code
                    var tmp = "window.onerror = function(){\
                        window.parent.inlineEditorMessage"+index+"(arguments,'error'); return true;};\
                        window.console = window.console || {}; console.log = function(){\
                            window.parent.inlineEditorMessage"+index+"(arguments,'log');};"

                    // todo: handle </script>
                    tmp += "var script = document.createElement('script');\
                            script.textContent = " +JSON.stringify(code.js)+ ";\
                            document.body.appendChild(script);"

                    code.js = tmp
                }

                var html = "<!doctype html>\n\
                            <html>\n\
                                <head>\n\
                                    <meta charset='utf-8'>\n\
                                    <style>{css}</style>\n\
                                    " + headjs + "\n\
                                </head>\n\
                                <body>\n\
                                {html}\n\
                                </body>\n\
                            </html>"

                return html.replace(/\{(\w+)\}/g, function(match, group){
                    if (group in code) {

                        if (group == 'html') {
                            return code[group]
                        }

                        return code[group].replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    }
                    return ''
                })
            }
        })

        // Event tracking for deeper study
        // function trackEvent(){
        //     var arr = ['_trackEvent'];
        //     arr.push.apply(arr,arguments);

        //     _gaq && _gaq.push(arr);
        // }
    })

})

