document.addEventListener("DOMContentLoaded", function() {
    
console.log(document.getElementById("form"))
document.getElementById("form").addEventListener("submit", function(event) {
    console.log(document.getElementById("submit"))
    event.preventDefault();

    const usuario = document.getElementById("Correo").value;
    const Contrasena = document.getElementById("Contrasena").value;

    fetch("http://localhost:3000/verificar-usuario", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: usuario,
            Contrasena: Contrasena
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log('Inicio de sesión exitoso:', data);
       window.location.href="Salas.html"
    })
    .catch(error => {
        console.error('error:', error);
        console.log(document.getElementById("error"))
        document.getElementById('error').innerText = "Error al iniciar sesión. Verifica tus credenciales.";  
        alert(document.getElementById("error"))
    });
});
});