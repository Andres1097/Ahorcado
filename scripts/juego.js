//  Declaracion de Variables    //

var validador = true;           // Validador para evitar sobreescritura de tablero
var arregloBase = ["validar", "desarrollador"];         // Arreglo con palabras predefinidas

// En caso de que el almacenamiento interno no este vacio, se crea la variable con el contenido
if(localStorage.getItem("Almacen") != null) var arregloAlmacen = localStorage.getItem("Almacen").split(",");

// En caso de que no se haya definido aun el arregloAlmacen, el juego recibira arregloBase
var arregloJuego = arregloAlmacen || arregloBase;
var letrasSecretas = [];
var letrasUsadas = [];
var intentos = 0;

//  Declaracion de Clases e IDs //

var botonIniciar = document.querySelector(".menu--inicio");       // Boton Iniciar Juego

var palabraIngresada = document.querySelector(".menu--cuadroTexto");    // Cuadro de texto para agregar palabras
var botonConfirmar = document.querySelector(".menu--confirmacionBoton");        // Confirmacion de la palabra escrita

var letrasInvalidas = document.querySelector(".juego__contenedor__barra__invalidas--display");    // Display de letras usadas
var botonReinicio = document.querySelector(".juego__contenedor--reinicio");    // Boton Reinicio al finalizar el juego
var anuncios = document.querySelector(".juego__contenedor__anuncios");         // Bloque de anuncios de resultados finales

//  Inicio del Juego   //

botonConfirmar.onclick = agregarPalabra;

botonIniciar.addEventListener("click", function(){    // Inicio del juego, se desactiva una vez empieza
    if(validador) empezar();
});

//  Funciones Logica del Juego  //

function empezar(){
    sacarFred();
    dibujarHorca();
    validador = false;
    var elegida = arregloJuego[Math.floor(Math.random()*arregloJuego.length)].toUpperCase();

    dibujarTablero(elegida);
    letrasSecretas = elegida.split("");                 // Arreglo con la palabra secreta
    botonIniciar.addEventListener("keypress", function(event){
        reActivarTeclado();
        var codigoTecla = event.keyCode;                    // CodeChar para validar que sean solo letras
        var tecla = event.key.toUpperCase();                // Recibe la letra y seteamos en Mayuscula

        if(validarLetra(codigoTecla) && noRepiteLetra(tecla)){      // Si es valido y no repite, continuo
                agregarLetra(tecla);
                if(compararEleccion(tecla) != "") letraGanadora(compararEleccion(tecla), tecla);
                else letraPerdedora();
        }

        guionesCompletos();                 // Declara si el juego se completo con exito
    });

}

/* Funcion extra, agregar palabra al storage */
function agregarPalabra(){
    var palabra = palabraIngresada.value.toLowerCase();
    if(validarPalabraAgregada(palabra)){
        arregloJuego.push(palabra);                  // Agrego nueva palabra al arreglo base
        localStorage.setItem("Almacen", arregloJuego);    // Guardo todos los datos del arreglo en almacenamiento local
        palabraIngresada.value = "";                    // Borro lo que tenia en el input
        
        toggle(palabraIngresada, "chartreuse");
    } else {
        toggle(palabraIngresada, "red");
        
    }
}

function agregarLetra(letra){                   // Recibe la letra seleccionada
    letrasUsadas.push(letra);                   // Agrego la letra verificada al arreglo de usados
    letrasInvalidas.value += letra + " ";       // Lo muestro en el input separados por un espacio
}

/* Letras acertadas o erradas */
function letraGanadora(listaPos, letra){
    var celdas = document.querySelector(".juego__contenedor__tablero--celdas");     // Como es una clase que se crea despues de iniciar
    var secreto = celdas.childNodes;                                    // se obtiene un arreglo con todos los hijos
    for(var indiceGanador = 0; indiceGanador < listaPos.length; indiceGanador++){
        secreto[listaPos[indiceGanador]].textContent = letra;           // listaPos contiene las ubicaciones de las letras
    }                                                                   // correctas, asi que iteramos
}

