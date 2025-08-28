const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line_through";
let id = 0;

// FUNCION AGREGAR TAREA

function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){return} 

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : "";

    const elemento = `
                    <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id=${id}></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id=${id}></i>
                    </li>
                    `;

    lista.insertAdjacentHTML("beforeend", elemento);
}

// FUNCION DE TAREA REALIZADA

function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
}


// FUNCION DE TAREA ELIMINADA

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
}



botonEnter.addEventListener("click", ()=> {
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea, id, false, false);
    }
    input.value="";
    id++;
})


document.addEventListener("keyup", function(event){ //keyup, se suelta el teclado y para que funcione la lista al dar enter
    if(event.key == "Enter"){
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea, id, false, false);
        }
        input.value="";
        id++;
    }
})

lista.addEventListener("click", function(event){
    const element = event.target;
    const elementData = element.attributes.data.value; //investigar mas a detalle
    if(elementData === "realizado"){
        tareaRealizada(element);
    }
    else if(elementData==="eliminado"){
        tareaEliminada(element);
    }
})