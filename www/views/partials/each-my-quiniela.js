!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["each-my-quiniela"]=n({1:function(n,a,l,t,e){return"detail-closed"},3:function(n,a,l,t,e){return"detail-live"},5:function(n,a,l,t,e){return"detail"},7:function(n,a,l,t,e){return"quiniela_open "},9:function(n,a,l,t,e){return"featured "},11:function(n,a,l,t,e){return"quiniela_live "},13:function(n,a,l,t,e){return"quiniela_closed "},15:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/private-icon.png">\n'},17:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/linea.png">\n'},19:function(n,a,l,t,e){var i;return null!=(i=(l.if_eq||a&&a.if_eq||l.helperMissing).call(null!=a?a:{},null!=a?a.point_format:a,"natural",{name:"if_eq",hash:{},fn:n.program(20,e,0),inverse:n.noop,data:e}))?i:""},20:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/natural.png">\n'},22:function(n,a,l,t,e){return n.escapeExpression(n.lambda(a,a))},24:function(n,a,l,t,e){var i;return'data-countdown="'+n.escapeExpression((i=null!=(i=l.deadline||(null!=a?a.deadline:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"deadline",hash:{},data:e}):i))+'"'},26:function(n,a,l,t,e){return n.escapeExpression((l.unixTime||a&&a.unixTime||l.helperMissing).call(null!=a?a:{},null!=a?a.deadline:a,{name:"unixTime",hash:{},data:e}))},28:function(n,a,l,t,e){return'\t\t\t\t\t\t\t<span class="limite">FINALIZÓ</span>\n'},30:function(n,a,l,t,e){return'\t\t\t\t\t\t\t<span class="live">JUGANDO</span>\n'},32:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t<div class="quiniela_picks_ok clearfix">\n\t\t\t\t\t\t\t<span class="titulo">PICKS</span>\n\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/acierto.png">\n\t\t\t\t\t\t</div>\n'},34:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/billecoin.png">\n'},36:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/pickcoin.png">\n'},38:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/garantizado.png">\n'},40:function(n,a,l,t,e){var i;return'\t\t\t\t\t\t\t<img src="'+n.escapeExpression((i=null!=(i=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?i:l.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:e}):i))+'images/billete.png">\n'},compiler:[7,">= 4.0.0"],main:function(n,a,l,t,e){var i,r,s,o=null!=a?a:{},u=l.helperMissing,c="function",f=n.escapeExpression,p=n.lambda,_=l.blockHelperMissing,d='\t<a class="link_wrapper hook" data-resource="'+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"closed",{name:"if_eq",hash:{},fn:n.program(1,e,0),inverse:n.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"live",{name:"if_eq",hash:{},fn:n.program(3,e,0),inverse:n.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"upcoming",{name:"if_eq",hash:{},fn:n.program(5,e,0),inverse:n.noop,data:e}))?i:"")+'" data-object="'+f((r=null!=(r=l.id||(null!=a?a.id:a))?r:u,typeof r===c?r.call(o,{name:"id",hash:{},data:e}):r))+'" data-extra="'+f(p(null!=(i=null!=a?a.first_entry:a)?i.id:i,a))+'" href="detail-quiniela.html?id='+f((r=null!=(r=l.id||(null!=a?a.id:a))?r:u,typeof r===c?r.call(o,{name:"id",hash:{},data:e}):r))+'&entry=">\n\t\t<div class="quiniela '+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"upcoming",{name:"if_eq",hash:{},fn:n.program(7,e,0),inverse:n.noop,data:e}))?i:"")+" "+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"featured",{name:"if_eq",hash:{},fn:n.program(9,e,0),inverse:n.noop,data:e}))?i:"")+" "+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"live",{name:"if_eq",hash:{},fn:n.program(11,e,0),inverse:n.noop,data:e}))?i:"")+" "+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"closed",{name:"if_eq",hash:{},fn:n.program(13,e,0),inverse:n.noop,data:e}))?i:"")+" \n\t\t"+f(p(null!=(i=null!=a?a.sport:a)?i.name:i,a))+" "+f((r=null!=(r=l.point_format||(null!=a?a.point_format:a))?r:u,typeof r===c?r.call(o,{name:"point_format",hash:{},data:e}):r))+' garantizado clearfix">\n\t\t\t<div class="quiniela_header clearfix">\n\t\t\t\t\t<div class="quiniela_iconos clearfix">\n'+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.private:a,0,{name:"if_eq",hash:{},fn:n.noop,inverse:n.program(15,e,0),data:e}))?i:"")+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.format:a,"line",{name:"if_eq",hash:{},fn:n.program(17,e,0),inverse:n.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.format:a,"mixed",{name:"if_eq",hash:{},fn:n.program(19,e,0),inverse:n.noop,data:e}))?i:"")+'\t\t\t\t\t\t<img src="'+f((r=null!=(r=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:u,typeof r===c?r.call(o,{name:"cordova_full_path",hash:{},data:e}):r))+"images/"+(null!=(i=_.call(a,p(null!=(i=null!=a?a.sport:a)?i.icon:i,a),{name:"sport.icon",hash:{},fn:n.program(22,e,0),inverse:n.noop,data:e}))?i:"");return r=null!=(r=l.sport_icon_class||(null!=a?a.sport_icon_class:a))?r:u,s={name:"sport_icon_class",hash:{},fn:n.program(22,e,0),inverse:n.noop,data:e},i=typeof r===c?r.call(o,s):r,l.sport_icon_class||(i=_.call(a,i,s)),null!=i&&(d+=i),d+'.png">\n\t\t\t\t\t</div><!-- iconos -->\n\t\t\t\t\t<h2>'+f((r=null!=(r=l.name_replaced||(null!=a?a.name_replaced:a))?r:u,typeof r===c?r.call(o,{name:"name_replaced",hash:{},data:e}):r))+'</h2>\n\t\t\t\t</div><!-- quiniela_header -->\n\t\t\t\t<div class="quiniela_content clearfix">\n\t\t\t\t\t<div class="quiniela_info clearfix">\n\t\t\t\t\t\t<span class="registros">REGISTROS: '+f((r=null!=(r=l.entry_count||(null!=a?a.entry_count:a))?r:u,typeof r===c?r.call(o,{name:"entry_count",hash:{},data:e}):r))+"</span>\n\t\t\t\t\t\t<span "+(null!=(i=(l.if_less||a&&a.if_less||u).call(o,null!=a?a.time_left:a,86400,{name:"if_less",hash:{},fn:n.program(24,e,0),inverse:n.noop,data:e}))?i:"")+' class="cierre">CIERRE: '+(null!=(i=(l.if_less||a&&a.if_less||u).call(o,null!=a?a.time_left:a,86400,{name:"if_less",hash:{},fn:n.noop,inverse:n.program(26,e,0),data:e}))?i:"")+"</span>\n"+(null!=(i=(l.if_less||a&&a.if_less||u).call(o,null!=a?a.time_left:a,1,{name:"if_less",hash:{},fn:n.program(28,e,0),inverse:n.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"live",{name:"if_eq",hash:{},fn:n.program(30,e,0),inverse:n.noop,data:e}))?i:"")+"\t\t\t\t\t</div><!-- quiniela_info -->\n"+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.entry_count:a,0,{name:"if_eq",hash:{},fn:n.noop,inverse:n.program(32,e,0),data:e}))?i:"")+'\t\t\t\t\t<div class="quiniela_entrada clearfix">\n\t\t\t\t\t\t<span class="titulo">ENTRADA</span>\n'+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.entry_currency:a,"real",{name:"if_eq",hash:{},fn:n.program(34,e,0),inverse:n.noop,data:e}))?i:"")+(null!=(i=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.entry_currency:a,"pickcoin",{name:"if_eq",hash:{},fn:n.program(36,e,0),inverse:n.noop,data:e}))?i:"")+'\t\t\t\t\t\t<span class="number">$'+f((l.formatCurrency||a&&a.formatCurrency||u).call(o,null!=a?a.entry_fee:a,{name:"formatCurrency",hash:{},data:e}))+'</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="quiniela_aganar clearfix">\n\t\t\t\t\t\t<span class="titulo">BOLSA</span>\n'+(null!=(i=l.if.call(o,null!=a?a.guaranteed_prize:a,{name:"if",hash:{},fn:n.program(38,e,0),inverse:n.noop,data:e}))?i:"")+(null!=(i=l.if.call(o,null!=a?a.guaranteed_prize:a,{name:"if",hash:{},fn:n.noop,inverse:n.program(40,e,0),data:e}))?i:"")+'\t\t\t\t\t\t<span class="number">$'+f((l.formatCurrency||a&&a.formatCurrency||u).call(o,null!=a?a.available:a,{name:"formatCurrency",hash:{},data:e}))+"</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div><!-- quiniela_content -->\n\t\t</div><!-- quiniela -->\n\t</a><!-- link_wrapper -->\t\t\t\t"},useData:!0})}();