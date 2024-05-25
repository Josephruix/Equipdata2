document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-Salas').addEventListener('submit', function(event) {
        event.preventDefault();

        
        var Nombre = document.getElementById('N-sala').value;
        var Ubicacion = document.getElementById('Ubicacion').value;
        var PuertosR = document.getElementById('N-R').value;
    
        var CapacidadE = document.getElementById('C-Equipos').value;
        var SalaE = document.getElementById('Sala-E').value;

    
        var datos = {
            Nombre: Nombre,
            Ubicacion: Ubicacion,
            PuertosR: PuertosR,
            CapacidadE: CapacidadE,
            SalaE: SalaE
        };

        
        fetch('http://localhost:3000/G-Salas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            document.getElementById('success-message').innerText = "Se agrego la nueva Sala";
            window.location.href = `/front/html/nuevoequipo.html`;
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.mensaje) {
                document.getElementById('error').innerText = error.mensaje;
            } else {
                document.getElementById('error').innerText = "Error de conexión. Por favor, intenta de nuevo más tarde.";
            }
            
        });
    });
});
