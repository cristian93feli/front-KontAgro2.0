// ingresos.js

const API_BASE_URL = 'http://localhost:8080/'; // Ajusta si usaste otra URL/puerto

document.addEventListener('DOMContentLoaded', () => {
    cargarIngresos();
});

async function cargarIngresos() {
    const tablaBody = document.querySelector('#ingresos-table tbody');
    tablaBody.innerHTML = '<tr><td colspan="3">Cargando ingresos...</td></tr>'; // Mensaje de carga

    try {
        // Asumiendo que tienes un endpoint REST para obtener la lista de ingresos
        const response = await fetch(API_BASE_URL + 'api/ingreso/ingresos'); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ingresos = await response.json(); // La lista de objetos JSON desde Spring Boot
        console.log(ingresos);

        // Limpiar el contenido de carga
        tablaBody.innerHTML = ''; 

        if (ingresos.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="3">No hay ingresos registrados.</td></tr>';
            return;
        }

        // Mapear los datos a filas HTML
        ingresos.forEach(ingreso => {
            const row = tablaBody.insertRow();
            
            // Asegúrate de que los nombres de las propiedades (nombreActividad, fecha, valor) 
            // coincidan con las que usa tu clase Java (DTO/Entity)
            row.insertCell().textContent = ingreso.actividad.nombreActividad; 
            row.insertCell().textContent = formatearFecha(ingreso.fecha);
            row.insertCell().textContent = formatearValor(ingreso.valor);
        });

    } catch (error) {
        console.error('Error al cargar los ingresos:', error);
        tablaBody.innerHTML = `<tr><td colspan="3" style="color: red;">Error al conectar con el servidor.</td></tr>`;
    }
}

// Funciones auxiliares para formatear la salida (opcional pero recomendado)
function formatearFecha(fechaString) {
    // Implementación para convertir y formatear fechas si es necesario
    return fechaString.substring(0, 10);
}

function formatearValor(valor) {
    // Implementación para formatear el valor como moneda
    return `$ ${new Intl.NumberFormat('es-CO').format(valor)}`;
}