function letraPerdedora(){
    intentos++;                                         // intentos totales: 9
    errado(intentos);                                   // Cada intento dibuja una parte del monigote
    if(intentos == 9) anuncioResultadoFinal(false);     // Cuando se alcanza el limite de intentos se finaliza
}

function anuncioResultadoFinal(fin){
    var span = document.createElement("span");

    if(fin){                         // si es true, ganó, en caso contrario, perdio
    span.classList.add("juego__contenedor__anuncios--ganador");
    span.textContent = "Ganaste, Felicidades!";
    }
    else{
    span.classList.add("juego__contenedor__anuncios--perdedor");
    span.textContent = "Fin del Juego";
    }
    anuncios.appendChild(span);         // Agrego el nuevo nodo al bloque de anuncio

    botonIniciar.disabled = true;       // Evita continuar o sobreescribir el tablero al iniciar un nuevo juego
}

//      Comparaciones    //

function compararEleccion(letra){                           // Devuelve un arreglo con las posiciones donde se encuentra la letra
    var arregloPos = [];
    var indice = letrasSecretas.indexOf(letra);             // Busca en la palabra secreta, si esta la letra

    while (indice != -1) {                                  // El bucle continua hasta que encuentre un espacio (-1)
        arregloPos.push(indice);                            // Agregamos las posiciones en un arreglo
        indice = letrasSecretas.indexOf(letra, indice + 1); // Busca desde la ultima ubicacion
    }
    return arregloPos;
}

function guionesCompletos(){                                // Funcion que indica Fin del juego
    var celdas = document.querySelector(".juego__contenedor__tablero--celdas");    // Como es una clase que se crea despues de iniciar
    var secreto = celdas.childNodes;                        // se obtiene un arreglo con todos los hijos
    var indiceComparador = 0;

    for(var indiceCompleto = 0; indiceCompleto < letrasSecretas.length; indiceCompleto++){
        if(letrasSecretas[indiceComparador] == secreto[indiceComparador].textContent){
            indiceComparador++;                     // Cada coincidencia lo suma al contador
        }
    }
    if(indiceComparador == letrasSecretas.length){  // Cuando la cantidad de coincidencias es igual a la
        anuncioResultadoFinal(true);                // cantidad de letras se da por finalizado el juego
    }
}

//      Validaciones     //

function noRepiteLetra(letra){
    return !(letrasUsadas.includes(letra));        // Comprueba que la letra fue usada
}

function noRepitePalabra(palabra){ 
    return !(arregloJuego.includes(palabra));      // Comprueba que la palabra no haya sido usada
}

function palabraVacia(palabra){
    return palabra != "";                           // Comprueba que no este vacio
}

function validarLetra(letra){                       // Recibe codigo unicode de letra
    return letra>64 && letra<91 || letra>96 && letra<123;
}

function validarPalabraAgregada(palabra){
    var flag = true;
    if(palabraVacia(palabra) && noRepitePalabra(palabra)){
        for(var indiceValido = 0; indiceValido < palabra.length; indiceValido++){
            if(!validarLetra(palabra.charCodeAt(indiceValido))){
                flag = false;                                // En caso de encontrar discrepancias, cancela
                break;                                       // el bucle y avisa que no es valida
            }
        }
    } else flag = false;
    return flag;
}

function toggle(input, color){                  // Animacion Error/Correcto
    input.style.background = color;
    setTimeout(() => {
        input.style.background = "#fdfdfd";     // Desaparece la confirmacion despues del intervalo
    }, 2000);
}

function reActivarTeclado(){
    botonIniciar.click();
    letrasInvalidas.focus();
}

function sacarFred(){                                // Funcion Extra: Eliminacion de Protector y visualizacion del juego
    var main = document.querySelector("main");
    var footer = document.querySelector("footer");
    var juego = document.querySelector(".juego");
    
    main.style.background = "none";
    juego.style.display = "flex";
    footer.scrollIntoView({behavior: "smooth"});
}