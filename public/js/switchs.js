// Seleccionamos todos los botones de "Más información"
const infoButtons = document.querySelectorAll('button');

// Seleccionamos el body para luego agregar un modal
const body = document.querySelector('body');

// Información adicional para cada consola
const consolasInfo = [
  {
    title: "Nintendo Switch - Modelo OLED",
    description: "La nueva Nintendo Switch OLED te ofrece una pantalla vibrante, mejor calidad de sonido, y 64GB de almacenamiento.",
  },
  {
    title: "Nintendo Switch Lite",
    description: "Ideal para los jugadores que prefieren jugar en modo portátil. La Nintendo Switch Lite es más ligera y compacta.",
  },
  {
    title: "Nintendo Switch",
    description: "La consola más versátil. Juega en casa conectándola al televisor o llévala contigo a donde vayas.",
  }
];

// Función para abrir el modal con más información
function openModal(index) {
  const modalContent = `
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2>${consolasInfo[index].title}</h2>
        <p>${consolasInfo[index].description}</p>
      </div>
    </div>
  `;

  // Añadimos el modal al body
  body.insertAdjacentHTML('beforeend', modalContent);

  // Cerramos el modal al hacer clic en la "X"
  const closeModal = document.querySelector('.close-btn');
  closeModal.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.remove();
  });
}

// Añadir un evento de click a cada botón de "Más información"
infoButtons.forEach((button, index) => {
  button.addEventListener('click', () => openModal(index));
});
