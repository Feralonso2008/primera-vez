//importar las preguntas y respuestas
import { preguntasYRespuestas } from "./preguntas y respuestas.js";

//variables
let preguntasSeleccionadas=[];
let puntaje = 0;

//seleccionar los elementos de DOM
const contenedorPregunta = document.querySelector('#contenedor-pregunta');
const contenedorOpciones = document.querySelector('#contenedor-opciones');
const contenedorResultado = document.querySelector('#contenedor-resultado');

//puntode entrada de programa
mostrarTemas()

function mostrarTemas(){
    contenedorResultado.innerHTML='';
contenedorPregunta.innerHTML='<h2 class="pregunta">selecciona el tema:</h2>'

Object.keys(preguntasYRespuestas).forEach((opcion)=>{
contenedorOpciones.innerHTML +=`<p class="opcion">${opcion.toUpperCase()}</p>`
})

const Opciones = contenedorOpciones.querySelectorAll(`.opcion`);

Opciones.forEach((opcion)=>{
opcion.addEventListener('click', ()=>{
    const tema =opcion.innerHTML.toLowerCase()
    seleccionarTema(tema)
})
})
}

//mostrar la primera pregunta dependiendo del tema que se ha seleccionado
function seleccionarTema(Tema){
    preguntasSeleccionadas=preguntasYRespuestas[Tema];   
    mostrarPregunta(0)
}

function mostrarPregunta(indice){
    if(indice >= preguntasSeleccionadas.length){
        mostrarResultado()
        return;
    }
    const{pregunta,respuestaCorrecta,respuestas } =preguntasSeleccionadas[indice]

    contenedorPregunta.innerHTML = `<h2 class="pregunta">${pregunta}</h2>`;
   
    mostrarOpciones(respuestas, respuestaCorrecta,indice);
}


function mostrarOpciones(respuestas, respuestaCorrecta,indice){
    contenedorOpciones.innerHTML = '';
respuestas.forEach((respuesta)=>{
    contenedorOpciones.innerHTML +=`<p class="opcion">${respuesta}</p>`;
})
const opciones = contenedorOpciones.querySelectorAll('.opcion');
opciones.forEach(opciones=>{
opciones.addEventListener(`click`, ()=>{
    //comparara lo que el usuario hizo clic con la respuesta correcta
    if(opciones.innerHTML === respuestaCorrecta){
        puntaje++;
    opciones.classList.add('correcta');
    }else{
    opciones.classList.add('incorrecta');
    }
    setTimeout(()=>{
        mostrarPregunta(indice + 1);
    },500)
        })
    })
}

function mostrarResultado(){
    contenedorPregunta.innerHTML ='';
    contenedorOpciones.innerHTML ='';
    contenedorResultado.innerHTML =`
    <h2 class="total">Has acertado ${puntaje} de ${preguntasSeleccionadas.length} preguntas</h2>
    <div class="contenedor-boton">
    <botton id="reiniciarBtn">Reiniciar</botton>
    </div>
    `

    const buttonReiniciar = contenedorResultado.querySelector('#reiniciarBtn');
    buttonReiniciar.addEventListener('click',()=>{
        puntaje=0;
        mostrarTemas();
    })
}