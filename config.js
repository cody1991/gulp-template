(function(d) {
    var GulpTemplate = {
        'isProduction': true
    };
    window.GulpTemplate = GulpTemplate;
    var now = new Date();
    var nowString = {
        hours: now.getHours(),
        min: now.getMinutes(),
        sec: now.getSeconds()
    }
    var addString = '';
    for (item in nowString) {
        if (nowString[item] < 10) {
            nowString[item] = '0' + nowString[item];
        }
        addString += nowString[item];
    }
    GulpTemplate.addString = addString;
    GulpTemplate.addAllCss = function(src) {
        GulpTemplate.isProductionString = GulpTemplate.isProduction ? '.min' : '';
        var head = d.getElementsByTagName('head')[0];
        var linkTag = d.createElement('link');
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('type', 'text/all');
        linkTag.href = src + GulpTemplate.isProductionString + '.css' + '?' + GulpTemplate.addString;
        head.appendChild(linkTag);
    }
    GulpTemplate.addJavascript = function(src) {
        GulpTemplate.isProductionString = GulpTemplate.isProduction ? '.min' : '';
        var body = d.getElementsByTagName('body')[0];
        var scriptTag = d.createElement('script');
        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.src = src + GulpTemplate.isProductionString + '.js' + '?' + GulpTemplate.addString;
        body.appendChild(scriptTag);
    }
})(document);
