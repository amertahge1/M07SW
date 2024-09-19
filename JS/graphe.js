// function recuperermesure() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//         var reponse=this.responseText;
//         var jsondata = JSON.parse(reponse);
           
//         var x=[];var y1=[]; var y2=[];
//         for (let i = 0; i < jsondata.length; i++){
//             y1[i]=jsondata[i].idetat;
//             x[i]=jsondata[i].templ;
//             y2[i]=jsondata[i].temph;
//         } 
//         Graph(x,y1,y2);
        
      
//       }
//     };
//     //let datedebut = document.getElementById("datedebut").value ;
//     //let datefin = document.getElementById("datefin").value ;
//     xhttp.open("GET", "http://172.20.21.202/~mertah/M07SW/rest.php/etat/")
//         //+datedebut+"/"+datefin);
//     xhttp.send();
//   }


    
// function Graph(x,y1,y2) {
//     const ctx = document.getElementById('monGraphe');
//     myChart=new Chart(ctx, {
//         type: 'line',
//         options: 
//         {
//             scales:
//             {
//                 y1:
//                 {
//                     type: 'linear',
//                     display:true,
//                     position:'left'},

//                 y2:
//                  {
//                     type: 'linear',
//                     display:true,
//                     position:'right'}
//                 }},

//         data: {
//             labels: x,
//             datasets: [{
//                 borderWidth: 1,
//                 borderColor: "green",
//                 label: "idetat",
//                 data: y1,
//                 yAxisID:"y1",
//                 borderColor: "purple",
//                 borderWidth: 1
//                 },

//                 {
//                 label: "templ",
//                 data: y2,
//                 yAxisID:"y2",
//                 borderColor: "blue",
//                 borderWidth: 1
                
                   
//                 },]
//         }
//     });
      
// }