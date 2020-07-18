
let totalUsu=0;
let usuLis=[];
let usuA;
let lisFav=[];
let local=0;
let reg=0;
let myRequest;
let clave= "f160fc54";

function User(name, password) {
    this.name = name;
    this.password = password;
}

function updateLS(){
    localStorage.setItem("usuLis", JSON.stringify(usuLis));
    localStorage.setItem("totalUsu",new String(totalUsu));
    localStorage.setItem(usuA,JSON.stringify(lisFav));
}

function loadLS(tipo){
    if(tipo==1){
        usuLis=JSON.parse(localStorage.getItem("usuLis"));
    }else{
        lisFav=JSON.parse(localStorage.getItem(usuA));
        if(lisFav.length>0){
            for(let i=0;i<lisFav.length;i++){
                crear(lisFav[i][0],lisFav[i][1],2);
            }
        }
    }
}

window.onload=function(even){
   if (typeof(Storage) !== "undefined"){
      local=1;
      totalObj=parseInt(localStorage.getItem("totalUsu"));
      if(totalObj>0){
         loadLS(1);
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
        console.log("no esta registrado");res=0;
    }else{
        console.log("Si esta resgistrado");res=1;
    }
    usuA=nameDato;
    sessionStorage.setItem(nameDato,passwordDato);    
    mostrarBuscador();
    if(res!=0) loadLS(2);
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
       mostrar();
    })
    .catch(err=>console.log(err));
}

function mostrar(){
    
    if(myRequest!=undefined){
        
        myRequest.Search.forEach(element=>{
            if(element.Type.indexOf("m")==0){
                crear(element.Title.replace(/:/,""),element.Poster,1);
            }
            
        });
        myRequest=undefined;
    } 
}

function crear(nombre,rutaImg,tipo){
/*
        <div class="poster">
            <button>favorito</button>
           <img  class="posterImg" src="https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg" alt="">
           <samp class="mensaje">nombre</samp>
           <button>Info</button>
        </div> 
*/
    let cadena="";
    if(tipo==1){
        cadena="taquilla";
    }else{
        cadena="favorite";
    }
    const padre=document.getElementById(cadena);
    const newDiv=document.createElement("div"); 
    if(tipo==1){
        newDiv.id="poster";
    }
     
    const botInf=document.createElement("button");
    const img=document.createElement("img");
    const botFav=document.createElement("button");
    const samp=document.createElement("samp");

    newDiv.className="poster";
    img.className="posterImg";
    samp.className="mensaje";
    
    if(tipo==1){
        botFav.appendChild(document.createTextNode("favorito"));
        botFav.setAttribute("onclick","agregarFavorto(this);");
    }else{
        botFav.appendChild(document.createTextNode("Eliminar"));
        botFav.setAttribute("onclick","removeFavorto(this);");        
    }
    
    botInf.appendChild(document.createTextNode("Info"));
    img.setAttribute("src",rutaImg);
    samp.appendChild(document.createTextNode(nombre));

    padre.appendChild(newDiv);
    newDiv.insertBefore(botInf,null);
    newDiv.insertBefore(img,botInf);
    newDiv.insertBefore(botFav,img); 
    newDiv.insertBefore(samp,botFav); 
}
function agregarFavorto(add){
   const padre=add.parentNode;
   crear(padre.childNodes[0].textContent,padre.childNodes[2].getAttribute("src"),2);
   let cadena=[padre.childNodes[0].textContent,padre.childNodes[2].getAttribute("src")];
   lisFav.push(cadena);
   updateLS();
}
function removeFavorto(elim){
    let p=elim.parentNode;
    let a=elim.parentNode.parentNode;
    let cadena=[p.childNodes[0].textContent,p.childNodes[2].getAttribute("src")];
    lisFav.pop(cadena);
    a.removeChild(p);
    updateLS();
}

function nada(){
    
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
