
document.getElementById("nav_suivi").addEventListener('click', suviAjax);
//document.getElementById("nav_connexion").addEventListener('click', suviAjax);
//document.getElementById("nav_presentation").addEventListener('click', suviAjax);
 document.getElementById("btn").addEventListener('click', suviAjax);

function suviAjax()
{
   
   const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("section").innerHTML=this.responseText;
            //document.getElementById("section2").innerHTML=this.responseText;

            recupererdonnesDrone();
           

            // clicker sur les images
           document.getElementById('donneesdrone').addEventListener('click', recupererNombreDrone );
           document.getElementById('donnesvol').addEventListener('click',recupererDonneesVols);
           document.getElementById('donnesutilisateur').addEventListener('click',recupererDonneesUtilisateurs);
        //    document.getElementsByClassName('affichergraphe').addEventListener('click',AfficherPageGraphe);
       
          
           
          
           
        }
    };
    xhttp.open("GET", "mainDrone.php", true);
    xhttp.send();

}


function AfficherPageGraphe()
{
    
    var idvol=this.getAttribute('data-idvol');
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("section").innerHTML=this.responseText;
            //document.getElementById("section2").innerHTML=this.responseText;
      
            recuperermesure(idvol);
            
           
        }
    };
    xhttp.open("GET", "graphe.html", true);
    xhttp.send();  
}


// recuperer toutes les donnes et les afficher 
function recupererdonnesDrone()
{

    const statistique = ["nbdrone", "nbutilisateur", "nbvol"]

    statistique.forEach((nbstat) => {

        
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var reponse=this.responseText;
        console.log(reponse);
        // const obj = JSON.parse(reponse);
        // console.log(obj);
        document.getElementById(nbstat).textContent=reponse;
            

             // console.log(obj[i].numero, obj[i].Etat);
              //console.log(obj[i].Etat);


        }
    }
    xhttp.open("GET", "http://172.20.21.202/~mertah/M07SW/rest.php/" + nbstat);
    xhttp.send();
    })
        
}

function recupererNombreDrone()
{

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let reponseAPI=JSON.parse(this.responseText);
        console.log(reponseAPI);
        var table="<div ><table class='tableau_statistique '><tr class='centrer'><th>Numéro drône</th><th>Marque</th><th>Modèle</th><th>Référence</th><th>Date achat</th><th>Action</th></tr>";
        for(let i=0;i<reponseAPI.length;i++){
        table+="<tr class='centrer'>";
            let donneesVol=reponseAPI[i];
            table+="<td>"+donneesVol.iddrone+"</td>";
            table+="<td>"+donneesVol.marque+"</td>";
            table+="<td>"+donneesVol.modele+"</td>";
            table+="<td>"+donneesVol.refDrone+"</td>";
            table+="<td>"+donneesVol.dateAchat+"</td>";
            table+="</tr>";
        }
        table+="</table></div>";
        document.getElementById("section").innerHTML=table;
    }
    }
    xhttp.open("GET", "http://172.20.21.202/~mertah/M07SW/rest.php/nbdrone");
    xhttp.send();
    
        
}
function DonnéesGraphe()
{
     xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      
      document.getElementById("section").innerHTML = this.responseText;         
    }
  };

  xhttp.open("GET", "graphe.html");
  xhttp.send();

}
function  recupererDonneesVols()
{

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let reponseAPI=JSON.parse(this.responseText);
        var table="<div ><table class='tableau_statistique '><tr class='centrer'><th>Vol </th><th>Utilisateur</th><th>Date</th><th>Drone</th></tr>";
        for(let i=0;i<reponseAPI.length;i++){
        table+="<tr class='centrer'>";
            let donneesVol=reponseAPI[i];
            table+="<td>"+donneesVol.idvol+"</td>";
            table+="<td>"+donneesVol.idutilisateur+"</td>";
            table+="<td>"+donneesVol.dateVol+"</td>";
            table+="<td>"+donneesVol.iddrone+"</td>";
            table+="<td><button class='affichergraphe' data-idvol='"+donneesVol.idvol+"'>Graphe</td>";
            table+="</tr>";

        }
        table+="</table></div>";
        document.getElementById("section").innerHTML=table;
        console.log(document.getElementsByClassName('affichergraphe'));
        var bouttonsgraph = document.getElementsByClassName('affichergraphe');
        for (var i = 0; i< bouttonsgraph.length; i++){
            //idvol = bouttonsgraph[i].getAttribute('data-idvol');
             bouttonsgraph[i].addEventListener('click',AfficherPageGraphe);
        }
      
    }
    }
    xhttp.open("GET", "http://172.20.21.202/~mertah/M07SW/rest.php/vol");
    xhttp.send();
    
        
}



function  recupererDonneesUtilisateurs()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let reponseAPI=JSON.parse(this.responseText);
        var table="<div ><table class='tableau_statistique '><tr class='centrer'><th>ID utilisateur</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Naissance</th><th>Pseudo</th><th>mdp</th></tr>";
        for(let i=0;i<reponseAPI.length;i++){
        table+="<tr class='centrer'>";
            let donneesVol=reponseAPI[i];
            table+="<td>"+donneesVol.idutilisateur+"</td>"; 
            table+="<td>"+donneesVol.nom+"</td>";
            table+="<td>"+donneesVol.prenom+"</td>";
            table+="<td>"+donneesVol.email+"</td>";
            table+="<td>"+donneesVol.naissance+"</td>";
            table+="<td>"+donneesVol.pseudo+"</td>";
            table+="<td>"+donneesVol.mdp+"</td>";
            table+="</tr>";
        }
        table+="</table></div>";
        document.getElementById("section").innerHTML=table;
    }
    }
 
    xhttp.open("GET", "http://172.20.21.202/~mertah/M07SW/rest.php/utilisateur");
    xhttp.send();
}

function recuperermesure(idvol) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var reponse=this.responseText;
        var jsondata = JSON.parse(reponse);
           
        var x=[];var y1=[];
        for (let i = 0; i < jsondata.length; i++){
            x[i]=jsondata[i].idetat;
            y1[i]=jsondata[i].h;
        } 

        Graph(x,y1);
        
      
      }
    };
    //let datedebut = document.getElementById("datedebut").value ;
    //let datefin = document.getElementById("datefin").value ;
    xhttp.open("GET", "http://172.20.21.202/~mertah/M07SW/rest.php/etat/"+idvol+"/h")
        //+datedebut+"/"+datefin);
    xhttp.send();
  }


    
function Graph(x,y1) {
    const ctx = document.getElementById('monGraphe');
    myChart=new Chart(ctx, {
        type: 'line',
        options: 
        {
            scales:
            {
                y1:
                {
                    type: 'linear',
                    display:true,
                    position:'left'},
                }},

        data: {
            labels: x,
            datasets: [{
                borderWidth: 1,
                borderColor: "green",
                //label: "h",
                label: 'cm',
                data: y1,
                yAxisID:"y1",
                borderColor: "purple",
                borderWidth: 1
                },]
        }
    });
    
      
}




