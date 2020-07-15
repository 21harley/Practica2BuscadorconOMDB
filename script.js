
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
    seeker.style.display="block";
   
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
    const name='http://www.omdbapi.com/?s=';
    const bus=document.getElementById("name1").value;
    const http=name+bus+"&apikey=f160fc54";
    console.log(http);
    fetch(http)
    .then(response=>response.json())
    .then(data =>{
       console.log(data);
    })
    .catch(err=>console.log(err))
}

function mostrar(){
    console.log(myRequest);
}
