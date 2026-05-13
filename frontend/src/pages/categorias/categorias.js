const API_URL = "https://posto-bar-refactor.onrender.com/api/categorias";
const form = document.getElementById('categoriaForm');
const lista = document.getElementById('listaCategorias');

// Cargar categorías al iniciar
async function cargarCategorias() {
    const res = await fetch(API_URL);
    const categorias = await res.json();
    lista.innerHTML = categorias.map(c => `<li>${c.nombre} ${c.activo ? '✅' : '❌'}</li>`).join('');
}

// Guardar nueva categoría
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    });

    if (res.ok) {
        form.reset();
        cargarCategorias();
    } else {
        alert("Error al crear categoría");
    }
});

cargarCategorias();
