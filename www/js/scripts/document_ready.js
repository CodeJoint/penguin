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
				e.preventDefault();
				app.showLoader();
				// if( $(this).data('resource') == "entermode" )
				// 	return app.render_entermode( $(this).attr('href') );
				// if( $(this).data('resource') == "register" )
				// 	return app.render_register( $(this).attr('href') );
				// 	if( $(this).data('resource') == "register-mail" )
				// 		return app.render_register_mail( $(this).attr('href') );
				
				// if( $(this).data('resource') == "login" )
				// 	return app.render_login( $(this).attr('href') );
				// 	if( $(this).data('resource') == "login-mail" )
				// 		return app.render_login_email( $(this).attr('href') );

				// if( $(this).data('resource') == "chat" )
				// 	return app.render_chat( $(this).attr('href') );
				// if( $(this).data('resource') == "my-plan" )
				// 	return app.render_myPlan( $(this).attr('href') );
				// if( $(this).data('resource') == "main-menu" )
				// 	return app.render_mainmenu( $(this).attr('href') );
				// if( $(this).data('resource') == "user-profile" )
				// 	return app.render_settings( $(this).attr('href') );
				// if( $(this).data('resource') == "edit-profile" )
				// 	return app.render_edit_settings( $(this).attr('href') );
				// if( $(this).data('resource') == "change-coach" )
				// 	return app.render_change_coach( $(this).attr('href') );
				// if( $(this).data('resource') == "coming-soon" )
				// 	return app.render_coming_soon( $(this).attr('href') );
				// if( $(this).data('resource') == "about" )
				// 	return app.render_about( $(this).attr('href') );
				// if( $(this).data('resource') == "support" )
				// 	return app.render_support( $(this).attr('href') );

				// if( $(this).data('resource') == "add-exercise" )
				// 	return app.render_new_record( $(this).attr('href'), 'exercise' );
				// if( $(this).data('resource') == "add-water" )
				// 	return app.render_new_record( $(this).attr('href'), 'water' );
				// if( $(this).data('resource') == "add-weight" )
				// 	return app.render_new_record( $(this).attr('href'), 'weight' );
				// if( $(this).data('resource') == "add-measures" )
				// 	return app.render_new_record( $(this).attr('href'), 'measures' );
				// if( $(this).data('resource') == "add-mood" )
				// 	return app.render_new_record( $(this).attr('href'), 'mood' );


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


		if($('#login_form').length){
			window.init_scripts.push("login_validate");
			$('#login_form').validate({
				rules:{
					mail :{
						required : true,
						email : true
					},
					pass :"required"
				},
				messages:{
					mail : {
						required: "Debes proporcionar un correo",
						email: "Proporciona un correo válido"
					},
					pass : "Este campo es requerido para ingresar"
				},
				submitHandler:function( form, event ){
					event.preventDefault();
					var data_login		= app.getFormData(form);
					var login_response 	= apiRH.loginNative(data_login);

					if(login_response){

						apiRH.headers['X-ZUMO-AUTH'] = login_response;
						var userInfo = apiRH.getInfoUser();

						if(userInfo){
							window._user = (userInfo) ? userInfo : null;
							app.keeper.setItem( 'user', JSON.stringify(_user) );
							var verified = app.keeper.getItem( 'email_verification' );
							if( typeof _user.customerId !== undefined && _user.customerId !== 'not_set' ){
								// TODO: Load interface via switch method
								app.keeper.setItem( 'email_verification', true );
								return app.render_myPlan('dieta.html');
							} else if(!verified){
								return app.render_validate_code('code.html');
							}else{
								return app.render_initial_record('record.html');
							} 	
						}

					}else{
						app.toast("Ocurrió un error, por favor revisa que tus datos sean correctos.")
					}
					return app.hideLoader();
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

	
	});

}
