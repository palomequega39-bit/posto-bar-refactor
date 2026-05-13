// frontend/src/pages/login/login.js
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

    const endpoint = isFirstRun ? '/api/auth/register-master' : '/api/auth/login';

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
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = '../dashboard/index.html'; // Redirigir a la página inicial recomendada
        } else {
            alert(result.error);
        }
    } catch (err) {
        console.error("Error:", err);
    }
});

function id(name) { return document.getElementById(name); }