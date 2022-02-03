
// errado(intento)             | Funcion principal de canvas.js
// dibujarTablero(palabra)     | Funcion principal de tablero.js

// Logica de juego--------¬

var tic = 0;
var frase = "Palabra de Prueba"

var inicio = document.querySelector(".inicio");

    inicio.addEventListener("click", function(){        //Prototipo para ver si el muñeco se crea bien
        tic++;
        errado(tic);
    // inicio.onclick = 0;
    });
    
    dibujarTablero(frase.toUpperCase());
