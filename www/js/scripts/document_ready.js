/*      _                                       _                        _       
 *   __| | ___   ___ _   _ _ __ ___   ___ _ __ | |_   _ __ ___  __ _  __| |_   _ 
 *  / _` |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __| | '__/ _ \/ _` |/ _` | | | |
 * | (_| | (_) | (__| |_| | | | | | |  __/ | | | |_  | | |  __/ (_| | (_| | |_| |
 *  \__,_|\___/ \___|\__,_|_| |_| |_|\___|_| |_|\__| |_|  \___|\__,_|\__,_|\__, |
 *                                                                         |___/ 
 */
		
window.initializeEvents = function(){
	
	jQuery(document).ready(function($) {

		console.log("Initializing DocReady v1.2");
		$('body').removeClass("preventEvents");
		
		window.initHooks = function(){

			/* Hook soft links */
			$('.hook').on('click', function(e){
				console.log("Hook click");
				e.preventDefault();
				app.showLoader();
				/*** Register / Login ***/
				if( $(this).data('resource') == "register" )
					return app.render_register( $(this).attr('href') );
				if( $(this).data('resource') == "login" )
					return app.render_login( $(this).attr('href') );

				if( $(this).data('resource') == "lobby" )
					return app.render_lobby( $(this).attr('href') );
				if( $(this).data('resource') == "privates" )
					return app.render_private_games( $(this).attr('href') );
				if( $(this).data('resource') == "my_lobby" ){
					$('#misQuinielas').trigger('click');
					return app.hideLoader();
				}
				if( $(this).data('resource') == "detail" )
					return app.render_detail( $(this).attr('href'), $(this).data('object') );
				
				/*** User ***/
				if( $(this).data('resource') == "profile" )
					return app.render_profile( $(this).attr('href') );
				if( $(this).data('resource') == "deposit" )
					return app.render_add_funds( $(this).attr('href') );
				
				e.stopPropagation();
			});
		};
		initHooks();

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
			console.log("Keyboard not undefined");
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

		var fixWithKeyboard = function(){

		}

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
					repeat_password :{
						required: "Por favor repite tu contraseña",
						equalTo: "Las contraseñas no coinciden"
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

						localStorage.setItem("Auth", "Bearer "+register_response.jwtoken);
						apiRH.save_user_data_clientside(register_response);
						if(register_response.user){
							console.log(register_response.user);
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

		} // END login_form scope

		if($('#misQuinielas').length){

			setTimeout(function(){
				return app.render_myfeed();
			}, 300);
		} // END misQuinielas scope
		

		if($('#lobbyContainer').length){
		 	console.log("Lobby container");
		 	setTimeout(function(){

				/** Render header again to include filters component **/
				// return app.render_header(true);
			 }, 220);
		} // END misQuinielas scope
		
		if($('#detailQuiniela').length){

			var quoteId = $('#detailQuiniela').data('id');
			setTimeout(function(){

				$('#reg_into_game').on('click',function(){
					$('#registerNow').fadeIn('fast');
				});
				$('#closeRegister').on('click',function(){
					$('#registerNow').fadeOut('fast');
				});
				$('#sendRegister').on('click',function(){
					$('#registerNow').fadeOut('fast');
				});
				return app.render_games(quoteId);
			}, 220);
		} // END detailQuiniela scope

		/* Log Out from the API */
		$('#logout').on('click', function(e){
			/* Requesting logout from server */
			if(!$('.overscreen2').is(':visible') ){
				$('.overscreen2').show();
			setTimeout(function() { $('.overscreen2').addClass('active'); }, 200);
			} else {
				$('.overscreen2').removeClass('active');
				setTimeout(function() { $('.overscreen2').hide(); }, 800);
			}
			$('#blur').toggleClass('blurred');
			return;
		});

		$('.logout').click(function(){
			app.keeper.clear();
			$('#blur').toggleClass('blurred');
			return app.render_entermode('inicio.html');
		});

		$('.logout_cancel').click(function(){
			$('.overscreen2').hide();
			$('#blur').toggleClass('blurred');
			return;
		});

		$('.back_with_logout').click(function(e){
			return back_with_logout(e);
		});

		var ventana = $(window).height();

		/*** FILTROS ***/

		$('.header_filtros').on('click', function(){
			if($('.filtros_wrapper').hasClass('filtros_show')){
				$('.filtros_wrapper').removeClass('filtros_show');
				$('.filtros_wrapper').fadeOut('fast');
				console.log('success');
			} else {
				$('.filtros_wrapper').addClass('filtros_show');
				$('.filtros_wrapper').fadeIn('fast');
			}
		});

		$('.filtros ul li').on('click', function(){
			$('.filtros ul li').removeClass('selected');
			var dataFilter = $(this).attr('data');
			$(this).addClass('selected');
			console.log(dataFilter);
		});


		var positiveMargin = false;
		$('.misquinielas').on('click', function(){

			$('.menu li').removeClass('selected');
			if (!positiveMargin) {
				var left = "0%";
				var padd = "1%";
				positiveMargin = true;
				$('.menu .menu_quinielas').addClass('selected');
			}
			else {
				var left = "97%";
				var padd = "1%";
				positiveMargin = false;
				$('.menu .menu_quinielas').removeClass('selected');
			}
			$('.misquinielas').animate({
											marginLeft: left,
											paddingLeft: padd,
										}, 
										{
											duration: 500,
											complete: function () {
											}
										});
		 });
	});

}
