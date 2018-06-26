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
		} catch(Exception $ex) {
			$data['msj'] = $ex->getMessage();
		}
      	echo json_encode($data);
	}
}
