/*!
>>>>>>> development
 * Prototype: requestHandlerAPI 
 * @params token (optional if not executing auth requests) Locally saved user token
 */
function requestHandlerAPI(){
	/*** Attributes ***/
	this.token = null;
	this.upload_ready = false;
	this.version = "1.3";
	this.app_build = "1.3.2";
	this.device_model = (typeof device != 'undefined') ? device.model : 'not set';
	this.device_platform = (typeof device != 'undefined') ? device.platform : 'not set';
	this.device_platform_version = (typeof device != 'undefined') ? device.version : 'not set';
	this.device_info = {
							sdk_version: this.version,
							build: this.app_build,
							model: this.device_model,
							platform: this.device_platform,
							version: this.device_platform_version
						};

	this.keeper = window.localStorage;
	
	/*** Request headers ***/
	this.headers = 	{
						'Content-Type': 'application/x-www-form-urlencoded'
					};

	var context = this;
	window.sdk_app_context = null;

	/*  Production API URL  */
	window.api_base_url = "http://pickwin.astrata.mx/";

	/* Constructor */
	this.construct = function(app_context){
					console.log('Initialized Duff api-sdk1.0');

					if(this.keeper.getItem('request_token')) this.token = this.keeper.getItem('request_token');
					sdk_app_context = app_context;
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
			this.token = response.jwtoken;
			console.log(response);
			apiRH.keeper.setItem( 'token'	, response.jwtoken);
			apiRH.keeper.setItem( 'mail'	, response.user.email);
			apiRH.keeper.setItem( 'userId'	, response.user.id);

			if(!this.token)
				return false;

			return response;
		};

		

		/*! 
		 * Register a new user account the old fashioned way
		 * @param data_login JSON {user_login, user_password}
		 * @return status Bool true is successfully logged in; false if an error ocurred (User already exists)
		 */
		this.registerNative = function(data_login){


			var name 		= data_login.user;
			var last_name 	= data_login.last_name;
			var email 		= data_login.mail;
			var pass 		= data_login.pass;
			var cPass		= data_login.cpass;

			var data =  {
							'nombre' 	: name,
							'apellido' 	: last_name,
							'mail' 		: email,
							'password' 	: pass
						};

			var created_response = this.makeRequest('api/signup', data, true, false);

			app.keeper.setItem('token',  created_response.token);
			app.keeper.setItem('mail', 	 created_response.mail);
			app.keeper.setItem('chatId', created_response.jid);
			app.keeper.setItem('userId', created_response._id);
			this.token = app.keeper.getItem('token');

			return (typeof(created_response.nuevo) != 'undefined') ? this.token : false;
		};

		/**
		 * Validate registration code
		 * @param String code
		 * @param String email
		 * 
		 */
		this.validateRegistrationCode = function(code, email){
			var data = 	{
							'code'	: code, 
							'mail'	: email
						};
			console.log(data);
			return this.makeRequest('api/validatecode/', data);
		};

		/**
		 * Record new tracking activity
		 * @param Integer type
		 * @param Float amount
		 * @return Object / Boolean
		 */
		this.tracking = function(type, amount){
			
			var data = {
							'tipo' 		: type,
							'magnitud' 	: amount,
							'cliente' 	: app.keeper.getItem('userId'),
							'coach' 	: app.keeper.getItem('coachId')
						};
			var response = this.makeRequest( 'tables/medicion', data );
			console.log(response);
			return (response) ? response : false;
		};

		/**
		 * Update user profile
		 * @param Object data
		 * @return Object / Boolean
		 */
		this.updatePerfil = function(data){
			var req = {
				data : data
			};
			var response = this.patchRequest( 'tables/cliente/' + app.keeper.getItem('userId'), req);
			return (response) ? response : false;
		};
		

		//Conekta
		this.makePayment = function(token){

			var data = {
					'cliente' : apiRH.keeper.getItem('userId'),
					'card_token' : token
				};
			var response = this.makeRequest('api/history', data);

			return (response.code == "active_subscription") ? true : false;

		};

		
		/**
		 * Fetch user information from api
		 * @return JSON encoded object or false if api responds badly
		 */
		this.getInfoUser = function(){
			var thing = apiRH.keeper.getItem('userId');
			var user = this.getRequest('tables/cliente?_id=' + thing, null);
			this.save_user_data_clientside(user);
			return ( user && typeof(user) != 'undefined') ? user : false;
		};

		/**
		 * Update user settings
		 * @return Boolean response
		 */
		this.updateUserSetting = function(data){
			var _data = {};

			var response = this.makeRequest('tables/cliente/' + data._id, _data);

			console.log(response);  //llega aqui con la respuesta del servidor

			return (response) ? response : false;
		};


		/* 
		 * Creates an internal user to make calls to the API
		 * @param username String
		 * @param email String
		 * @param attrs array()
		 * TO DO: Within the attributes sent to this method we can send the profile image url
		 * @param token String
		 * @return status Bool true is successfully created a new user
		 * @return userdata JSON Contains the user info to be stored client side
		 * @see save_user_data_clientside()
		 */
		this.create_internal_user = function(data){
			apiRH.keeper.setItem('user', data);										
		};

		/* 
		 * Save /Update user data client side to execute auth requests to the API
		 * @return null
		 * @see this.create_internal_user
		 */
		this.save_user_data_clientside = function(data_login){
			if(data_login){
				data_login.user.balancePc = data_login.balancePc;
				data_login.user.balancePcReal = data_login.balancePcReal;
				data_login.user.balanceReal = data_login.balanceReal;
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
			 * @param noHeaders Boolean defaults to false
			 * @return JSON encoded response
			 */
			this.makeRequest = function( endpoint, data, noHeaders, stringify ){

				app.showLoader();
				console.log(' ::: MAKE REQUEST ::: ');
				if( typeof(stringify) == 'undefined' || stringify == true )
					data = JSON.stringify(data);

				var result = {};

				var options = 	{
									method 		: 'POST',
									url			: window.api_base_url+endpoint,
									data 		: data,
									dataType 	: 'json',
									async 		: false,
									crossDomain	: true
								};
				var myHeaders = (!noHeaders || typeof(noHeaders) == 'undefined') ? apiRH.headers : apiRH.headers;
				if(myHeaders)
					options.headers = myHeaders;

				$.ajax(options)
				 .always( function(response){
					setTimeout(function(){
						app.hideLoader();
					}, 2000);
				 })
				 .done( function(response){
				 	console.log(response);
					result = response;
				 })
				 .fail( function(e){
					console.log(e);
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
					// console.log('done');
					console.log(response);
					result = response;
					sdk_app_context.hideLoader(response);
				})
				 .fail(function(e){
					console.log('fail');
					result = false;
					console.log(JSON.stringify(e));
					app.hideLoader();
				});

				return result;
			};

			/*! 
			 * Executes a PUT call
			 * @param endpoint API endpoint to make the call to
			 * @param data JSON encoded data 
			 * *****(SEND data = NULL for closed endpoints)*****
			 * @return JSON success
			 * @see API documentation
			 */
			this.putRequest = function(endpoint, data){
								
								sdk_app_context.showLoader();
								var result = {};
								/* ContentType is important to parse the data server side since PUT doesn't handle multipart form data */
								$.ajax({
									type: 	'PUT',
									data: 	$.param(data),
									contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
									url: 	window.api_base_url+endpoint,
								})
								 .done(function(response){
									result = response;
									sdk_app_context.hideLoader();
								 })
								 .fail(function(e){
									result = false;
									console.log(e);
								 });
								 return result;
							};

		
		
		/* 
		 * Perform OAuth authentication 
		 * @param provider String Values: 'facebook', 'twitter', 'google_plus'
		 * @param callback function The callback function depending on the provider
		 * @return null
		 * @see loginCallbackFB
		 */
		this.loginOauth   =  function(provider){

			app.showLoader();
			OAuth.popup(provider)
				.done(function(result){
					apiRH.loginCallbackFB(result);
				})
				.fail(function(error){
					console.log(error);
					app.toast("Error al recibir información de Facebook");
					app.hideLoader();
				});

		};

		/* 
		 * Log in callback for Facebook provider
		 * @return Bool TRUE if authentication was successful
		 * @see loginOauth
		 * @see API Documentation
		 */
		this.loginCallbackFB = function(response){
			var data_login = {};
			response.me()
			 .done(function(response){

				data_login = 	{
									user 		: response.firstname,
									last_name 	: response.lastname,
									mail 		: response.email,
									pass 		: response.id,
									cPass 		: response.id
								};

				console.log("Inside loginCallback FB");
				var register_response 	= apiRH.registerNative(data_login);
				if( register_response ){
					
					// apiRH.headers['X-ZUMO-AUTH'] = register_response;
					var userInfo = apiRH.getInfoUser();
					if(userInfo){

						window._user = (userInfo) ? userInfo : null;
						console.log(_user);
						app.keeper.setItem( 'user', JSON.stringify(_user) );
						app.keeper.setItem( 'email_verification', true );
						
						if( typeof _user.customerId !== undefined && _user.customerId !== 'not_set' ){
							return app.render_myPlan('dieta.html');
						}else{
							return app.render_initial_record('record.html');
						} 	
					}
					
				}else{

					/** Login if user already exists ***/
					var login_response 	= apiRH.loginNative(data_login);
					if( login_response ){

						// apiRH.headers['X-ZUMO-AUTH'] = login_response;
						var userInfo = apiRH.getInfoUser();
						console.log(userInfo);
						if(userInfo){

							window._user = (userInfo) ? userInfo : null;
							app.keeper.setItem( 'user', JSON.stringify(_user) );
							app.keeper.setItem( 'email_verification', true );

							if( typeof _user.customerId !== 'undefined' && _user.customerId !== 'not_set' ){
								return app.render_myPlan('dieta.html');
							}else{
								return app.render_initial_record('record.html');
							} 	
						}

					}else{
						app.toast("Ocurrió un error, por favor revisa que tus datos sean correctos.")
					}
					app.toast("El email asociado con tu cuenta ya ha sido registrado. Iniciando sesión");

				}
				
			})
			 .fail(function(error){
				return app.toast("Error de conexión con Facebook.");
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