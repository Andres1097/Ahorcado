var pantalla = document.querySelector(".juego--ahorcado");
var pincel = pantalla.getContext("2d");

pincel.lineWidth = 3;

function dibujarHorca(){
    pincel.beginPath();
    pincel.moveTo(20, 380);

    pincel.lineTo(40, 350);
    pincel.lineTo(60, 380);
    pincel.lineTo(20, 380);

    pincel.stroke();
}
    
function errado(intento){       // Funcion con un "Selector" en base a la opcion que enviemos
    switch (intento){
        case 1: lineaFallo(40, 350, 40, 40, false); break;     // Poste
        case 2: lineaFallo(40, 40, 150, 40, false); break;     // Techo
        case 3: lineaFallo(150, 40, 150, 80, false); break;     // Soporte
        case 4: lineaFallo(150, 110, 0, 0, true); break;          // Cabeza
        case 5: lineaFallo(150, 140, 150, 225, false); break;     // Cuerpo
        case 6: lineaFallo(150, 225, 120, 280, false); break;     // Pierna Izquierda
        case 7: lineaFallo(150, 225, 180, 280, false); break;     // Pierna Derecha
        case 8: lineaFallo(150, 150, 120, 190, false); break;     // Brazo Izquierdo
        case 9: lineaFallo(150, 150, 180, 190, false); break;     // Brazo Derecho
        default: break;
    }
}

function lineaFallo(inicioX, inicioY, finX, finY, cabeza){

    pincel.beginPath();

    if(cabeza) pincel.arc(inicioX, inicioY, 30, 0, 2*3.14);
    else {
    pincel.moveTo(inicioX, inicioY);
    pincel.lineTo(finX, finY);
    }

    pincel.stroke();

}