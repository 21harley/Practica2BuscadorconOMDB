function agregar(){
    const n=document.getElementById("name");
    const p=document.getElementById("password");

    let name=n.value;
    let passwor=p.value;
    n.value=""; p.value="";

    const resgitro=document.getElementById("registro");
    resgitro.style.display="none";

    const buscador=document.getElementById("buscador");
    buscador.style.display="block";

   

    console.log(name+" "+passwor);

    return false;
}