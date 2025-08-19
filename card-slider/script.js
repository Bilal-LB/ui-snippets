const listadoTarjetas = document.querySelector('.listado-tarjetas');
const botones = document.querySelectorAll('.boton-navegacion');
const puntosNavegacion = document.querySelector('.puntos-navegacion');
const tarjetas = document.querySelectorAll('.tarjeta-individual');

// El ancho de la tarjeta + el gap (10px)
const tarjetaAncho = tarjetas[0].offsetWidth + 10;

// 1. Navegación con los botones de flecha
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const direccion = boton.id === 'boton-izquierdo' ? -1 : 1;
        listadoTarjetas.scrollLeft += direccion * tarjetaAncho;
    });
});

// 2. Desplazamiento arrastrando con el ratón
let isDragging = false;
let startX;
let scrollLeft;

listadoTarjetas.addEventListener('mousedown', (e) => {
    isDragging = true;
    listadoTarjetas.classList.add('arrastrando');
    startX = e.pageX - listadoTarjetas.offsetLeft;
    scrollLeft = listadoTarjetas.scrollLeft;
});

listadoTarjetas.addEventListener('mouseup', () => {
    isDragging = false;
    listadoTarjetas.classList.remove('arrastrando');
});

listadoTarjetas.addEventListener('mouseleave', () => {
    isDragging = false;
    listadoTarjetas.classList.remove('arrastrando');
});

listadoTarjetas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - listadoTarjetas.offsetLeft;
    const walk = (x - startX) * 1.5;
    listadoTarjetas.scrollLeft = scrollLeft - walk;
});

// 3. Puntos de navegación (indicadores)
function generarPuntos() {
    puntosNavegacion.innerHTML = ''; // Limpiar puntos existentes para evitar duplicados
    tarjetas.forEach((_, index) => {
        const punto = document.createElement('span');
        punto.classList.add('punto-indicador');
        if (index === 0) {
            punto.classList.add('activo');
        }
        punto.addEventListener('click', () => {
            listadoTarjetas.scrollLeft = index * tarjetaAncho;
        });
        puntosNavegacion.appendChild(punto);
    });
}

function actualizarPuntoActivo() {
    const puntos = document.querySelectorAll('.punto-indicador');
    // Para que el cálculo sea más preciso, considera el centro del contenedor
    const scrollPosition = listadoTarjetas.scrollLeft + listadoTarjetas.offsetWidth / 2;
    const puntoActivoIndex = Math.floor(scrollPosition / tarjetaAncho);

    puntos.forEach(punto => punto.classList.remove('activo'));
    if (puntos[puntoActivoIndex]) {
        puntos[puntoActivoIndex].classList.add('activo');
    }
}

listadoTarjetas.addEventListener('scroll', actualizarPuntoActivo);

// Llama a la función para generar los puntos cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    generarPuntos();
});