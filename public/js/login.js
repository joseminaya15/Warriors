function ingresar(){
	var usuario  = $('#usuario').val();
	var password = $('#password').val();
	if(usuario == null){
		msj('error', 'Ingrese un usuario');
		return;
	}
	if(password == null){
		msj('error', 'Ingrese un usuario');
		return;
	}
	$.ajax({
    data : {usuario : usuario,
            password : password},
		url  : 'login/ingresar',
		type : 'POST'
	}).done(function(data){
		try{
        data = JSON.parse(data);
        if(data.error == 0){
        	location.href = 'admin';
        	$('#usuario').val("");
        	$('#password').val("");
        }else {
  				$('#usuario').parent().addClass('is-invalid');
  				$('#password').parent().addClass('is-invalid');
          msj('error', data.msj);
        	return;
        }
      }catch(err){
        msj('error',err.message);
      }
	});
}
function cerrarCesion(){
	$.ajax({
		url  : 'admin/cerrarCesion',
		type : 'POST'
	}).done(function(data){
		try{
        data = JSON.parse(data);
        if(data.error == 0){
        	location.href = 'Login';
        }else {
        	return;
        }
      }catch(err){
        msj('error',err.message);
      }
	});
}
$("#showpass").click(function(){
	$(this).find('i').toggleClass("mdi-remove_red_eye mdi-visibility_off");
    var input = $(this).parent().find('.mdl-textfield__input');
    if (input.attr("type") == "password"){
    	input.attr("type", "text");
    }else{
      input.attr("type", "password");
    }
});
function soloLetras(e){
    key 	     = e.keyCode || e.which;
    tecla 	   = String.fromCharCode(key).toLowerCase();
    letras     = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";
    tecla_especial = false
    for(var i in especiales){
         if(key == especiales[i]){
             tecla_especial = true;
             break;
         }
     }
     if(letras.indexOf(tecla)==-1 && !tecla_especial){
         return false;
     }
 }
 function valida(e){
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8){
        return true;
    }
    patron      =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}
function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function verificarDatos(e){
	if(e.keyCode === 13){
		e.preventDefault();
		ingresar();
    }
}
function subirFactura(){
  $( "#archivo" ).trigger( "click" );
}
var factura = '';
$( "#archivo" ).change(function() {
  if(factura == undefined){
    msj('error', 'Seleccione un logo');
    return;
  }else {
  }
});
function agregarDatos(){
  var datos = new FormData();
  factura = $('#archivo')[0].files[0];
  if(factura == undefined){
    return;
  }
    datos.append('archivo',$('#archivo')[0].files[0]);
     $.ajax({
        type:"post",
        dataType:"json",
        url:"Admin/cargarFact",
        contentType:false,
        data:datos,
        processData:false,
      }).done(function(respuesta){
        msj('error', respuesta.mensaje);
        if(respuesta.mensaje == 'Su logo se subió correctamente'){
          $('#btnSubirFact').text('Cargado');
          $('#btnSubirFact').css('background-color','#5CB85C');
          $('#btnSubirFact').css('color','#FFFFFF');
        }
        $('#fecha').val("");
        $('#modelo').val("0");
        $('.selectpicker').selectpicker('refresh');
        $('#nro_factura').val("");
        $('#monto').val("");
        $('#cantidad').val("");
        setTimeout(function(){ location.href = 'Factura'; }, 2000);
    });
}
function subirEslogan(){
  var eslogan = $('#eslogan').val();
  $.ajax({
    data : {eslogan : eslogan},
    url  : 'admin/subirEslogan',
    type : 'POST'
  }).done(function(data){
    try{
        data = JSON.parse(data);
        if(data.error == 0){
          //location.href = 'Login';
          $('#eslogan').val("");
          msj('error', 'Se cambió su eslogan correctamente');
        }else {
          return;
        }
      }catch(err){
        msj('error',err.message);
      }
  });
}