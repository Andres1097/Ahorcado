// Funcion principal
function dibujarTablero(palabra){
    var rango = palabra.length;                                         // Variable con la cantidad de letras de la palabra
    var tabla = document.querySelector(".juego__contenedor__tablero");
    tabla.appendChild(construirTr("juego__contenedor__tablero--celdas", rango, " "));    //Agregamos el conjunto de celdas a la tabla
    tabla.appendChild(construirTr("juego__contenedor__tablero--guiones", rango, "_")); 
}

function construirTr(clase, rango, dato){
    var tr = document.createElement("tr");  
    tr.classList.add(clase);                
    for(var index = 0; index < rango; index++){      // Agrega celdas hasta que alcance el rango indicado
        tr.appendChild(construirTd(dato));      // Asignamos cada celda a la clase padre
    }
    return tr;
}

function construirTd(dato){
    var td = document.createElement("td");  
    td.textContent = dato;                   // Inicialmente cada letra llevara un espacio vacio
    return td;
}