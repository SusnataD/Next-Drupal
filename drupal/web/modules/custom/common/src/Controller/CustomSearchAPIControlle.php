<?php

	/**
	 * @file
	 * Contains \Drupal\common\Controller\CustomSearchAPIControlle.
	 */

	namespace Drupal\common\Controller;
	use Drupal\Core\Controller\ControllerBase;
	use Symfony\Component\HttpFoundation\Request;
	use Symfony\Component\HttpFoundation\JsonResponse;
	use Drupal\Core\Database\Database;
	use \Drupal\node\Entity\Node;
	use Drupal\Core\Url;
	use Drupal\Core\Site\Settings;
	use Drupal\file\Entity\File;

	/**
	 * Controller routines for api routes.
	 */

    class CustomSearchAPIControlle extends ControllerBase {
        /**
         * Callback for `common/api/search.json` API POST method.
         */
        public function _search(Request $request) {           
            $authToken = \Drupal::config('common.settings')->get('authToken');

            if($authToken === \Drupal::request()->headers->get('authToken')){
                $decodeData =  base64_decode($request->getContent());
                $requestData = json_decode( $decodeData, TRUE );	

                if($requestData['search_request']){
                    $excluded_nids = [30];

                    // Use the database service to perform a custom query.
                    $query = \Drupal::database()->select('node', 'n');
                    $query->addField('n', 'nid');
                    $query->addField('nfd', 'title'); //node title	
                    $query->addField('n_body', 'body_value', 'body');	
                    $query->addField('n_alias', 'alias ', 'url');	
                    $query->leftJoin('node_field_data', 'nfd', "nfd.nid = n.nid"); //node title field
                    $query->leftJoin('node__body', 'n_body', "n_body.entity_id = n.nid");	    
                    $query->leftJoin('path_alias', 'n_alias', "n_alias.path = CONCAT('/node/', n.nid)");    

                    // Create a condition group for OR conditions.
                    $orConditionGroup = $query->orConditionGroup()
                    ->condition('nfd.title', '%' . $requestData['search_request'] . '%', 'LIKE')
                    ->condition('n_body.body_value', '%' . $requestData['search_request'] . '%', 'LIKE');

                    $query->condition($orConditionGroup);
                    $query->condition('n.type', ['blog', 'page'], 'IN');
                    $query->condition('n.nid', $excluded_nids, 'NOT IN'); // Exclude specific node IDs.
                    $query->condition('nfd.status', 1);
                    $result = $query->execute()->fetchAll();
                    
                    $response = array(
                        'status' => 200,
                        base64_encode(json_encode($result)),
                        // 'search_request' => $requestData['search_request']
                    ); 

                    return JsonResponse::create($response, $response['status']);

                } 
                else{
                    return new JsonResponse([
                        'error' => 'Invalid api request.',
                    ] , 403);
                }
            }
            else{
                return new JsonResponse([
                    'error' => 'Invalid api request.',
                ] , 403);
            }            
        }
    }


