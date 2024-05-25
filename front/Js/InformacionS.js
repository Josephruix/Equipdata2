document.addEventListener('DOMContentLoaded', () => {
    function actualizarCampanaNotificaciones(mensaje) {
        const campanaNotificaciones = document.getElementById('notificacion');
        console.log('Elemento de notificación:', campanaNotificaciones); 
        const nuevoMensaje = document.createElement('div');
        nuevoMensaje.textContent = mensaje;
        campanaNotificaciones.appendChild(nuevoMensaje);
        console.log('Mensaje añadido:', nuevoMensaje); 
    }

    fetch('http://localhost:3000/Salas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de las Salas');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de equipos recibidos:', data);
            const equiposContainer = document.getElementById('Salas');
            data.forEach(datos => {
                const nuevoli = document.createElement('li');
                nuevoli.classList.add("list-group-item");
                nuevoli.innerHTML = `
                    <div class="card" data-nombre="${datos.Nombre}">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${datos.Nombre}</h5>
                            <p class="card-text">Ubicacion: ${datos.ubicacion}</p>
                            <p class="card-text">Capacidad de equipos: ${datos.Capacidad_de_Equipos}</p>
                            <p class="card-text">N-Equipos en la sala: ${datos.Equipos_en_sala}</p>
                            <button class="btn btn-primary ver-mas" data-sala="${datos.Nombre}">Ver Más</button>
                            <button class="btn btn-danger eliminar-Salas" data-nombre="${datos.Nombre}">Eliminar</button>
                        </div>
                    </div>
                `;
                equiposContainer.appendChild(nuevoli);
                nuevoli.querySelector('.eliminar-Salas').addEventListener('click', () => {
                    const Nombre = datos.Nombre;
                    console.log('Intentando eliminar la sala:', Nombre);
                    eliminarSala(Nombre);
                });
            });

            function eliminarSala(Nombre) {
                fetch(`http://localhost:3000/eliminar-Salas/${Nombre}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar la sala');
                    }
                    actualizarCampanaNotificaciones(`Se ha eliminado la sala ${Nombre}`);
                    const SalasCard = document.querySelector(`.card[data-nombre="${Nombre}"]`);
                    if (SalasCard) {
                        SalasCard.remove();
                        alert(`se ha eliminado correctamente la sala: ${Nombre}`);
                    } else {
                        console.error('El elemento a eliminar no se encontró en el DOM.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            equiposContainer.addEventListener('click', (event) => {
                if (event.target && event.target.classList.contains('ver-mas')) {
                    const sala = event.target.getAttribute('data-sala');
                    window.location.href = `equipos.html?sala=${sala}`;
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
});
