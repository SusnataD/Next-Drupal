<?php

	/**
	 * @file
	 * Contains \Drupal\common\Controller\CustomAPIController.
	 */

	namespace Drupal\common\Controller;
	use Drupal\Core\Controller\ControllerBase;
	use Symfony\Component\HttpFoundation\Request;
	use Symfony\Component\HttpFoundation\JsonResponse;
	use Drupal\Core\Database\Database;
	use \Drupal\node\Entity\Node;
	use Drupal\Core\Url;
	use Drupal\taxonomy\Entity\Term;
	use Drupal\Core\Site\Settings;
	use Drupal\file\Entity\File;

	/**
	 * Controller routines for api routes.
	 */

    class CustomAPIController extends ControllerBase {
        /**
         * Callback for `common/api/insert-contact-us-form-details.json` API POST method.
         */
        public function _insert_contact_us_form_details(Request $request) {           
            $authToken = \Drupal::config('common.settings')->get('authToken');

            if($authToken === \Drupal::request()->headers->get('authToken')){
                $decodeData =  base64_decode($request->getContent());
                $requestData = json_decode( $decodeData, TRUE );

                 if( $requestData['fname'] 
                    && $requestData['lname'] 
                    && $requestData['emailID'] 
                    && $requestData['phoneNo'] 
                    && $requestData['gender'] 
                    && $requestData['sub'] 
                    && $requestData['msg'] 
                    && $requestData['ip_address'] 
                    && $requestData['device_type']){
                    $node = Node::create([
                        'type'        => 'contact_form_report',
                        'title'       =>  $requestData['fname']. " ".$requestData['lname'],
                        'field_first_name' => [
                            'value' => $requestData['fname'],
                        ],
                        'field_last_name' => [
                            'value' => $requestData['lname'],
                        ],               
                        'field_email' => [
                            'value' => $requestData['emailID'],
                        ],               
                        'field_mobile_no' => [
                            'value' => $requestData['phoneNo'],
                        ],               
                        'field_gender' => [
                            'value' => $requestData['gender'],
                        ],               
                        'field_subject' => [
                            'value' => $requestData['sub'],
                        ],               
                        'body' => [
                            'value' => $requestData['msg'],
                        ],               
                        'field_ip_address' => [
                            'value' => $requestData['ip_address'],
                        ],               
                        'field_device_type' => [
                            'value' => $requestData['device_type'],
                        ],               
                    ]);

                    $node->save();
                    $response = array(
                        'status' => 200,
                        'nid' => $node->id(),
                        'message' => 'Node inserted successfully.'
                    );        

                    return JsonResponse::create($response, $response['status']);
                }
                else{
                    return new JsonResponse([
                        'error' => 'Invalid api request.',
                    ] , 403);
                }                
            }else{
                return new JsonResponse([
                    'error' => 'Invalid api request.',
                ] , 403);
            }            
        }
    }


