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