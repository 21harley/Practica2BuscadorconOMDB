
let totalUsu=0;
let usuLis=[];
let usuA;
let local=0;
let myRequest;
let clave= "f160fc54";
function User(name, password) {
    this.name = name;
    this.password = password;
}

function updateLS(){
    localStorage.setItem("usuLis", JSON.stringify(usuLis));
    localStorage.setItem("totalUsu",new String(totalUsu));
}

function loadLS(){
    usuLis=JSON.parse(localStorage.getItem("usuLis"));
    /*
    usuLis.forEach(element => {
        //crear(element); son los obj html
    });
    */
}

window.onload=function(even){
   if (typeof(Storage) !== "undefined"){
      local=1;
      totalObj=parseInt(localStorage.getItem("totalUsu"));
      if(totalObj>0){
         loadLS();
      }else{
          localStorage.setItem("totalUsu","0");totalUsu=0;
      }
   }else{
     local=0;
   }
}

function creaty(name,password){
    let agregar=new User(name,password); usuLis.push(agregar);
}

function addUsu(){
    const name=document.getElementById("name");
    const password=document.getElementById("password");

    const nameDato=name.value;
    const passwordDato=password.value;
    name.value=""; password.value="";

    const registry=document.getElementById("registro");
    registry.style.display="none";

    const seeker=document.getElementById("buscador");
    seeker.style.display="grid";
   
    let cont=0;
    if(usuLis.length>0){
        usuLis.forEach(element=> {
            if(element.name==nameDato&&element.password==passwordDato) cont++;
        });
    }
   
    if(cont==0){
        creaty(nameDato,passwordDato);
        totalUsu++;
        updateLS();
        console.log("no esta registrado");
    }else{
        console.log("Si esta resgistrado");
    }
    usuA=nameDato;
    sessionStorage.setItem(new String(nameDato),new String(passwordDato));    
    mostrarBuscador();
    return false;
}

function mostrarBuscador(){
    const content=document.getElementById("content");
    content.style.alignItems="center";
    content.style.flexDirection="column";
    content.style.justifyContent="flex-start";
}

function buscar(){
    let poster=document.getElementById("taquilla").querySelectorAll("div.poster");
    if(poster.length>0){
        for(let i=0;i<poster.length;i++){
            let p=poster[i].parentNode;
            p.removeChild(poster[i]);
        }
    }

    
    const name='https://www.omdbapi.com/?s=';
    let bus=new String(document.getElementById("name1").value);
    let token=bus.split(" "),cont=0;bus="";
    token.forEach(element => {
       if(cont==0||token.length==cont+1){
           bus+=element;
       }else{
           bus+="+"+element+"+";
       }
       cont++;   
    });
    const http=name+bus+"&apikey=f160fc54";
    fetch(http).then(response=>response.json())
    .then(data =>{
       myRequest=data;
    })
    .catch(err=>console.log(err));
    setTimeout(mostrar,500);
}

function mostrar(){
    setTimeout(mostrar,500);
    if(myRequest.Response.indexOf("T")==0){
        
        myRequest.Search.forEach(element=>{
            if(element.Type.indexOf("m")==0){
                crear(element.Title.replace(/:/,""),element.Year,element.Poster);
            }
            
        });
        
    }
}
function buscarInformacion(nombre){
    let info=null,nombre1="";
    for(let i=0;i<nombre.length;i++){
        if(nombre[i]===" "){
            nombre1+="+";
        }else{
            nombre1+=nombre[i];
        }
    }
    const http='https://www.omdbapi.com/?t='+nombre1+"&apikey=f160fc54";
    console.log(http);
    fetch(http).then(response=>response.json())
    .then(data =>{
       info=data;
    })
    .catch(err=>console.log(err));
}
function crear(nombre,año,rutaImg){
/*
        <div class="poster">
            <button>favorito</button>
           <img  class="posterImg" src="https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg" alt="">
           <samp>Avengers: Infinity War</samp>
           <samp>2018</samp>
           <button>Info</button>
        </div> 
*/
    const padre=document.getElementById("taquilla");
    const newDiv=document.createElement("div"); newDiv.id="poster";
    const botInf=document.createElement("button");
    const img=document.createElement("img");
    const botFav=document.createElement("button");

    newDiv.className="poster";
    img.className="posterImg";

    botFav.appendChild(document.createTextNode("favorito"));
    botInf.appendChild(document.createTextNode("Info"));
    img.setAttribute("src",rutaImg);
    
    padre.appendChild(newDiv);
    newDiv.insertBefore(botInf,null);
    newDiv.insertBefore(img,botInf);
    newDiv.insertBefore(botFav,img);  
}
function nada(){

}
