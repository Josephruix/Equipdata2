document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-Eventos');
    const equiposContainer = document.getElementById('equipos-container');
    
    form.addEventListener('change', (event) => {
        if (event.target.id === 'relacion') {
            const salaInicial = event.target.value;
            fetch(`http://localhost:3000/consulta/${salaInicial}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los equipos relacionados con la sala');
                    }
                    return response.json();
                })
                .then(data => {
                    equiposContainer.innerHTML = '';
                    data.forEach(equipo => {
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.value = equipo.Serial;
                        checkbox.id = `equipo-${equipo.Serial}`;
                        const label = document.createElement('label');
                        label.textContent = equipo.Marca;
                        label.htmlFor = `equipo-${equipo.Serial}`;
                        equiposContainer.appendChild(checkbox);
                        equiposContainer.appendChild(label);
                        equiposContainer.appendChild(document.createElement('br'));
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });

    document.getElementById('submite').addEventListener('click', () => {
        const salaFinal = document.getElementById('final').value;
        //const equiposSeleccionados = Array.from(equiposContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
        const traecheck=document.querySelectorAll("#form-Eventos input[type='checkbox']")
        console.log(salaFinal)
        console.log(traecheck)
        if (salaFinal && equiposSeleccionados.length > 0) {
            equiposSeleccionados.forEach(equipoSerial => {
                fetch('http://localhost:3000/mover-equipo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ equipoId: equipoSerial, nuevaSala: salaFinal })
                })
                
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al mover el equipo');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.mensaje);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        } else {
            alert('Seleccione una sala final y al menos un equipo para mover.');
        }
    });
});
