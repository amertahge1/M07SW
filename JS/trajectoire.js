
document.getElementById("nav_trajectoire").addEventListener('click',trajectoire);
var isStartingPosition=false;


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
    
    canvas = document.getElementById('canvas_trajectoire');
    ctx = canvas.getContext('2d');
    console.log(ctx);

    var img = new Image();
    img.src = './plan.png';
    img.onload = function () {
        ctx.drawImage(img, 0, 0); 
    } 
    

    document.getElementById("btn_tracer").addEventListener('click',tracer);
   
    document.getElementById("btn_entregistrer").addEventListener('click',enregistrerTrajectoire);
    document.getElementById("btn_effacer").addEventListener('click',effacer);

    document.getElementById("nav_creer").addEventListener('click',creer);
    document.getElementById("nav_charger").addEventListener('click',charger);

}

function tracer () {

    var x=parseInt(document.getElementById("posx").value); 
    var y=parseInt(document.getElementById("posy").value);
    

    console.log("ok");
    if(isStartingPosition==false){
        ctx.beginPath(); // Start a new path
        ctx.moveTo(x, y);
        ctx.moveTo(x-5,y-5);
        ctx.lineTo( x+5, y+5);
        ctx.lineTo( x+5, y+5);
        ctx.lineTo( x+5,y+5);
        ctx.moveTo(x+5, y-5);
        ctx.lineTo(x-5,y+5);
        ctx.moveTo(x, y);
        ctx.stroke();
        document.getElementById("afficher").innerHTML = `<div class="afficher">start ${x} ${y}</div><div class="afficher">command </div><div class="afficher">takeoff</div>`;
        isStartingPosition=true;
    }else{
        ctx.lineTo(x, y);
        ctx.lineTo(x+5,y+5);
        ctx.lineTo(x+5,y+5);
        ctx.moveTo(x+5,y-5);
        ctx.lineTo(x-5,y+5);
        ctx.stroke();
        document.getElementById("afficher").innerHTML += `<div class="afficher">go ${x} ${y} 0 50</div>`;
    }
}

function enregistrerTrajectoire(){
//    console.log("ok");
    titre=document.getElementById("titre").value
    tracer();
console.log(titre)
if (!titre)
{
    //console.log("vide");
    return alert("vide"); 
    
}
const datalist = document.getElementsByClassName("afficher");
// console.log(datalist)
let CommandJSON =`{"titre":"${titre}",
"trajectoire":{`;
for (let i=0; i < datalist.length;i++){
// console.log("loop exécuté" + i)
    CommandJSON+=`"${i}": "${datalist.item(i).innerText}",`
}
CommandJSON = CommandJSON.substring(0, CommandJSON.length - 1);
CommandJSON += "}}"
console.log(CommandJSON)

const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = this.responseText;
            console.log(reponse);
        }

 
    };

    xhttp.open("POST","http://172.20.21.202/~mertah/M07SW/rest.php/trajectoire");
    // ajouter que le "Content-Type" est du json 
    
    // xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(CommandJSON);

}





function effacer(){
    //console.log("ok");
    canvas = document.getElementById('canvas_trajectoire');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = './plan.png';
    img.onload = function () {
        ctx.drawImage(img, 0, 0); 
    } 
    


    
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