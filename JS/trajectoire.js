
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
                ctx.beginPath(); // Start a new path
                ctx.moveTo(30, 50); // Move the pen to (30, 50)
                ctx.lineTo(150, 100); // Draw a line to (150, 100)
                ctx.stroke(); // Render the path
                ctx.moveTo(50, 30); // Move the pen to (30, 50)
        ctx.lineTo(100, 150); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
        }

        
        document.getElementById("nav_creer").addEventListener('click',creer);
        document.getElementById("nav_charger").addEventListener('click',charger);
     }
    }
xhttp.open("GET", "trajectoire.html", true);
xhttp.send();
}

function creer()
{

    
   document.getElementById("liste_trajectoire").style.display="none";
   document.getElementById("afficher_form").style.display="block";
}

function charger()
{

    document.getElementById("afficher_form").style.display="none";
    document.getElementById("liste_trajectoire").style.display="block"; 
}