// Funcion principal
function dibujarTablero(palabra){
    var guion = "_";
    var rango = palabra.length;                                         // Variable con la cantidad de letras de la palabra
    var tabla = document.querySelector("#tabla");
    tabla.appendChild(construirTrPalabra("celdas", rango));    //Agregamos el conjunto de celdas a la tabla
    tabla.appendChild(construirTrGuiones("guiones", rango));    
}

function construirTrPalabra(clase, rango){
    var tr = document.createElement("tr");          // Creamos el conjunto de celdas
    tr.classList.add(clase);                        // Le agregamos una clase al conjunto
    for(var index = 0; index < rango; index++){
        tr.appendChild(construirTdPalabra(index));   // Asignamos cada celda a la clase padre
    }
    return tr;
}

function construirTrGuiones(clase, rango){
    var tr = document.createElement("tr");  
    tr.classList.add(clase);                
    var indice = 0;
        while(rango != indice){                         // Agrega celdas hasta que alcance el rango indicado
            tr.appendChild(construirTdGuiones());   // Asignamos cada celda a la clase padre
            indice++;
        }
    return tr;
}

// Diferencias de Tr? TrGuiones es un bucle que repite guiones, mientras que TrPalabra agrega cada letra en cada celda

function construirTdGuiones(){
    var td = document.createElement("td");  // Creamos una celda
    td.textContent = "_";                  // Le agregamos el contenido
    return td;
}

function construirTdPalabra(id){
    var td = document.createElement("td");  
    td.id = id;                             // Agregamos una id a la clase para recorrer
    td.classList.add("secreto");            // Clase general identificadora
    td.textContent = " ";                   // Inicialmente cada letra llevara un espacio vacio
    return td;
}

// Diferencia de Td? TdPalabra agrega una clase a cada celda asi lo identidicamos para su uso

// Proximamente optimizacion y eliminacion de codigo repetido