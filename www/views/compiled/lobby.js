!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["lobby"]=n({1:function(n,a,i,s,e){var l;return null!=(l=n.invokePartial(s["each-quiniela"],a,{name:"each-quiniela",data:e,indent:"				",helpers:i,partials:s,decorators:n.decorators}))?l:""},compiler:[7,">= 4.0.0"],main:function(n,a,i,s,e){var l;return'\n	<div class="container clearfix lobby">\n'+(null!=(l=n.invokePartial(s.header,a,{name:"header",data:e,indent:"		",helpers:i,partials:s,decorators:n.decorators}))?l:"")+'		<div class="content quinielas">\n'+(null!=(l=i.blockHelperMissing.call(a,n.lambda(null!=(l=null!=a?a.data:a)?l.pools:l,a),{name:"data.pools",hash:{},fn:n.program(1,e,0),inverse:n.noop,data:e}))?l:"")+'\n\n		</div><!-- content -->\n		<div class="menu clearfix">\n			<ul>\n				<li class="menu_lobby selected"><a href=""></a></li>\n				<li class="menu_quinielas"><a href="#"></a></li>\n				<li class="menu_privadas"><a href="#"></a></li>\n				<li class="menu_perfil"><a href="#"></a></li>\n				<li class="menu_abonar"><a href="#"></a></li>\n			</ul>\n		</div><!-- menu -->\n	</div><!-- container -->\n	\n'+(null!=(l=n.invokePartial(s.filters,a,{name:"filters",data:e,indent:"	",helpers:i,partials:s,decorators:n.decorators}))?l:"")+'\n	<div class="misquinielas overlay">\n		\n			<div class="quiniela quiniela_open soccer natural garantizado clearfix">\n				<a class="link_wrapper" href="">\n				<div class="quiniela_header clearfix">\n					<div class="quiniela_iconos clearfix">\n						<img src="images/natural.png">\n						<img src="images/soccer.png">\n					</div><!-- iconos -->\n					<h2>5678 LOREM IPSUM DOLOR SIT AMET S12</h2>\n				</div><!-- quiniela_header -->\n				<div class="quiniela_content clearfix">\n					<div class="quiniela_info clearfix">\n						<span class="registros">REG: 1,234</span>\n						<span class="cierre">CIERRE: 28.feb.2017</span>\n						<span class="limite">Limitado a 1000 entradas</span>\n					</div><!-- quiniela_info -->\n					<div class="quiniela_entrada clearfix">\n						<span class="titulo">ENTRADA</span>\n						<img src="images/billecoin.png">\n						<span class="number">$1,234</span>\n					</div>\n					<div class="quiniela_bolsa clearfix">\n						<span class="titulo">BOLSA</span>\n						<img src="images/garantizado.png">\n						<span class="number guarantee">$5,678</span>\n					</div>\n				</div><!-- quiniela_content -->\n				</a><!-- link_wrapper -->				\n			</div><!-- quiniela -->\n		\n\n		\n			<div class="quiniela quiniela_open nfl linea garantizado clearfix">\n				<a class="link_wrapper" href="">\n				<div class="quiniela_header clearfix">\n					<div class="quiniela_iconos clearfix">\n						<img src="images/linea.png">\n						<img src="images/nfl.png">\n					</div><!-- iconos -->\n					<h2>5678 LOREM IPSUM DOLOR SIT AMET S12</h2>\n				</div><!-- quiniela_header -->\n				<div class="quiniela_content clearfix">\n					<div class="quiniela_info clearfix">\n						<span class="registros">REG: 1,234</span>\n						<span class="cierre">CIERRE: 28.feb.2017</span>\n						<span class="limite">Limitado a 1000 entradas</span>\n					</div><!-- quiniela_info -->\n					<div class="quiniela_entrada clearfix">\n						<span class="titulo">ENTRADA</span>\n						<img src="images/billecoin.png">\n						<span class="number">$1,234</span>\n					</div>\n					<div class="quiniela_bolsa clearfix">\n						<span class="titulo">BOLSA</span>\n						<img src="images/garantizado.png">\n						<span class="number guarantee">$5,678</span>\n					</div>\n				</div><!-- quiniela_content -->\n				</a><!-- link_wrapper -->				\n			</div><!-- quiniela -->\n		\n\n		\n			<div class="quiniela quiniela_live nfl linea garantizado clearfix">\n				<a class="link_wrapper" href="">\n				<div class="quiniela_header clearfix">\n					<div class="quiniela_iconos clearfix">\n						<img src="images/linea.png">\n						<img src="images/nfl.png">\n					</div><!-- iconos -->\n					<h2>5678 LOREM IPSUM DOLOR SIT AMET S12</h2>\n				</div><!-- quiniela_header -->\n				<div class="quiniela_content clearfix">\n					<div class="quiniela_info clearfix">\n						<span class="registros">REG: 1,234</span>\n						<span class="cierre">CIERRE: 28.feb.2017</span>\n						<span class="limite">Limitado a 1000 entradas</span>\n					</div><!-- quiniela_info -->\n					<div class="quiniela_entrada clearfix">\n						<span class="titulo">ENTRADA</span>\n						<img src="images/billecoin.png">\n						<span class="number">$1,234</span>\n					</div>\n					<div class="quiniela_bolsa clearfix">\n						<span class="titulo">BOLSA</span>\n						<img src="images/garantizado.png">\n						<span class="number guarantee">$5,678</span>\n					</div>\n				</div><!-- quiniela_content -->\n				</a><!-- link_wrapper -->				\n			</div><!-- quiniela -->\n		\n\n		\n			<div class="quiniela quiniela_closed nfl linea garantizado clearfix">\n				<a class="link_wrapper" href="">\n				<div class="quiniela_header clearfix">\n					<div class="quiniela_iconos clearfix">\n						<img src="images/linea.png">\n						<img src="images/nfl.png">\n					</div><!-- iconos -->\n					<h2>5678 LOREM IPSUM DOLOR SIT AMET S12</h2>\n				</div><!-- quiniela_header -->\n				<div class="quiniela_content clearfix">\n					<div class="quiniela_info clearfix">\n						<span class="registros">REG: 1,234</span>\n						<span class="cierre">CIERRE: 28.feb.2017</span>\n						<span class="limite">Limitado a 1000 entradas</span>\n					</div><!-- quiniela_info -->\n					<div class="quiniela_entrada clearfix">\n						<span class="titulo">ENTRADA</span>\n						<img src="images/billecoin.png">\n						<span class="number">$1,234</span>\n					</div>\n					<div class="quiniela_bolsa clearfix">\n						<span class="titulo">BOLSA</span>\n						<img src="images/garantizado.png">\n						<span class="number guarantee">$5,678</span>\n					</div>\n				</div><!-- quiniela_content -->\n				</a><!-- link_wrapper -->				\n			</div><!-- quiniela -->\n		\n\n		\n			<div class="quiniela quiniela_otra nfl linea garantizado clearfix">\n				<a class="link_wrapper" href="">\n				<div class="quiniela_header clearfix">\n					<div class="quiniela_iconos clearfix">\n						<img src="images/linea.png">\n						<img src="images/nfl.png">\n					</div><!-- iconos -->\n					<h2>5678 LOREM IPSUM DOLOR SIT AMET S12</h2>\n				</div><!-- quiniela_header -->\n				<div class="quiniela_content clearfix">\n					<div class="quiniela_info clearfix">\n						<span class="registros">REG: 1,234</span>\n						<span class="cierre">CIERRE: 28.feb.2017</span>\n						<span class="limite">Limitado a 1000 entradas</span>\n					</div><!-- quiniela_info -->\n					<div class="quiniela_entrada clearfix">\n						<span class="titulo">ENTRADA</span>\n						<img src="images/billecoin.png">\n						<span class="number">$1,234</span>\n					</div>\n					<div class="quiniela_bolsa clearfix">\n						<span class="titulo">BOLSA</span>\n						<img src="images/garantizado.png">\n						<span class="number guarantee">$5,678</span>\n					</div>\n				</div><!-- quiniela_content -->\n				</a><!-- link_wrapper -->				\n			</div><!-- quiniela -->\n		\n\n	</div><!-- misquinielas overlay -->\n'},usePartial:!0,useData:!0})}();