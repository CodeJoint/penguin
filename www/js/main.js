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
		// Chain method runs after initialization if Authentication okays
		initialize: function(chain_callback) {

			this.bindEvents();
			/* Initialize API request handler */
			window.apiRH = new requestHandlerAPI().construct(app);
			window.firstTime = true;
			this.initialized = true;

			var is_logged_in= apiRH.has_token();
			var forceLogin 	= localStorage.getItem('forceLogin');
			var is_current 	= localStorage.getItem('valido');
			window.is_access = (typeof window.is_access !== 'undefined') ? window.is_access : false;

			window.cordova_full_path = "";

			/*** TODO: Get this shit into a catalogue ***/
			window.catalogues 						= [];
			window.filter_array 					= [];
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
			if( !is_logged_in ){
				return app.render_login();
			}
			console.log('You okay, now you can start making calls');
			/* Take the user to it's timeline */
			loggedIn 		= true;
			var is_feed 	= window.is_feed;
			_user 			= JSON.parse( app.keeper.getItem('user') );
			if(is_access)
				return app.render_lobby();
			setTimeout(function(){

				return chain_callback;
			},400);
			/*-------------------- Code below this line won't run ------------------------*/
		},
		initPushNotifications: function() {
			console.log("Initializing OneSignal");
			var notificationOpenedCallback = function(jsonData) {
				console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
			};
			OneSignal.setLogLevel(OneSignal.LOG_LEVEL.DEBUG, OneSignal.LOG_LEVEL.DEBUG);
			OneSignal
				.startInit("4606a8d5-be35-4d82-9043-7cdbb86875cf")
				.handleNotificationOpened(notificationOpenedCallback)
				.endInit();
		},
		initPaymentAPI: function() {
			/** Sandbox values **/
			OpenPay.setId('mqfki2pbqpbve54kabor');
			OpenPay.setApiKey('pk_f548ab805b93403b91009278e32e3fd4');
			/** Production values **/
			// OpenPay.setId('myabfqccohuj4kszwr7y');
			// OpenPay.setApiKey('pk_e78ceae59eaf42f68c2dba4cbd147265');
			if(typeof OpenPay.deviceData !== 'undefined' && apiRH )
				apiRH.deviceSessionId = OpenPay.deviceData.setup();
			OpenPay.setSandboxMode(true);
		},
		registerHelpers : function() {
			Handlebars.registerHelper('if_eq', function(a, b, opts) {
				if (a == b) {
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			});
			Handlebars.registerHelper('if_less', function(a, b, opts) {
				if (a < b && a > 0) {
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
			Handlebars.registerHelper('formatDate', function(value, format) {
				var date 	  = Date.parse(value);
				var my_format = (typeof format === 'undefined' || !format || format == '') ? 'lll' : format;
				moment.locale('es');
				return moment(date).format(my_format);
			});
			Handlebars.registerHelper('unixTime', function(value) {
				moment.locale('es');
				return moment(value).format('lll');
			});
			Handlebars.registerHelper('coinToPeso', function(value) {
				return (value*0.00005).toFixed(2);
			});
			Handlebars.registerHelper('lastFour', function(value) {
				console.log(value.substring(value.length - 4));
				return value.substring(value.length - 4);
			});
			Handlebars.registerHelper('cordova_full_path', function() {
				return window.cordova_full_path;
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
			window.cordova_full_path = ( typeof cordova !== 'undefined' ) 
									 ? cordova.file.applicationDirectory+'www/'
									 : '';
			try{
				app.initPaymentAPI();
				console.log("Initialized Payment gateway");
			}
			catch(err){
				app.toast("OpenPay error ocurred");
				console.log('OpenPay initialize error: ' + err);
			}

			try{
				app.initPushNotifications();
			}
			catch(err){
				// app.toast("Push notifications error: "+JSON.stringify(err));
			}
			if (AndroidFullScreen) {
			    
			    AndroidFullScreen.immersiveMode();
			}

			apiRH.checkFBStatus();
			
			var backButtonElement = document.getElementById("backBtn");
			if(backButtonElement)
				backButtonElement.addEventListener("click", app.onBackButton, false);
			document.addEventListener("backbutton", app.onBackButton, false);
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
			if( typeof(sport_allow_ties) !== 'undefined' && sport_allow_ties !== '' )
				parsed['data']['sport_allow_ties'] = sport_allow_ties;
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
				var data = app.gatherEnvironment(null, null);
				window.has_exo;
				return app.switchView('exoskeleton', data, '.view', null, '', true, true, false);
			}
		},
		render_header : function(filters){
			var extra_data = app.gatherEnvironment(null, "Registro");
			extra_data.selected_lobby = (filters) ? true : false;
			app.render_partial('header', extra_data, '#loadHeader');
			$('#theHeader').fadeOut('fast', function(){
				$(this).remove();
			});
			return;
		},
		render_forgot_password : function( url ){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer(false);
			return app.switchView('forgot-password', null, '.view', url, 'registro');
		},
		render_password_sent : function( url ){
			
			if(!app.initialized) app.initialize();
			app.check_or_renderContainer(false);
			return app.switchView('password-link-sent', null, '.view', url, 'registro');
		},
		render_register : function( url ){
			
			if(!app.initialized) app.initialize();
			app.check_or_renderContainer(false);
			app.data_temp = app.gatherEnvironment(null, "Registro");
			return app.switchView('register', app.data_temp, '.view', url, 'registro');
		},
		render_register_success : function( url ){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer(false);
			var data = app.gatherEnvironment(null, "¡REGISTRO COMPLETO!");
			return app.switchView('register-success', data, '.view', url, 'registro exitoso');
		},
		render_login : function(url){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer(false);
			var data = app.gatherEnvironment();
			return app.switchView('login', data, '.view', url, 'login');
		},
		render_lobby : function(url, reloadExoskeleton){

			if(!app.initialized || !_user) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			var reload = (reloadExoskeleton || typeof reloadExoskeleton == 'undefined') ? true : false;
			app.check_or_renderContainer(reload);
			app.data_temp 	= app.gatherEnvironment( null, "Lobby container" );
			app.data_temp.selected_lobby = true;
			setTimeout( function(data){
				return app.switchView('lobby', app.data_temp, '#exoskeleton', url, 'quiniela-feed', true, true, true );
			}, 400);
		},
		render_lobby_feed : function( ask_again ){

			var extra_data 	= (typeof ask_again === 'undefined' || ask_again === true || !app.data_temp.data ) 
							? apiRH.getRequest( 'api/pools/available.json', null )
							: { pools: app.data_temp.data.pools, pools_unfiltered: app.data_temp.data.pools_unfiltered, tournaments: app.data_temp.data.tournaments, now: app.data_temp.data.now };
			console.log(extra_data);
			var template 	= Handlebars.templates['lobby-feed'];
			app.data_temp	= app.gatherEnvironment( extra_data, "Lobby feed" );
			app.data_temp.selected_lobby = true;

			if(ask_again){
				app.data_temp.data.pools_unfiltered = app.data_temp.data.pools;
				app.data_temp.data.pools 			= app.sort_pool();
			}
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			console.log(app.data_temp);
			$('#insertFeed').html( template(app.data_temp) )
							.css({ "opacity": 0, "display": "block"})
							.animate({ opacity: 1 }, 220);
			app.hideLoader();
			return;
		},
		render_myfeed_sidebar : function(url){
	
			var extra_data = apiRH.getRequest('api/users/pools.json', null);
			var data = app.gatherEnvironment(extra_data, "My Lobby");
			var template = Handlebars.templates['my-lobby'];
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			$('#misQuinielas').html( template(data) ).css({ "opacity": 0, "display": "block"})
													 .animate(	{ opacity: 1 }, 220);
			return;
		},
		render_myfeed : function(url){
	
			var extra_data = apiRH.getRequest('api/users/pools.json', null);
			var data = app.gatherEnvironment(extra_data, "My Lobby");
			var template = Handlebars.templates['my-lobby'];
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			$('#misQuinielas').html( template(data) ).css({ "opacity": 0, "display": "block"})
													 .animate(	{ opacity: 1 }, 220);
			return;
		},
		render_detail : function(url, object_id, view){
			
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			console.log("Rendering Detail");
			var extra_data = apiRH.getRequest('api/pools/view/'+object_id+'.json', null);
			extra_data = (extra_data.pool) ? extra_data.pool : [];

			if(typeof extra_data.sport !== 'undefined' && typeof extra_data.sport.allow_ties !== 'undefined')
				window.sport_allow_ties = extra_data.sport.allow_ties;
			app.data_temp = app.gatherEnvironment(extra_data, "Detail");
			var template_name = (view === 'postures') 	? 'detail-quiniela-registered'	: 'detail-quiniela';
				template_name = (view === 'chat'	) 	? 'detail-quiniela-chat'		: template_name;
				template_name = (view === 'prizes'	) 	? 'detail-quiniela-prizes'		: template_name;
				template_name = (view === 'group-picks')? 'detail-quiniela-group-picks'	: template_name;
				template_name = (view === 'scores'	) 	? 'detail-quiniela-scores'		: template_name;
			setTimeout( function(data){
				return app.switchView(template_name, app.data_temp, '#exoskeleton', url, 'quiniela-'+view);
			}, 220);
		},
		render_games : function(object_id){

			var extra_data = apiRH.getRequest('api/pools/fixtures/'+object_id+'.json', null);
			extra_data = (extra_data) ? extra_data : [];
			console.log(extra_data);
			app.data_temp = app.gatherEnvironment(extra_data, null);
			setTimeout(function(){
				return app.render_partial('quiniela-games', app.data_temp, '#insertPartidos');
			}, 220);
		},
		render_similar_picks : function(object_id){

			var extra_data = apiRH.getRequest('api/entries/similarByPool/'+object_id+'.json', null);
			extra_data = (extra_data) ? extra_data : [];
			app.data_temp = app.gatherEnvironment(extra_data, null);
			console.log(app.data_temp);
			setTimeout(function(){
				return app.render_partial('similar-picks', app.data_temp, '#select_copy_picks');
			}, 220);
		},
		render_other_entries : function(entry_id){

			var extra_data = apiRH.getRequest('api/entries/get/'+entry_id+'.json', null);
			extra_data = (extra_data) ? extra_data : [];
			app.data_temp = app.gatherEnvironment(extra_data, null);
			console.log(app.data_temp);
			setTimeout(function(){
				return app.render_partial('other-entries', app.data_temp, '#select_copy_picks');
			}, 220);
		},
		render_profile : function(url, tab){
			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			var extra_data = null;
			var profile_title = '';
			url = (typeof url === 'undefined') ? 'profile.html' : url;
			tab = (typeof tab === 'undefined') ? 'method' : tab;
			app.data_temp = app.gatherEnvironment(null, "Perfil de usuario");
			app.data_temp.selected_profile = true;
			var template = '';
			if(tab == 'documents'){
				template = 'profile-documents';
				profile_title = 'Mis documentos';
				extra_data = apiRH.getRequest('api/documents/index.json', null);
			}else if(tab == 'withraw'){
				template = 'profile-withraw'
				profile_title = 'Retirar fondos';
			}else if(tab == 'history'){
				template = 'profile-history'
				profile_title = 'Historial de transacciones';
				extra_data = apiRH.getRequest('api/transactions/history.json', null);
			}else if(tab == 'notifications'){
				template = 'profile-notifications'
				profile_title = 'Centro de notificaciones';
				// extra_data = apiRH.getRequest('api/openpay_cards/index.json', null);
			}else{
				template = 'profile'
				profile_title = 'Métodos de pago';
				extra_data = apiRH.getRequest('api/openpay_cards/index.json', null);
			}
			app.data_temp = app.gatherEnvironment(extra_data, profile_title);
			console.log(app.data_temp);
			return app.switchView( template, app.data_temp, '#exoskeleton', url, 'user-profile '+tab );
		},
		render_add_funds : function(url){

			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			var extra_data = apiRH.getRequest('api/openpay_cards/index.json', null);
			app.check_or_renderContainer();
			app.data_temp = app.gatherEnvironment(extra_data, "Agregar fondos a tu cuenta");
			console.log(app.data_temp);
			app.data_temp.selected_deposit = true;
			return app.switchView('deposit', app.data_temp, '#exoskeleton', url, 'deposit');
		},
		render_add_funds_store : function(url){

			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			app.data_temp = app.gatherEnvironment(null, "Agregar fondos a tu cuenta");
			app.data_temp.selected_deposit = true;
			return app.switchView('deposit-stores', app.data_temp, '#exoskeleton', url, 'deposit stores');
		},
		render_private_search : function(url){

			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			app.data_temp = app.gatherEnvironment(null, "Quinielas privadas");
			app.data_temp.selected_pri = true;
			return app.switchView('private', app.data_temp, '#exoskeleton', url, 'privates');
		},
		render_search_results : function(response_object){

			app.appendView('search-results', response_object, '#insertResults');
			return app.hideLoader();
		},
		render_create_private : function(url){

			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			app.check_or_renderContainer();
			app.data_temp = app.gatherEnvironment(null, "Crear quiniela privada");
			app.data_temp.selected_pri = true;
			return app.switchView('private-create', app.data_temp, '#exoskeleton', url, 'privates create');
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
		sort_pool : function( filter, value ){

			if(!app.data_temp.data.pools)
				return false;
			var pool = app.data_temp.data.pools;
			if(filter == 'chronological' || typeof filter == 'undefined')
				pool.sort(
					firstBy( function (v) { return v.closed; } )
						.thenBy( function (v) { return !v.featured; } )
						.thenBy('deadline_tz')
				);
			return pool;
		},
		render_filter_tournaments : function( ){
			var extra_data = apiRH.getRequest('api/sports/index.json', null);
			extra_data = (extra_data) ? extra_data : [];
			if(!extra_data)
				return false;
			extra_data.sports.forEach(function(element, index){
				if(element.name === 'Fútbol')
					return extra_data = element;
			});
			setTimeout(function(){
				app.appendView('filter-tournaments', extra_data, '#deporte_soccer');
			}, 220);
		},
		stack_filter : function( filter, value ){
			/** Filters are stored in a global variable **/
			if(!app.data_temp.data.pools)
				return false;
			var pool = app.data_temp.data.pools;
			filter_array[filter] = value;
			return app.apply_filters();
		},
		/*** Clears specific filter or all filters if parameter is not set ***/
		clear_filters : function( filter ){
			if(filter == 'all' || typeof filter == 'undefined')
				return filter_array = [];
			return delete filter_array[filter];
		},
		apply_filters : function(){

			/*** TODO Start with unfiltered feed from temporary memory, then apply filters ***/
			var myFilters = window.filter_array;
			/*** TODO Check temp data before assigning value ***/
			var myPool 	  = app.data_temp.data.pools_unfiltered;
			console.log(app.data_temp);

			if(typeof myFilters.real_money !== 'undefined' ){
				
				/*** min: 0-50, med: 51-250, max: 251-10000 ***/
				var min_value = (myFilters.real_money === 'min') ?  0 : 251;
					min_value = (myFilters.real_money === 'med') ? 51 : min_value;
				var max_value = (myFilters.real_money === 'min') ?  50 	: 10000;
					max_value = (myFilters.real_money === 'med') ? 250	: max_value;
				myPool.forEach( function(element, index){
					var entry = element.entry_fee/100;
					if( !(entry >= min_value && entry <= max_value) )
						delete myPool[index];
				});
			}
			if(typeof myFilters.fake_money !== 'undefined' ){
				/*** min: 0-50, med: 51-250, max: 251-10000 ***/
				var min_value = (myFilters.real_money === 'min') ?  0 : 251;
					min_value = (myFilters.real_money === 'med') ? 51 : min_value;
				var max_value = (myFilters.real_money === 'min') ?  50 	: 10000;
					max_value = (myFilters.real_money === 'med') ? 250	: max_value;
				myPool.forEach( function(element, index){
					var entry = element.entry_fee/100;
					if( !(entry >= min_value && entry <= max_value) )
						delete myPool[index];
				});
			}
			if(typeof myFilters.status !== 'undefined' )
				myPool.forEach( function(element, index){
					if( element.status !== myFilters.status )
						delete myPool[index];
				});
			
			if(typeof myFilters.sport !== 'undefined' )
				myPool.forEach( function(element, index){
					if( element.sport !== myFilters.sport )
						delete myPool[index];
				});

			if(typeof myFilters.type != 'undefined' ){
				var type_compare = (myFilters.type !== 'open') ? false : true;
				myPool.forEach( function(element, index){
					if( element.limited_capacity === type_compare )
						delete myPool[index];
				});
			}
			app.data_temp.data.pools = myPool.filter(function(){return true;});
			return app.render_lobby_feed(false);
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
				}, 420);

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
			return;
			// return setTimeout(function(){ }, 220);
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
