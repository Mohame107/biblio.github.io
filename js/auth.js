// Gestion des modales d'authentification
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');

// Ouvrir modale de connexion
if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
}

// Ouvrir modale d'inscription
if (registerBtn && registerModal) {
    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'flex';
    });
}

// Fermer les modales
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (loginModal) loginModal.style.display = 'none';
        if (registerModal) registerModal.style.display = 'none';
    });
});

// Basculer entre connexion et inscription
if (switchToRegister && loginModal && registerModal) {
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
}

if (switchToLogin && loginModal && registerModal) {
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
}

// Fermer les modales en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (loginModal && e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (registerModal && e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Gestion du formulaire de connexion
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simulation de connexion
        if (email && password) {
            alert('Connexion réussie! (simulation)');
            loginModal.style.display = 'none';
            loginForm.reset();
            
            // Mettre à jour l'interface utilisateur
            updateAuthUI(true);
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
}

// Gestion du formulaire d'inscription
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        
        // Simulation d'inscription
        if (name && email && password) {
            alert('Inscription réussie! (simulation)');
            registerModal.style.display = 'none';
            registerForm.reset();
            
            // Mettre à jour l'interface utilisateur
            updateAuthUI(true);
        } else {
            alert('Veuillez remplir tous les champs');
        }
    });
}

// Mettre à jour l'interface utilisateur après authentification
function updateAuthUI(isLoggedIn) {
    const authButtons = document.querySelector('.auth-buttons');
    if (isLoggedIn && authButtons) {
        authButtons.innerHTML = `
            <button class="btn btn-outline" id="profile-btn">Mon Profil</button>
            <button class="btn btn-primary" id="logout-btn">Déconnexion</button>
        `;
        
        // Ajouter les écouteurs d'événements pour les nouveaux boutons
        document.getElementById('logout-btn').addEventListener('click', logout);
        document.getElementById('profile-btn').addEventListener('click', showProfile);
    }
}

function logout() {
    alert('Déconnexion réussie!');
    location.reload();
}

function showProfile() {
    alert('Redirection vers le profil utilisateur');
}