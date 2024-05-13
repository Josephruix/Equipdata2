document.addEventListener('DOMContentLoaded', () => {
    
    fetch("http://localhost:3000/informacion")
      .then(response => response.json()) 
      .then(salas => {
     
        const salasContainer = document.getElementById('salas-informacion');
        
     
        salasContainer.innerHTML = '';
  
       
        salas.forEach(sala => {
          
          const salasElement = document.createElement('div');
          sala.innerHTML = `
          
            
                <div class="card-body">
                    <h5 class="card-title">Nombre: ${sala.Nombre}</h5>
                    <p class="card-text">Ubicacion: ${sala.Ubicacion}</p>
                    <p class="card-text">Capacidad de equipos: ${sala.Capacidad}</p>
                    <p class="card-text">N-Equipos en la sala: ${sala.Cantidad}</p>
                    <button  id="relacion" class="btn btn-primary">Ver Más</button>
                </div>
           
        
          `;
         
          salasContainer.appendChild(salasElement);
        });
      })
      .catch(error => {
        
        console.error('Error al obtener usuarios:', error);
      });
  });
