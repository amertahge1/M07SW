
document.getElementById("nav_suivi").addEventListener('click', suviAjax);
// document.getElementById("nav_suivi").addEventListener('click', recupererNombreDrone);


function suviAjax()
{
    console.log("test");
   const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("section").innerHTML=this.responseText;
           
 
        }
    };
    xhttp.open("GET", "suivi.html", true);
    xhttp.send();

    recupererNombreDrone()
}

function recupererNombreDrone()
{

    const statistique = ["nbdrone", "nbutilisateur", "nbvol"]

    statistique.forEach((nbstat) => {

        console.log("ok");
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