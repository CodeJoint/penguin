!function(){var a=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l["filters"]=a({compiler:[7,">= 4.0.0"],main:function(a,l,o,n,i){var t,e=null!=l?l:{},d=o.helperMissing,s="function",c=a.escapeExpression;return'	<div class="filtros_wrapper">\n		<div class="filtros overlay clearfix">\n			<div class="filtros_moneda clearfix">\n				<h3>MONEDA</h3>\n				<ul class="clearfix">\n					<li data="todos_moneda"><h3>TODOS</h3></li>\n					<li data="money_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/billete.png"></li>\n					<li data="pickcoin_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/pickcoin.png"></li>\n				</ul>\n				<ul class="clearfix" id="money_moneda">\n					<li data="money_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/billete.png"></li>\n					<li data="money_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/bill2.png"></li>\n					<li data="money_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/bill3.png"></li>\n				</ul>\n				<ul class="clearfix" id="pickcoin_moneda">\n					<li data="money_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/pickcoin.png"></li>\n					<li data="money_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/pic2.png"></li>\n					<li data="money_moneda"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/pic3.png"></li>\n				</ul>\n			</div><!-- filtros_moneda -->\n			<div class="filtros_deporte clearfix">\n				<h3>DEPORTE</h3>\n				<ul class="clearfix">\n					<li data="todos_deporte"><h3>TODOS</h3></li>\n					<li data="deporte_soccer"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/soccer.png"></li>\n					<li data="deporte_basket"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/basket.png"></li>\n					<li data="deporte_baseball"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/baseball.png"></li>\n					<li data="deporte_nfl"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/nfl.png"></li>\n					<li data="deporte_golf"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/golf.png"></li>\n					<li data="deporte_tennis"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/tennis.png"></li>\n					<li data="deporte_f1"><img src="'+c((t=null!=(t=o.cordova_full_path||(null!=l?l.cordova_full_path:l))?t:d,typeof t===s?t.call(e,{name:"cordova_full_path",hash:{},data:i}):t))+'images/f1.png"></li>\n				</ul>\n				<ul class="clearfix" id="deporte_soccer">\n					<li data="soccer_todas"><span>Todas</span></li>\n					<li data="soccer_ligamx"><span>Liga MX</span></li>\n					<li data="soccer_copamx"><span>Copa MX</span></li>\n					<li data="soccer_laliga"><span>La Liga</span></li>\n					<li data="soccer_premier"><span>Premier</span></li>\n					<li class="selected" data="soccer_champions"><span>Champions</span></li>\n				</ul>\n			</div><!-- filtros_deporte -->\n			<div class="filtros_tipo clearfix">\n				<h3>TIPO</h3>\n				<ul class="clearfix">\n					<li data="tipo_abiertas"><h3>Abiertas</h3></li>\n					<li data="tipo_limitadas"><h3>Cupo limitado</h3></li>\n				</ul>\n			</div><!-- filtros_deporte -->\n			<div class="filtros_estado clearfix">\n				<h3>ESTADO</h3>\n				<ul class="clearfix">\n					<li data="estado_procimas"><h3>Próximas</h3></li>\n					<li data="estado_live"><h3>En curso</h3></li>\n					<li data="estado_finalizadas"><h3>Finalizadas</h3></li>\n				</ul>\n			</div><!-- filtros_deporte -->\n		</div><!-- filtros overlay -->\n	</div>'},useData:!0})}();