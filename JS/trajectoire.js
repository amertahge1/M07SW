
document.getElementById("nav_trajectoire").addEventListener('click',trajectoire);

function trajectoire()
{
    //document.getElementById("nav_trajectoire").addEventListener('click',trajectoire);
    console.log("trajectoire");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           //document.getElementById("section").innerHTML=this.responseText;
            let pagehtml=document.getElementById('section');
            pagehtml.innerHTML=this.response;
            afficherplan();
        }
    }
  

    xhttp.open("GET", "trajectoire.html", true);
    xhttp.send();
    

}


function afficherplan()
{ 
    
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           //document.getElementById("section").innerHTML=this.responseText;
            let pagehtml=document.getElementById('section');
            pagehtml.innerHTML=this.response;

   
            canvas = document.getElementById('canvas_trajectoire');
            ctx = canvas.getContext('2d');
            console.log(ctx);
           
            var img = new Image();
            img.src = './plan.png';
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
        }

     }
    }
xhttp.open("GET", "trajectoire.html", true);
xhttp.send();
}