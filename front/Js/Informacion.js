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
                data.forEach(datos => {
                    const nuevoDiv = document.createElement('div');
                    nuevoDiv.classList.add('card', 'col-md-4');
                    if (datos.img) {
                        
                        nuevoDiv.innerHTML = `
                        <img src="data:image/jpeg;base64,${datos.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${datos.Marca}</h5>
                            <p class="card-text">${datos.Serial}</p>
                            <button class="btn btn-primary ver-mas">Ver más</button>
                            <div class="contenido-adicional" style="display: none;">
                                <p>${datos.Descripcion}</p>
                                <p>${datos.Empresa}</p>
                                <p>${datos.Estado}</p>
                                <p>${datos.Tipo_de_Equipo}</p>
                            </div>
                        `;


                    } else {
                        nuevoDiv.innerHTML = `
                         <div class="card-body">
                            <h5 class="card-title">${datos.Marca}</h5>
                            <p class="card-text">${datos.Serial}</p>
                            <button class="btn btn-primary ver-mas">Ver más</button>
                            <div class="contenido-adicional" style="display: none;">
                                <p>${datos.Descripcion}</p>
                                <p>${datos.Empresa}</p>
                                <p>${datos.Estado}</p>
                                <p>${datos.Tipo_de_Equipo}</p>
                            </div>
                        `;
                    }
                    /*nuevoDiv.innerHTML = `
                        <img src="data:image/jpeg;base64,${datos.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${datos.Marca}</h5>
                            <p class="card-text">${datos.Serial}</p>
                            <button class="btn btn-primary ver-mas">Ver más</button>
                            <div class="contenido-adicional" style="display: none;">
                                <p>${datos.Descripcion}</p>
                                <p>${datos.Empresa}</p>
                                <p>${datos.Estado}</p>
                                <p>${datos.Tipo_de_Equipo}</p>
                            </div>
                        `;*/
                    equiposContainer.appendChild(nuevoDiv);
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