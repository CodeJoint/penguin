$(document).ready(function(){

	console.log('hello from functions.js');

	var ventana = $(window).height();

	$('.container').css('min-height', ventana+'px');

});