<?php

namespace App\Controller;

header('Access-Control-Allow-Origin: *');

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Query;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SchoolsController extends AbstractController
{
    public function findAll(){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT s.id, s.name, s.street, s.created, s.updated, s.status FROM App:Schools s');
        $listSchools = $query->getResult();

        $data = [
            'status' => 404,
            'message' => 'No se encontraron registros'
        ];

        if(count($listSchools) > 0){
            $data = [
                'status' => 200,
                'message' => 'Se encontraron '.count($listSchools).' registros',
                'list' => $listSchools
            ];
        }

        return new JsonResponse($data);
    }

    public function findById($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT s.name, s.street, s.created, s.updated, s.status FROM App:Schools s WHERE s.id = :id');
        $query->setParameter(':id', $id);
        $school = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se encontro la escuela',
            'school' => $school
        ];

        return new JsonResponse($data);
    }

    public function create(Request $request){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name', null);
        $street = $request->get('street', null);
        $created = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));

        $school = new \App\Entity\Schools();

        $school->setName($name);
        $school->setStreet($street);
        $school->setCreated($created);
        $school->setStatus(1);

        $em->persist($school);
        $em->flush();

        $data = [
            'status' => 200,
            'message' => 'Se registro correctamente'
        ];

        return new JsonResponse($data);
    }

    public function update(Request $request, $id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Schools s SET s.name = :name, s.street = :street, s.updated = :updated WHERE s.id = :id');

        $name = $request->get('name', null);
        $street = $request->get('street', null);
        $updated = new \DateTime('now', new \DateTimeZone('America/Mexico_City'));

        $query->setParameter(':name', $name);
        $query->setParameter(':street', $street);
        $query->setParameter(':updated', $updated);
        $query->setParameter(':id', $id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = ['status' => 200, 'message' => 'Producto actualizado'];
        }else{
            $data = ['status' => 400, 'message' => 'Error de actualización'];
        }

        return new JsonResponse($data);
    }

    public function delete($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('UPDATE App:Schools s SET s.status = 0 WHERE s.id = :id');
        
        $query->setParameter(':id', $id);
        $school = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se inhabilito la escuela',
            'school' => $school
        ];

        return new JsonResponse($data);
    }
}
