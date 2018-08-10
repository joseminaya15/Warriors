$(window).load(function() {
    $("#ModalSpeaker").modal('show');
});
var $win = $(window);
$win.scroll(function () {
	if ($win.scrollTop() > 45) {
		$("nav").addClass("navbarcolor");
	} else {
		$("nav").removeClass("navbarcolor");
	}
});
$('a.link[href^="#"]').click(function(e) {
 	var target = $(this).attr('href');
 	var strip = target.slice(1);
 	var anchor = $("section[id='" + strip + "']");
 	e.preventDefault();
 	y = (anchor.offset() || {
 		"top" : NaN
 	}).top;
 	$('html, body').animate({
 		scrollTop : (y - 40)
 	}, 'slow');
});
function sendInformation(){
	var participant = $('#participant').val();
	var breakout    = $('#breakout').val();
	var name 		= $('#name').val();
	var surname 	= $('#surname').val();
	var company 	= $('#company').val();
	var country 	= $('#country').val();
	var position 	= $('#position').val();
	var phone 		= $('#phone').val();
	var email 		= $('#email').val();
	var shirt 		= $('#shirt').val();
	if(participant == null || participant == '') {
		msj('error', 'Participante debe completarse');
		return;
	}
	if(breakout == null || breakout == '') {
		msj('error', 'Breakout Sessions debe completarse');
		return;
	}
	if(name == null || name == '') {
		msj('error', 'Nombre debe completarse');
		return;
	}
	if(surname == null || surname == '') {
		msj('error', 'Apellido debe completarse');
		return;
	}
	if(company == null || company == '') {
		msj('error', 'Empresa debe completarse');
		return;
	}
	if(country == null || country == '') {
		msj('error', 'País debe completarse');
		return;
	}
	if(position == null || position == '') {
		msj('error', 'Cargo debe completarse');
		return;
	}
	if(phone == null || phone == '') {
		msj('error', 'Teléfono debe completarse');
		return;
	}
	if(email == null || email == '') {
		msj('error', 'Email debe completarse');
		return;
	}
	if(shirt == null || shirt == '') {
		msj('error', 'Tall de Polo/Camisa debe completarse');
		return;
	}
	if(!validateEmail(email)){
		msj('error', 'El formato de email es incorrecto');
		return;
	}
	$.ajax({
		data : {Participant : participant,
			    Breakout    : breakout,
				Name	    : name,
				Surname	    : surname,
				Company	    : company,
				Country	    : country,
				Position    : position,
				Phone	    : phone,
				Email 	    : email,
				Shirt 	    : shirt},
		url  : 'home/register',
		type : 'POST'
	}).done(function(data){
		try {
			data = JSON.parse(data);
			if(data.error == 0){
				$('.js-input').find('input').val('');
				$('.js-input').find('select').val('0');
				$('.js-input').find('select').selectpicker('refresh');
				$('#confirmation').addClass('aparecer');
        	}else{
        		msj('error', data.msj);
        		return;
        	}
		} catch (err) {
			msj('error', err.message);
		}
	});
}
function ingresar(){
	var correo = $('#correo').val();
	if(correo == null || correo == '') {
		msj('error', 'Email debe completarse');
		return;
	}
	if(!validateEmail(correo)){
		msj('error', 'El formato de email es incorrecto');
		return;
	}
	$.ajax({
		data  : { correo : correo},
		url   : 'home/ingresar',
		type  : 'POST'
	}).done(function(data){
		try{
        	data = JSON.parse(data);
        	if(data.error == 0){
        		$('#correo').val("");
        		$('#ModalLogin').modal('show');
        	}else {
				msj('error', 'Email no registrado');
        		return;
        	}
      } catch (err){
        msj('error',err.message);
      }
	});
}
function sendReserva(){
	var llegada    = $('#llegada').val();
	var retorno    = $('#retorno').val();
	var reserva    = $('#reserva').val();
	var invitado   = $('#invitado').is(':checked');
	var noinvitado = $('#noinvitado').is(':checked');
	var visita     = null;
	if(llegada == null || llegada == '') {
		msj('error', 'Fecha de Llegada debe completarse');
		return;
	}
	if(retorno == null || retorno == '') {
		msj('error', 'Fecha de Retorno debe completarse');
		return;
	}
	if(reserva == null || reserva == '') {
		msj('error', '#Reserva de Hotel debe completarse');
		return;
	}
	if(invitado == true){
		visita = 1;
	}else if(noinvitado == true){
		visita = 0;
	}
	$.ajax({
		data : { Llegada : llegada,
				 Retorno : retorno,
				 Reserva : reserva,
				 Visita  : visita},
		url  : 'home/reserva',
		type : 'POST'
	}).done(function(data){
		try{
			data = JSON.parse(data);
			if(data.error == 0){
				$('.js-input').find('input').val('');
				$('#ModalLogin').modal('hide');
				$('#registered').addClass('aparecer');
        		msj('success', 'Registro completado');
        	}else {
        		return;
        	}
		} catch (err){
			msj('error',err.message);
		}
	});
}
function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function verificarDatos(e) {
	if(e.keyCode === 13){
		e.preventDefault();
		ingresar();
    }
}