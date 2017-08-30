/*      _                                       _                        _       
 *   __| | ___   ___ _   _ _ __ ___   ___ _ __ | |_   _ __ ___  __ _  __| |_   _ 
 *  / _` |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __| | '__/ _ \/ _` |/ _` | | | |
 * | (_| | (_) | (__| |_| | | | | | |  __/ | | | |_  | | |  __/ (_| | (_| | |_| |
 *  \__,_|\___/ \___|\__,_|_| |_| |_|\___|_| |_|\__| |_|  \___|\__,_|\__,_|\__, |
 *                                                                         |___/ 
 */
		
window.initializeEvents = function(){
	
	window.initCountdownTimers = function(){
		$('[data-countdown]').each(function(index, element) {
			var $this = $(element), finalDate = $(element).data('countdown');
			var date = moment(finalDate).format('YYYY-MM-DD HH:mm:ss');
			if(date !== 'Invalid date')
				$this.countdown(date, function(event) {
					$this.html('<strong class="timer_active">CIERRE: '+event.strftime('%H:%M:%S')+'</strong>');
				});
		});
	};
	window.initFilterActions = function(){
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

		$('#filterComponent').fadeIn('fast');
	};

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
				var resource 		= $(this).data('resource');
				var resource_href 	= $(this).attr('href');
				var resource_object = $(this).data('object') ? $(this).data('object'): null;
				var resource_extra 	= $(this).data('extra') ? $(this).data('extra'): null;
				/*** Register / Login ***/
				if( resource == "register" )
					return app.render_register( resource_href );
				if( resource == "forgot-password" )
					return app.render_forgot_password( resource_href );
				if( resource == "login" )
					return app.render_login( resource_href );

				if( resource == "lobby" )
					return app.render_lobby( resource_href, false );
				if( resource == "first-lobby" )
					return app.render_lobby( resource_href );
				if( resource == "privates" )
					return app.render_private_search( resource_href );
				if( resource == "privates-create" )
					return app.render_create_private( resource_href );
				if( resource == "my_lobby" ){
					if($('#misQuinielas').length){
						$('#misQuinielas').trigger('click');
						return app.hideLoader();
					}
					/** check if sidebar is present or reroute otherwise **/
					app.render_lobby( resource_href, false );
					setTimeout(function(){
						$('#misQuinielas').trigger('click');
					}, 1200);
				}
				if( resource == "detail" )
					return app.fetch_detail( resource_href, resource_object );
				if( resource == "detail-closed" )
					return app.fetch_detail( resource_href, resource_object, 'closed' );
				if( resource == "detail-live" )
					return app.fetch_detail( resource_href, resource_object, 'live', resource_extra );
				if( resource == "detail-postures" )
					return app.fetch_detail( resource_href, resource_object, 'postures', resource_extra  );
				if( resource == "detail-places" )
					return app.fetch_detail( resource_href, resource_object, 'places', resource_extra );
				if( resource == "detail-chat" )
					return app.fetch_detail( resource_href, resource_object, 'chat', resource_extra  );
				if( resource == "detail-prizes" )
					return app.fetch_detail( resource_href, resource_object, 'prizes', resource_extra  );
				if( resource == "detail-group-picks" )
					return app.fetch_detail( resource_href, resource_object, 'group-picks', resource_extra  );
				if( resource == "detail-scores" )
					return app.fetch_detail( resource_href, resource_object, 'scoreboard', resource_extra  );
				
				/*** User ***/
				if( resource == "profile-methods" )
					return app.render_profile( resource_href );
				if( resource == "profile-documents" )
					return app.render_profile( resource_href, 'documents' );
				if( resource == "profile-withraw" )
					return app.render_profile( resource_href, 'withraw' );
				if( resource == "profile-history" )
					return app.render_profile( resource_href, 'history' );
				if( resource == "profile-notifications" )
					return app.render_profile( resource_href, 'notifications' );
				if( resource == "deposit" )
					return app.render_add_funds( resource_href );
				if( resource == "deposit-stores" )
					return app.render_add_funds_store( resource_href );
				
				e.stopPropagation();
			});

			$('body').on('click', function(event){
				if(!$(event.target).closest('.backed_modal').length)
			        if($('.backed_modal').is(":visible")) {
			            $('.backed_modal').hide();
			        }
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
						if(!data_user.provider_uid)
							return apiRH.registerNative(data_user);
						return apiRH.registerFB(data_user);
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
						return apiRH.loginNative(data_login);
					}
				});

				$('#fb_login').on('click', function(e) {
					console.log("Clicked login fb");
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
				
				// TODO: cache this request and save it for a couple of hours
				app.render_lobby_feed(true);

				$('.footermenu ul li').removeClass('selected');
				$('.menu_lobby').addClass('selected');

				if($('#misQuinielas').length){

						// Call render sidebar feed
						app.render_myfeed_sidebar();

						var positiveMargin = false;
						$('.misquinielas').on('click', function(){

							$('.menu li').removeClass('selected');
							if (!positiveMargin) {
								var left = "0%";
								var padd = "5%";
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

						return initHooks();
				} // END misQuinielas scope
			
				if($('#deporte_soccer').length){

					app.render_filter_tournaments();
					setTimeout(function(){
						$('#deporte_soccer').hide();
					}, 320);
				} // END deporte_soccer

			} // END lobbyContainer scope
		
			if($('#detailQuiniela').length){

				var gameId = $('#detailQuiniela').data('id');
				var entryId = $('#detailQuiniela').data('extra');
				console.log(entryId);
				$('.menu li').removeClass('selected');

				$('#reg_into_game').on('click', function(){
					$('#registerNow').fadeIn('fast');
				});

				$('#num_entries').on('change', function(){
					$(this).val();
				})

				$('#closeRegister').on('click',function(){
					$('#registerNow').fadeOut('fast');
				});
				// $('#sendRegister').on('click',function(){
				// 	$('#registerNow').fadeOut('fast');
				// });

				/** Render quiniela games and picks selectors **/
				app.render_games(gameId);

				/** Render similar picks **/
				if(!entryId)
					return app.render_similar_picks(gameId);
				return app.render_similar_picks(entryId);

				$('#registerToQuinielaForm').validate({
					rules:{
						pool_id	 : "required",
						num_entries : "required"
					},
					messages:{
						pool_id	 : "Identificador de quiniela no válido",
						num_entries : "Especifica el número de registros"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						app.showLoader();
						var entry_data	= app.getFormData(form, 'object');
						console.log(entry_data);
						apiRH.registerEntry(entry_data);
						return false;
					}
				});
				setTimeout(function(){
					$('#filterComponent').hide();
				}, 0);
				return initCountdownTimers();

			} // END detailQuiniela scope
			
			if($('#detailQuinielaRegistered').length){
				
				var gameId 	= $('#detailQuinielaRegistered').data('id');
				var entryId = $('#detailQuinielaRegistered').data('entry');
				$('.missing_info').each(function(){
					$(this).data('extra', entryId)
							.removeClass('missing_info');
				});
				$('.menu li').removeClass('selected');
				$('#filterComponent').hide();

				$('.tabs_quiniela a').on('click', function(e){
					$(e.target).parent().siblings().each(function(index,element){
						$(element).removeClass('selected');
					});
					$(e.target).parent().addClass('selected');
				});

				/** Call Render quiniela games and picks selectors **/
				app.render_games(gameId);

				/** Call Render similar picks **/
				if(entryId)
					app.render_other_entries(entryId);
				
				/** Call prize distribution **/
				app.fetch_prize_distribution(gameId);
				/** Call full standings **/
				app.fetch_standings(gameId);
				/** Call group picks **/
				app.fetch_group_picks(gameId);

				return initCountdownTimers();

			} // END detailQuinielaRegistered scope
			
			
			if($('#busquedaQuinielas').length){

				$('#filterComponent').hide();
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
			
			if($('#searchPrivates').length){

				$('#filterComponent').hide();
				$('#searchPrivates').validate({
					rules:{
						name	: "required",
						password: "required"
					},
					messages:{
						name		: "Especifica un nombre para la quiniela",
						password 	: "Ingresa un código de seguridad"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						app.showLoader();
						var data_new_game	= app.getFormData(form, 'object');
						console.log(data_new_game);
						return apiRH.createPrivate(data_new_game);
					}
				});
	
			} // END busquedaQuinielas scope
		
			if($('#profileTabs').length){

					$('#filterComponent').hide();
					$('#logoutComponent').show();

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
				$('#filterComponent').hide();
				$('#depositStoresForm').validate({
					rules:{
						amount : "required"
					},
					messages:{
						amount : "Es necesario que especifiques una cantidad"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						app.showLoader();
						var deposit_data 	= app.getFormData(form, 'object');
						console.log(deposit_data);
						return apiRH.depositStores(deposit_data);						
					}
				});
				
				/** Select amount and set hidden input value **/
				$('.botones_abono li').on('click', function(){
					var $mySelection = $(this);
					$('.botones_abono li').removeClass('selected');
					$mySelection.addClass('selected');
					$('input[name=amount]').val($mySelection.data('amount'));
				});

			} // END depositStores scope
			
			if($('#depositCard').length){

				$('.menu li').removeClass('selected');
				$('.menu_abonar').addClass('selected');
				$('#filterComponent').hide();
				$('#depositCardForm').validate({
					rules:{
						amount : "required",
						card_id : "required"
					},
					messages:{
						amount : "Es necesario que especifiques una cantidad",
						card_id : "Por favor selecciona una tarjeta"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						app.showLoader();
						var deposit_data = app.getFormData(form, 'object');
						console.log(deposit_data);
						return apiRH.depositCard(deposit_data);
					}
				});
				
				/** Select amount and set hidden input value **/
				$('.botones_abono li').on('click', function(){
					var $mySelection = $(this);
					$('.botones_abono li').removeClass('selected');
					$mySelection.addClass('selected');
					$('input[name=amount]').val($mySelection.data('amount'));
					if($mySelection.data('amount') === 'other'){
						$('#other_amount').show().focus();
					}
				});
			} // END depositCard scope
		
		}, 200); // END General Timeout

	});

}
