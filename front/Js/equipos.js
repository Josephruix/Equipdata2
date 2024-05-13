// Obtener todos los botones "Ver más"
const botonesVerMas = document.querySelectorAll('.ver-mas');

// Iterar sobre cada botón y agregar un controlador de eventos
botonesVerMas.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Obtener el contenedor de contenido adicional del botón actual
        const contenidoAdicional = boton.nextElementSibling;

        // Alternar la visibilidad del contenido adicional
        if (contenidoAdicional.style.display === 'none') {
            contenidoAdicional.style.display = 'block';
            boton.textContent = 'Ver menos'; // Cambiar el texto del botón a "Ver menos"
        } else {
            contenidoAdicional.style.display = 'none';
            boton.textContent = 'Ver más'; // Cambiar el texto del botón a "Ver más"
        }
    });
});
