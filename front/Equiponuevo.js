document.getElementById('form-equipos').addEventListener('submit', function(event) {
    event.preventDefault()

    var Marca= document.getElementById('Marca').value;
    var Descripcion= document.getElementById('Descripcion').value;
    var Estado= document.getElementById('Estado').value;
    var Empresa= document.getElementById('Empresa').value;
    var Equipo= document.getElementById('Equipo').value;
    var Sala= document.getElementById('idsala').value;
    var serial= document.getElementById('serial').value;
    
    var datos = {
        Marca: Marca,
        Descripcion : Descripcion,
        Estado: Estado, 
        Empresa:Empresa,
        Equipo:Equipo,
        Sala:Sala ,
        serial:serial
      }

    


    fetch('http://localhost:3000/G-Equipos', {
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
    })
    .catch(error => {
        console.error('Error:', error)
    });
});