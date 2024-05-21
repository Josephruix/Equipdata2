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
                return response.json().then(error => { throw error; });
            }
            return response.json();
        })
        .then(data => {
            console.log('Inicio de sesión exitoso:', data);
            window.location.href="/front/Html/Salas.html"
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
