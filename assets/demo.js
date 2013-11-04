KISSY.use('ajax,event,node', function(S, IO) {

    S.one(window).on('hashchange', function(e) {
        var remote = location.hash.replace('#!', '')
                .replace(/index.html$/, '')
                .replace(/\/$/, '')

        IO.get(remote + '/index.html', function(markup) {
            S.one('#page').html(markup)
        })
    })

    if (!!location.hash) S.one(window).fire('hashchange')
})