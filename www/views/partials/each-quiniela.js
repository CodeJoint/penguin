!function(){var a=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["each-quiniela"]=a({1:function(a,n,l,t,e){return""},3:function(a,n,l,t,e){var i,r,s,o=null!=n?n:{},u=l.helperMissing,c="function",p=a.escapeExpression,f=a.lambda,_=l.blockHelperMissing,d='\n\t<a class="link_wrapper hook" data-resource="detail" data-object="'+p((r=null!=(r=l.id||(null!=n?n.id:n))?r:u,typeof r===c?r.call(o,{name:"id",hash:{},data:e}):r))+'" href="detail-quiniela.html?id='+p((r=null!=(r=l.id||(null!=n?n.id:n))?r:u,typeof r===c?r.call(o,{name:"id",hash:{},data:e}):r))+" "+(null!=(i=l.each.call(o,null!=n?n.entries:n,{name:"each",hash:{},fn:a.program(4,e,0),inverse:a.noop,data:e}))?i:"")+'">\n\t\t<div class="quiniela '+(null!=(i=l.if.call(o,null!=n?n.upcoming:n,{name:"if",hash:{},fn:a.program(6,e,0),inverse:a.noop,data:e}))?i:"")+" "+(null!=(i=l.if.call(o,null!=n?n.featured:n,{name:"if",hash:{},fn:a.program(8,e,0),inverse:a.noop,data:e}))?i:"")+" "+(null!=(i=l.if.call(o,null!=n?n.live:n,{name:"if",hash:{},fn:a.program(10,e,0),inverse:a.noop,data:e}))?i:"")+" "+(null!=(i=(l.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"live",{name:"if_eq",hash:{},fn:a.program(10,e,0),inverse:a.noop,data:e}))?i:"")+" "+(null!=(i=l.if.call(o,null!=n?n.closed:n,{name:"if",hash:{},fn:a.program(12,e,0),inverse:a.noop,data:e}))?i:"")+" "+p(f(null!=(i=null!=n?n.sport:n)?i.name:i,n))+" "+p((r=null!=(r=l.point_format||(null!=n?n.point_format:n))?r:u,typeof r===c?r.call(o,{name:"point_format",hash:{},data:e}):r))+' garantizado clearfix">\n\t\t\t<div class="quiniela_header clearfix">\n\t\t\t\t<div class="quiniela_iconos clearfix">\n'+(null!=(i=(l.if_eq||n&&n.if_eq||u).call(o,null!=n?n.format:n,"line",{name:"if_eq",hash:{},fn:a.program(14,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||n&&n.if_eq||u).call(o,null!=n?n.format:n,"mixed",{name:"if_eq",hash:{},fn:a.program(16,e,0),inverse:a.noop,data:e}))?i:"")+'\t\t\t\t\t<img src="'+p((r=null!=(r=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?r:u,typeof r===c?r.call(o,{name:"cordova_full_path",hash:{},data:e}):r))+"images/"+(null!=(i=_.call(n,f(null!=(i=null!=n?n.sport:n)?i.icon:i,n),{name:"sport.icon",hash:{},fn:a.program(19,e,0),inverse:a.noop,data:e}))?i:"");return r=null!=(r=l.sport_icon_class||(null!=n?n.sport_icon_class:n))?r:u,s={name:"sport_icon_class",hash:{},fn:a.program(19,e,0),inverse:a.noop,data:e},i=typeof r===c?r.call(o,s):r,l.sport_icon_class||(i=_.call(n,i,s)),null!=i&&(d+=i),d+='.png">\n\t\t\t\t</div><!-- iconos -->\n\t\t\t\t<h2>'+p((r=null!=(r=l.name_replaced||(null!=n?n.name_replaced:n))?r:u,typeof r===c?r.call(o,{name:"name_replaced",hash:{},data:e}):r))+'</h2>\n\t\t\t</div><!-- quiniela_header -->\n\t\t\t<div class="quiniela_content clearfix">\n\t\t\t\t<div class="quiniela_info clearfix">\n\t\t\t\t\t<span class="registros">REGISTROS: '+p((r=null!=(r=l.entry_count||(null!=n?n.entry_count:n))?r:u,typeof r===c?r.call(o,{name:"entry_count",hash:{},data:e}):r))+"</span>\n\t\t\t\t\t<span "+(null!=(i=(l.if_less||n&&n.if_less||u).call(o,null!=n?n.time_left:n,86400,{name:"if_less",hash:{},fn:a.program(21,e,0),inverse:a.noop,data:e}))?i:"")+' class="cierre">CIERRE: '+(null!=(i=(l.if_less||n&&n.if_less||u).call(o,null!=n?n.time_left:n,86400,{name:"if_less",hash:{},fn:a.noop,inverse:a.program(23,e,0),data:e}))?i:"")+"</span>\n",r=null!=(r=l.limited_capacity||(null!=n?n.limited_capacity:n))?r:u,s={name:"limited_capacity",hash:{},fn:a.program(25,e,0),inverse:a.noop,data:e},i=typeof r===c?r.call(o,s):r,l.limited_capacity||(i=_.call(n,i,s)),null!=i&&(d+=i),d+(null!=(i=(l.if_less||n&&n.if_less||u).call(o,null!=n?n.time_left:n,1,{name:"if_less",hash:{},fn:a.program(27,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"live",{name:"if_eq",hash:{},fn:a.program(29,e,0),inverse:a.noop,data:e}))?i:"")+"\t\t\t\t</div><!-- quiniela_info -->\n"+(null!=(i=_.call(n,f(null!=(i=null!=n?n.first_entry:n)?i.pick_count:i,n),{name:"first_entry.pick_count",hash:{},fn:a.program(31,e,0),inverse:a.noop,data:e}))?i:"")+'\t\t\t\t<div class="quiniela_entrada clearfix">\n\t\t\t\t\t<span class="titulo">ENTRADA '+p((r=null!=(r=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?r:u,typeof r===c?r.call(o,{name:"cordova_full_path",hash:{},data:e}):r))+"</span>\n"+(null!=(i=(l.if_eq||n&&n.if_eq||u).call(o,null!=n?n.entry_currency:n,"real",{name:"if_eq",hash:{},fn:a.program(33,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||n&&n.if_eq||u).call(o,null!=n?n.entry_currency:n,"pickcoin",{name:"if_eq",hash:{},fn:a.program(35,e,0),inverse:a.noop,data:e}))?i:"")+'\t\t\t\t\t<span class="number">$'+p((l.formatCurrency||n&&n.formatCurrency||u).call(o,null!=n?n.entry_fee:n,{name:"formatCurrency",hash:{},data:e}))+'</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="quiniela_aganar clearfix">\n\t\t\t\t\t<span class="titulo">BOLSA</span>\n'+(null!=(i=l.if.call(o,null!=n?n.guaranteed_prize:n,{name:"if",hash:{},fn:a.program(37,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=l.if.call(o,null!=n?n.guaranteed_prize:n,{name:"if",hash:{},fn:a.noop,inverse:a.program(39,e,0),data:e}))?i:"")+'\t\t\t\t\t<span class="number">$'+p((l.formatCurrency||n&&n.formatCurrency||u).call(o,null!=n?n.available:n,{name:"formatCurrency",hash:{},data:e}))+"</span>\n\t\t\t\t</div>\n\t\t\t</div><!-- quiniela_content -->\n\t\t</div><!-- quiniela -->\n\t</a><!-- link_wrapper -->\n"},4:function(a,n,l,t,e){var i;return"entries"+a.escapeExpression((i=null!=(i=l.first||e&&e.first)?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"first",hash:{},data:e}):i))},6:function(a,n,l,t,e){return"quiniela_open "},8:function(a,n,l,t,e){return"featured "},10:function(a,n,l,t,e){return"quiniela_live "},12:function(a,n,l,t,e){return"quiniela_closed "},14:function(a,n,l,t,e){var i;return'\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/linea.png">\n'},16:function(a,n,l,t,e){var i;return null!=(i=(l.if_eq||n&&n.if_eq||l.helperMissing).call(null!=n?n:{},null!=n?n.point_format:n,"natural",{name:"if_eq",hash:{},fn:a.program(17,e,0),inverse:a.noop,data:e}))?i:""},17:function(a,n,l,t,e){var i;return'\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/natural.png">\n'},19:function(a,n,l,t,e){return a.escapeExpression(a.lambda(n,n))},21:function(a,n,l,t,e){var i;return'data-countdown="'+a.escapeExpression((i=null!=(i=l.deadline_tz||(null!=n?n.deadline_tz:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"deadline_tz",hash:{},data:e}):i))+'"'},23:function(a,n,l,t,e){return a.escapeExpression((l.formatDate||n&&n.formatDate||l.helperMissing).call(null!=n?n:{},null!=n?n.deadline_tz:n,"lll",{name:"formatDate",hash:{},data:e}))},25:function(a,n,l,t,e){var i;return'\t\t\t\t\t\t<span class="limite">Limitado a '+a.escapeExpression((i=null!=(i=l.max_entries||(null!=n?n.max_entries:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"max_entries",hash:{},data:e}):i))+" entradas</span>\n"},27:function(a,n,l,t,e){return'\t\t\t\t\t\t<span class="limite">FINALIZÓ</span>\n'},29:function(a,n,l,t,e){return'\t\t\t\t\t\t<span class="live">JUGANDO</span>\n'},31:function(a,n,l,t,e){return'\t\t\t\t\t<div class="quiniela_picks_ok clearfix">\n\t\t\t\t\t\t<span class="titulo">PICKS</span>\n\t\t\t\t\t\t<img src="images/acierto.png">\n\t\t\t\t\t</div>\n'},33:function(a,n,l,t,e){var i;return'\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/billecoin.png">\n'},35:function(a,n,l,t,e){var i;return'\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/pickcoin.png">\n'},37:function(a,n,l,t,e){var i;return'\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/garantizado.png">\n'},39:function(a,n,l,t,e){var i;return'\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:l.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/billete.png">\n'},compiler:[7,">= 4.0.0"],main:function(a,n,l,t,e){var i;return null!=(i=l.if.call(null!=n?n:{},null!=n?n.privada:n,{name:"if",hash:{},fn:a.program(1,e,0),inverse:a.program(3,e,0),data:e}))?i:""},useData:!0})}();