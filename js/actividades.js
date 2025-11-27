// actividades.js

const API_BASE_URL = 'http://localhost:8080/'; 

document.addEventListener('DOMContentLoaded', () => {
    cargarActividades();
});

async function cargarActividades() {
    // Se selecciona la tabla de actividades
    const tablaBody = document.querySelector('#actividades-table tbody'); 
    tablaBody.innerHTML = '<tr><td colspan="3">Cargando actividades...</td></tr>'; 

    try {
        // CAMBIO CLAVE: Usar el endpoint de actividades
        const response = await fetch(API_BASE_URL + 'api/actividad/actividades'); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const actividades = await response.json(); 
        
        tablaBody.innerHTML = ''; 

        if (actividades.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="3">No hay actividades registradas.</td></tr>';
            return;
        }

        actividades.forEach(actividad => {
            const row = tablaBody.insertRow();
            
            // Asumiendo propiedades: nombre, tipo, estado (ajusta si tus propiedades Java son diferentes)
            row.insertCell().textContent = actividad.idActividad; 
            row.insertCell().textContent = actividad.nombreActividad;
           
        });

    } catch (error) {
        console.error('Error al cargar las actividades:', error);
        tablaBody.innerHTML = `<tr><td colspan="3" style="color: red;">Error al conectar con el servidor.</td></tr>`;
    }
}