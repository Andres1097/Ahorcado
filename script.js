
// errado(intento)             | Funcion principal de canvas.js
// dibujarTablero(palabra)     | Funcion principal de tablero.js

// Logica de juego--------¬

var validador = true;           // Validador para evitar sobreescritura de tablero
var arregloPalabras = ["oracle","alura","latam","one"];
var letrasSecretas = [];
var letrasUsadas = [];

var tabla = document.querySelector("#tabla");       // Clase Tablero
var yaUsadas = document.querySelector(".letras");   // Clase input que presenta letras usadas
var inicio = document.querySelector(".inicio");     // Boton Inicio
var id = document.querySelectorAll(".secreto");     // Llama a todos los datos de la celda vacias

    inicio.addEventListener("click", function(){    // Inicio del juego, se desactiva una vez empieza
        if(validador) empezar();
                                                    // console.log(id[0].textContent);
    });

function empezar(){
    validador = false;

    var elegida = arregloPalabras[Math.floor(Math.random()*arregloPalabras.length)].toUpperCase();
        dibujarTablero(elegida);            // Preparo tablero del juego
    
    letrasSecretas = elegida.split("");


        console.log(tabla);                 // Mostrar tablero en consola
        console.log(letrasSecretas);        // Mostrar arreglo de la palabra


    inicio.addEventListener("keypress", function(event){
        var key = event.key;

        if(validarLetra(key)){              // Si es valido, continuo
            agregarLetraUsada(key);
        } else alert("Letra invalida");

        console.log(key);                   // Muestro letra oprimida
        console.log(validarLetra(key));     // Booleano Validador
        console.log(letrasUsadas);          // Muestro las letras agregadas cada vez que son oprimidas
        
    });

        

}

function validarLetra(letra){
    var regExp = /^[a-z\D]+$/i;                 // Expresion regular para SOLO letras
    return regExp.test(letra) && letra != " ";     // Si letra no es un numero ni espacio, envia TRUE
}

function agregarLetraUsada(letra){
    letrasUsadas.push(letra);                   // Agrego la letra verificada al arreglo de usados
    yaUsadas.value += letra + " ";              // Lo muestro en el input separados por un espacio
}