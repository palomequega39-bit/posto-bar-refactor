// frontend/src/pages/login/login.js
const API_URL = "https://posto-bar-refactor.onrender.com"; 

const loginForm = document.getElementById('loginForm');
const masterFields = document.getElementById('masterFields');
const btnAction = document.getElementById('btnAction');
const title = document.getElementById('title');

let isFirstRun = false;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        username: id('username').value,
        password: id('password').value,
        nombre: id('nombre').value
    };

    // Usamos la API_URL para conectar con el backend de Render
    const endpoint = isFirstRun 
        ? `${API_URL}/api/auth/register-master` 
        : `${API_URL}/api/auth/login`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.firstRun) {
            // Activar modo "Crear Master"
            isFirstRun = true;
            title.innerText = "Configurar Usuario Master";
            masterFields.style.display = 'block';
            btnAction.innerText = "Crear y Entrar";
            alert("Sistema nuevo detectado. Por favor, cree su cuenta de administrador.");
        } else if (response.ok) {
            // Guardar sesión y entrar
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '../dashboard/index.html'; 
        } else {
            alert(result.error || "Error en el servidor");
        }
    } catch (err) {
        console.error("Error de conexión:", err);
        alert("No se pudo conectar con el servidor. Verifica que el Backend en Render esté 'Live'.");
    }
});

function id(name) { return document.getElementById(name); }
