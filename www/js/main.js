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
			window._cache 	 = {};
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
			Storage.prototype.setObj = function(key, obj) {
			    return this.setItem(key, JSON.stringify(obj))
			}
			Storage.prototype.getObj = function(key) {
			    return JSON.parse(this.getItem(key))
			}

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
			return this.initialized;
			// setTimeout(function(){

			// 	return chain_callback;
			// },400);
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
			Handlebars.registerHelper('if_diff', function(a, b, opts) {
				if (a != b) {
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
			Handlebars.registerHelper('calcPercentage', function(value, total) {
				return ((total*100)/value).toFixed(2);
			});
			Handlebars.registerHelper('calcAmount', function(value, total) {
				return ((total/100)*value).toFixed(2);
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
				return value.substring(value.length - 4);
			});
			Handlebars.registerHelper('cordova_full_path', function() {
				return window.cordova_full_path;
			});
			Handlebars.registerHelper('inc', function(value) {
				return value+1;
			});
			Handlebars.registerHelper('numberOptions', function(base, limit) {
				var html = '';
				for(var i = base; i<=limit; i++){
					html += '<option value="'+i+'" >'+i+'</option>';
				}
				return html;
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
			window.cordova_full_path = ( typeof cordova !== 'undefined' && cordova.file.applicationDirectory !== '' ) 
									 ? cordova.file.applicationDirectory+'www/'
									 : '';
			if(typeof device !== 'undefined' && device.platform === 'browser')
				cordova_full_path = '';
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
			} catch(err){
				// app.toast("Push notifications error: "+JSON.stringify(err));
			}
			if (AndroidFullScreen) {
			    
			    AndroidFullScreen.immersiveMode();
			}

			// try{
			// 	codePush.sync();
			// } catch(err){
			// 	alert("Error initializing codePush");
			// }
			
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
			var parsed 	= {me: meInfo, data: {}};
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
				$.when( app.switchView('exoskeleton', data, '.view', null, '', true, true, false) ).then( function(){
					return apiRH._ajaxRequest('GET', 'api/users/details.json', null, 'json', true, app.render_header);
				} );
			}
		},
		render_header : function(user_data, filters){

			var saved 	= apiRH.save_user_data_clientside(user_data);
			var extra_data = app.gatherEnvironment(null, "");
			extra_data.selected_lobby = (filters) ? true : false;
			$.when($('#theHeader').remove())
			 .then( app.render_partial('header', extra_data, '#loadHeader') );
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

			var reload = (reloadExoskeleton || typeof reloadExoskeleton == 'undefined') ? true : false;
			app.check_or_renderContainer(reload);
			app.data_temp 	= app.gatherEnvironment( null, "Lobby container" );
			app.data_temp.selected_lobby = true;
			setTimeout( function(data){
				app.showLoader();
				return app.switchView('lobby', app.data_temp, '#exoskeleton', url, 'quiniela-feed', true, true, true );
			}, 400);
		},
		render_lobby_feed : function(){
			var cachedFeed = app.fetchCacheElement('lobby-feed');
			if( cachedFeed.length && cachedFeed.timestamp )
				return app.render_lobby_feed_callback(cachedFeed, true);

			return apiRH._ajaxRequest('GET', 'api/pools/available.json', null, 'json', true, app.render_lobby_feed_callback);
		},
		render_lobby_feed_callback : function( response, cached ){

			var cached 	 = (cached) ? cached : false;
			var template = Handlebars.templates['lobby-feed'];
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			app.stackCacheElement('lobby-feed', response, cached);
			app.data_temp	= app.gatherEnvironment( response, "Lobby feed" );
			app.data_temp.selected_lobby = true;
			app.data_temp.data.pools 	 = app.sort_pool();
			if(typeof cached === 'undefined' || !cached){
				app.data_temp.data.pools_unfiltered = app.data_temp.data.pools;
			}

			$('#insertFeed').html( template(app.data_temp) )
							.css({ "opacity": 0, "display": "block"})
							.velocity({ opacity: 1 }, 220);
			return setTimeout( function(){ initHooks(); initCountdownTimers(); $('#filterComponent').velocity('fadeIn'); initFilterActions(); app.hideLoader(); }, 100);
		},
		render_myfeed_sidebar : function(){
			return apiRH._ajaxRequest('GET', 'api/users/pools.json', null, 'json', true, app.render_myfeed_callback);
		},
		render_myfeed_callback : function(response){
	
			var data = app.gatherEnvironment(response, "My Lobby");
			var template = Handlebars.templates['my-lobby'];
			if(!template){
				console.log("Template doesn't exist");
				return false;
			}
			$('#misQuinielas').html( template(data) ).css({ "opacity": 0, "display": "block"})
													 .velocity(	{ opacity: 1 }, 220);
			return;
		},
		render_detail : function(response){

			extra_data = (response.pool) ? response : [];

			if(typeof extra_data.pool === 'undefined'){
				if(typeof _cache.pool.sport !== 'undefined' && typeof _cache.pool.sport.allow_ties !== 'undefined')
					window.sport_allow_ties = _cache.pool.sport.allow_ties;
			}else{
				if(typeof extra_data.pool.sport !== 'undefined' && typeof extra_data.pool.sport.allow_ties !== 'undefined')
						window.sport_allow_ties = extra_data.pool.sport.allow_ties;
			}

			app.data_temp = app.gatherEnvironment(extra_data, "Detail");
			window._cache['entry_id'] = dynamic_params.extra;
			if(app.data_temp.data.tiebreakers){
				app.data_temp.data.tiebreakers_iter = [];
				for (var key in app.data_temp.data.tiebreakers) {
				   	if (app.data_temp.data.tiebreakers.hasOwnProperty(key)) {
				      	app.data_temp.data.tiebreakers_iter.push(app.data_temp.data.tiebreakers[key]);
				   	}
				}
				window._cache['tiebreakers_iter'] = app.data_temp.data.tiebreakers_iter;
				window._cache['pool'] 			  = app.data_temp.data.pool;
			}
			// Full view load
			var template_name = (dynamic_params.view === 'postures') 	? 'detail-quiniela-registered'	: 'detail-quiniela';
				template_name = (dynamic_params.view === 'closed'	) 	? 'detail-quiniela-closed'		: template_name;
				template_name = (dynamic_params.view === 'live'	) 		? 'detail-quiniela-live'		: template_name;
			// Partials tabs
				template_name = (dynamic_params.view === 'chat'	) 	   ? dynamic_params.view	: template_name;
				template_name = (dynamic_params.view === 'places'	)  ? dynamic_params.view	: template_name;
				template_name = (dynamic_params.view === 'prizes'	)  ? dynamic_params.view	: template_name;
				template_name = (dynamic_params.view === 'group-picks')? dynamic_params.view	: template_name;
				template_name = (dynamic_params.view === 'scoreboard') ? dynamic_params.view	: template_name;
			console.log(template_name);
			if(dynamic_params.extra)
				app.data_temp.data.entry_id = dynamic_params.extra;
			if(dynamic_params.view === 'chat' || dynamic_params.view === 'places' || dynamic_params.view === 'prizes' || dynamic_params.view === 'group-picks' || dynamic_params.view === 'scoreboard')
				return app.appendView(template_name, window._cache, '#tabContainer');

			return app.switchView(template_name, app.data_temp, '#exoskeleton', dynamic_params.url, 'quiniela-'+dynamic_params.view);
		},
		fetch_detail : function(url, object_id, view, extra){
			
			if(!app.initialized) 
				app.initialize();
			app.check_or_renderContainer();
			dynamic_params = [];
			dynamic_params.url 		= url;
			dynamic_params.object_id = object_id;
			dynamic_params.view 	= view;
			dynamic_params.extra 	= extra;
			return apiRH._ajaxRequest('GET', 'api/pools/view/'+dynamic_params.object_id+'.json', null, 'json', true, app.render_detail);
		},
		render_games : function(object_id){
			return apiRH._ajaxRequest('GET', 'api/pools/fixtures/'+object_id+'.json', null, 'json', true, app.render_games_callback);
		},
		render_games_callback : function(response){
			window._cache['fixtures'] = response;
			extra_data = (response) ? response : [];
			app.data_temp = app.gatherEnvironment(extra_data, null);
			return app.render_partial('quiniela-games', app.data_temp, '#insertPartidos');
		},
		fill_entry_picks : function(){

			var myPicks = _cache.entries.entry.picks;
			myPicks.forEach(function(element){

				var $home = $('.partido[data-id='+element.fixture_id+']').find('.local_sel');
				var $away = $('.partido[data-id='+element.fixture_id+']').find('.away_sel');
				var $tie  = $('.partido[data-id='+element.fixture_id+']').find('.empate_sel');
				if(element.pick === 'home')
					$home.trigger('click');
				if(element.pick === 'away')
					$away.trigger('click');
				if(element.pick === 'tie')
					$tie.trigger('click');

			});
			var myPropPicks = _cache.entries.entry.picks_props;
			myPropPicks.forEach(function(element){

				var $under = $('.prop[data-fixture='+element.fixture_id+']').find('.under_sel');
				var $over  = $('.prop[data-fixture='+element.fixture_id+']').find('.over_sel');

				if(element.pick === 'under')
					$under.trigger('click');
				if(element.pick === 'over')
					$over.trigger('click');

			});
			return;
		},
		render_similar_picks : function(object_id){
			return apiRH._ajaxRequest('GET', 'api/entries/similarByPool/'+object_id+'.json', null, 'json', true, app.similar_picks_callback);
		},
		similar_picks_callback : function(response){

			var extra_data = (response) ? response : [];
			app.data_temp = app.gatherEnvironment(extra_data, null);
			return app.render_partial('similar-picks', app.data_temp, '#select_copy_picks');
		},
		render_other_entries : function(entry_id){
			return apiRH._ajaxRequest('GET', 'api/entries/get/'+entry_id+'.json', null, 'json', true, app.render_other_entries_callback);
		},
		render_other_entries_callback : function(response){
			window._cache['entries'] = response;
			return app.render_partial('other-entries', response, '#lesDrops');
		},
		// render profile
		render_profile : function(url, tab){
			if(!app.initialized) 
				app.initialize();
			app.check_or_renderContainer(true);
			setTimeout(function(){
				app.showLoader();
			}, 220);
			var extra_data = null;
			window.dynamic_params = [];
			dynamic_params.profile_title = '';
			dynamic_params.template = '';
			dynamic_params.url 	= (typeof url === 'undefined') ? 'profile.html' : url;
			dynamic_params._tab = (typeof tab === 'undefined') ? 'method' : tab;
			app.data_temp = app.gatherEnvironment(null, "Perfil de usuario");
			app.data_temp.selected_profile = true;
			if(dynamic_params._tab == 'documents'){
				dynamic_params.template = 'profile-documents';
				dynamic_params.profile_title = 'Mis documentos';
				apiRH._ajaxRequest('GET', 'api/documents/index.json', null, 'json',true, app.render_profile_callback);
			}else if(tab == 'withraw'){
				dynamic_params.template = 'profile-withraw'
				dynamic_params.profile_title = 'Retirar fondos';
			}else if(tab == 'history'){
				dynamic_params.template = 'profile-history'
				dynamic_params.profile_title = 'Historial de transacciones';
				apiRH._ajaxRequest('GET', 'api/transactions/history.json', null, 'json',true, app.render_profile_callback);
			}else if(tab == 'notifications'){
				dynamic_params.template = 'profile-notifications'
				dynamic_params.profile_title = 'Centro de notificaciones';
			}else{
				dynamic_params.template = 'profile'
				dynamic_params.profile_title = 'Métodos de pago';
				console.log(dynamic_params);
				apiRH._ajaxRequest('GET', 'api/openpay_cards/index.json', null, 'json',true, app.render_profile_callback);
			}
		},
		// fetch profile
		render_profile_callback : function(response){
			app.data_temp = app.gatherEnvironment(response, dynamic_params.profile_title);
			console.log(app.data_temp);
			return app.switchView( dynamic_params.template, app.data_temp, '#exoskeleton', dynamic_params.url, 'user-profile '+dynamic_params._tab );
		},
		render_add_funds : function(url){

			if(!app.initialized) app.initialize();
			setTimeout(function(){
				app.showLoader();
			}, 420);
			var extra_data = apiRH.getRequest('api/openpay_cards/index.json', null);
			app.check_or_renderContainer();
			app.data_temp = app.gatherEnvironment(extra_data, "Agregar fondos a tu cuenta");
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
		render_entry_success : function(response){
			app.appendView('entry-success', null, '.content');
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
				console.log("Template "+modalName+" doesn't exist");
				return false;
			}

			$(appendTarget).append( modalTemplate(additional_data) )
							.velocity(	{
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

			return apiRH._ajaxRequest('GET', 'api/sports/index.json', null, 'json', true, app.filter_tournaments_callback);
		},
		filter_tournaments_callback : function( response ){

			if(!response)
				return false;
			var obj_temp = [];
			response.sports.forEach(function(element, index){
				if(element.name === 'Fútbol')
					obj_temp['futbol'] = element;
				if(element.name === 'Baseball')
					obj_temp['baseball'] = element;
			});
			app.appendView('filter-tournaments', obj_temp.futbol, '#deporte_soccer');
			app.appendView('filter-tournaments', obj_temp.baseball, '#deporte_baseball');
			$('#deporte_baseball, #deporte_soccer').hide();
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
			console.log(myFilters);
			/*** TODO Check temp data before assigning value ***/
			var myPool 	= app.data_temp.data.pools_unfiltered;
			var newPool	= [];
			
			if(typeof myFilters.real_money !== 'undefined' ){
				
				/*** min: 0-50, med: 51-250, max: 251-10000 ***/
				var min_value = (myFilters.real_money === 'min') ?  0 	: 251;
					min_value = (myFilters.real_money === 'med') ?  51 	: min_value;
				var max_value = (myFilters.real_money === 'min') ?  50 	: 10000;
					max_value = (myFilters.real_money === 'med') ? 250	: max_value;
				myPool.forEach( function(element, index){
					var entry = element.entry_fee/100;
					if( entry >= min_value && entry <= max_value )
						newPool.push( myPool[index] );
				});
			}
			if(typeof myFilters.fake_money !== 'undefined' ){
				
				/*** min: 0-50, med: 51-250, max: 251-10000 ***/
				var min_value = (myFilters.real_money === 'min') ?  0 	: 251;
					min_value = (myFilters.real_money === 'med') ?  51 	: min_value;
				var max_value = (myFilters.real_money === 'min') ?  50 	: 10000;
					max_value = (myFilters.real_money === 'med') ? 250	: max_value;
				myPool.forEach( function(element, index){
					var entry = element.entry_fee/100;
					if( entry >= min_value && entry <= max_value )
						newPool.push( myPool[index] );
				});
			}
			if(typeof myFilters.status !== 'undefined' )
				myPool.forEach( function(element, index){

					if( element.status === myFilters.status )
						newPool.push( myPool[index] );
				});

			if(typeof myFilters.sport !== 'undefined' )
				myPool.forEach( function(element, index){
					if( element.sport.id === parseInt(myFilters.sport) )
						newPool.push( myPool[index] );
				});

			if(typeof myFilters.type != 'undefined' ){
				var type_compare = (myFilters.type === 'open') ? false : true;
				myPool.forEach( function(element, index){
					if( element.limited_capacity === type_compare )
						newPool.push( myPool[index] );
				});
			}

			newPool = newPool.filter(function(){return true;});
			console.log(newPool.length);
			app.data_temp.data.pools = newPool;
			return app.render_lobby_feed_callback(app.data_temp.data, true);
		},
		fetch_prize_distribution : function(gameId){
			return apiRH._ajaxRequest('GET', 'pools/prize_distribution/'+gameId+'.json', null, 'json', true, function(response){ window._cache.prize_distribution = response; });
		},
		fetch_standings : function(gameId){
			return apiRH._ajaxRequest('GET', 'api/standings/full/'+gameId+'.json', null, 'json', true, function(response){ window._cache.full_standings = response; });
		},
		fetch_group_picks : function(gameId, weekId){
			return apiRH._ajaxRequest('GET', 'api/standings/group_picks/'+gameId+'/'+weekId+'.json', null, 'json', true, function(response){ window._cache.group_picks = response; });
		},
		render_dialog : function(title, message, options){
			return app.showLoader();
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
			$(targetSelector).velocity('fadeIn', function(){

				if(targetClass) $(targetSelector).attr('class','view').addClass(targetClass);

				if(!leNiceTransition){

					$(targetSelector).html( template(data) ).css({ "opacity": 0, "display": "block"})
															 .velocity(	{
																opacity: 1
															}, 420);
				}else{

					$(targetSelector).html( template(data) ).css("opacity", 0.7)
															 .css("display", "block")
															 // .css("margin-left", "48px")
															 .css("width", "100%")
															 .velocity(	{
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
													 .velocity(	{
																	'margin-top': 0
																}, 420, 'swing');
			return app.hideLoader();
		},
		stackCacheElement: function( element_tag, jsonData, force ){
			
			var force = ( typeof force !== 'undefined' && force === true) ? true : false;
			var stack_intent = app.keeper.getItem('cache-stack-'+element_tag);

			var stack_element 	= ( !stack_intent || stack_intent === "" ) ? null : app.keeper.getObj('cache-stack-'+element_tag);
			var object_to_push 	= { timestamp: new Date().getTime(), data: jsonData };
			
			// Element does not exist in cache
			if(!stack_element)
				return app.keeper.setItem('cache-stack-'+element_tag, JSON.stringify(object_to_push));

			var diff_stamps  = (stack_element.timestamp) 	? (new Date().getTime() - stack_element.timestamp)/1000 : 0;
			/** Stack forced or non-existing element **/
			if( diff_stamps > 4000 || force )
				return app.keeper.setItem('cache-stack-'+element_tag, JSON.stringify(object_to_push));

			return false;
		},
		// Returns element from stack or false if it doesn't exist
		fetchCacheElement: function( element_tag ){
			var stack_element = ( !app.keeper.getItem('cache-stack-'+element_tag) ) ? [] : app.keeper.getItem('cache-stack-'+element_tag);
			return ( typeof stack_element === 'undefined' || !stack_element || stack_element === '' ) ? false : stack_element;
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
