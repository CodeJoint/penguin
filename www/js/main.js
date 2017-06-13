   /*     _                        _     _           _   
	*    / \   _ __  _ __     ___ | |__ (_) ___  ___| |_ 
	*   / _ \ | '_ \| '_ \   / _ \| '_ \| |/ _ \/ __| __|
	*  / ___ \| |_) | |_) | | (_) | |_) | |  __/ (__| |_ 
	* /_/   \_\ .__/| .__/   \___/|_.__// |\___|\___|\__|
	*         |_|   |_|               |__/               
	*/

	var app = {
		app_context: this,
		initialized: false,
		// Application Constructor
		initialize: function() {

			this.bindEvents();
			/* Initialize API request handler */
			window.apiRH = new requestHandlerAPI().construct(app);
			window.firstTime = true;
			app.initialized = true;
			var is_home 	= window.is_home;
			var is_login 	= apiRH.has_token();

			var is_client 	= localStorage.getItem('customerId');
			var is_current 	= localStorage.getItem('valido');

			window.cordova_full_path = "";

			/*** TODO: Get this shit into a catalogue ***/
			window.catalogues 						= [];
			window.catalogues.months 				= [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
			
			/* IMPORTANT to set requests to be syncronous */
			/* TODO: test all requests without the following code 'cause of deprecation */
			$.ajaxSetup({
				 async: false
			});

			this.registerCompiledPartials();

			window.loggedIn 	= false;
			window.init_scripts = [];
			window._user 		= [];
			app.keeper 			= window.localStorage;
			
			/*----------------------- Routing user accordingly ---------------------------*/
			if(is_login){
				console.log('You okay, now you can start making calls');
				/* Take the user to it's timeline */
				loggedIn 		= true;
				var is_feed 	= window.is_feed;
				_user 			= JSON.parse( app.keeper.getItem('user') );
				return app.render_feed();
			}
			return app.render_login();
			/*-------------------- Code below this line won't run ------------------------*/
		},
		initPushNotifications: function() {
			//
		},
		registerHelpers : function() {
			Handlebars.registerHelper('if_eq', function(a, b, opts) {
				if (a == b) {
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			});
			Handlebars.registerHelper('if_module', function(a, b, opts) {
				if (a%b == 0) {
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			});
			Handlebars.registerHelper('formatCurrency', function(value) {
			    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			});
		},
		registerTemplate : function(name) {
			$.ajax({
				url : 'views/' + name + '.hbs',
				success : function(response) {
						if (Handlebars.templates === undefined)
							Handlebars.templates = {};
					Handlebars.templates[name] = Handlebars.compile(response);
				}
			});
			return;
		},
		registerCompiledPartials: function() {
			/* Add files to be loaded here */
			var filenames = ['header', 'loader', 'each-quiniela', 'filters'];
			filenames.forEach(function (filename) {
					Handlebars.registerPartial(filename, Handlebars.templates[filename]);
			});
		},
		bindEvents: function() {
			console.log("Bind");
			document.addEventListener('deviceready', app.onDeviceReady, false);
			document.addEventListener('mobileinit', app.onDMobileInit, false);
		},
		onBackButton: function(){
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		        // IOS DEVICE
		        history.go(-1);
		    } else if (userAgent.match(/Android/i)) {
		        // ANDROID DEVICE
		        navigator.app.backHistory();
		    } else {
		        // EVERY OTHER DEVICE
		        history.go(-1);
		    }
		    console.log("Back");
		},

		// deviceready Event Handler
		onDeviceReady: function() {
			app.receivedEvent('deviceready');
			console.log("Device ready");
			window.cordova_full_path = (typeof(cordova) != 'undefined') 
									 	? cordova.file.applicationDirectory+"www/"
									 	: '';
			console.log(window.cordova_full_path);
			/*   ___    _         _   _     
			*  / _ \  / \  _   _| |_| |__  
			* | | | |/ _ \| | | | __| '_ \ 
			* | |_| / ___ \ |_| | |_| | | |
			*  \___/_/   \_\__,_|\__|_| |_|
			*/
			try{
				// OAuth.initialize('7-ipR3QS-__wrorRTpdedM8-_v8');
				console.log("Initialized Oauth");
			}
			catch(err){
				app.toast("Oauth error ocurred");
				console.log('OAuth initialize error: ' + err);
			}

			try{
				app.initPushNotifications();
			}
			catch(err){
				app.toast("Push notifications error: "+JSON.stringify(err));
			}

			var backButtonElement = document.getElementById("backBtn");
			if(backButtonElement)
				backButtonElement.addEventListener("click", app.onBackButton, false);
			return;

			console.log(navigator.camera);
		},
		// deviceready Event Handler
		onMobileInit: function() {
			app.receivedEvent('mobileinit');
			console.log("mobileinit");
		},
		// Update DOM on a Received Event
		receivedEvent: function(id) {
			if(id == 'deviceready' && typeof navigator.splashscreen != 'undefined'){
				navigator.splashscreen.hide();
			}
		},
		getJsonCatalogue: function(catalogue_name) {
			var response = $.getJSON('compiled/catalogues/'+catalogue_name+'.json');
			return JSON.parse(response.responseText);
		},
		gatherEnvironment: function(optional_data, history_title) {
			/* Gather environment information */
			var meInfo 	= window._user;
			var parsed 	= {me: meInfo};
			
			if(optional_data){
				parsed['data'] = optional_data;
			}
			if(history_title)
				parsed['header_title'] = history_title;
			if( typeof(cordova_full_path) != 'undefined' && cordova_full_path != '' )
				parsed['cordova_full_path'] = cordova_full_path;
			return parsed;

		},
		getUrlVars: function() {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars;
		},
		/* Returns the values in a form as an associative array */
		/* IMPORTANT: Does NOT include password type fields */
		getFormData: function (selector, format) {
			var result = [],
				object = {},
				data   = $(selector).serializeArray();

			$.map(data, function (attr) {
				result[attr.name] = attr.value;
				object[attr.name] = attr.value;
			});
			return (format == 'object') ? object : result;
		},
		isObjEmpty: function (obj) {

				if (obj == null) return true;
				if (obj.length > 0)    return false;
				if (obj.length === 0)  return true;

				for (var key in obj) 
					if (hasOwnProperty.call(obj, key)) return false;
				return true;
		},
		check_or_renderContainer : function(){
			/*** First time loading home ***/
			if(window.firstTime){
				console.log("Rendering first time");
				var container_template = Handlebars.templates['container'];
				var html 	 = container_template();
				$('.rootContainer').html( html );
			}
		},
		render_login : function(url){
			
			window.is_home = true;
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			console.log("Rendering Login");
			var data = this.gatherEnvironment();
			data.is_scrollable = false;
			return this.switchView('login', data, '.view', url, 'login');
		},
		render_feed : function(url){
			
			window.is_home = true;
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			console.log("Rendering Main Feed");
			var extra_data = apiRH.getRequest('pools/available.json', null);
			extra_data.pools.forEach(function(element){
				element.acum = element.entry_count*element.entry_fee;
				var date_format = new Date(element.finish_date);
				element.date_format = date_format.getFullYear()+'/'+ date_format.getMonth()+'/'+ date_format.getDate();
			});
			var data = this.gatherEnvironment(extra_data, "Feed Quinielas");
			console.log(data);
			// data.is_scrollable = false;
			return this.switchView('lobby', data, '.view', url, 'quiniela-feed');
		},
		render_myfeed : function(url){
			
			window.is_home = true;
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			console.log("Rendering Main Feed");
			var extra_data = apiRH.getRequest('pools/available.json', null);
			extra_data.pools.forEach(function(element){
				element.acum = element.entry_count*element.entry_fee;
				var date_format = new Date(element.finish_date);
				element.date_format = date_format.getFullYear()+'/'+( date_format.getMonth()+1 );
			});
			var data = this.gatherEnvironment(extra_data, "Feed Quinielas");
			console.log(data);
			data.is_scrollable = false;
			return this.switchView('feed', data, '.view', url, 'quiniela-feed');
		},
		render_register : function( url ){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			console.log("Rendering Register");

			var data = this.gatherEnvironment(null, "Registro");
			// data.is_scrollable = false;
			return this.switchView('register', data, '.view', url, 'registro');
		},
		render_register_success : function( url ){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			console.log("Rendering Register success");

			var data = this.gatherEnvironment(null, "Registro exitoso");
			// data.is_scrollable = false;
			return this.switchView('register-success', data, '.view', url, 'registro exitoso');
		},
		render_settings : function(url){
			
		},
		render_modal : function(modalName, data, appendTarget){

			app.showLoader();
			app.check_or_renderContainer();
			console.log("Rendering Modal: "+modalName);
			var data = this.gatherEnvironment(data, "");
			data.is_scrollable = false;
			var modalTemplate = Handlebars.templates[newTemplate];
			$(appendTarget).css("opacity", 0).append( modalTemplate(data) );

			$(appendTarget).html( modalTemplate(data) ).css("display", "block")
														 .animate(	{
															opacity: 1
														}, 360);
		},
		render_dialog : function(title, message, options){
			return app.showLoader();
		},
		back_with_logout : function(event){
			var link = $(event.target).attr('href');
			localStorage.clear();
			window.location.assign(link);
			return;
		},
		switchView: function(newTemplate, data, targetSelector, recordUrl, targetClass, keepLoader, leNiceTransition){
			
			/* Push to history if url is supplied */
			if(recordUrl) window.history.pushState(newTemplate, newTemplate, '/'+recordUrl);
			
			leNiceTransition = (typeof(leNiceTransition) != 'undefined') ? leNiceTransition : true;
			var template = Handlebars.templates[newTemplate];
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			$(targetSelector).fadeOut(360, function(){

				if(targetClass) $(targetSelector).attr('class','view').addClass(targetClass);

				if(!leNiceTransition){

					$(targetSelector).html( template(data) ).css({ "opacity": 0, "display": "block"})
															 .animate(	{
																opacity: 1
															}, 640);
				}else{

					$(targetSelector).html( template(data) ).css("opacity", 1)
															 .css("display", "block")
															 .css("margin-left", "20px")
															 .animate(	{
																			'margin-left': "0",
																			opacity: 1
																		}, 360);
				}
				
			});
			
			if(!keepLoader)
				return setTimeout(function(){
					if(window.firstTime)
						window.firstTime = false;				
					app.hideLoader();
					initializeEvents();
					$(window).resize();
				}, 2000);
				
			return setTimeout(function(){
					if(window.firstTime)
						window.firstTime = false;				
					initializeEvents();
					$(window).resize();
				}, 2000);
		},
		showLoader: function(){
			$('#spinner').show();
		},
		hideLoader: function(){
			$('#spinner').hide();
		},
		toast: function(message, bottom){
			try{
				if(!bottom){
					window.plugins.toast.showLongCenter(message);
				}else{
					window.plugins.toast.showLongBottom(message);
				}
			}
			catch(err){
				console.log('Toasting error: ' + JSON.stringify(err)); // imprime esto con un JSON vacio
				alert(message);
			}
			return;
		}
	};
