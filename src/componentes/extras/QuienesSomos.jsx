import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/quienessomos.css'; 



const QuienesSomos = () => {
  return (
    <div>

   
    <div className="container">
      <h1 className="titulo">Nintendo: Una historia de diversión en Argentina</h1>
      <p>
        Desde la década de los 80, Nintendo ha estado presente en la vida de millones de argentinos, 
        llenando hogares de alegría y risas con sus icónicos personajes y experiencias de juego inolvidables.
      </p>
      
      <div>
        <h2 className="subtitulo">Un vínculo inseparable:</h2>
        <p>
          La relación de Nintendo con Argentina es profunda y llena de momentos memorables. Desde los 
          clásicos Super Mario Bros. y Donkey Kong que cautivaron a toda una generación, hasta los 
          éxitos de la Nintendo 64 y GameCube, el entusiasmo por la marca nunca ha disminuido. La 
          llegada de la Wii revolucionó la industria del entretenimiento familiar, permitiendo a 
          jugadores de todas las edades disfrutar de experiencias interactivas sin precedentes.
        </p>
      </div>
      
      <div>
        <h2 className="subtitulo">Un presente vibrante:</h2>
        <p>
          Hoy en día, Nintendo sigue liderando la innovación con la Nintendo Switch, una consola 
          versátil que combina la experiencia del juego casero con la portabilidad de un dispositivo 
          móvil. La amplia gama de títulos, incluyendo Super Mario Odyssey, Animal Crossing: New 
          Horizons, Pokémon Sword & Shield y muchos más, garantiza que haya algo para todos.
        </p>
      </div>
      
      <div>
        <h2 className="subtitulo">Un compromiso con la comunidad:</h2>
        <p>
          Nintendo se enorgullece de su compromiso con la comunidad argentina. A través de eventos, 
          torneos y programas especiales, la marca busca fomentar la pasión por los videojuegos y el 
          espíritu de la sana competencia.
        </p>
      </div>
      
      <div>
        <h2 className="subtitulo">Un futuro brillante:</h2>
        <p>
          El futuro de Nintendo en Argentina se presenta lleno de posibilidades. Con una comunidad de 
          jugadores cada vez más apasionada y el desarrollo de nuevas tecnologías, la marca está 
          preparada para seguir creando experiencias de juego innovadoras que emocionen y diviertan 
          a todas las generaciones.
        </p>
      </div>
      
      <div>
        <h2 className="subtitulo">¡Únete a la aventura!</h2>
        <p>
          Descubre el mundo de Nintendo y revive la magia del juego. Sumérgete en aventuras llenas de 
          color, acción y diversión para toda la familia.
        </p>
        <p>
          Visita nuestro <Link to="/catalogo" className="link-catalogo">catálogo</Link> para conocer más sobre nuestras consolas, juegos y eventos.
        </p>
      </div>
      </div>

    </div>
  );
};

export default QuienesSomos;
