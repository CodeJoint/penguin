/*!
 * Prototype: requestHandlerAPI 
 * @params token (optional if not executing auth requests) Locally saved user token
 */
function requestHandlerAPI(){
	/*** Attributes ***/
	this.token = null;
	this.upload_ready = false;
	this.version 	= "1.3";
	this.app_build 	= "1.3.2";
	this.device_model = (typeof device != 'undefined') ? device.model : 'not set';
	this.deviceSessionId = null;
	this.device_platform = (typeof device != 'undefined') ? device.platform : 'not set';
	this.device_platform_version = (typeof device != 'undefined') ? device.version : 'not set';
	this.device_info =  {
							sdk_version: this.version,
							build: this.app_build,
							model: this.device_model,
							platform: this.device_platform,
							version: this.device_platform_version
						};

	this.keeper = window.localStorage;
	
	/*** Request headers ***/
	this.headers = 	{
						'Content-Type': 'application/json'
					};

	var context = this;
	window.sdk_app_context = null;

	/*  Production API URL  */
	window.api_base_url = "http://pickwin.astrata.mx/";
	// window.api_base_url = "https://pickwin.net/";
	
	this.openpay_base_url = "https://sandbox-dashboard.openpay.mx/paynet-pdf/mqfki2pbqpbve54kabor/";
	// this.openpay_base_url = " https://dashboard.openpay.mx/paynet-pdf/myabfqccohuj4kszwr7y/";

	/* Constructor */
	this.construct = function(app_context){
					console.log('Initialized Duff api-sdk1.0');

					if(this.keeper.getItem('request_token')) this.token = this.keeper.getItem('request_token');
					if(this.keeper.getItem('Auth')) this.headers['Authorization'] = "Bearer "+this.keeper.getItem('Auth');
					sdk_app_context = app_context;
					$( document ).ajaxError(function( event, jqxhr, settings, exception ) {
						if ( jqxhr.status== 401 ) {
						  // alert( "Triggered ajaxError handler." );
						}
					});
					/* For chaining purposes ::) */
					return this;
				};
				
/***********************/
/*** API sdk Methods ***/
/***********************/
		
		/**
		 * Manage pseudo Log in process to use protected API calls
		 * @param data_login JSON {user_login, user_password}
		 * @return status Bool true is successfully logged in; false if an error ocurred
		 */
		 this.loginNative =  function(data_login){

			var response = this.makeRequest( 'api/users/login.json', data_login, true, false );
			if(!response)
				return false;

			this.token = response.jwtoken;
			apiRH.keeper.setItem( 'token'	, response.jwtoken);
			apiRH.keeper.setItem( 'mail'	, response.user.email);
			apiRH.keeper.setItem( 'userId'	, response.user.id);
			return response;
		};

		/**
		 * Ask for a password regeneration
		 * @param data_user JSON {email}
		 * @return
		 */
		 this.askNewPassword =  function(data_user){

			var response = this.makeRequest( 'api/users/recover.json', data_user, true, false );
			if(!response)
				return false;
			return response;
		};

		/*! 
		 * Register a new user account the old fashioned way
		 * @param data_user JSON {user_login, user_password}
		 * @return status Bool true is successfully logged in; false if an error ocurred (User already exists)
		 */
		this.registerNative = function(data_user){

			var name 		= data_user.name;
			var last_name 	= data_user.last_name;
			var email 		= data_user.email;
			var pass 		= data_user.password;
			var cPass		= data_user.repeat_password;
			console.log(data_user);
			var data =  {
							'fingerprint' 	: window.fingerprint ? window.fingerprint.hash : '',
							'name' 			: data_user.name,
							'last_name' 	: data_user.last_name,
							'nick' 			: data_user.nickname,
							'email' 		: data_user.email,
							'password' 		: data_user.password,
							'cpassword' 	: data_user.repeat_password,
							'tos' 			: data_user.accept_terms,
							'oldenough' 	: data_user.is_M18,
							'newsletter' 	: false
						};

			var response = this.makeRequest('api/users/register.json', data, true, false);
			console.log(response);
			if(!response.success){
				if(response.errors.nick)
					return app.toast(response.errors.nick.unique);
				return app.toast("Error :: ");
			}
			
			this.token = response.jwtoken;
			this.keeper.setItem('request_token', this.token);
			this.keeper.setItem('token'	, response.jwtoken);
			this.keeper.setItem('mail'	, response.user.email);
			this.keeper.setItem('userId', response.user.id);
			return response;
		};

		/**
		 * Save /Update user data client side to execute auth requests to the API
		 * @return null
		 * @see OneSignal.syncHashedEmail
		 */
		this.save_user_data_clientside = function(data_login){
			
			if(data_login){
				apiRH.headers['Authorization'] = "Bearer "+data_login.jwtoken;
				data_login.user.balancePc = data_login.balancePc;
				data_login.user.balancePcReal = data_login.balancePcReal;
				data_login.user.balanceReal = data_login.balanceReal;
				app.keeper.setItem('Auth', data_login.jwtoken);
				try{
					OneSignal.syncHashedEmail(data_login.user.email);
				}catch(e){
					console.log(e);
				}
				return app.keeper.setItem('user', JSON.stringify(data_login.user));
			}
		};
		
		/* 
		 * Request new passive token from the API 
		 * @return new generated token
		 */
		this.request_token = function(){
								var response_data = this.getRequest('api/', null);
								/* Verify we got a nice token */
								if( response_data.success !== false){
									this.token = response_data.data.request_token;
									this.keeper.setItem('request_token', response_data.data.request_token);
									return this;
								}
								return this;
							};

		/*! 
		 * Check if the Request object has a token
		 * @return stored token, false if no token is stored
		 * @see apiRH.keeper
		 */
		this.has_token = function(){
			return ( !this.token && typeof(this.token) == 'undefined' && this.token == '') ? false : apiRH.keeper.getItem('token');
		};
		
		/*! 
		 * Request token getter
		 * @return stored token, null if no token is stored
		 */
		this.get_request_token = function(){
									return this.token;
								};
		/*! 
		 * Search private games
		 * @return response JSON encoded object
		 */
		this.searchPrivates = 	function(data){
									var response = this.makeRequest('api/pools/search_private.json', data, null, false);
									return response;
								};
		
		/*! 
		 * Add new payment method (card)
		 * @return Boolean
		 * @see OpenPay
		 */
		this.addPaymentMethod = 	function(card_data, type){
									/* tokenize card data */
									var final_response = {success: false, token: null, device_session_id: null};
									OpenPay.token.create(card_data, 
														function(response){
															final_response.success 	= true;
															final_response.token 	= response.data.id;
															if(final_response.success && final_response.token ){
																final_response.device_session_id = apiRH.deviceSessionId;
																console.log(final_response);
																var response = apiRH.makeRequest('api/openpay_cards/add.json', final_response, null, false);
																console.log(response);
																app.hideLoader();
																alert("Se ha agregado tu método de pago.", null, "Pickwin", "Ok");
																return app.render_profile('profile.html', 'methods');
															}
														}, function(response){
															console.log(response);
															final_response.success 	= false;
															final_response.error	= response.data.error_code;
															console.log(final_response);
															var message = 'Ocurrió un error, revisa tus datos e intenta nuevamente.';
																message = (final_response.error == 2004) 	? 'El código de verificación no es válido.'			
																											: message;
																message = (final_response.error == 1001) 	? 'El código de verificación debe ser de 3 dígitos.'	
																											: message;
															app.hideLoader();
															app.toast(message);
															return false;
														});
								};


		/*! 
		 * Deposit to your account via Store payment
		 * @return Object deposit_info
		 * @see OpenPay
		 */
		this.depositStores = 	function(deposit_info){
									var response = apiRH.makeRequest('api/users/depositConvenience.json', deposit_info);
									return response;
								};

		/*! 
		 * Deposit to your account via Credit card payment
		 * @return Object deposit_info
		 * @see OpenPay
		 */
		this.depositCard = 	function(deposit_info){
									if( typeof apiRH.deviceSessionId === 'undefined' || !apiRH.deviceSessionId ){
										app.toast("Tu dispositivo no contiene una firma válida");
										return false;
									}
									deposit_info.device_session_id = apiRH.deviceSessionId;
									var response = apiRH.makeRequest('api/users/dopurchase.json', deposit_info, null, null, 'json');
									return response;
								};


		/*! 
		 * Wrapper for the getRequest, makeRequest methods 
		 * @param type Request type (POST, GET, PUT, DELETE)
		 * @param endpoint String The API endpoint (See Documentation)
		 * @param data JSON Data to pass to the endpoint in a JSON format
		 * @return stored token, false if no token is stored
		 * TO DO: Manage put, delete methods
		 */
		this.execute = function(type, endpoint, data){
						if(type === 'POST') return this.makeRequest(endpoint, data);
						if(type === 'GET')  return this.getRequest(endpoint, data);
						if(type === 'PUT')  return this.putRequest(endpoint, data);
					};


			/*! 
			 * Executes a POST call
			 * @param endpoint API endpoint to make the call to
			 * @param data url encoded data
			 * @param Boolean noHeaders defaults to false
			 * @param String contentType ['json', 'form-data']
			 * @return JSON encoded response
			 */
			this.makeRequest = function( endpoint, data, noHeaders, stringify, contentType ){

				app.showLoader();
				console.log(' ::: MAKE REQUEST ::: ');
				if( typeof(stringify) == 'undefined' || stringify == true )
					data = JSON.stringify(data);

				var result = {};

				var options = 	{
									method 		: 'POST',
									url			: window.api_base_url+endpoint,
									statusCode	: {
													401 : function() {
													  return app.toast( "Revisa tus credenciales e intenta de nuevo" );
													}
									},
									data 		: data,
									dataType 	: 'json',
									async 		: false,
									crossDomain	: true
								};
				var myHeaders = (!noHeaders || typeof noHeaders === 'undefined') ? apiRH.headers : {};
					myHeaders['Content-Type'] = (typeof contentType === 'undefined' || contentType === 'json' ) ? 'application/x-www-form-urlencoded' : apiRH.headers['Content-Type'];
				if(myHeaders)
					options.headers = myHeaders;
				console.log(options);
				$.ajax(options)
				 .always( function(response){
					setTimeout(function(){
						app.hideLoader();
					}, 2000);
				 })
				 .done( function(response){
					// console.log(response);
					result = response;
				 })
				 .fail( function(e){
					result = false;
					// console.log(e);
				});
				return result;
				
			};

			/*! 
			 * Executes a PATCH request
			 * @param endpoint API endpoint to make the call to
			 * @param data JSON encoded data 
			 * @return JSON encoded response
			 */
			this.patchRequest = function(endpoint, data){
				
				sdk_app_context.showLoader();
				var result = {};

				$.ajax({
				  type: 'PATCH',
				  headers: apiRH.headers,
				  url: window.api_base_url+endpoint,
				  data: JSON.stringify(data.data),
				  dataType: 'json',
				  async: false
				})
				 .done(function(response){
					result = response;
					sdk_app_context.hideLoader(response);
				})
				 .fail(function(e){
					result = false;
					console.log(JSON.stringify(e));
				});
				return result;
			};
			
			/*! 
			 * Executes a GET call
			 * @param endpoint API endpoint to make the call to
			 * @param data JSON encoded data 
			 * *****(SEND data = NULL for closed endpoints)*****
			 * @return JSON encoded response
			 * @see API documentation about jsonp encoding
			 */
			this.getRequest = function(endpoint, data){
				sdk_app_context.showLoader();
				var myData = (!data) ? "" : JSON.stringify(data);
				var result = {};
			
				$.ajax({
				  type: 'GET',
				  headers: apiRH.headers,
				  url: window.api_base_url+endpoint,
				  data: myData,
				  dataType: 'json',
				  async: false
				})
				 .done(function(response){
					// console.log(response);
					result = response;
					sdk_app_context.hideLoader(response);
				})
				 .fail(function(e){
					result = false;
					console.log('Failed executing GET request');
					console.log(JSON.stringify(e));
					app.hideLoader();
				});

				return result;
			};

			/*! 
			 * GET call and executes a callback when the promise is fullfilled
			 * @param methodType [GET, POST, PUT, DELETE]
			 * @param endpoint API endpoint to make the call to
			 * @param data JSON encoded data 
			 * @param callback callable 
			 * @return JSON encoded response
			 */
			this._ajaxRequest = function(methodType, endpoint, data, contentType, includeHeaders, callback){

				var myHeaders = (typeof includeHeaders !== 'undefined' && includeHeaders ) ? apiRH.headers : {};
					myHeaders['Content-Type'] = (typeof contentType === 'undefined' || contentType === 'json' ) ? 'application/x-www-form-urlencoded' : apiRH.headers['Content-Type'];
				var myData = (!data) ? "" : JSON.stringify(data);
				var xhr = new XMLHttpRequest();
				xhr.open(methodType, window.api_base_url+endpoint, true);
				for (var property in myHeaders) {
				    if (myHeaders.hasOwnProperty(property))
						xhr.setRequestHeader(property, myHeaders[property]);
				}
				
				xhr.onreadystatechange = function(){
					if (xhr.readyState === 4 && xhr.status === 200){
						callback(xhr.response);
						sdk_app_context.hideLoader();
					}
					if (xhr.readyState === 4 && xhr.status === 401){
						app.toast("No estas autorizado para ejecutar esta acción");
						sdk_app_context.hideLoader();
					}
			   		console.log(xhr);
			   }
			   xhr.send(myData);
			};

		/**
		 * Check FB plugin connection status
		 */
		this.checkFBStatus = function() {
			if(!window.facebookConnectPlugin) return false;
			window.facebookConnectPlugin.getLoginStatus(function(response){
				console.log("response");
				console.log(JSON.stringify(response));
			}, function(error){
				console.log("error", error);
			});
		};

		
		this.faceLogin = function(userData) {
			console.log(userData);
			return $.ajax({
							"url": api_base_url+'api/users/facebook_login.json',
							"method": 'POST',
							"data": {
							"uid": userData.userID
							}
					});
		};

		this.fbRegister = function(data) {
			return apiRH.makeRequest('api/users/facebook_register.json', data);
		};

		/* 
		 * Perform OAuth authentication 
		 * @see facebookConnectPlugin
		 */
		this.FBOauth = function() {
			window.facebookConnectPlugin.login(['email', 'public_profile'], apiRH.handleFBLoginSuccess, apiRH.handleFBError);
		},


		this.getFBUserDetails = function( successCallback, errorCallback ) {
			window.facebookConnectPlugin.api('/me?fields=id,name,first_name,last_name,gender,installed,verified,email,picture.type(large)', ['public_profile'],
				function(response) {
					successCallback(response);
				},
				function( error ) {
					errorCallback(error);
				});
		};

		this.handleFBError = function(error) {
			console.log(error);
		};

		/* 
		 * Log in callback for Facebook provider
		 * @param Object response
		 */
		this.loginCallbackFB = function(response){
			if ( response.status !== 'connected' ) {
			alert('No se conecto');
			return;
		  }

		  var user = response.authResponse;
		  apiRH.faceLogin(user)
		  .done(function(response) {
			console.log(response);
			if ( !response.user && !response.jwtoken ) {
			  apiRH.getFBUserDetails( function(userData){
				console.log(userData);
				// var $form = $('#complete-profile-form');
				// $('#form-container').fadeIn(500);
				// $form.find('#user-profile-picture').val(userData.picture.data.url);
				// $form.find('#user-provider-uid').val(userData.id);
				// $form.find('#user-name').val(userData.first_name);
				// $form.find('#user-email').val(userData.email);
				// $form.find('#user-last-name').val(userData.last_name);
				// $form.find('#user-nick').val(
				//   userData.name.replace(' ', '').substr(0, 8) + '' +
				//   (Math.floor(Math.random() * (9999 - 1000)) + 1000 )
				// );

			  }, function(error) {
				console.log(error);
			  });
			}
		  });
		};
		
		/**
		 * @param String destination Upload destination Options: "profile", "chat"
		 * @param String source Source to get media file from Options: "camera", "gallery"
		 * @return void
		 */
		this.getFileFromDevice = function(destination, source){

			this.photoDestinationType = navigator.camera.DestinationType;
			var sourcetype =  navigator.camera.PictureSourceType.PHOTOLIBRARY;
			if(source == "camera") sourcetype =  navigator.camera.PictureSourceType.CAMERA;
			console.log("Sourcetype ::: "+sourcetype);
			if(destination == 'profile')
				navigator.camera.getPicture(context.profileselect_win, context.fileselect_fail, { quality: 50,
					destinationType: this.photoDestinationType.FILE_URI,
					sourceType: sourcetype,
					mediaType: navigator.camera.MediaType.ALLMEDIA  });
			if(destination == 'chat')
				navigator.camera.getPicture(context.chat_fileselect_win, context.fileselect_fail, { quality: 50,
						destinationType: this.photoDestinationType.FILE_URI,
						sourceType: sourcetype,
						mediaType: navigator.camera.MediaType.ALLMEDIA  });
			return;
		};
		
	}