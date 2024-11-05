import React, { useState } from 'react';
import '../../styles/consolas.css';
import nintendoswitch from '../imagenes/nintendoswitch.webp';
import nintendolite from '../imagenes/nintendolite.jpg';
import nintendoswitcholed from '../imagenes/nintendoswitcholed.jpg';

const Consola = ({ imagen, titulo, descripcion, info }) => {
    const [mostrarInfo, setMostrarInfo] = useState(false); 
    // Declara un estado llamado 'mostrarInfo' y una función 'setMostrarInfo' para actualizarlo. 
    // Inicialmente, 'mostrarInfo' es false, lo que significa que la información adicional no se mostrará.
    
    const handleInfoClick = () => { 
      // Define una función llamada 'handleInfoClick' que se ejecutará al hacer clic en el botón.
      setMostrarInfo(!mostrarInfo); 
      // Actualiza el estado 'mostrarInfo' a su valor opuesto (true si era false y viceversa).
      // Esto alterna la visibilidad de la información adicional.
    };
    
    return (
      <div className="consola"> 
      {/* Devuelve un contenedor <div> con una clase CSS 'consola' para aplicar estilos. */}
        <img src={imagen} alt={titulo} /> 
        {/* Muestra una imagen usando el valor de la variable 'imagen' para el src y 'titulo' como texto alternativo. */}
        <h2>{titulo}</h2> 
        {/* Muestra el título de la consola, utilizando el valor de la variable 'titulo'. */}
        <p>{descripcion}</p> 
        {/* Muestra una descripción de la consola, usando el valor de la variable 'descripcion'. */}
        <button onClick={handleInfoClick}> 
        {/* Un botón que, al hacer clic, ejecuta la función 'handleInfoClick' para alternar la información. */}
          {mostrarInfo ? "Ocultar información" : "Más información"} 
          {/* Cambia el texto del botón según el estado 'mostrarInfo':
              - Si es true, muestra "Ocultar información"
              - Si es false, muestra "Más información" */}
        </button>
        {mostrarInfo && <p className="info-adicional">{info}</p>} 
        {/* Si 'mostrarInfo' es true, se muestra un párrafo adicional 
            con la clase CSS 'info-adicional' que contiene más información 
            sobre la consola usando el valor de la variable 'info'. */}
      </div>
    );

}

const Consolas = () => {
  return (
    <div>
     <h1>Tres consolas que ofrecen muchas maneras de jugar</h1>
      <div className="consolas">
        <Consola
          imagen={nintendoswitcholed}
          titulo="Nintendo Switch - Modelo OLED"
          descripcion="Sube de nivel con una pantalla OLED que muestra colores brillantes."
          info="La nueva Nintendo Switch OLED ofrece una mejor calidad de imagen y 64GB de almacenamiento."
        />
        <Consola
          imagen={nintendolite}
          titulo="Nintendo Switch Lite"
          descripcion="Diseñada para el juego portátil."
          info="La Nintendo Switch Lite es ideal para los jugadores que prefieren jugar en modo portátil."
        />
        <Consola
          imagen={nintendoswitch}
          titulo="Nintendo Switch"
          descripcion="Juega en casa o en el camino utilizando una sola consola."
          info="La Nintendo Switch es la consola más versátil. Juega en casa conectándola al televisor o llévala contigo a donde vayas."
        />
      </div>
    </div>
  );
};

export default Consolas;

