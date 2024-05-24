function actualizarCampanaNotificaciones(mensaje) {
    const campanaNotificaciones = document.getElementById('notificacion');
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.textContent = mensaje;
    campanaNotificaciones.appendChild(nuevoMensaje);
}