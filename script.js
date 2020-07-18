
let totalUsu=0;
let usuLis=[];
let lisFav=[];
let temp=[];
let usuA;
let local=0;
let reg=0;
let myRequest;
let clave= "f160fc54";

function User(name, password) {
    this.name = name;
    this.password = password;
}

function Poster(name ,urlImg){
    this.name=name;
    this.url=urlImg;
}

window.onload=function(even){
    /*localStorage.clear();*/
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


function updateLS(){
    localStorage.setItem("usuLis", JSON.stringify(usuLis));
    localStorage.setItem("totalUsu",new String(totalUsu));
    localStorage.setItem(usuA,JSON.stringify(lisFav));
}

function loadLS(tipo){
    if(tipo==1){
        usuLis=JSON.parse(localStorage.getItem("usuLis"));
    }else if(tipo==2){
        lisFav=JSON.parse(localStorage.getItem(usuA));
        if(lisFav !== "undefined" && lisFav!=null){
            lisFav.forEach(element => {
                  if(element.name!=" "){
                    crear(element.name,element.url,2);
                  }
                    
            })
        }
    }
}

function creaty(name,password){
    let agregar=new User(name,password); usuLis.push(agregar); 
}
function creatyPos(name,url){
    let agregar=new Poster(name,url); lisFav.push(agregar); 
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
    usuA=new String(nameDato);
    if(cont==0){
        creaty(nameDato,passwordDato);
        totalUsu++;
        creatyPos(" "," ");
        updateLS();
        console.log("no esta registrado");res=0;
    }else{
        console.log("Si esta resgistrado");res=1;
    }
    sessionStorage.setItem(nameDato,passwordDato);    
    mostrarBuscador();
    loadLS(2);
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
    botInf.setAttribute("onclick","mostrarInf(this);"); 
    img.setAttribute("src",rutaImg);
    samp.appendChild(document.createTextNode(nombre));

    padre.appendChild(newDiv);
    newDiv.insertBefore(botInf,null);
    newDiv.insertBefore(img,botInf);
    newDiv.insertBefore(botFav,img); 
    newDiv.insertBefore(samp,botFav); 
}
function agregarFavorto(add){
   const padre=add.parentNode; let ban=0;
if(temp!=null){
    if(temp.length>0){
        for(let i=0;i<temp.length;i++){
            if(padre.childNodes[0].innerText.length==temp[i].name.length){
             retornoInf(add); break;
            }
        }
    }
}
if(lisFav!=null){
    if(lisFav.length>0){
        for(let i=0;i<lisFav.length;i++){
            if(padre.childNodes[0].innerText.length==lisFav[i].name.length){
             ban=1; break;
            }
        }
    }
}
   if(ban==0){
    crear(padre.childNodes[0].textContent,padre.childNodes[2].getAttribute("src"),2);
    let poster=new Poster(padre.childNodes[0].textContent,padre.childNodes[2].getAttribute("src"));
    creatyPos(poster.name,poster.url);  
    updateLS();
   }

}
function removeFavorto(elim){
    let p=elim.parentNode;
    let a=elim.parentNode.parentNode;
    let poster=new Poster(p.childNodes[0].textContent,p.childNodes[2].getAttribute("src"));
    let pos=0,ban=1;
    for(let i=0;i<lisFav.length;i++){
         if(p.childNodes[0].textContent.length==lisFav[i].name.length) {
            for(let j=0;i<lisFav[i].length;j++){
                if(p.childNodes[0].textContent[j]==lisFav[i].name[j]){
                   ban=0; break;
                }
            }
             if(ban==1) break;
         }
         pos++;
    }  
    lisFav.splice(pos,1); 
    a.removeChild(p);
    updateLS();
}

function nada(){
    
}

function mostrarInf(poster){
    let padre=poster.parentNode; 
    let mod=padre.childNodes[3],img=padre.childNodes[2];
    let info="",nombre=padre.childNodes[0].outerText,nombre1=" ";
    console.log(padre.childNodes);
    for(let i=0;i<nombre.length;i++){
        if(nombre[i]===" "){
            nombre1+="+";
        }else{
            nombre1+=nombre[i];
        }
    }
    const http='https://www.omdbapi.com/?t='+nombre1+"&apikey=f160fc54";
    fetch(http).then(response=>response.json())
    .then(data =>{
       info="Year:"+data.Year+" Prduction:"+data.Production+" Rutime:"+data.Rutime+" Director:"+data.Director+" Actors:"+data.Actors;
       console.log(info);
       let parafo=document.createElement("p");
       let cambio=document.createElement("button");
       cambio.appendChild(document.createTextNode("voltear"));
       parafo.appendChild(document.createTextNode(info));
       cambio.setAttribute("onclick","retornoInf(this);");
       let newPoster=new Poster(padre.childNodes[0].innerText,img.getAttribute("src"));
       temp.push(newPoster);
       padre.replaceChild(parafo,img);
       padre.replaceChild(cambio,mod); 
    })
    .catch(err=>console.log(err));
}

function retornoInf(poster){
    console.log(temp);
    let padre=poster.parentNode; 
    console.log(padre.childNodes);
    let urlI;
    for(let i=0;i<temp.length;i++){
       if(padre.childNodes[0].innerText.length==temp[i].name.length){
           urlI=temp[i].url;  
       }
    }
    console.log(urlI);
    let volt=padre.childNodes[3],parrafo=padre.childNodes[2];
    let img=document.createElement("img");
    let cambio=document.createElement("button");
    cambio.appendChild(document.createTextNode("info"));
    img.setAttribute("src",urlI);
    img.className="posterImg";
    cambio.setAttribute("onclick","mostrarInf(this);");
    padre.replaceChild(img,parrafo);
    padre.replaceChild(cambio,volt);
    console.log(padre.childNodes);
}