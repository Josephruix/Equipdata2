document.addEventListener('DOMContentLoaded', () => {
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
                    <div id="salas-informacion" class="card">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${datos.Nombre}</h5>
                            <p class="card-text">Ubicacion: ${datos.ubicacion}</p>
                            <p class="card-text">Capacidad de equipos: ${datos.Capacidad_de_Equipos}</p>
                            <p class="card-text">N-Equipos en la sala: ${datos.Equipos_en_sala}</p>
                            <button class="btn btn-primary ver-mas" data-sala="${datos.Nombre}">Ver Más</button>
                            <button class="btn btn-danger eliminar-Salas">Eliminar</button>
                        </div>
                    </div>
                `;
                equiposContainer.appendChild(nuevoli);
                nuevoli.querySelector('.eliminar-Salas').addEventListener('click', () => {
                    const Nombre = datos.Nombre;
                    eliminarSala(Nombre);
                }); 
            });
            function eliminarSala(Nombre) {
                fetch(`http://localhost:3000/eliminar-Salas/${Nombre}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el equipo');
                    }
            
                    const SalasCard = document.querySelector(`.card[data-Nombre="${Nombre}"]`);
                    if (SalasCardCard) {
                        SalasCardCard.remove();
                        console.log('Equipo eliminado correctamente');
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
