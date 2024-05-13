document.addEventListener('DOMContentLoaded', () => {
    const botonesVerMas = document.getElementById('relacion');
  
    botonesVerMas.forEach(boton => {
      boton.addEventListener('click', () => {
        const salaId = boton.dataset.salaId;
        // Redirigir al usuario a la página de equipos con el ID de la sala como parámetro
        window.location.href = `/equipos?salaId=${salaId}`;
      });
    });
  });
  