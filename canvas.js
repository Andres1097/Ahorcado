var pantalla = document.querySelector("#ahorcado");
var pincel = pantalla.getContext("2d");

    pincel.beginPath();
    pincel.moveTo(200, 600);

    pincel.lineTo(225, 575);
    pincel.lineTo(250, 600);
    pincel.lineTo(200, 600);

    pincel.stroke();

    
function errado(intento){       // Funcion con un "Selector" en base a la opcion que enviemos
    switch (intento){
        case 1: lineaCuerpo(225, 575, 225, 300); break;
        case 2: lineaCuerpo(225, 300, 400, 300); break;
        case 3: lineaCuerpo(400, 300, 400, 330); break;
        case 4: cabeza(); break;
        case 5: lineaCuerpo(400, 390, 400, 500); break;
        case 6: lineaCuerpo(400, 500, 350, 550); break;
        case 7: lineaCuerpo(400, 500, 450, 550); break;
        case 8: lineaCuerpo(400, 410, 350, 470); break;
        case 9: lineaCuerpo(400, 410, 450, 470); finP(); break;
        default: 0; break;
    }
}

function lineaCuerpo(inicioX, inicioY, finX, finY){
    pincel.beginPath();
    pincel.moveTo(inicioX, inicioY);
    pincel.lineTo(finX, finY);
    pincel.stroke();
}

function cabeza(){
    pincel.beginPath();
    pincel.arc(400, 360, 30, 0, 2*3.14);
    pincel.stroke();
}

function finP(){
    var perdedor = document.querySelector("#perdedor");
    perdedor.classList.remove("invisible");
}

function finG(){
    var ganador = document.querySelector("#ganador");
    ganador.classList.remove("invisible");
}
