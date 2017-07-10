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
			this.initialized = true;

			var is_logged_in= apiRH.has_token();
			var forceLogin 	= localStorage.getItem('forceLogin');
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
			this.registerHelpers();
			this.registerCompiledPartials();
			this.data_temp = null;

			window.loggedIn 	= false;
			window.init_scripts = [];
			window._user 		= [];
			app.keeper 			= window.localStorage;
			
			/*----------------------- Routing user accordingly ---------------------------*/
			if( is_logged_in ){
				console.log('You okay, now you can start making calls');
				/* Take the user to it's timeline */
				loggedIn 		= true;
				var is_feed 	= window.is_feed;
				_user 			= JSON.parse( app.keeper.getItem('user') );
				return app.render_lobby();
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
				value = (value/100).toFixed(2);
			    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			});
			Handlebars.registerHelper('formatDate', function(value) {
				var date = Date.parse(value);
				moment.locale('es');
			    return moment(value).format('lll');
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
			var filenames = ['header', 'footer', 'loader', 'each-quiniela', 'each-my-quiniela', 'my-lobby', 'quiniela-games', 'filters'];
			filenames.forEach(function (filename) {
					Handlebars.registerPartial(filename, Handlebars.templates[filename]);
			});
		},
		bindEvents: function() {
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
			window.cordova_full_path = (typeof(cordova) != 'undefined') 
									 	? cordova.file.applicationDirectory+"www/"
									 	: '';
			// window.cordova_full_path = '';
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

		},
		// deviceready Event Handler
		onMobileInit: function() {
			app.receivedEvent('mobileinit');
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
			// console.log(parsed);
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
		check_or_renderContainer : function(render_exoskeleton){
			/*** First time loading home ***/
			if(window.firstTime){
				var container_template = Handlebars.templates['container'];
				var html 	 = container_template();
				$('.rootContainer').html( html );
			}
			return (render_exoskeleton) ? app.render_exoskeleton() : null;
		},
		render_exoskeleton : function(){

			if( typeof window.has_exo == 'undefined' ){
				console.log("rendering exoskeleton");
				var data = this.gatherEnvironment(null, null);
				window.has_exo;
				return app.switchView('exoskeleton', data, '.view', null, '', true, true, false);
			}
		},
		render_header : function(filters){
			console.log("Render header");
			var extra_data = this.gatherEnvironment(null, "Registro");
			extra_data.selected_lobby = (filters) ? true : false;
			app.render_partial('header', extra_data, '#loadHeader');
			$('#theHeader').fadeOut('fast', function(){
				$(this).remove();
			});
			return;
		},
		render_register : function( url ){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer(false);
			console.log("Rendering Register");

			app.data_temp = this.gatherEnvironment(null, "Registro");
			console.log(app.data_temp);
			return app.switchView('register', app.data_temp, '.view', url, 'registro');
		},
		render_register_success : function( url ){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer(false);
			var data = this.gatherEnvironment(null, "¡REGISTRO EXITOSO!");
			// data.is_scrollable = false;
			return app.switchView('register-success', data, '.view', url, 'registro exitoso');
		},
		render_login : function(url){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer(false);
			var data = this.gatherEnvironment();
			data.is_scrollable = false;
			return app.switchView('login', data, '.view', url, 'login');
		},
		render_lobby : function(url){
			console.log("Rendering lobby");
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer(true);
			var extra_data = apiRH.getRequest( 'pools/available.json', null );
			app.data_temp = this.gatherEnvironment( extra_data, "Lobby" );
			app.data_temp.selected_lobby = true;
			setTimeout( function(data){
				return app.switchView( 'lobby', app.data_temp, '#exoskeleton', url, 'quiniela-feed', false, true, true );
			}, 220);
		},
		render_myfeed : function(url){
	
			var extra_data = apiRH.getRequest('api/users/pools.json', null);
			var data = this.gatherEnvironment(extra_data, "My Lobby");
			var template = Handlebars.templates['my-lobby'];
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			$('#misQuinielas').html( template(data) ).css({ "opacity": 0, "display": "block"})
													 .animate(	{ opacity: 1 }, 220);
			return;
		},
		render_detail : function(url, object_id){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			console.log("Rendering Detail");
			var extra_data = apiRH.getRequest('api/pools/view/'+object_id+'.json', null);
			extra_data = (extra_data.pool) ? extra_data.pool : [];
			app.data_temp = this.gatherEnvironment(extra_data, "Detail");
			setTimeout( function(data){
				return app.switchView('detail-quiniela', app.data_temp, '#exoskeleton', url, 'quiniela-feed');
			}, 220);
		},
		render_games : function(object_id){

			var extra_data = apiRH.getRequest('api/pools/fixtures/'+object_id+'.json', null);
			extra_data = (extra_data) ? extra_data : [];
			app.data_temp = this.gatherEnvironment(extra_data, null);
			setTimeout(function(){
				return app.render_partial('quiniela-games', app.data_temp, '#insertPartidos');
			}, 100);
		},
		render_profile : function(url){

			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			app.data_temp = this.gatherEnvironment(null, "Perfil de usuario");
			app.data_temp.selected_profile = true;
			return app.switchView('profile', app.data_temp, '#exoskeleton', url, 'user-profile');
		},
		render_add_funds : function(url){

			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			app.data_temp = this.gatherEnvironment(null, "Agregar fondos a tu cuenta");
			app.data_temp.selected_deposit = true;
			return app.switchView('register-success', app.data_temp, '#exoskeleton', url, 'registro exitoso');
		},
		render_private_games : function(url){

			console.log("Rendering private games");
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			app.data_temp = this.gatherEnvironment(null, "Quinielas privadas");
			app.data_temp.selected_pri = true;
			return app.switchView('private-games', app.data_temp, '#exoskeleton', url, 'quinielas_privadas');
		},
		render_partial : function( modalName, additional_data, appendTarget ){

			var modalTemplate = Handlebars.templates[modalName];
			if(!modalTemplate){
				console.log("Template doesn't exist");
				return false;
			}

			$(appendTarget).append( modalTemplate(additional_data) )
							.animate(	{
								opacity: 1
							}, 120);
			app.hideLoader();
		},
		filter_pool : function( filter, value ){

			Pickwin.filter('rangeFilter', function(){
			  return function(items, rangeInfo) {
			    if( rangeInfo === undefined || rangeInfo == null || rangeInfo === '') {
			      return items;
			    }
			    var filtered = [];
			    var ranges = rangeInfo.split(';');
			    var currency = ranges[0];
			    var min      = parseInt(ranges[1]) * 100;
			    var max      = parseInt(ranges[2]) * 100;
			    angular.forEach(items, function(item) {
			      if ( currency == item.entry_currency && item.entry_fee >= min && item.entry_fee <= max ) {
			        filtered.push(item);
			      }
			    });
			    return filtered;
			  };
			});
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
		switchView: function(newTemplate, data, targetSelector, recordUrl, targetClass, keepLoader, leNiceTransition, initEvents){

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
															}, 420);
				}else{

					$(targetSelector).html( template(data) ).css("opacity", 0.7)
															 .css("display", "block")
															 .css("margin-left", "48px")
															 .css("width", "100%")
															 .animate(	{
																			'margin-left': "0",
																			opacity: 1
																		}, 420, 'swing');
				}
				
			});
			
			if(!keepLoader)
				return setTimeout(function(){
					if(window.firstTime)
						window.firstTime = false;				
					app.hideLoader();
					if(initEvents || typeof initEvents == 'undefined') 
						initializeEvents();
					$(window).resize();
				}, 2000);

			return setTimeout(function(){
					if(window.firstTime)
						window.firstTime = false;				
					if(initEvents || typeof initEvents == 'undefined') 
						initializeEvents();
					$(window).resize();
				}, 220);
		},
		appendView: function( newTemplate, data, targetSelector ){

			var template = Handlebars.templates[newTemplate];
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			$(targetSelector).html( '<div style\'margin-top="2rem;"\'>'+template(data)+'</div>' )
													 .css("display", "block")
													 .animate(	{
																	'margin-top': 0
																}, 420, 'swing');
			return setTimeout(function(){ }, 220);
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
