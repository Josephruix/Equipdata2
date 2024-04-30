document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form');
    const error = document.querySelector('.Error');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const correo = document.getElementById('Correo').value;
        const contraseña = document.getElementById('Contraseña').value;

        // Envía la solicitud al servidor para verificar el inicio de sesión
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/verificar-login');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            const response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                // Si el inicio de sesión es exitoso, redirecciona al usuario a la página de inicio
                window.location.href = '/inicio.html';
            } else {
                // Si hay un error en el inicio de sesión, muestra un mensaje de error
                error.textContent = response.mensaje;
                error.style.display = 'block';
            }
        };
        xhr.send(JSON.stringify({ correo: correo, contraseña: contraseña }));
    });
});