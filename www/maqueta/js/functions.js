$(document).ready(function(){

	console.log('hello from functions.js');

	var ventana = $(window).height();

	$('.container').css('min-height', ventana+'px');
	$('.quiniela_registro_overlay').css('min-height', ventana+'px');

	/*** FILTROS ***/

	$('.filtros_wrapper').hide();

	$('.header_filtros').on('click', function(){
		if($('.filtros_wrapper').hasClass('filtros_show')){
			$('.filtros_wrapper').removeClass('filtros_show');
			$('.filtros_wrapper').hide();
			console.log('success');
		} else {
			$('.filtros_wrapper').addClass('filtros_show');
			$('.filtros_wrapper').show();
		}
	});

	$('.filtros ul li').on('click', function(){
		$('.filtros ul li').removeClass('selected');
		var dataFilter = $(this).attr('data');
		$(this).addClass('selected');
		console.log(dataFilter);
	});


	var positiveMargin = false;
	$('.misquinielas').on('click', function(){

	    if (!positiveMargin) {
	        var left = "0%";
	        var padd = "1%";
	        positiveMargin = true;
	    }
	    else {
	        var left = "97%";
	        var padd = "1%";
	        positiveMargin = false;
	    }
	     $('.misquinielas').animate({
	               marginLeft: left,
	               paddingLeft: padd,
	               }, {
	               duration: 500,
	               
	               complete: function () {
	               }
	             });
	 });

	
});