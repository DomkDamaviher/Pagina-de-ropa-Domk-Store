// --- 1. VARIABLES ---
let carrito = [];

// Elementos del DOM
const btnCarrito = document.getElementById('btn-carrito');
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const modal = document.getElementById('modal-carrito');
const btnCerrarModal = document.querySelector('.cerrar-modal');
const listaCarrito = document.getElementById('lista-carrito');
const precioTotalElemento = document.getElementById('precio-total');

// --- 2. FUNCIONES ---
function actualizarContadorCarrito() {
    btnCarrito.textContent = `🛒 Carrito (${carrito.length})`;
}

function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((prenda, indice) => {
        const li = document.createElement('li');

        const spanNombre = document.createElement('span');
        spanNombre.textContent = prenda.nombre;

        const spanPrecio = document.createElement('span');
        spanPrecio.textContent = `$${prenda.precioFormateado}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '✕';
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.addEventListener('click', () => eliminarDelCarrito(indice));

        li.appendChild(spanNombre);
        li.appendChild(spanPrecio);
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);

        total += prenda.precioNumerico;
    });

    precioTotalElemento.textContent = total.toLocaleString('es-CO');
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarContadorCarrito();
    renderizarCarrito();
}

// --- 3. EVENTOS ---
botonesAgregar.forEach(boton => {
    // Evita que el botón "Proceder al Pago" (que también tiene la clase
    // .btn-agregar por estilo) dispare la lógica de agregar producto.
    if (boton.id === 'btn-comprar') return;

    boton.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.tarjeta-producto');
        const nombreProducto = tarjeta.querySelector('h3').textContent;
        const precioTexto = tarjeta.querySelector('.precio').textContent;

        // FIX: replace('.', '') solo quitaba el PRIMER punto.
        // Con precios de 7+ dígitos (ej: $1.200.000) esto rompía el número.
        // Se usa una expresión regular global (/\./g) para quitar TODOS los puntos.
        const precioNumerico = parseInt(precioTexto.replace('$', '').replace(/\./g, ''), 10);

        const prenda = {
            nombre: nombreProducto,
            precioFormateado: precioNumerico.toLocaleString('es-CO'),
            precioNumerico: precioNumerico
        };

        carrito.push(prenda);
        actualizarContadorCarrito();

        boton.textContent = '¡Agregado!';
        boton.style.backgroundColor = 'var(--azul-electrico)';
        setTimeout(() => {
            boton.textContent = 'Agregar al carrito';
            boton.style.backgroundColor = 'var(--azul-profundo)';
        }, 1000);
    });
});

// Evento para ABRIR el modal
btnCarrito.addEventListener('click', () => {
    renderizarCarrito();
    modal.style.display = 'block';
});

// Evento para CERRAR el modal (clic en la X)
btnCerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Evento para CERRAR el modal (clic afuera de la ventana)
window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.style.display = 'none';
    }
});

// Evento para CERRAR el modal con la tecla Escape (mejora de accesibilidad)
window.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});
