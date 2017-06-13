/*      _                                       _                        _       
 *   __| | ___   ___ _   _ _ __ ___   ___ _ __ | |_   _ __ ___  __ _  __| |_   _ 
 *  / _` |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __| | '__/ _ \/ _` |/ _` | | | |
 * | (_| | (_) | (__| |_| | | | | | |  __/ | | | |_  | | |  __/ (_| | (_| | |_| |
 *  \__,_|\___/ \___|\__,_|_| |_| |_|\___|_| |_|\__| |_|  \___|\__,_|\__,_|\__, |
 *                                                                         |___/ 
 */
		
window.initializeEvents = function(){
	
	jQuery(document).ready(function($) {

		console.log("Initializing DocReady v0.1");
		$('body').removeClass("preventEvents");
		
		window.initHooks = function(){
			console.log("Initializing hooks");
			/* Hook soft links */
			$('.hook').on('click', function(e){
				console.log("Hook click");
				e.preventDefault();
				app.showLoader();
				if( $(this).data('resource') == "register" )
					return app.render_register( $(this).attr('href') );
				
				e.stopPropagation();
			});
		};
		initHooks();


		//-----------------------------
		//
		// Keyboard events for iOS
		//
		//-----------------------------
		console.log("Initializing keyboard events");
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
			console.log("Init login keyboard events");
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
					var data_login		= app.getFormData(form, 'object');
					console.log(data_login);
					// var login_response 	= apiRH.loginNative(data_login);

					// if(login_response){

					// 	apiRH.headers['Authorization'] = "Bearer "+login_response.jwtoken;
					// 	apiRH.save_user_data_clientside(login_response);
					// 	if(login_response.user){
					// 		console.log(login_response.user);
					// 		window._user = (login_response.user) ? login_response.user : null; 
					// 		return app.render_feed('feed.html');
					// 	}

					// }else{
					// 	app.toast("Ocurrió un error, por favor revisa que tus datos sean correctos.")
					// 	return app.hideLoader();
					// }
				}
			});

		} // END register_form

		if($('#login_form').length){

			window.init_scripts.push("login_validate");
			$('#login_form').validate({
				rules:{
					user : "required",
					pass : "required"
				},
				messages:{
					user : "Debes proporcionar un correo",
					pass : "Este campo es requerido para ingresar"
				},
				submitHandler:function( form, event ){
					event.preventDefault();
					var data_login		= app.getFormData(form, 'object');
					var login_response 	= apiRH.loginNative(data_login);

					if(login_response){

						apiRH.headers['Authorization'] = "Bearer "+login_response.jwtoken;
						apiRH.save_user_data_clientside(login_response);
						if(login_response.user){
							console.log(login_response.user);
							window._user = (login_response.user) ? login_response.user : null; 
							return app.render_feed('feed.html');
						}

					}else{
						app.toast("Ocurrió un error, por favor revisa que tus datos sean correctos.")
						return app.hideLoader();
					}
				}
			});

		} // END login_form

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
		$('.container').css('min-height', ventana+'px');

		/*** FILTROS ***/

		$('.filtros_wrapper').hide();

		$('.header_filtros').on('click', function(){
			if($('.filtros_wrapper').hasClass('filtros_show')){
				$('.filtros_wrapper').removeClass('filtros_show');
				$('.filtros_wrapper').hide();
				console.log('success');
			} else {
				$('.filtros_wrapper').addClass('filtros_show');
				$('.filtros_wrapper').show();
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

		    if (!positiveMargin) {
		        var left = "0%";
		        var padd = "1%";
		        positiveMargin = true;
		    }
		    else {
		        var left = "97%";
		        var padd = "1%";
		        positiveMargin = false;
		    }
		     $('.misquinielas').animate({
		               marginLeft: left,
		               paddingLeft: padd,
		               }, {
		               duration: 500,
		               
		               complete: function () {
		               }
		             });
		 });
	});

}
