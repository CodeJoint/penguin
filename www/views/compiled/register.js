!function(){var e=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["register"]=e({compiler:[7,">= 4.0.0"],main:function(e,a,n,i,l){var s;return'<div class="container registro">\n	<div class="content">\n		<div class="splash_logo">\n			<img src="'+e.escapeExpression((s=null!=(s=n.cordova_full_path||(null!=a?a.cordova_full_path:a))?s:n.helperMissing,"function"==typeof s?s.call(null!=a?a:{},{name:"cordova_full_path",hash:{},data:l}):s))+'images/tuprimeravez.svg">\n			<p>Regístrate y te regalamos la entrada \u2028a las quinielas \'Tu Primera Vez\',\u2028 además te regalamos 100 Pickcoins \u2028para que comiences a jugar.</p>\n		</div>\n		<div class="form">\n			<form id="register_form" method="POST" action="">\n				<input type="text" name="name" placeholder="Nombre *" value="">\n				<input type="text" name="last_name" placeholder="Apellido *" value="">\n				<input type="text" name="nickname" placeholder="Apodo *" value="">\n				<input type="email" name="email" placeholder="E-mail *" value="">\n				<input id="password" type="password" name="password" placeholder="Contraseña *" value="">\n				<input id="repeat_password" type="password" name="repeat_password" placeholder="Repite tu contraseña *" value="">\n				<div class="selectors clearfix">\n					\n					<div class="selector clearfix">\n						<input type="checkbox" value="true" name="accept_terms">\n						<label for="acepta_terminos">Acepto los <a onclick="window.open(\'https://www.pickwin.net/terminos-y-condiciones\', \'_blank\', \'location=yes\')" >términos y condiciones</a></label>\n					</div>\n					\n					<div class="selector clearfix">\n						<input type="checkbox" value="true" name="is_M18">\n						<label for="acepta_terminos">Certifico que tengo al menos 18 años de edad</label>\n					</div>\n				</div>\n				<input class="submit_green" type="submit" value="Crear cuenta">\n			</form>\n			<div class="legales clearfix">\n				<a class="link_legal" onclick="window.open(\'https://www.pickwin.net/terminos-y-condiciones\', \'_blank\', \'location=yes\')" >Términos y condiciones | </a>\n				<a class="link_legal" onclick="window.open(\'https://www.pickwin.net/aviso-de-privacidad\', \'_blank\', \'location=yes\')" >Política de privacidad</a>\n				<p>Pickwin es una plataforma de entretenimiento de juegos de habilidad, <br/>no es un sitio de apuestas.</p>\n			</div>\n		</div>\n	</div>\n</div>\n'},useData:!0})}();