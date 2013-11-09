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
