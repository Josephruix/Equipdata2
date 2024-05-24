document.addEventListener("DOMContentLoaded", function() {
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) {
        console.error('No hay información de usuario disponible');
        return;
    }

    const usuario = JSON.parse(usuarioJSON);

    if (usuario) {
        const perfilContainer = document.getElementById('Perfil');
        
        const profileName = document.createElement('h1');
        profileName.classList.add("profile-name");
        profileName.textContent = usuario.Nombre;

        const profileRole = document.createElement('p');
        profileRole.classList.add("profile-role");
        profileRole.textContent = usuario.Rol;

        perfilContainer.appendChild(profileName);
        perfilContainer.appendChild(profileRole);
    } else {
        console.error('No hay información de usuario disponible');
    }
});
