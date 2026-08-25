// --- 1. CONFIGURACIÓN DEL SERVIDOR ---
const express = require('express');
const cors = require('cors');

const app = express();
// FIX: usar variable de entorno PORT si existe (necesario para hosting
// como Render, Railway, Heroku, etc., que asignan el puerto dinámicamente).
const PUERTO = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- 2. BASE DE DATOS (Simulada) ---
const inventarioDomk = [
    {
        id: 1,
        nombre: "Chaqueta Deportiva Azul Profundo",
        precio: 120000,
        categoria: "deportiva",
        imagen: "chaqueta-azul.png"
    },
    {
        id: 2,
        nombre: "Pantalón Chino Gris Hielo",
        precio: 95000,
        categoria: "formal",
        imagen: "pantalon-gris.png"
    },
    {
        id: 3,
        nombre: "Camiseta Entrenamiento Eléctrica",
        precio: 45000,
        categoria: "deportiva",
        imagen: "camiseta-electrica.png"
    }
];

// --- 3. RUTAS DE LA API ---
app.get('/api/productos', (peticion, respuesta) => {
    respuesta.json(inventarioDomk);
});

// FIX: ruta para un solo producto por id (útil si luego agregas detalle de producto)
app.get('/api/productos/:id', (peticion, respuesta) => {
    const producto = inventarioDomk.find(p => p.id === Number(peticion.params.id));
    if (!producto) {
        return respuesta.status(404).json({ error: 'Producto no encontrado' });
    }
    respuesta.json(producto);
});

// --- 4. ENCENDER EL SERVIDOR ---
app.listen(PUERTO, () => {
    console.log(`✅ El servidor de Domk Store está corriendo en el puerto ${PUERTO}`);
});
