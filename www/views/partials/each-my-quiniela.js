!function(){var a=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["each-my-quiniela"]=a({1:function(a,n,t,l,e){return"detail-closed"},3:function(a,n,t,l,e){return"detail-live"},5:function(a,n,t,l,e){return"detail"},7:function(a,n,t,l,e){return"quiniela_open "},9:function(a,n,t,l,e){return"featured "},11:function(a,n,t,l,e){return"quiniela_live "},13:function(a,n,t,l,e){return"quiniela_closed "},15:function(a,n,t,l,e){return a.escapeExpression(a.lambda(n,n))},17:function(a,n,t,l,e){var i;return'\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/private-icon.png">\n'},19:function(a,n,t,l,e){var i;return'\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/linea.png">\n'},21:function(a,n,t,l,e){var i;return null!=(i=(t.if_eq||n&&n.if_eq||t.helperMissing).call(null!=n?n:{},null!=n?n.point_format:n,"natural",{name:"if_eq",hash:{},fn:a.program(22,e,0),inverse:a.noop,data:e}))?i:""},22:function(a,n,t,l,e){var i;return'\t\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/natural.png">\n'},24:function(a,n,t,l,e){var i;return'\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/garantizado.png">\n'},26:function(a,n,t,l,e){return'\t\t\t\t\t\t\t<span class="limite">FINALIZÓ</span>\n'},28:function(a,n,t,l,e){return'\t\t\t\t\t\t\t<span class="live">EN CURSO</span>\n'},30:function(a,n,t,l,e){var i;return'data-countdown="'+a.escapeExpression((i=null!=(i=t.deadline||(null!=n?n.deadline:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"deadline",hash:{},data:e}):i))+'"'},32:function(a,n,t,l,e){return a.escapeExpression((t.unixTime||n&&n.unixTime||t.helperMissing).call(null!=n?n:{},null!=n?n.deadline:n,{name:"unixTime",hash:{},data:e}))},34:function(a,n,t,l,e){var i;return'\t\t\t\t\t\t<div class="quiniela_picks_ok clearfix">\n\t\t\t\t\t\t\t<span class="titulo">PICKS</span>\n\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/acierto.png">\n\t\t\t\t\t\t</div>\n'},36:function(a,n,t,l,e){var i;return'\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/billecoin.png">\n'},38:function(a,n,t,l,e){var i;return'\t\t\t\t\t\t\t<img src="'+a.escapeExpression((i=null!=(i=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?i:t.helperMissing,"function"==typeof i?i.call(null!=n?n:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/pickcoin.png">\n'},compiler:[7,">= 4.0.0"],main:function(a,n,t,l,e){var i,r,s,o=null!=n?n:{},u=t.helperMissing,c="function",f=a.escapeExpression,p=a.lambda,_=t.blockHelperMissing,d='\t<a class="link_wrapper hook" data-resource="'+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"closed",{name:"if_eq",hash:{},fn:a.program(1,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"live",{name:"if_eq",hash:{},fn:a.program(3,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"upcoming",{name:"if_eq",hash:{},fn:a.program(5,e,0),inverse:a.noop,data:e}))?i:"")+'" data-object="'+f((r=null!=(r=t.id||(null!=n?n.id:n))?r:u,typeof r===c?r.call(o,{name:"id",hash:{},data:e}):r))+'" data-extra="'+f(p(null!=(i=null!=n?n.first_entry:n)?i.id:i,n))+'" href="detail-quiniela.html?id='+f((r=null!=(r=t.id||(null!=n?n.id:n))?r:u,typeof r===c?r.call(o,{name:"id",hash:{},data:e}):r))+'&entry=">\n\t\t<div class="quiniela '+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"upcoming",{name:"if_eq",hash:{},fn:a.program(7,e,0),inverse:a.noop,data:e}))?i:"")+" "+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"featured",{name:"if_eq",hash:{},fn:a.program(9,e,0),inverse:a.noop,data:e}))?i:"")+" "+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"live",{name:"if_eq",hash:{},fn:a.program(11,e,0),inverse:a.noop,data:e}))?i:"")+" "+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"closed",{name:"if_eq",hash:{},fn:a.program(13,e,0),inverse:a.noop,data:e}))?i:"")+" \n\t\t"+f(p(null!=(i=null!=n?n.sport:n)?i.name:i,n))+" "+f((r=null!=(r=t.point_format||(null!=n?n.point_format:n))?r:u,typeof r===c?r.call(o,{name:"point_format",hash:{},data:e}):r))+' garantizado clearfix">\n\t\t\t<div class="quiniela_header clearfix">\n\t\t\t\t\t<div class="quiniela_iconos clearfix">\n\t\t\t\t\t\t<img src="'+f((r=null!=(r=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?r:u,typeof r===c?r.call(o,{name:"cordova_full_path",hash:{},data:e}):r))+"images/"+(null!=(i=_.call(n,p(null!=(i=null!=n?n.sport:n)?i.icon:i,n),{name:"sport.icon",hash:{},fn:a.program(15,e,0),inverse:a.noop,data:e}))?i:"");return r=null!=(r=t.sport_icon_class||(null!=n?n.sport_icon_class:n))?r:u,s={name:"sport_icon_class",hash:{},fn:a.program(15,e,0),inverse:a.noop,data:e},i=typeof r===c?r.call(o,s):r,t.sport_icon_class||(i=_.call(n,i,s)),null!=i&&(d+=i),d+'.png">\n'+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.private:n,0,{name:"if_eq",hash:{},fn:a.noop,inverse:a.program(17,e,0),data:e}))?i:"")+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.format:n,"line",{name:"if_eq",hash:{},fn:a.program(19,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.format:n,"mixed",{name:"if_eq",hash:{},fn:a.program(21,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=t.if.call(o,null!=n?n.guaranteed_prize:n,{name:"if",hash:{},fn:a.program(24,e,0),inverse:a.noop,data:e}))?i:"")+"\t\t\t\t\t</div><!-- iconos -->\n\t\t\t\t\t<h2>"+f((r=null!=(r=t.name_replaced||(null!=n?n.name_replaced:n))?r:u,typeof r===c?r.call(o,{name:"name_replaced",hash:{},data:e}):r))+'</h2>\n\t\t\t\t</div><!-- quiniela_header -->\n\t\t\t\t<div class="quiniela_content clearfix">\n\t\t\t\t\t<div class="quiniela_info clearfix">\n'+(null!=(i=(t.if_less||n&&n.if_less||u).call(o,null!=n?n.time_left:n,1,{name:"if_less",hash:{},fn:a.program(26,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.status:n,"live",{name:"if_eq",hash:{},fn:a.program(28,e,0),inverse:a.noop,data:e}))?i:"")+'\t\t\t\t\t\t<span class="registros">REGISTROS: '+f((r=null!=(r=t.entry_count||(null!=n?n.entry_count:n))?r:u,typeof r===c?r.call(o,{name:"entry_count",hash:{},data:e}):r))+"</span>\n\t\t\t\t\t\t<span "+(null!=(i=(t.if_less||n&&n.if_less||u).call(o,null!=n?n.time_left:n,86400,{name:"if_less",hash:{},fn:a.program(30,e,0),inverse:a.noop,data:e}))?i:"")+' class="cierre">CIERRE: '+(null!=(i=(t.if_less||n&&n.if_less||u).call(o,null!=n?n.time_left:n,86400,{name:"if_less",hash:{},fn:a.noop,inverse:a.program(32,e,0),data:e}))?i:"")+"</span>\n\t\t\t\t\t</div><!-- quiniela_info -->\n"+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.entry_count:n,0,{name:"if_eq",hash:{},fn:a.noop,inverse:a.program(34,e,0),data:e}))?i:"")+'\t\t\t\t\t<div class="quiniela_entrada clearfix">\n\t\t\t\t\t\t<span class="titulo">ENTRADA</span>\n'+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.entry_currency:n,"real",{name:"if_eq",hash:{},fn:a.program(36,e,0),inverse:a.noop,data:e}))?i:"")+(null!=(i=(t.if_eq||n&&n.if_eq||u).call(o,null!=n?n.entry_currency:n,"pickcoin",{name:"if_eq",hash:{},fn:a.program(38,e,0),inverse:a.noop,data:e}))?i:"")+'\t\t\t\t\t\t<span class="number">$'+f((t.formatCurrency||n&&n.formatCurrency||u).call(o,null!=n?n.entry_fee:n,{name:"formatCurrency",hash:{},data:e}))+'</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="quiniela_aganar clearfix">\n\t\t\t\t\t\t<span class="titulo">BOLSA</span>\n\t\t\t\t\t\t<img src="'+f((r=null!=(r=t.cordova_full_path||(null!=n?n.cordova_full_path:n))?r:u,typeof r===c?r.call(o,{name:"cordova_full_path",hash:{},data:e}):r))+'images/billete.png">\n\t\t\t\t\t\t<span class="number">$'+f((t.formatCurrency||n&&n.formatCurrency||u).call(o,null!=n?n.available:n,{name:"formatCurrency",hash:{},data:e}))+"</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- quiniela_content -->\n\t\t</div><!-- quiniela -->\n\t</a><!-- link_wrapper -->\t\t\t\t"},useData:!0})}();