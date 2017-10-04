/*      _                                       _                        _       
 *   __| | ___   ___ _   _ _ __ ___   ___ _ __ | |_   _ __ ___  __ _  __| |_   _ 
 *  / _` |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __| | '__/ _ \/ _` |/ _` | | | |
 * | (_| | (_) | (__| |_| | | | | | |  __/ | | | |_  | | |  __/ (_| | (_| | |_| |
 *  \__,_|\___/ \___|\__,_|_| |_| |_|\___|_| |_|\__| |_|  \___|\__,_|\__,_|\__, |
 *                                                                         |___/ 
 */
		
window.initializeEvents = function(){

	window.initCountdownTimers = function(){
		console.log("init countdown clockers");
		$('[data-countdown]').each(function(index, element) {
			var $this = $(element);
			console.log($this);
			var finalDate = $(element).data('countdown');
			var date = moment(finalDate).format('YYYY-MM-DD HH:mm:ss');
			console.log(date);
			if(date !== 'Invalid date')
				$this.countdown(date, function(event) {
					$this.html('<strong class="timer_active">CIERRE: '+event.strftime('%H:%M:%S')+'</strong>');
				});
		});
	};
	window.initFilterActions = function(){
		
		console.log("init filter actions");
		$('.header_filtros').unbind();
		
		/*** FILTERS ***/
		$('.header_filtros').on('click', function(){
			if($('.filtros_wrapper').hasClass('filtros_show')){
				$('.filtros_wrapper').removeClass('filtros_show');
				$('.filtros_wrapper').fadeOut('fast');
			}else {
				$('.filtros_wrapper').addClass('filtros_show');
				$('.filtros_wrapper').velocity('fadeIn');
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

		if(!$('#filterComponent:visible').length)
			$('#filterComponent').velocity('fadeIn');
		
	};

	jQuery(document).ready(function($) {

		$('*').unbind();
		$('body').removeClass("preventEvents");
		
		var ventana = $(window).height();
		window.alert = (typeof navigator.notification !== 'undefined') ? navigator.notification.alert : window.alert;

		window.initHooks = function(){

			$('.hook').unbind();
			$('#logoutComponent').hide();
			/* Hook soft links */
			$('.hook').on('click', function(e){

				e.preventDefault();
				app.showLoader();
				var resource 		= $(this).data('resource');
				var resource_href 	= $(this).attr('href');
				var resource_object = $(this).data('object') ? $(this).data('object'): null;
				var resource_extra 	= $(this).data('extra')  ? $(this).data('extra') : null;
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
				if( resource == "detail-participants" )
					return app.fetch_detail( resource_href, resource_object, 'participants', resource_extra );
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

					// Manage sidebar animations
					window.positiveMargin = false;
					var openCloseSidebar = function(){
						$('.menu li').removeClass('selected');
						var left = positiveMargin ? "93%" : "0%";
						$('.misquinielas').velocity( {
														marginLeft: left
													}, 
													{
														duration: 420,
														easing: 'easeInOutQuint',
														complete: function() { }
													});
						if (!positiveMargin) {
							
							positiveMargin = true;
							$('.menu .menu_quinielas').addClass('selected');
							$('.misquinielas').addClass('open');
							$('#insertFeed').addClass('noscroll semitransparent');
						
						} else {
							
							positiveMargin = false;
							$('#insertFeed').removeClass('noscroll semitransparent');
							$('.menu .menu_quinielas').removeClass('selected');
							$('.menu .menu_lobby').addClass('selected');
							$('.misquinielas').removeClass('open');
						
						}
					};

					$('.misquinielas').swipe({
						swipeLeft: openCloseSidebar,
						swipeRight: openCloseSidebar
					});

					initHooks();

				} // END misQuinielas scope

				if($('#deporte_soccer').length){

					app.render_filter_tournaments();
					setTimeout(function(){
						$('#deporte_soccer').hide();
					}, 320);
				} // END deporte_soccer

			} // END lobbyContainer scope
		
			// Detail of an upcoming game with no entries (Event scope)
			if($('#detailQuiniela').length){

				var gameId 	= $('#detailQuiniela').data('id');
				var weekId  = $('#detailQuiniela').data('weekid');
				var entryId = $('#detailQuiniela').data('entry');

				$('.menu li').removeClass('selected');
				
				// Remove empty select controls from the view
				$('select:not(.no_check)').each(function(){
					if( $(this).has('option').length > 0 )
						$(this).remove();
				});
				
				/*** Form validation ***/
				$('#registerToQuinielaForm').validate({
					rules:{
						pool_id	 : "required",
						num_entries : "required"
					},
					messages:{
						pool_id	 : "El Id de la quiniela no es válido",
						num_entries : "Especifica el número de registros"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						event.stopPropagation();
						app.showLoader();
						var entry_data	= app.getFormData(form, 'object');
						console.log(entry_data);
						return apiRH.registerEmptyEntry(entry_data);
					}
				});

				$('#picksForm').validate({
					rules:{
						pool_id	 : "required"
					},
					messages:{
						pool_id	 : "El Id de la quiniela no es válido"
					},
					submitHandler:function( form, event ){
						event.preventDefault();
						event.stopPropagation();
						var entry_data	= app.getFormData(form, 'multi-level');
						if(typeof entry_data.entry_id === 'undefined' || entry_data.entry_id === ''){
							$('#registerNow').velocity('fadeIn');
							return;
						}
						app.showLoader();
						return apiRH.editEntry(entry_data);
					}
				});

				$('.opcion_partido label').on('click', function(e){
					console.log("moiwowjdo");
					$('.instructions').html('Guarda tus picks al terminar');
				});

				$('.missing_info').each(function(){
					$(this).attr('data-extra', entryId)
							.removeClass('missing_info');
				});

				$('.tabs_quiniela a').on('click', function(e){
					$(e.target).parent().siblings().each(function(index,element){
						$(element).removeClass('selected');
					});
					$(e.target).parent().addClass('selected');
				});

				/**** Register modal ****/
				$('#reg_into_game').on('click', function(e){
					$('#registerNow').velocity('fadeIn');
					e.preventDefault();
					e.stopPropagation();
				});

					$('#num_entries').on('change', function(){
						// TO DO: Multiply entry fee according to selection
						var mult = $(this).val();
						$('#samePicksOption').hide();
						if(mult>1)
							$('#samePicksOption').show();
						$('.affect').each(function(index, element){

							if(!$(element).data('commission') && $(element).data('fee')){
								var newFee =  parseInt($(element).data('fee'))*mult;
								$(element).text('$'+newFee+' MXN');
								return;
							}
							var newFee =  parseInt($(element).data('fee'))*mult;
							var newCommission =  parseInt($(element).data('commission'))*mult;
							$(element).text('$'+newFee+' MXN + $'+newCommission+' comisión');
							return;
						});
					});
				
				/** Call Render quiniela games and picks selectors **/
				app.render_games(gameId);
				/** Call prize distribution **/
				app.fetch_prize_distribution(gameId);
				/** Call full standings **/
				app.fetch_standings(gameId);
				
				/** Render similar picks select **/
				if(_cache.pool.upcoming)
					if(!entryId){
						app.render_similar_bypool_picks(gameId);
					} else{
						app.render_similar_picks(entryId);
					}

				setTimeout( function(){
					$('#filterComponent').hide();
					if(entryId)
						app.fill_entry_picks();
				}, 620);

				return initCountdownTimers();

			} // END detailQuiniela scope
			
			// Detail of an upcoming or live game with or without entries (Event scope)
			if($('#detailQuinielaRegistered').length){

				$('#detailQuinielaRegistered').attr('data-entry', _cache.entry_id);
				var gameId 	= $('#detailQuinielaRegistered').data('id');
				var entryId = $('#detailQuinielaRegistered').data('entry');
				var weekId  = $('#detailQuinielaRegistered').data('weekid');

				var onCancelConfirm = function() {
					apiRH._ajaxRequest('DELETE', 'api/entries/cancel/'+window.cancel_entryId+'.json', {}, 'json', true, onCancelCallback);
				}
				var onCancelCallback = function(response) {
					if(!response.success){
						return app.toast('Ocurrió un error al eliminar tu registro, intenta nuevamente.')
					}
					app.toast('Registro eliminado satisfactoriamente.');
					return app.render_lobby(null, false);
				}

				$('.menu li').removeClass('selected');
				$('#filterComponent').hide();

				$('.tabs_quiniela a').on('click', function(e){
					$(e.target).parent().siblings().each(function(index,element){
						$(element).removeClass('selected');
					});
					$(e.target).parent().addClass('selected');
				});
				
				$('.radio_group input').on('change', function(e){
					$('.instructions').text('Guarda tus picks al terminar');
				});

				/**** Cancel registry ****/
				$('#reg_outta_game').on('click', function(e){
					window.cancel_entryId = $(this).data('extra');
					navigator.notification.confirm(
						'¿Cancelar tu registro a esta quiniela?',
						 onCancelConfirm,
						'Cancelar registro',
						['Si','No']
					);
				});

				/** Call Render quiniela games and picks selectors **/
				app.render_games(gameId);

				/** Call Render similar picks **/
				if(entryId){
					app.render_other_entries(entryId);
					$('#reg_outta_game').show();
					$('.missing_info').each(function(){
						$(this).attr('data-extra', entryId)
								.removeClass('missing_info');
					});
					setTimeout( function(){
						app.fill_entry_picks()
					}, 620);
				}
				
				/** Call prize distribution **/
				app.fetch_prize_distribution(gameId);
				/** Call full standings **/
				app.fetch_standings(gameId);
				/** Call group picks **/
				app.fetch_group_picks(gameId, weekId);
				/** Render similar picks **/
				if(!entryId){
					app.render_similar_bypool_picks(gameId);
				} else{
					app.render_similar_picks(entryId);
				}

				return initCountdownTimers();

			} // END detailQuinielaRegistered scope
			
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

					$('.footermenu ul li').removeClass('selected');
					$('.menu_perfil').addClass('selected');
					
					/* Log Out from the API */
					$('#logoutComponent').on('click', function(e){
						/* TODO: Requesting logout from server */
						app.keeper.clear();
						app.render_login();
						return;
					});

					$('.tabs_profile a').on('click', function(e){
						$(e.target).parent().siblings().each(function(index,element){
							$(element).removeClass('selected');
						});
						$(e.target).parent().addClass('selected');
					});

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
							holder_name		 : "Ingresa el nombre como aparece en tu tarjeta",
							card_number 	 : "Ingresa el número de la tarjeta",
							expiration_month : "Campo obligatorio",
							expiration_year  : "Campo obligatorio",
							cvv2 			 : "Ingresa el CVV"
						},
						submitHandler:function( form, event ){
							event.preventDefault();
							app.showLoader();
							var card_data = app.getFormData(form, 'object');
								card_data.expiration_year = card_data.expiration_year.slice(-2);
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

				$('#busquedaQuinielas').validate({
					rules:{
						name		 : "required",
						password 	 : "required"
					},
					messages:{
						name		 : "Proporciona el nombre de la quiniela",
						password 	 : "Es necesario conocer la clave"
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

			} // END detailQuiniela scope
		
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
				
				/** CARD PAYMENT Select amount and set hidden input value **/
				$('.botones_abono:not(.stores) li').on('click', function(){
					var $mySelection = $(this);
					$('.botones_abono li').removeClass('selected');
					$mySelection.addClass('selected');
					$('input[name=amount]').val($mySelection.data('amount'));
					$('#other_amount').hide().blur();
					if($mySelection.data('amount') === 'other'){
						$('#other_amount').show().focus();
					}
				});

				/** STORES PAYMENT Select amount and set hidden input value  **/
				$('.botones_abono.stores li').on('click', function(){
					var $mySelection = $(this);
					$('.botones_abono li').removeClass('selected');
					$mySelection.addClass('selected');
					$('input[name=amount]').val($mySelection.data('amount'));
				});

				$('.botones.deposit a').on('click', function(e){
					$(e.target).siblings().each(function(index,element){
						console.log($(element));
						$(element).removeClass('selected');
					});
					$(e.target).addClass('selected');
				});

			} // END deposit scope
		
		}, 200); // END General Timeout

	});

}
