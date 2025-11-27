// egresos.js

const API_BASE_URL = 'http://localhost:8080/'; 

document.addEventListener('DOMContentLoaded', () => {
    cargarEgresos(); // Se llama a la función de egresos
});

async function cargarEgresos() {
    // Se selecciona la tabla de egresos
    const tablaBody = document.querySelector('#egresos-table tbody'); 
    tablaBody.innerHTML = '<tr><td colspan="3">Cargando egresos...</td></tr>'; 

    try {
        // CAMBIO CLAVE: Usar el endpoint de egresos
        const response = await fetch(API_BASE_URL + 'api/egreso/egresos'); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const egresos = await response.json(); 
        
        tablaBody.innerHTML = ''; 

        if (egresos.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="3">No hay egresos registrados.</td></tr>';
            return;
        }

        egresos.forEach(egreso => {
            const row = tablaBody.insertRow();
            
            // Asumiendo las mismas propiedades que en ingresos:
            row.insertCell().textContent = egreso.actividad.nombreActividad; 
            row.insertCell().textContent = formatearFecha(egreso.fecha);
            row.insertCell().textContent = formatearValor(egreso.valor);
        });

    } catch (error) {
        console.error('Error al cargar los egresos:', error);
        tablaBody.innerHTML = `<tr><td colspan="3" style="color: red;">Error al conectar con el servidor.</td></tr>`;
    }
}

function formatearFecha(fechaString) {
    return fechaString.substring(0, 10);
}

function formatearValor(valor) {
    return `$ ${new Intl.NumberFormat('es-CO').format(valor)}`;
}