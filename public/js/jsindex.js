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
		msj('error', 'Name debe completarse');
		return;
	}
	if(surname == null || surname == '') {
		msj('error', 'Surname debe completarse');
		return;
	}
	if(company == null || company == '') {
		msj('error', 'Company debe completarse');
		return;
	}
	if(country == null || country == '') {
		msj('error', 'Country debe completarse');
		return;
	}
	if(position == null || position == '') {
		msj('error', 'Position debe completarse');
		return;
	}
	if(phone == null || phone == '') {
		msj('error', 'Phone debe completarse');
		return;
	}
	if(email == null || email == '') {
		msj('error', 'Email debe completarse');
		return;
	}
	if(shirt == null || shirt == '') {
		msj('error', 'Shirt debe completarse');
		return;
	}
	if(!validateEmail(email)){
		msj('error', 'El formato de email es incorrecto');
		return;
	}
	$.ajax({
		data : {Participant : participant,
			    Breakout : breakout,
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
				msj('success',data.msj);
        	}else{
        		return;
        	}
		} catch (err) {
			msj('error', err.message);
		}
	});
}
function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
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