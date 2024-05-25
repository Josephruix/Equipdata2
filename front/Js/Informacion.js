document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sala = urlParams.get('sala');

    if (sala) {
        fetch(`http://localhost:3000/consulta/${sala}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de los equipos');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos de equipos recibidos:', data);
                const equiposContainer = document.getElementById('Equipos-F');

              
                function createEquipoCard(datos) {
                    const nuevoDiv = document.createElement('div');
                    nuevoDiv.classList.add('card', 'col-md-4');
                    nuevoDiv.setAttribute('data-tipo', datos.Tipo_de_Equipo);
                    if (datos.img) {
                        nuevoDiv.innerHTML = `
                            <img src="/front/images/uno.wenp" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${datos.Marca}</h5>
                                <p class="card-text">${datos.idEquipos}</p>
                                <button class="btn btn-primary ver-mas">Ver más</button>
                                <div class="contenido-adicional" style="display: none;">
                                    <p>${datos.Descripcion}</p>
                                    <p>${datos.Empresa}</p>
                                    <p>${datos.Estado}</p>
                                    <p>${datos.Tipo_de_Equipo}</p>
                                </div>
                              <button class="btn btn-danger eliminar-equipo">Eliminar</button>
                                
                            `;
                    } else {
                        nuevoDiv.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">${datos.Marca}</h5>
                                <p class="card-text">${datos.idEquipos}</p>
                                <button class="btn btn-primary ver-mas">Ver más</button>
                                <div class="contenido-adicional" style="display: none;">
                                    <p>${datos.Descripcion}</p>
                                    <p>${datos.Empresa}</p>
                                    <p>${datos.Estado}</p>
                                    <p>${datos.Tipo_de_Equipo}</p>
                                </div>
                             <button class="btn btn-danger eliminar-equipo">Eliminar</button>
                            `;
                    }
                    equiposContainer.appendChild(nuevoDiv);
                    nuevoDiv.querySelector('.eliminar-equipo').addEventListener('click', () => {
                        const serial = datos.idEquipos;
                        eliminarEquipo(serial);
                    });
                }
                
                function eliminarEquipo(serial) {
                    fetch(`http://localhost:3000/eliminar-equipo/${serial}`, {
                        method: 'DELETE',
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al eliminar el equipo');
                        }
                        
                        const equipoCard = document.querySelector(`.card[data-serial="${serial}"]`);
                        if (equipoCard) {
                            equipoCard.remove();
                            console.log('Equipo eliminado correctamente');
                        } else {
                            console.error('El elemento a eliminar no se encontró en el DOM.');
                            alert("Equipo eliminado")
                            
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
                
            

                function filterEquiposByTipo(tipoSeleccionado) {
                    const equipos = document.querySelectorAll('.card');
                    equipos.forEach(equipo => {
                        const tipoEquipo = equipo.getAttribute('data-tipo');
                        if (tipoEquipo === tipoSeleccionado) {
                            equipo.style.display = 'block';
                        } else {
                            equipo.style.display = 'none';
                        }
                    });
                }

                const dropdownItems = document.querySelectorAll('.dropdown-item');
                dropdownItems.forEach(item => {
                    item.addEventListener('click', () => {
                        const tipoSeleccionado = item.getAttribute('data-tipo');
                        filterEquiposByTipo(tipoSeleccionado);
                    });
                });


                data.forEach(datos => {
                    createEquipoCard(datos);
                });

                const botonesVerMas = document.querySelectorAll('.ver-mas');
                botonesVerMas.forEach((boton) => {
                    boton.addEventListener('click', () => {
                        const contenidoAdicional = boton.nextElementSibling;
                        if (contenidoAdicional.style.display === 'none' || contenidoAdicional.style.display === '') {
                            contenidoAdicional.style.display = 'block';
                            boton.textContent = 'Ver menos';
                        } else {
                            contenidoAdicional.style.display = 'none';
                            boton.textContent = 'Ver más';
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.error('No se proporcionó el parámetro de la sala');
    }
});