/*      _                                       _                        _       
 *   __| | ___   ___ _   _ _ __ ___   ___ _ __ | |_   _ __ ___  __ _  __| |_   _ 
 *  / _` |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __| | '__/ _ \/ _` |/ _` | | | |
 * | (_| | (_) | (__| |_| | | | | | |  __/ | | | |_  | | |  __/ (_| | (_| | |_| |
 *  \__,_|\___/ \___|\__,_|_| |_| |_|\___|_| |_|\__| |_|  \___|\__,_|\__,_|\__, |
 *                                                                         |___/ 
 */
		
window.initializeEvents = function(){
	
	jQuery(document).ready(function($) {

		$('*').unbind();
		$('body').removeClass("preventEvents");
		var ventana = $(window).height();
		window.alert = (typeof navigator.notification !== 'undefined') ? navigator.notification.alert : window.alert;

		window.initHooks = function(){
			$('.hook').unbind();
			/* Hook soft links */
			$('.hook').on('click', function(e){

				e.preventDefault();
				app.showLoader();
				/*** Register / Login ***/
				if( $(this).data('resource') == "register" )
					return app.render_register( $(this).attr('href') );
				if( $(this).data('resource') == "forgot-password" )
					return app.render_forgot_password( $(this).attr('href') );
				if( $(this).data('resource') == "login" )
					return app.render_login( $(this).attr('href') );

				if( $(this).data('resource') == "lobby" )
					return app.render_lobby( $(this).attr('href'), false );
				if( $(this).data('resource') == "first-lobby" )
					return app.render_lobby( $(this).attr('href') );
				if( $(this).data('resource') == "privates" )
					return app.render_private_search( $(this).attr('href') );
				if( $(this).data('resource') == "privates-create" )
					return app.render_create_private( $(this).attr('href') );
				if( $(this).data('resource') == "my_lobby" ){
					/** check if sidebar is present or reroute otherwise **/
					$('#misQuinielas').trigger('click');
					return app.hideLoader();
				}
				if( $(this).data('resource') == "detail" )
					return app.render_detail( $(this).attr('href'), $(this).data('object') );
				
				/*** User ***/
				if( $(this).data('resource') == "profile-methods" )
					return app.render_profile( $(this).attr('href') );
				if( $(this).data('resource') == "profile-documents" )
					return app.render_profile( $(this).attr('href'), 'documents' );
				if( $(this).data('resource') == "profile-withraw" )
					return app.render_profile( $(this).attr('href'), 'withraw' );
				if( $(this).data('resource') == "profile-history" )
					return app.render_profile( $(this).attr('href'), 'history' );
				if( $(this).data('resource') == "profile-notifications" )
					return app.render_profile( $(this).attr('href'), 'notifications' );
				if( $(this).data('resource') == "deposit" )
					return app.render_add_funds( $(this).attr('href') );
				if( $(this).data('resource') == "deposit-stores" )
					return app.render_add_funds_store( $(this).attr('href') );
				
				e.stopPropagation();
			});
		};

		if(!window.fingerprint)
			new Fingerprint2().get(function(result, components){
			  window.fingerprint = {hash: result};
			});

		//-----------------------------
		//
		// Keyboard events for iOS
		//
		//-----------------------------
		var initialViewHeight = document.documentElement.clientHeight;
		var calculate = null;

		/*** Fix keyboard defaults ***/
		if(typeof Keyboard != 'undefined'){
			Keyboard.disableScrollingInShrinkView(false);
			Keyboard.shrinkView(false);
		}

		if($('#container').hasClass("chat")){
			/*** Fix keyboard chat specifics ***/
			if(typeof Keyboard != 'undefined'){
				Keyboard.disableScrollingInShrinkView(true);
				Keyboard.shrinkView(true);
			}
		}

		/*** Fix keyboard NO-SHRINK specifics ***/
		if($('.view').hasClass("login")){
			if(typeof Keyboard != 'undefined'){
				Keyboard.disableScrollingInShrinkView(false);
				Keyboard.shrinkView(true);
			}
		}

		var fixWithKeyboard = function(){ }

		window.openKeyboard = false;

		/* Keyboard shown event */
		window.addEventListener('keyboardDidShow', function () {
			
			$('.escribir').hide();
			window.openKeyboard = true;
			return fixWithKeyboard();
		});

		/* Keyboard hidden event */
		window.addEventListener('keyboardDidHide', function () {
			window.openKeyboard = false;
			$('body').removeClass("openkeyboard");
			$('body').scrollTop($('#messages-list').prop('scrollHeight'));
			$('.escribir').css('bottom', 0);
		});

		/********** Init General timeout **********/
		setTimeout(function(){
			
			initHooks();

			$('.facebook').click(function () {			
				apiRH.loginOauth('facebook');
			});

			if($('#register_form').length){

				window.init_scripts.push("register_validate");
				$('#register_form').validate({
					rules:{
						name 		: "required",
						last_name 	: "required",
						nickname 	: "required",
						email 		: "required",
						password 	: "required",
						repeat_password :{
							required: true,
							equalTo : "#password"
						},
						accept_terms: "required",
						is_M18		: "required"
					},
					messages:{
						name 		: "Debes proporcionar un nombre",
						last_name 	: "Debes proporcionar un apellido",
						nickname 	: "Por favor elige un nombre de usuario",
						email 		: "Es necesario que especifiques un correo elecrónico",
						password 	: "Por favor ingresa tu contraseña",
						repeat_password : {
									required : "Por favor repite tu contraseña",
									equalTo  : "Las contraseñas no coinciden"
						},
						accept_terms: "Debes aceptar nuestros términos para continuar",
						is_M18		: "Debes ser mayor de edad para continuar"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						app.showLoader();
						var data_user	= app.getFormData(form, 'object');
						var register_response 	= apiRH.registerNative(data_user);

						if(register_response){

							localStorage.setItem("Auth", register_response.jwtoken);
							apiRH.save_user_data_clientside(register_response);
							if(register_response.user){
								window._user = (register_response.user) ? register_response.user : null; 
								return app.render_register_success('register-success.html');
							}

						}else{
							app.toast("Ocurrió un error, por favor revisa que tus datos sean correctos.")
							return app.hideLoader();
						}
					}
				});

			} // END register_form

			if($('#registerSuccess').length){
				

			} // END registerSuccess

			if($('#login_form').length){

				window.init_scripts.push("login_validate");
				$('#login_form').validate({
					rules:{
						username : "required",
						password : "required"
					},
					messages:{
						username : "Tu cuenta de correo electrónico",
						password : "Tu contraseña es necesaria para entrar."
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						var data_login		= app.getFormData(form, 'object');
						var login_response 	= apiRH.loginNative(data_login);
						if(login_response){
							apiRH.headers['Authorization'] = "Bearer "+login_response.jwtoken;
							apiRH.save_user_data_clientside(login_response);
							if(login_response.user){
								window._user = (login_response.user) ? login_response.user : null;
								return app.render_lobby('lobby.html');
							}
						}else{
							app.toast("Ocurrió un error, por favor revisa que tus datos sean correctos.")
							return app.hideLoader();
						}
					}
				});

				$('#fb_login').on('click', function(e) {
					e.preventDefault();
					return apiRH.FBOauth();
				});

			} // END login_form scope

			if($('#forgot_form').length){

				window.init_scripts.push("login_validate");
				$('#forgot_form').validate({
					rules:{
						email : { 
									required: true,
									email 	: true
								}
					},
					messages:{
						email : { 
									required: "Es necesario que ingreses tu Email",
									email 	: "Por favor ingresa un email válido"
								}
					},
					submitHandler: function( form, event ){
						event.preventDefault();
						var data_user		= app.getFormData(form, 'object');
						var pwd_response 	= apiRH.askNewPassword(data_user);
						if(pwd_response){
							/** Keeping russian bullet token, do not keep in production **/
							app.keeper.setItem("russian_bullet", pwd_response.token);
							return app.render_password_sent('password-sent.html');
						}else{
							app.toast("Ocurrió un error, por favor revisa que tus datos sean correctos.")
							return app.hideLoader();
						}
					}
				});

			} // END forgot_form scope
			
			if($('#theHeader').length){

			} // END theHeader
			
			if($('#lobbyContainer').length){

				/** Render header again to include filters component **/
				app.render_header(true);

				$('.footermenu ul li').removeClass('selected');
				$('.menu_lobby').addClass('selected');

				/*** FILTERS ***/
					$('.header_filtros').on('click', function(){
						if($('.filtros_wrapper').hasClass('filtros_show')){
							$('.filtros_wrapper').removeClass('filtros_show');
							$('.filtros_wrapper').fadeOut('fast');
						}else {
							$('.filtros_wrapper').addClass('filtros_show');
							$('.filtros_wrapper').fadeIn('fast');
						}
					});

					$('.filtros_wrapper').on('click', function(event){
						if(!$(event.target).closest('.filtros.overlay').length){
							if($('.filtros_wrapper').hasClass('filtros_show')){
								$('.filtros_wrapper').removeClass('filtros_show');
								$('.filtros_wrapper').fadeOut('fast');
							}
						}
					});

				$('.filtros li').on('click', function(){
					$(this).closest('ul').find('li').removeClass('selected');
					$(this).addClass('selected');
				});

				if($('#misQuinielas').length){

						app.render_myfeed_sidebar();

						var positiveMargin = false;
						$('.misquinielas').on('click', function(){

							$('.menu li').removeClass('selected');
							if (!positiveMargin) {
								var left = "0%";
								var padd = "1%";
								positiveMargin = true;
								$('.menu .menu_quinielas').addClass('selected');
								setTimeout(function(){
									$('.misquinielas').addClass('open');
								}, 200);
								$('#insertFeed').addClass('noscroll');
							} else {
								var left = "97%";
								var padd = "1%";
								positiveMargin = false;
								$('.menu .menu_quinielas').removeClass('selected');
								$('.menu .menu_lobby').addClass('selected');
								$('.misquinielas').removeClass('open');
								$('#insertFeed').removeClass('noscroll');
							}
							$('.misquinielas').animate( {
															marginLeft: left,
															paddingLeft: padd,
														}, 
														{
															duration: 500,
															complete: function() { }
														});
						});
				} // END misQuinielas scope

				/** Render lobby **/
				app.render_lobby_feed('chronological');

				$('[data-countdown]').each(function(index, element) {
					var $this = $(element), finalDate = $(element).data('countdown');
					var date = moment(finalDate).format('YYYY-MM-DD HH:mm:ss');
					if(date !== 'Invalid date')
						$this.countdown(date, function(event) {
							$this.html('<strong class="timer_active">CIERRE: '+event.strftime('%H:%M:%S')+'</strong>');
						});
				});
				setTimeout( function(){ initHooks(); }, 300);

			} // END lobbyContainer scope
		
			if($('#detailQuiniela').length){

				var gameId = $('#detailQuiniela').data('id');

					$('#reg_into_game').on('click',function(){
						$('#registerNow').fadeIn('fast');
					});
					$('#closeRegister').on('click',function(){
						$('#registerNow').fadeOut('fast');
					});
					$('#sendRegister').on('click',function(){
						$('#registerNow').fadeOut('fast');
					});
					
					/** Render quiniela games and picks selectors **/
					app.render_games(gameId);

					$('#registerToQuinielaForm').validate({
						rules:{
							gameName	: "required",
							gameCode 	: "required"
						},
						messages:{
							gameName	: "Debes ingresar el nombre de la quiniela",
							gameCode 	: "Necesitas el código para encontrar la quiniela"
						},
						submitHandler:function( form, event ){
							event.preventDefault();
							app.showLoader();
							var register_data	= app.getFormData(form, 'object');

							// var response 	= apiRH.searchPrivates(data_search);
							// return app.render_search_results(response);
							return false;
						}
					});

			} // END detailQuiniela scope
			
			
			if($('#busquedaQuinielas').length){
				$('#busquedaQuinielas').validate({
					rules:{
						gameName	: "required",
						gameCode 	: "required"
					},
					messages:{
						gameName	: "Debes ingresar el nombre de la quiniela",
						gameCode 	: "Necesitas el código para encontrar la quiniela"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						app.showLoader();
						var data_search	= app.getFormData(form, 'object');
						var response 	= apiRH.searchPrivates(data_search);
						app.render_search_results(response);
						setTimeout(function(){
							return initHooks();
						},300);
					}
				});
	
			} // END busquedaQuinielas scope
		
			if($('#profileTabs').length){

					/* Log Out from the API */
					$('#logoutComponent').on('click', function(e){
						/* TODO: Requesting logout from server */
						app.keeper.clear();
						app.render_login();
						return;
					});
					$('.footermenu ul li').removeClass('selected');
					$('.menu_perfil').addClass('selected');

				/* Payment methods tab */
				if($('#profileTabs').hasClass('methods')){
					var card_id = null;

					function onDeletionConfirm(buttonIndex) {
						var response = apiRH.deleteRequest('api/openpay_cards/delete/'+card_id+'.json', {});
						return (response) ? app.render_profile('profile.html') : app.toast("Ocurrió un error, intenta nuevamente.");
					}

					$('body').on('click', function(event){
						if(!$(event.target).closest('.backed_modal').length)
					        if($('.backed_modal').is(":visible")) {
					            $('.backed_modal').hide();
					        }
					});
					$('.agregar_tarjeta').click(function(event){
					    event.stopPropagation();
					});

					$('#addCardForm').validate({
						rules:{
							holder_name		 : "required",
							card_number 	 : "required",
							expiration_month : "required",
							expiration_year  : "required",
							cvv2 			 : "required"
						},
						messages:{
							holder_name		 : "Ingresa el nombre del tarjetahabiente",
							card_number 	 : "Ingresa el número de tu tarjeta",
							expiration_month : "Campo obligatorio",
							expiration_year  : "Campo obligatorio",
							cvv2 			 : "Ingresa tu código de seguridad"
						},
						submitHandler:function( form, event ){
							event.preventDefault();
							app.showLoader();
							var card_data = app.getFormData(form, 'object');
							return apiRH.addPaymentMethod(card_data);
						}
					});

					$('.delete_card').on('click', function(){
						card_id = $(this).data('id');
						var digits 	= $(this).data('digits');
						navigator.notification.confirm(
							'¿Eliminar la tarjeta ***'+digits+'?',
							 onDeletionConfirm,
							'Métodos de pago',
							['Si','No']     // buttonLabels
						);
					});

				} // END profileTabs (methods)

			} // END profileTabs scope
		
			if($('.privates').length){

				$('.menu li').removeClass('selected');
				$('.menu_privadas').addClass('selected');
			} // END detailQuiniela scope
		

			if($('#depositStores').length){

				$('.menu li').removeClass('selected');
				$('.menu_abonar').addClass('selected');
			} // END depositStores scope
			
			if($('#depositCard').length){

				$('.menu li').removeClass('selected');
				$('.menu_abonar').addClass('selected');
			} // END depositCard scope
		
		}, 280); // END General Timeout

	});

}
