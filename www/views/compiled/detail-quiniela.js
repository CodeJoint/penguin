!function(){var l=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["detail-quiniela"]=l({1:function(l,a,n,e,i){return'			<div class="registro_quiniela clearfix">\n				<a id="reg_into_game" class="green_button">Registrarse</a>\n			</div><!-- opciones registro -->\n'},3:function(l,a,n,e,i){return" natural "},5:function(l,a,n,e,i){var r;return'							<img src="'+l.escapeExpression((r=null!=(r=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:n.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/linea.png">\n'},7:function(l,a,n,e,i){var r;return'							<img src="'+l.escapeExpression((r=null!=(r=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:n.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/natural.png">\n'},9:function(l,a,n,e,i){var r;return'							<img src="'+l.escapeExpression((r=null!=(r=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:n.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/garantizado.png">\n'},11:function(l,a,n,e,i){var r;return'<i class="flag '+l.escapeExpression(l.lambda(null!=(r=null!=(r=null!=(r=null!=a?a.tournament_instances:a)?r[0]:r)?r.tournament:r)?r.flag_class:r,a))+'"></i>'},13:function(l,a,n,e,i){return"CIERRE"},15:function(l,a,n,e,i){return"CERRÓ"},17:function(l,a,n,e,i){var r;return'							<span class="limite">Limitado a '+l.escapeExpression(l.lambda(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.max_entries:r,a))+" entradas</span>\n"},19:function(l,a,n,e,i){return'							<span class="limite">FINALIZÓ</span>\n'},21:function(l,a,n,e,i){return'							<span class="live">EN CURSO</span>\n'},23:function(l,a,n,e,i){var r;return'							<img src="'+l.escapeExpression((r=null!=(r=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:n.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/billecoin.png">\n'},25:function(l,a,n,e,i){var r;return'							<img src="'+l.escapeExpression((r=null!=(r=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?r:n.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:i}):r))+'images/pickcoin.png">\n'},27:function(l,a,n,e,i){var r,t=l.lambda,s=l.escapeExpression;return'\n		<div class="tabs_quiniela min clearfix">\n			<ul>\n				<li class="selected"><a class="hook missing_info" data-object="'+s(t(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.id:r,a))+'" data-extra="" data-resource="detail" href="detail.html?registered=true&tab=postures">Picks</a></li>\n				<li><a class="hook missing_info" data-object="'+s(t(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.id:r,a))+'" data-extra="" data-resource="detail-prizes" href="detail.html?registered=true&tab=prizes">Premios</a></li>\n				<li><a class="hook missing_info" data-object="'+s(t(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.id:r,a))+'" data-extra="" data-resource="detail-participants" href="detail.html?registered=true&tab=participants">Participantes</a></li>\n			</ul>\n		</div>\n		\n		<div id="lesDrops" class="quinielas_dropdowns live clearfix"></div> <!-- dropdowns -->\n\n		<div id="tabContainer" class="tabs">\n			<form method="POST" action="" id="picksForm">\n				<input type="hidden" class="missing_entry" name="entry_id" id="entry_id" value="">\n				<input type="hidden" class="missing_pool" name="pool_id" id="pool_id" value="'+s(t(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.id:r,a))+'">\n				<div id="insertPartidos" class="partidos clearfix radio_group">\n\n				</div><!-- partidos -->\n\n				<div class="desempates clearfix">\n					<h3>DESEMPATE</h3>\n'+(null!=(r=n.each.call(null!=a?a:{},null!=(r=null!=a?a.data:a)?r.tiebreakers_iter:r,{name:"each",hash:{},fn:l.program(28,i,0),inverse:l.noop,data:i}))?r:"")+'\n				</div><!-- dempates -->\n				<div class="botones clearfix">\n					<input id="savePicks" class="green_button" type="submit" value="Guardar picks">\n				</div>\n				<small class="info">Se tomarán los resultados únicamente de tiempo reglamentario. (No tiempos extras)</small>\n			</form>\n		</div><!-- tabContainer -->\n\n'},28:function(l,a,n,e,i){var r;return null!=(r=n.each.call(null!=a?a:{},a,{name:"each",hash:{},fn:l.program(29,i,0),inverse:l.noop,data:i}))?r:""},29:function(l,a,n,e,i){var r,t=null!=a?a:{},s=n.helperMissing;return"						\n"+(null!=(r=(n.if_eq||a&&a.if_eq||s).call(t,null!=a?a.type:a,"score",{name:"if_eq",hash:{},fn:l.program(30,i,0),inverse:l.noop,data:i}))?r:"")+"\n"+(null!=(r=(n.if_eq||a&&a.if_eq||s).call(t,null!=a?a.type:a,"number",{name:"if_eq",hash:{},fn:l.program(32,i,0),inverse:l.noop,data:i}))?r:"")+"							\n"+(null!=(r=(n.if_eq||a&&a.if_eq||s).call(t,null!=a?a.type:a,"week_goals",{name:"if_eq",hash:{},fn:l.program(34,i,0),inverse:l.noop,data:i}))?r:"")+"\n"+(null!=(r=(n.if_eq||a&&a.if_eq||s).call(t,null!=a?a.type:a,"other",{name:"if_eq",hash:{},fn:l.program(36,i,0),inverse:l.noop,data:i}))?r:"")},30:function(l,a,n,e,i){var r,t=null!=a?a:{},s=n.helperMissing,o="function",u=l.escapeExpression;return'								<div class="desempate desempate_uno clearfix">\n									\n									<div class="desempate_left">\n										<span>'+u((r=null!=(r=n.label||(null!=a?a.label:a))?r:s,typeof r===o?r.call(t,{name:"label",hash:{},data:i}):r))+'</span>\n									</div>\n									<div class="desempate_input">\n										<input type="hidden" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][id]"  value="null">\n										<input type="hidden" class="missing_entry" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][entry_id]" value="null">\n										<input type="hidden" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][tiebreaker_id]" value="'+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'">\n										<span>LOC</span>\n										<input type="tel" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][value][home]">\n										<span>-</span>\n										<input type="tel" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][value][away]">\n										<span>VIS</span>\n									</div><!-- desempate_input -->\n								\n								</div><!-- desempate_uno -->\n'},32:function(l,a,n,e,i){var r,t=null!=a?a:{},s=n.helperMissing,o="function",u=l.escapeExpression;return'								<div class="desempate desempate_dos clearfix">\n									<div class="desempate_left">\n										<span>'+u((r=null!=(r=n.label||(null!=a?a.label:a))?r:s,typeof r===o?r.call(t,{name:"label",hash:{},data:i}):r))+'</span>\n									</div>\n									<div class="desempate_input">\n										<input type="hidden" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][id]"  value="null">\n										<input type="hidden" class="missing_entry" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][entry_id]" value="null">\n										<input type="hidden" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][tiebreaker_id]" value="'+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'">\n										<input type="tel" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][value]">\n									</div><!-- desempate_input -->\n								</div><!-- desempate_dos -->\n'},34:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u="function",d=l.escapeExpression;return'								<div class="desempate desempate_dos clearfix">\n									<div class="desempate_left">\n										<span>'+d((t=null!=(t=n.label||(null!=a?a.label:a))?t:o,typeof t===u?t.call(s,{name:"label",hash:{},data:i}):t))+'</span>\n									</div>\n									<div class="desempate_input">\n										<input type="hidden" name="user_tiebreakers['+d((t=null!=(t=n.id||(null!=a?a.id:a))?t:o,typeof t===u?t.call(s,{name:"id",hash:{},data:i}):t))+'][id]"  value="null">\n										<input type="hidden" class="missing_entry" name="user_tiebreakers['+d((t=null!=(t=n.id||(null!=a?a.id:a))?t:o,typeof t===u?t.call(s,{name:"id",hash:{},data:i}):t))+'][entry_id]" value="null">\n										<input type="hidden" name="user_tiebreakers['+d((t=null!=(t=n.id||(null!=a?a.id:a))?t:o,typeof t===u?t.call(s,{name:"id",hash:{},data:i}):t))+'][tiebreaker_id]" value="'+d((t=null!=(t=n.id||(null!=a?a.id:a))?t:o,typeof t===u?t.call(s,{name:"id",hash:{},data:i}):t))+'">\n										<select id="tie_'+d((t=null!=(t=n.id||(null!=a?a.id:a))?t:o,typeof t===u?t.call(s,{name:"id",hash:{},data:i}):t))+'_select" class="no_check styled-select gray semi-square" name="user_tiebreakers['+d((t=null!=(t=n.id||(null!=a?a.id:a))?t:o,typeof t===u?t.call(s,{name:"id",hash:{},data:i}):t))+'][value]">\n											'+(null!=(r=(n.numberOptions||a&&a.numberOptions||o).call(s,null!=(r=null!=a?a.config_parsed:a)?r.min:r,null!=(r=null!=a?a.config_parsed:a)?r.max:r,{name:"numberOptions",hash:{},data:i}))?r:"")+"\n										</select>\n									</div><!-- desempate_input -->\n								</div><!-- desempate_dos -->\n"},36:function(l,a,n,e,i){var r,t=null!=a?a:{},s=n.helperMissing,o="function",u=l.escapeExpression;return'								<div class="desempate desempate_tres clearfix">\n									<div class="desempate_left">\n										<span>'+u((r=null!=(r=n.label||(null!=a?a.label:a))?r:s,typeof r===o?r.call(t,{name:"label",hash:{},data:i}):r))+'</span>\n									</div>\n									<div class="desempate_input">\n										<input type="hidden" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][id]"  value="null">\n										<input type="hidden" class="missing_entry" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][entry_id]" value="null">\n										<input type="hidden" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][tiebreaker_id]" value="'+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'">\n										<span>SI</span>\n										<input type="radio" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][value]" value="1">\n										<span>NO</span>\n										<input type="radio" name="user_tiebreakers['+u((r=null!=(r=n.id||(null!=a?a.id:a))?r:s,typeof r===o?r.call(t,{name:"id",hash:{},data:i}):r))+'][value]" value="0">\n									</div><!-- desempate_input -->\n								</div><!-- desempate_tres -->\n'},38:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u=l.escapeExpression,d=l.lambda;return'		<div id="registerNow" class="backed_modal clearfix" style="display: none;">\n			<div class="quiniela_registro clearfix">\n				<div class="quiniela_header clearfix">\n					<div class="quiniela_iconos clearfix">\n						<img src="'+u((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:o,"function"==typeof t?t.call(s,{name:"cordova_full_path",hash:{},data:i}):t))+"images/"+u(d(null!=(r=null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.sport:r)?r.icon:r,a))+'.png">\n'+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.point_format:r,"line",{name:"if_eq",hash:{},fn:l.program(5,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.point_format:r,"natural",{name:"if_eq",hash:{},fn:l.program(7,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=n["if"].call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.guaranteed_prize:r,{name:"if",hash:{},fn:l.program(9,i,0),inverse:l.noop,data:i}))?r:"")+"					</div><!-- iconos -->\n					<h2>"+u(d(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.name_replaced:r,a))+"</h2>\n"+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"real",{name:"if_eq",hash:{},fn:l.program(39,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"pickcoin",{name:"if_eq",hash:{},fn:l.program(42,i,0),inverse:l.noop,data:i}))?r:"")+'				</div><!-- quiniela_header -->\n\n				<form id="registerToQuinielaForm" method="POST" action="" >\n					<input type="hidden" name="pool_id" id="pool_id" value="'+u(d(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.id:r,a))+'">\n					<input type="hidden" name="entry_id" id="entry_id" value="">\n					<input type="hidden" name="entry_payment" id="entry_payment" value="real">\n					<div class="no_registros clearfix">\n						<span class="pregunta">¿Cuántos registros quieres para esta quiniela?</span>\n						<select class="no_check" name="num_entries" id="num_entries">\n							'+(null!=(r=(n.numberOptions||a&&a.numberOptions||o).call(s,1,40,{name:"numberOptions",hash:{},data:i}))?r:"")+'\n						</select>\n					</div><!-- no_registros -->\n					<div id="samePicksOption" class="copiar_picks clearfix" style="display: none;" >\n						<span class="pregunta"></span>\n						<input type="checkbox" id="use_same_picks" name="use_same_picks" class="css-checkbox lrg" value="1">\n						<label for="use_same_picks" name="use_same_picks" class="css-label lrg vlad">Utilizar los picks elegidos para todos los registros</label>\n					</div><!-- no_registros -->\n					<div class="balance clearfix">\n						<div class="disponible clearfix">\n							<p>Balance disponible:</p>\n'+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"real",{name:"if_eq",hash:{},fn:l.program(44,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"pickcoin",{name:"if_eq",hash:{},fn:l.program(46,i,0),inverse:l.noop,data:i}))?r:"")+'						</div><!-- disponible -->\n						<div class="descontaran clearfix">\n							<p>Se descontarán:</p>\n'+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"real",{name:"if_eq",hash:{},fn:l.program(48,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"pickcoin",{name:"if_eq",hash:{},fn:l.program(50,i,0),inverse:l.noop,data:i}))?r:"")+'						</div><!-- descontaran -->\n						<div class="total clearfix">\n							<p>Entrada:</p>\n'+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"real",{name:"if_eq",hash:{},fn:l.program(52,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"pickcoin",{name:"if_eq",hash:{},fn:l.program(54,i,0),inverse:l.noop,data:i}))?r:"")+'						</div><!-- total -->\n					</div><!-- balance -->\n\n					<div class="botones clarfix">\n						<input type="submit" id="sendRegister" class="green_button" value="Registrarme y guardar" />\n					</div>\n				</form>\n			</div><!-- quiniela-registro -->\n\n		</div><!-- quiniela_registro_overlay -->\n'},39:function(l,a,n,e,i){var r;return null!=(r=(n.if_less||a&&a.if_less||n.helperMissing).call(null!=a?a:{},null!=(r=null!=a?a.me:a)?r.balanceReal:r,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_fee:r,{name:"if_less",hash:{},fn:l.program(40,i,0),inverse:l.noop,data:i}))?r:""},40:function(l,a,n,e,i){return'							<p class="error_inline clearfix">No tienes saldo suficiente para registrarte en esta quiniela.</p>\n'},42:function(l,a,n,e,i){var r;return null!=(r=(n.if_less||a&&a.if_less||n.helperMissing).call(null!=a?a:{},null!=(r=null!=a?a.me:a)?r.balancePc:r,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_fee:r,{name:"if_less",hash:{},fn:l.program(40,i,0),inverse:l.noop,data:i}))?r:""},44:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u=l.escapeExpression;return'								<div class="disponible_dinero clearfix">\n									<img src="'+u((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:o,"function"==typeof t?t.call(s,{name:"cordova_full_path",hash:{},data:i}):t))+'images/billete.png">\n									<p>$'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=a?a.me:a)?r.balanceReal:r,{name:"formatCurrency",hash:{},data:i}))+" MXN</p>\n								</div><!-- disponible dinero -->\n"},46:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u=l.escapeExpression;return'								<div class="disponible_coins">\n									<img src="'+u((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:o,"function"==typeof t?t.call(s,{name:"cordova_full_path",hash:{},data:i}):t))+'images/pickcoin.png">\n									<p>'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=a?a.me:a)?r.balancePc:r,{name:"formatCurrency",hash:{},data:i}))+"</p>\n								</div><!-- disponible coins -->\n"},48:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u=l.escapeExpression;return'								<div class="descontaran_dinero">\n									<img src="'+u((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:o,"function"==typeof t?t.call(s,{name:"cordova_full_path",hash:{},data:i}):t))+'images/billete.png">\n									<p class="affect" data-fee="'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+'">$'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+" MXN</p>\n								</div><!-- descontaran dinero -->\n"},50:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u=l.escapeExpression;return'								<div class="descontaran_coins">\n									<img src="'+u((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:o,"function"==typeof t?t.call(s,{name:"cordova_full_path",hash:{},data:i}):t))+'images/pickcoin.png">\n									<p class="affect" data-fee="'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+'">'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+"</p>\n								</div><!-- descontaran coins -->\n"},52:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u=l.escapeExpression;return'								<div class="total_dinero">\n									<img src="'+u((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:o,"function"==typeof t?t.call(s,{name:"cordova_full_path",hash:{},data:i}):t))+'images/billete.png">\n									<p class="affect" data-fee="'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.real_entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+'" data-commission="'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.commission_fee:r,{name:"formatCurrency",hash:{},data:i}))+'">$'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.real_entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+" MXN + $"+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.commission_fee:r,{name:"formatCurrency",hash:{},data:i}))+" comisión</p>\n								</div><!-- total dinero -->\n"},54:function(l,a,n,e,i){var r,t,s=null!=a?a:{},o=n.helperMissing,u=l.escapeExpression;return'								<div class="total_coins">\n									<img src="'+u((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:o,"function"==typeof t?t.call(s,{name:"cordova_full_path",hash:{},data:i}):t))+'images/pickcoin.png">\n									<p  class="affect" data-fee="'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.real_entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+'" data-commission="'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.commission_fee:r,{name:"formatCurrency",hash:{},data:i}))+'">'+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.real_entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+" + "+u((n.formatCurrency||a&&a.formatCurrency||o).call(s,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.commission_fee:r,{name:"formatCurrency",hash:{},data:i}))+" comisión</p>\n								</div><!-- total coins -->\n"},compiler:[7,">= 4.0.0"],main:function(l,a,n,e,i){var r,t,s=l.lambda,o=l.escapeExpression,u=n.blockHelperMissing,d=null!=a?a:{},c=n.helperMissing,p="function";return'\n	<div id="detailQuiniela" data-id="'+o(s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.id:r,a))+'" data-entry="'+o(s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_id:r,a))+'" data-weekid="'+o(s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.week_id:r,a))+'" class="content quiniela_single clearfix">\n		\n'+(null!=(r=u.call(a,s(null!=(r=null!=a?a.data:a)?r.closed:r,a),{name:"data.closed",hash:{},fn:l.noop,inverse:l.program(1,i,0),data:i}))?r:"")+'	\n		<a class="link_wrapper">\n			<div class="quiniela '+(null!=(r=(n.if_eq||a&&a.if_eq||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.format:r,"natural",{name:"if_eq",hash:{},fn:l.program(3,i,0),inverse:l.noop,data:i}))?r:"")+' garantizado clearfix">\n				<div class="quiniela_header clearfix">\n					<div class="quiniela_iconos clearfix">\n						<img src="'+o((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:c,typeof t===p?t.call(d,{name:"cordova_full_path",hash:{},data:i}):t))+"images/"+o(s(null!=(r=null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.sport:r)?r.icon:r,a))+'.png">\n'+(null!=(r=(n.if_eq||a&&a.if_eq||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.point_format:r,"line",{name:"if_eq",hash:{},fn:l.program(5,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.point_format:r,"natural",{name:"if_eq",hash:{},fn:l.program(7,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=n["if"].call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.guaranteed_prize:r,{name:"if",hash:{},fn:l.program(9,i,0),inverse:l.noop,data:i}))?r:"")+"					</div><!-- iconos -->\n					<h2>"+(null!=(r=n["if"].call(d,null!=(r=null!=(r=null!=(r=null!=a?a.tournament_instances:a)?r[0]:r)?r.tournament:r)?r.flag_class:r,{name:"if",hash:{},fn:l.program(11,i,0),inverse:l.noop,data:i}))?r:"")+" "+o(s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.name_replaced:r,a))+'</h2>\n				</div><!-- quiniela_header -->\n				<div class="quiniela_content clearfix">\n					<div class="quiniela_info clearfix">\n						<span class="registros">REG: '+o(s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_count:r,a))+'</span>\n						<span class="cierre">'+(null!=(r=n["if"].call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.closed:r,{name:"if",hash:{},fn:l.noop,inverse:l.program(13,i,0),data:i}))?r:"")+(null!=(r=n["if"].call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.closed:r,{name:"if",hash:{},fn:l.program(15,i,0),inverse:l.noop,data:i}))?r:"")+': <br/> <strong class="timer_active">'+o((n.formatDate||a&&a.formatDate||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.deadline_tz:r,"lll",{name:"formatDate",hash:{},data:i}))+"</strong></span>\n"+(null!=(r=u.call(a,s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.limited_capacity:r,a),{name:"data.pool.limited_capacity",hash:{},fn:l.program(17,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=u.call(a,s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.closed:r,a),{name:"data.pool.closed",hash:{},fn:l.program(19,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||c).call(d,null!=a?a.status:a,"live",{name:"if_eq",hash:{},fn:l.program(21,i,0),inverse:l.noop,data:i}))?r:"")+'					</div><!-- quiniela_info -->\n					\n					<div class="quiniela_bolsa clearfix">\n						<span class="titulo">BOLSA</span>\n						<img src="'+o((t=null!=(t=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?t:c,typeof t===p?t.call(d,{name:"cordova_full_path",hash:{},data:i}):t))+'images/billete.png">\n						<span class="number">$'+o((n.formatCurrency||a&&a.formatCurrency||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.available:r,{name:"formatCurrency",hash:{},data:i}))+'</span>\n					</div>\n					<div class="quiniela_entrada clearfix">\n						<span class="titulo">ENTRADA</span>\n'+(null!=(r=(n.if_eq||a&&a.if_eq||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"real",{name:"if_eq",hash:{},fn:l.program(23,i,0),inverse:l.noop,data:i}))?r:"")+(null!=(r=(n.if_eq||a&&a.if_eq||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_currency:r,"pickcoin",{name:"if_eq",hash:{},fn:l.program(25,i,0),inverse:l.noop,data:i}))?r:"")+'						<span class="number">$'+o((n.formatCurrency||a&&a.formatCurrency||c).call(d,null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.entry_fee:r,{name:"formatCurrency",hash:{},data:i}))+"</span>\n					</div>\n				</div><!-- quiniela_content -->\n			</div><!-- quiniela -->\n		</a><!-- link_wrapper -->\n"+(null!=(r=u.call(a,s(null!=(r=null!=a?a.data:a)?r.closed:r,a),{name:"data.closed",hash:{},fn:l.noop,inverse:l.program(27,i,0),data:i}))?r:"")+"		\n"+(null!=(r=u.call(a,s(null!=(r=null!=(r=null!=a?a.data:a)?r.pool:r)?r.closed:r,a),{name:"data.pool.closed",hash:{},fn:l.noop,inverse:l.program(38,i,0),data:i}))?r:"")+"		\n	</div><!-- content -->"},useData:!0})}();