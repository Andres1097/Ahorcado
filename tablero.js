// Funcion principal
function dibujarTablero(palabra){
    var guion = "_";
    var rango = palabra.length;                                         // Variable con la cantidad de letras de la palabra
    var tabla = document.querySelector("#tabla");
    tabla.appendChild(construirTrPalabra("celdas", palabra, rango));    //Agregamos el conjunto de celdas a la tabla
    tabla.appendChild(construirTrGuiones("guiones", guion, rango));    
}

function construirTrPalabra(clase, palabra, rango){
    var tr = document.createElement("tr");          // Creamos el conjunto de celdas
    var arregloPalabra = palabra.split("");         // Arreglo con cada dato de palabra
    tr.classList.add(clase);                        // Le agregamos una clase al conjunto
    for(var index = 0; index < rango; index++){
        tr.appendChild(construirTdPalabra(index, arregloPalabra[index]));   // Asignamos cada celda a la clase padre
    }
    return tr;
}

function construirTrGuiones(clase, dato, rango){
    var tr = document.createElement("tr");  
    tr.classList.add(clase);                
    var indice = 0;
        while(rango != indice){                         // Agrega celdas hasta que alcance el rango indicado
            tr.appendChild(construirTdGuiones(dato));   // Asignamos cada celda a la clase padre
            indice++;
        }
    return tr;
}

// Diferencias de Tr? TrGuiones es un bucle que repite guiones, mientras que TrPalabra agrega cada letra en cada celda

function construirTdGuiones(dato){
    var td = document.createElement("td");  // Creamos una celda
    td.textContent = dato;                  // Le agregamos el contenido
    return td;
}

function construirTdPalabra(clase, dato){
    var td = document.createElement("td");  
    td.classList.add(clase);                // Agregamos la clase a la celda
    td.textContent = dato;               
    return td;
}

// Diferencia de Td? TdPalabra agrega una clase a cada celda asi lo identidicamos para su uso

// Proximamente optimizacion y eliminacion de codigo repetido