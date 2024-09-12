
document.getElementById("nav_suivi").addEventListener('click', suviAjax);


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
  
}

function recupererNombreDrone()
{

   if (document.getElementById("nav_suivi").addEventListener('click', suviAjax)) {
    
        $.ajax({
        url: 'http://172.20.21.202/~mertah/M07SW/rest.php/vol', 
        method: 'GET',
        dataType: 'json',                           
        success: function(response) {
            if(response.status == 200) {
                console.log(response.data);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            var errorMessage = 'Erreur inconnue';

            // Vérifie si la réponse est du JSON
            if (xhr.status && xhr.responseJSON && xhr.responseJSON.error) {
                errorMessage = xhr.responseJSON.error;
            } else if (xhr.status) {
                // Si la réponse n'est pas du JSON, utilise le statut HTTP
                errorMessage = "Erreur HTTP " + xhr.status + ": " + (errorThrown ? errorThrown : "Erreur inconnue");
            } else if (textStatus !== 'error') {
                // Erreur avec un texte d'état fourni par jQuery
                errorMessage = textStatus;
            } else if (errorThrown) {
                // Message d'erreur par défaut fourni par le navigateur
                errorMessage = errorThrown;
            }

            console.log(errorMessage);
        },
        complete: function() {
            console.log('Requête complétée');
        }
    });

}
}