document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var nombre = document.getElementById('nombre').value;
    var Contrasena= document.getElementById('Contrasena').value;
    var Correo= document.getElementById('Correo').value;
    var Rol= document.getElementById('Rol').value;
    console.log(Rol)

    var datos = {
        nombre: nombre,
        Contrasena : Contrasena,
        Correo: Correo, 
        Rol: Rol
      }

      console.log(datos.Rol)


    fetch('http://localhost:3000/guardar-datos', {
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
