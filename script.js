/* Falta agregar comparaciones, cargarlo al tablero y retoques de animacion */


// errado(intento)             | Funcion principal de canvas.js
// dibujarTablero(palabra)     | Funcion principal de tablero.js

// Logica de juego--------¬

var validador = true;           // Validador para evitar sobreescritura de tablero
var arregloPalabras = ["oracle","alura","latam","one"];
var letrasSecretas = [];
var letrasUsadas = [];
var intentos = 0;

var tabla = document.querySelector("#tabla");       // Clase Tablero
var yaUsadas = document.querySelector(".letras");   // Clase input que presenta letras usadas
var inicio = document.querySelector(".inicio");     // Boton Inicio

    inicio.addEventListener("click", function(){    // Inicio del juego, se desactiva una vez empieza
        if(validador) empezar();
    });

function empezar(){
    validador = false;
    
    var elegida = arregloPalabras[Math.floor(Math.random()*arregloPalabras.length)].toUpperCase();
        dibujarTablero(elegida);                            // Preparo tablero del juego
        letrasSecretas = elegida.split("");                 // Arreglo con la palabra secreta

    inicio.addEventListener("keypress", function(event){
        var codigoTecla = event.keyCode;                    // CodeChar para validar que sean solo letras
        var tecla = event.key.toUpperCase();                // Recibe la letra y seteamos en Mayuscula

        if(validarLetra(codigoTecla) && !noRepetir(tecla)){              // Si es valido, continuo
                agregarLetra(tecla);
                if(compararEleccion(tecla) != "") letraGanadora(compararEleccion(tecla), tecla);
                else letraPerdedora();
        } else alert("Letra invalida");
        guionesCompletos();
    });

}

function validarLetra(letra){                       // Recibe codigo unicode de letra
    return letra>64 && letra<91 || letra>96 && letra<123;
}

function agregarLetra(letra){                   // Recibe la letra oprimida
    letrasUsadas.push(letra);                   // Agrego la letra verificada al arreglo de usados
    yaUsadas.value += letra + " ";              // Lo muestro en el input separados por un espacio
}

function noRepetir(letra){
    return letrasUsadas.includes(letra);        // Comprueba que la letra ya se haya usado
}

function compararEleccion(letra){
    var arregloPos = [];
    var indice = letrasSecretas.indexOf(letra);     // Busca en la palabra secreta, si esta la letra

    while (indice != -1) {                        // El bucle continua hasta que encuentre un espacio (-1)
        arregloPos.push(indice);                            // Agregamos las posiciones en un arreglo
        indice = letrasSecretas.indexOf(letra, indice + 1); // Busca desde la ultima ubicacion
    }
    return arregloPos;
}

function letraGanadora(listaPos, letra){
    var celdas = document.querySelector(".celdas");            // Se asignan a las funciones al ser clases
    var secreto = celdas.childNodes;                           // e hijas que se crean en el proceso
    for(var indiceGanador = 0; indiceGanador < listaPos.length; indiceGanador++){
        secreto[listaPos[indiceGanador]].textContent = letra;  // Busca en las posiciones que declaro el 
    }                                                          // comparador en su lista
}

function letraPerdedora(){
    intentos++;                 // Vidas
    errado(intentos);           // Cada intento dibuja una parte del monigote
}

function guionesCompletos(){
    var celdas = document.querySelector(".celdas");
    var secreto = celdas.childNodes;
    var indiceComparador = 0;

    for(var indiceCompleto = 0; indiceCompleto < letrasSecretas.length; indiceCompleto++){
        if(letrasSecretas[indiceComparador] == secreto[indiceComparador].textContent){
            indiceComparador++;                     // Cada coincidencia lo suma al contador
        }
    }
    if(indiceComparador == letrasSecretas.length){  // Cuando la cantidad de coincidencias es igual a la
        ganador();                                  // cantidad de letras quiere decir que esta completo
    }
}

function ganador(){
    finG();
    finalizar();
}

function perdedor(){
    finP();
    finalizar();
}

function finalizar(){
    inicio.disabled = true;                 // Deshabilita el boton para finalizar el juego
}

function reinicio(){}                       // Proximamente...