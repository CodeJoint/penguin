!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["each-quiniela"]=n({1:function(n,a,l,e,i){return""},3:function(n,a,l,e,i){var r,s,t,o=null!=a?a:{},u=l.helperMissing,c="function",f=n.escapeExpression,p=n.lambda,_=l.blockHelperMissing,d='\n	<a class="link_wrapper hook" data-resource="'+(null!=(r=l["if"].call(o,null!=a?a.closed:a,{name:"if",hash:{},fn:n.program(4,i,0),inverse:n.noop,data:i}))?r:"")+(null!=(r=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"live",{name:"if_eq",hash:{},fn:n.program(6,i,0),inverse:n.noop,data:i}))?r:"")+(null!=(r=l["if"].call(o,null!=a?a.upcoming:a,{name:"if",hash:{},fn:n.program(8,i,0),inverse:n.noop,data:i}))?r:"")+'" data-object="'+f((s=null!=(s=l.id||(null!=a?a.id:a))?s:u,typeof s===c?s.call(o,{name:"id",hash:{},data:i}):s))+'" '+(null!=(r=l["if"].call(o,null!=a?a.first_entry:a,{name:"if",hash:{},fn:n.program(11,i,0),inverse:n.noop,data:i}))?r:"")+' href="detail-quiniela.html?id='+f((s=null!=(s=l.id||(null!=a?a.id:a))?s:u,typeof s===c?s.call(o,{name:"id",hash:{},data:i}):s))+(null!=(r=l["if"].call(o,null!=a?a.first_entry:a,{name:"if",hash:{},fn:n.program(13,i,0),inverse:n.noop,data:i}))?r:"")+'">\n		<div class="quiniela _noborder '+(null!=(r=l["if"].call(o,null!=a?a.upcoming:a,{name:"if",hash:{},fn:n.program(15,i,0),inverse:n.noop,data:i}))?r:"")+" "+(null!=(r=l["if"].call(o,null!=a?a.featured:a,{name:"if",hash:{},fn:n.program(17,i,0),inverse:n.noop,data:i}))?r:"")+" "+(null!=(r=l["if"].call(o,null!=a?a.live:a,{name:"if",hash:{},fn:n.program(19,i,0),inverse:n.noop,data:i}))?r:"")+" "+(null!=(r=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"live",{name:"if_eq",hash:{},fn:n.program(19,i,0),inverse:n.noop,data:i}))?r:"")+" "+(null!=(r=l["if"].call(o,null!=a?a.closed:a,{name:"if",hash:{},fn:n.program(21,i,0),inverse:n.noop,data:i}))?r:"")+" "+f(p(null!=(r=null!=a?a.sport:a)?r.name:r,a))+" "+f((s=null!=(s=l.point_format||(null!=a?a.point_format:a))?s:u,typeof s===c?s.call(o,{name:"point_format",hash:{},data:i}):s))+' garantizado clearfix">\n			<div class="quiniela_header clearfix">\n				<div class="quiniela_iconos clearfix">\n					<img src="'+f((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:u,typeof s===c?s.call(o,{name:"cordova_full_path",hash:{},data:i}):s))+"images/"+(null!=(r=_.call(a,p(null!=(r=null!=a?a.sport:a)?r.icon:r,a),{name:"sport.icon",hash:{},fn:n.program(23,i,0),inverse:n.noop,data:i}))?r:"");return s=null!=(s=l.sport_icon_class||(null!=a?a.sport_icon_class:a))?s:u,t={name:"sport_icon_class",hash:{},fn:n.program(23,i,0),inverse:n.noop,data:i},r=typeof s===c?s.call(o,t):s,l.sport_icon_class||(r=_.call(a,r,t)),null!=r&&(d+=r),d+='.png">\n'+(null!=(r=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.format:a,"line",{name:"if_eq",hash:{},fn:n.program(25,i,0),inverse:n.noop,data:i}))?r:"")+(null!=(r=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.format:a,"mixed",{name:"if_eq",hash:{},fn:n.program(27,i,0),inverse:n.noop,data:i}))?r:"")+(null!=(r=l["if"].call(o,null!=a?a.guaranteed_prize:a,{name:"if",hash:{},fn:n.program(30,i,0),inverse:n.noop,data:i}))?r:"")+"				</div><!-- iconos -->\n				<h2>"+(null!=(r=l["if"].call(o,null!=(r=null!=(r=null!=(r=null!=a?a.tournament_instances:a)?r[0]:r)?r.tournament:r)?r.flag_class:r,{name:"if",hash:{},fn:n.program(32,i,0),inverse:n.noop,data:i}))?r:"")+f((s=null!=(s=l.name_replaced||(null!=a?a.name_replaced:a))?s:u,typeof s===c?s.call(o,{name:"name_replaced",hash:{},data:i}):s))+'</h2>\n			</div><!-- quiniela_header -->\n			<div class="quiniela_content clearfix">\n				<div class="quiniela_info clearfix">\n'+(null!=(r=(l.if_less||a&&a.if_less||u).call(o,null!=a?a.time_left:a,1,{name:"if_less",hash:{},fn:n.program(34,i,0),inverse:n.noop,data:i}))?r:"")+(null!=(r=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.status:a,"live",{name:"if_eq",hash:{},fn:n.program(36,i,0),inverse:n.noop,data:i}))?r:"")+'					<span class="registros">REGISTROS: '+f((s=null!=(s=l.entry_count||(null!=a?a.entry_count:a))?s:u,typeof s===c?s.call(o,{name:"entry_count",hash:{},data:i}):s))+"</span>\n					<span "+(null!=(r=(l.if_less||a&&a.if_less||u).call(o,null!=a?a.time_left:a,86400,{name:"if_less",hash:{},fn:n.program(38,i,0),inverse:n.noop,data:i}))?r:"")+' class="cierre">CIERRE: '+(null!=(r=(l.if_less||a&&a.if_less||u).call(o,null!=a?a.time_left:a,86400,{name:"if_less",hash:{},fn:n.noop,inverse:n.program(40,i,0),data:i}))?r:"")+"</span>\n",s=null!=(s=l.limited_capacity||(null!=a?a.limited_capacity:a))?s:u,t={name:"limited_capacity",hash:{},fn:n.program(42,i,0),inverse:n.noop,data:i},r=typeof s===c?s.call(o,t):s,l.limited_capacity||(r=_.call(a,r,t)),null!=r&&(d+=r),d+'				</div><!-- quiniela_info -->\n				<div class="quiniela_entrada clearfix">\n					<span class="titulo">ENTRADA</span>\n'+(null!=(r=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.entry_currency:a,"real",{name:"if_eq",hash:{},fn:n.program(44,i,0),inverse:n.noop,data:i}))?r:"")+(null!=(r=(l.if_eq||a&&a.if_eq||u).call(o,null!=a?a.entry_currency:a,"pickcoin",{name:"if_eq",hash:{},fn:n.program(46,i,0),inverse:n.noop,data:i}))?r:"")+'					<span class="number">$'+f((l.formatCurrency||a&&a.formatCurrency||u).call(o,null!=a?a.entry_fee:a,{name:"formatCurrency",hash:{},data:i}))+'</span>\n				</div>\n				<div class="quiniela_aganar clearfix">\n					<span class="titulo">BOLSA</span>\n						<img src="'+f((s=null!=(s=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:u,typeof s===c?s.call(o,{name:"cordova_full_path",hash:{},data:i}):s))+'images/billete.png">\n					<span class="number">$'+f((l.formatCurrency||a&&a.formatCurrency||u).call(o,null!=a?a.available:a,{name:"formatCurrency",hash:{},data:i}))+"</span>\n				</div>\n"+(null!=(r=_.call(a,p(null!=(r=null!=a?a.first_entry:a)?r.pick_count:r,a),{name:"first_entry.pick_count",hash:{},fn:n.program(48,i,0),inverse:n.noop,data:i}))?r:"")+"			</div><!-- quiniela_content -->\n		</div><!-- quiniela -->\n	</a><!-- link_wrapper -->\n"},4:function(n,a,l,e,i){return"detail-closed"},6:function(n,a,l,e,i){return"detail-live"},8:function(n,a,l,e,i){var r,s=null!=a?a:{};return(null!=(r=l["if"].call(s,null!=a?a.first_entry:a,{name:"if",hash:{},fn:n.program(6,i,0),inverse:n.noop,data:i}))?r:"")+(null!=(r=l["if"].call(s,null!=a?a.first_entry:a,{name:"if",hash:{},fn:n.noop,inverse:n.program(9,i,0),data:i}))?r:"")},9:function(n,a,l,e,i){return"detail"},11:function(n,a,l,e,i){var r;return'data-extra="'+n.escapeExpression(n.lambda(null!=(r=null!=a?a.first_entry:a)?r.id:r,a))+'"'},13:function(n,a,l,e,i){var r;return"&entry="+n.escapeExpression(n.lambda(null!=(r=null!=a?a.first_entry:a)?r.id:r,a))},15:function(n,a,l,e,i){return"quiniela_open "},17:function(n,a,l,e,i){return"featured "},19:function(n,a,l,e,i){return"quiniela_live "},21:function(n,a,l,e,i){return"quiniela_closed "},23:function(n,a,l,e,i){return n.escapeExpression(n.lambda(a,a))},25:function(n,a,l,e,i){var r;return'						<img src="'+n.escapeExpression((r=null!=(r=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/linea.png">\n'},27:function(n,a,l,e,i){var r;return null!=(r=(l.if_eq||a&&a.if_eq||l.helperMissing).call(null!=a?a:{},null!=a?a.point_format:a,"natural",{name:"if_eq",hash:{},fn:n.program(28,i,0),inverse:n.noop,data:i}))?r:""},28:function(n,a,l,e,i){var r;return'							<img src="'+n.escapeExpression((r=null!=(r=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/natural.png">\n'},30:function(n,a,l,e,i){var r;return'						<img src="'+n.escapeExpression((r=null!=(r=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/garantizado.png">\n'},32:function(n,a,l,e,i){var r;return'<i class="flag '+n.escapeExpression(n.lambda(null!=(r=null!=(r=null!=(r=null!=a?a.tournament_instances:a)?r[0]:r)?r.tournament:r)?r.flag_class:r,a))+'"></i>'},34:function(n,a,l,e,i){return'						<span class="limite">FINALIZÓ</span>\n'},36:function(n,a,l,e,i){return'						<span class="live">EN CURSO</span>\n'},38:function(n,a,l,e,i){var r;return'data-countdown="'+n.escapeExpression((r=null!=(r=l.deadline_tz||(null!=a?a.deadline_tz:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"deadline_tz",hash:{},data:i}):r))+'"'},40:function(n,a,l,e,i){return n.escapeExpression((l.formatDate||a&&a.formatDate||l.helperMissing).call(null!=a?a:{},null!=a?a.deadline_tz:a,"lll",{name:"formatDate",hash:{},data:i}))},42:function(n,a,l,e,i){var r;return'						<span class="limite">Limitado a '+n.escapeExpression((r=null!=(r=l.max_entries||(null!=a?a.max_entries:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"max_entries",hash:{},data:i}):r))+" entradas</span>\n"},44:function(n,a,l,e,i){var r;return'						<img src="'+n.escapeExpression((r=null!=(r=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/billecoin.png">\n'},46:function(n,a,l,e,i){var r;return'						<img src="'+n.escapeExpression((r=null!=(r=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/pickcoin.png">\n'},48:function(n,a,l,e,i){var r;return'					<div class="quiniela_picks_ok clearfix">\n						<span class="titulo">PICKS</span>\n						<img src="'+n.escapeExpression((r=null!=(r=l.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:l.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/acierto.png">\n					</div>\n'},compiler:[7,">= 4.0.0"],main:function(n,a,l,e,i){var r;return null!=(r=l["if"].call(null!=a?a:{},null!=a?a.privada:a,{name:"if",hash:{},fn:n.program(1,i,0),inverse:n.program(3,i,0),data:i}))?r:""},useData:!0})}();