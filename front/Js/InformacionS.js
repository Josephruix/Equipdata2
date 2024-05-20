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
                            <button class="btn btn-primary ver-mas" href="equipos.html">Ver Más</button>
                        </div>
                    </div>
                `;
                equiposContainer.appendChild(nuevoli);
            });

           
            equiposContainer.addEventListener('click', (event) => {
                if (event.target && event.target.classList.contains('ver-mas')) {
                    //window.location.href = "equipos.html";
                    
                    fetch('http://localhost:3000/consulta')
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                        
                }
            });
        })
        
        .catch(error => {
            console.error('Error:', error);
        });
});
