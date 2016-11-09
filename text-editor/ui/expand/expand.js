/*!
 * ==========================================================
 *  EXPAND PLUGIN FOR USER INTERFACE MODULE 1.0.6
 * ==========================================================
 * Author: Taufik Nurrohman <https://github.com/tovic>
 * License: MIT
 * ----------------------------------------------------------
 */

TE.each(function($) {
    var uniq = '-' + Date().now(),
        doc = document,
        html = doc.documentElement,
        head = doc.head,
        body = doc.body,
        _ = $._,
        ui = $.ui,
        i18n = $.config.languages.tools,
        s = $.config.classes[""],
        prefix = '.' + s,
        suffix = '-is-expanded',
        prefix_base = prefix + suffix + prefix + uniq + suffix,
        $$ = $.target.style, is_max;
    prefix = prefix_base + ' ' + prefix + '-expand' + uniq + ' ' + prefix;
    function class_set(a, b) {
        a.classList.add(b);
    }
    function class_reset(a, b) {
        a.classList.remove(b);
    }
    class_set(ui.el.container, s + '-expand' + uniq);
    $.config.css += 'body{padding-top:2em}';
    _.extend(i18n, {
        maximize: ['Maximize', 'F11'],
        minimize: ['Minimize', 'F11']
    });
    head.appendChild(_.el('style', prefix + '-description .left,' + prefix + '-footer+.' + s + '-resize{display:none}' + prefix_base + ',' + prefix_base + ' body{position:static;overflow:hidden}' + prefix_base + ' .' + s + '-expand' + uniq + '{border-width:0;position:fixed;top:0;right:0;bottom:0;left:0;margin:0;padding:0;z-index:9998;width:100%;height:100%}' + prefix + '-body,' + prefix + '-content{border-width:0;width:100%;height:100%;position:absolute;top:0;right:0;bottom:0;left:0}' + prefix + '-content{font-size:1.5em;padding:2.5em 1em 1em}' + prefix + '-footer,' + prefix + '-header{position:absolute;top:0;left:0;margin:.5em;z-index:9999;background:inherit;border:1px solid;border-color:inherit;box-shadow:0 0 2px rgba(0,0,0,.2)}' + prefix + '-footer{position:absolute;top:auto;bottom:0;left:0}' + prefix + '-description{padding:.4em .8em}' + prefix + '-description .right{padding-right:0}', {
        id: s + ':style-expand' + uniq
    }));
    function do_max() {
        is_max = 1;
        class_set(html, s + suffix);
        class_set(html, s + uniq + suffix);
        i18n.expand = i18n.minimize;
        ui.tool('expand', {
            i: 'compress',
            click: do_min
        }).select();
        $$.height = $$.width = $$.minHeight = $$.minWidth = "";
        return false;
    }
    function do_min(e) {
        is_max = 0;
        class_reset(html, s + suffix);
        class_reset(html, s + uniq + suffix);
        i18n.expand = i18n.maximize;
        ui.tool('expand', {
            i: 'expand',
            click: do_max
        });
        if (e) $.select();
        return false;
    }
    do_min();
    // Press `F11` to maximize/minimize
    ui.key('f11', function(e, $) {
        return is_max ? do_min(e, $) : do_max(e, $), false;
    });
});