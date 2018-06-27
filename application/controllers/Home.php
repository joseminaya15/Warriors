<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	function __construct(){
		parent::__construct();
		$this->load->helper("url");//BORRAR CACHÉ DE LA PÁGINA
		$this->load->model('M_Datos');
		$this->output->set_header('Last-Modified:'.gmdate('D, d M Y H:i:s').'GMT');
        $this->output->set_header('Cache-Control: no-store, no-cache, must-revalidate');
        $this->output->set_header('Cache-Control: post-check=0, pre-check=0',false);
        $this->output->set_header('Pragma: no-cache');
	}

	public function index()
	{
		$this->load->view('v_home');
	}

	function register(){
		$data['error'] = EXIT_ERROR;
      	$data['msj']   = null;
		try {
			$participante   = $this->input->post('Participant');
			$breakout 	    = $this->input->post('Breakout');
			$name           = $this->input->post('Name');
			$surname 		= $this->input->post('Surname');
			$empresa 		= $this->input->post('Company');
			$pais	 		= $this->input->post('Country');
			$cargo 		    = $this->input->post('Position');
			$telefono	    = $this->input->post('Phone');
			$correo 		= $this->input->post('Email');
			$size			= $this->input->post('Shirt');
			$existe         = $this->M_Datos->existCorreo($correo);
			if(count($existe) != 0) {
				$data['msj']   = 'Correo ya registrado';
			}
			else{
				$insertParticipante = array('tipo' 	=> $participante,
								   'breakout' 	=> $breakout,
								   'name' 		=> $name,
								   'surname' 	=> $surname,
								   'company' 	=> $empresa,
								   'country' 	=> $pais,
								   'position' 	=> $cargo,
								   'phone' 	    => $telefono,
								   'email' 	    => $correo,
								   'size' 		=> $size);
				$datoInsert  = $this->M_Datos->insertarDatos($insertParticipante,'participante');
	          	$data['msj']   = $datoInsert['msj'];
	          	$data['error'] = $datoInsert['error'];
	          }
		} catch(Exception $ex) {
			$data['msj'] = $ex->getMessage();
		}
      	echo json_encode($data);
	}
	function ingresar() {
		$data['error'] = EXIT_ERROR;
        $data['msj']   = null;
         try {
			$correo   = $this->input->post('correo');
			$username = $this->M_Datos->getDatosCorreos();
			if(count($username) != 0) {
				foreach ($username as $key) {
					if ($key->email == $correo) {
						$session = array('email' => $key->email);
                        $this->session->set_userdata($session);
						$data['error'] = EXIT_SUCCESS;
					}
				}
			}
        }catch(Exception $e) {
           $data['msj'] = $e->getMessage();
        }
        echo json_encode($data);
	}
	function reserva(){
		$data['error'] = EXIT_ERROR;
      	$data['msj']   = null;
		try {
			$llegada  = implode("-", array_reverse(explode("/", $this->input->post('Llegada'))));
			$retorno  = implode("-", array_reverse(explode("/", $this->input->post('Retorno'))));
			$reserva  = $this->input->post('Reserva');
			$visita   = $this->input->post('Visita');
			$correo   = $this->session->userdata('email');
			$actualizarParticipante = array('llegada' 	=> $llegada,
							   'retorno' 	=> $retorno,
							   'reserva' 	=> $reserva,
							   'invitation' => $visita);
			$datoInsert  = $this->M_Datos->actualizarDatos($correo,'participante', $actualizarParticipante);
          	$data['msj']   = $datoInsert['msj'];
          	$data['error'] = $datoInsert['error'];
		} catch(Exception $ex) {
			$data['msj'] = $ex->getMessage();
		}
      	echo json_encode($data);
	}
}
