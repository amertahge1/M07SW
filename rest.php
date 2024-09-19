<?php


try
{
   $pdo = new PDO('mysql:host=localhost;dbname=MW07_mertah;charset=utf8','mertah', 'amertah');     
}catch(PDOException $e)
{
        die ('Connexion : ECHEC');
}



$req_type=$_SERVER["REQUEST_METHOD"];

//on vérifie si PATH_INFO existe bien
if(isset($_SERVER['PATH_INFO']))
{
        $cheminURL=$_SERVER['PATH_INFO'];
       $cheminURL_tableau= explode("/",$cheminURL);
       
}
if ($req_type=='GET'){
                // print_r($cheminURL_tableau[1]);      
if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='nbdrone'){
        $req="SELECT COUNT(iddrone) as valeur FROM drone";
        $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $res->execute(NULL);
        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        $data_json = json_encode($data[0]);
        print_r($data[0]["valeur"]);
}


else if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='nbutilisateur'){
        $req="SELECT COUNT(idutilisateur) as valeur FROM utilisateur";
        $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $res->execute(NULL);
        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        $data_json = json_encode($data[0]);
        print_r($data[0]["valeur"]);
}


        
else if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='nbvol'){
                $req="SELECT COUNT(idvol) as valeur FROM vol";
                $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $res->execute(NULL);
                $data = $res->fetchAll(PDO::FETCH_ASSOC);
                $data_json = json_encode($data[0]);
                print_r($data[0]["valeur"]);
        }

        else if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='drone'){
                $req="SELECT * FROM drone" ;
                $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $res->execute(NULL);
                $data = $res->fetchAll(PDO::FETCH_ASSOC);
                $data_json = json_encode($data);
                print_r($data_json);
        }
        else if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='vol'){
                $req="SELECT * FROM vol" ;
                $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $res->execute(NULL);
                $data = $res->fetchAll(PDO::FETCH_ASSOC);
                $data_json = json_encode($data);
                print_r($data_json);
        }
        
        else if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='utilisateur'){
                $req="SELECT * FROM utilisateur" ;
                $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $res->execute(NULL);
                $data = $res->fetchAll(PDO::FETCH_ASSOC);
                $data_json = json_encode($data);
                print_r($data_json);
        }

        else if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='etat'){
                if(isset($cheminURL_tableau[2])){
                        if(isset($cheminURL_tableau[3])){
                        $req="SELECT idetat,h FROM etat WHERE idvol=" . $cheminURL_tableau[2] ;
                        // print_r("\n\n".$req."\n\n");
                        $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                        $res->execute(NULL);
                        $data = $res->fetchAll(PDO::FETCH_ASSOC);
                        $data_json = json_encode($data);
                        print_r($data_json);
                
                        }
                }
                }
        
        // else if(isset($cheminURL_tableau[1])&& $cheminURL_tableau[1]=='idvol'){
        //         $req="SELECT * FROM vol" ;
        //         $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        //         $res->execute(NULL);
        //         $data = $res->fetchAll(PDO::FETCH_ASSOC);
        //         $data_json = json_encode($data);
        //         print_r($data_json);
        // }
       
}



                
        


if ($req_type=='POST'){

       

        $donneesVolJSON=file_get_contents("php://input");
        $donneesVolAssoc=json_decode($donneesVolJSON,true);
        print_r($donneesVolAssoc);
        print_r($donneesVolAssoc["nom"]);
     
            $req="SELECT idutilisateur FROM  utilisateur WHERE nom=? ;";   
            $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute(array($donneesVolAssoc["nom"]));
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
            $data_json = json_encode($data);
            echo($data_json);


           if(empty($data))
           {
            echo("l'utilisateur n'existe pas");
            $req="INSERT INTO utilisateur (nom) VALUES (?);"; 
            $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $res->execute((array($donneesVolAssoc["nom"])));
            
            $userId=$pdo->lastInsertId();
          
            $data_json = json_encode($data);
            echo($userId);
        
            
          
           }
           
           else{
                echo"L'utilisateur existe - création du cookie avec son id:" .$data[0]['idutilisateur']. "\n";
                $_COOKIE['idutilisateur']=[$data[0]['idutilisateur']];
               // if(isset($_COOKIE('idutilisateur')=$reponse[0]['idutilisateur']))
               // {
                       // echo 'Votre ID est le ' .$_COOKIE['idutilisateur'];
                //}
                $userId = $data[0]['idutilisateur'];
           }
           
           

           $req="SELECT iddrone FROM  drone WHERE refDrone=(?) ;";   
           $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
           $res->execute(array($donneesVolAssoc["numero"]));
           $data = $res->fetchAll(PDO::FETCH_ASSOC);
           $data_json = json_encode($data);
           echo($data_json);

           if(empty($data))
           {
           $req1="INSERT INTO drone (marque,modele,refDrone,dateAchat) VALUES ('DJI','Tello4',?,NOW());";
           $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
           $res->execute(array($donneesVolAssoc["numero"]));
           $droneId=$pdo->lastInsertId();
           print_r($req1);  
           echo( "\n\n\n nouveau drone : " .$droneId. "\n\n\n");
        //    echo($data_json);
           }
           else{
                echo"Le drone existe - création du cookie avec son id:" .$data[0]['iddrone']. "\n";
                $_COOKIE['iddrone']=[$data[0]['iddrone']];
                $droneId = $data        [0]['iddrone'];
                echo( "\n\n\n drone existant : " .$droneId. "\n\n\n");
           }

           $time = $donneesVolAssoc['time'];
           $date= date('Y-m-d H:i:s',$time);
           $req="SELECT idvol,nom FROM vol INNER JOIN utilisateur ON vol.idutilisateur=utilisateur.idutilisateur WHERE vol.dateVol =? AND utilisateur.idutilisateur=? ; ";
           $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
           $res->execute(array($date,$userId));
           $data = $res->fetchAll(PDO::FETCH_ASSOC);
           $data_json = json_encode($data);
      
           echo("\n\n\n" . $data_json);


           if(empty($data))
           {
           $req1="INSERT INTO vol (dateVol,idutilisateur) VALUES (?,?)";
           $res=$pdo->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
           $res->execute(array($date,$userId));
           
              
           }
           
           $etatdonneesVolAssoc = $donneesVolAssoc['etats'];
// print_r($etatdonneesVolAssoc);
        foreach($etatdonneesVolAssoc as $etat)
        {
        print_r($etat);
        $pitch = $etat['pitch'];
        $roll = $etat['roll'];
        $yaw = $etat['yaw'];
        $vgx = $etat['vgx'];
        $vgy = $etat['vgy'];
        $vgz = $etat['vgz'];
        $templ = $etat['templ'];
        $temph = $etat['temph'];
        $tof = $etat['tof'];
        $h = $etat['h'];
        $bat = $etat['bat'];
        $baro = $etat['baro'];
        $time = $etat['time'];
        $agx = $etat['agx'];
        $agy = $etat['agy'];
        $agz = $etat['agz'];
        $req = "INSERT INTO etat (idvol,pitch,roll,yaw,vgx,vgy,vgz,templ,temph,tof,h,bat,baro,time,agx,agy,agz) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $reqpreparer=$BDD->prepare($req);
        $tableauDeDonnees=array($idvol,$pitch,$roll,$yaw,$vgx,$vgy,$vgz,$templ,$temph,$tof,$h,$bat,$baro,$time,$agx,$agy,$agz);
        $reqpreparer->execute($tableauDeDonnees);
        print_r("Un état a été créer\n");
        }

}



?>