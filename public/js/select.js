document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('crear-juego-btn').addEventListener('click', function() {
        //PREGUNTAR AL PROFE
      window.location.href = "CreacióndeVideojuegos.html";
    });
  });


function handleAction(action) {
    if (action === "modificar") {
        //PREGUNTAR AL PROFE
        window.location.href = "ModificacióndeVideojuego.html";
    } else if (action === "despublicar") {
      Despublicar();
    } else if (action === "eliminar") {
      Eliminar();
    }
  }
  
  function Despublicar() {
    var txt;
    if (confirm("Atención!\n¿Está seguro que quiere despublicar este juego?")) {
      txt = "Se despublicó su juego correctamente.";
    } else {
      txt = "No se han realizado cambios a su juego.";
    }
    document.getElementById("demo").innerHTML = txt;
  }
  
  function Eliminar() {
    var txt;
    if (confirm("Atención!\n¿Está seguro que quiere eliminar este juego?")) {
      txt = "Se eliminó su juego correctamente.";
    } else {
      txt = "No se han realizado cambios a su juego.";
    }
    document.getElementById("demo").innerHTML = txt;
  }
  