//  Declaracion de Variables    //

var validador = true;           // Validador para evitar sobreescritura de tablero
var arregloPalabras = ["programacion", "validar", "vacaciones", "desarrollador"];
var letrasSecretas = [];
var letrasUsadas = [];
var intentos = 0;

//  Declaracion de Clases e IDs //

var storage = window.localStorage;      // Almacenamiento local

var yaUsadas = document.querySelector(".letras");   // Clase input que presenta letras usadas
var inicio = document.querySelector(".inicio");     // Boton Inicio
var reinicio = document.querySelector("#reinicio"); // Boton reinicio
var fin = document.querySelector("#fin");           // Boton auxiliar para scroll
var palabraIngresada = document.querySelector("#texto");   // Cuadro para agregar Palabras
var boton = document.querySelector("#confirmar");       // Boton Confirmar
var listo = document.querySelector("#agregado");        // Confirmacion de Agregado

//  Inicio del Juego   //

dibujarHorca();

    boton.onclick = agregarPalabra;

    inicio.addEventListener("click", function(){    // Inicio del juego, se desactiva una vez empieza
        if(validador) empezar();
    });

//  Funciones Logica del Juego  //

function empezar(){
    validador = false;
    fin.scrollIntoView({behavior: "smooth"});
    
    var elegida = arregloPalabras[Math.floor(Math.random()*arregloPalabras.length)].toUpperCase();
        dibujarTablero(elegida);
        letrasSecretas = elegida.split("");                 // Arreglo con la palabra secreta

    inicio.addEventListener("keypress", function(event){
        var codigoTecla = event.keyCode;                    // CodeChar para validar que sean solo letras
        var tecla = event.key.toUpperCase();                // Recibe la letra y seteamos en Mayuscula

        if(validarLetra(codigoTecla) && !noRepetir(tecla)){              // Si es valido, continuo
                agregarLetra(tecla);
                if(compararEleccion(tecla) != "") letraGanadora(compararEleccion(tecla), tecla);
                else letraPerdedora();
        } else alert("Letra invalida");
        guionesCompletos();                 // Declara si el juego se completo con exito
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
    finG();         // Cartel Ganaste!
    finalizar();
}

function perdedor(){
    finP();         // Cartel Perdiste!
    finalizar();
}

function finalizar(){
    inicio.disabled = true;                 // Deshabilita el boton para finalizar el juego
    reinicio.classList.remove("invisible"); // Aparece el boton de reinicio
}

function agregarPalabra(){
    var palabra = palabraIngresada.value;
    if(!validarTexto(palabra)){
        arregloPalabras.push(palabra);              // Agrego nueva palabra al arreglo base
        storage.setItem(arregloPalabras, palabra);  // Guardo todos los datos del arreglo en almacenamiento
        palabraIngresada.value = "";
        listo.classList.remove("invisible");
        setInterval(() => {
            listo.classList.add("invisible");       // Desaparece la confirmacion despues del intervalo
        }, 2000);
    } else alert("Palabra invalida");
}

function validarTexto(palabra){
    var flag = false
    for(var indiceValido = 0; indiceValido < palabra.length; indiceValido++){
        if(!validarLetra(palabra.charCodeAt(indiceValido))){
            flag = true;                                // En caso de encontrar discrepancias, cancela
            break;                                      // el bucle y avisa que no es valida
        }
    }
    return flag;
}