// Gestion du menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Fermer le menu mobile en cliquant sur un lien
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
        }
    });
});

// Gestion de la recherche
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    const searchInput = searchBar.querySelector('input');
    const searchButton = searchBar.querySelector('button');
    
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    if (query.trim()) {
        // Rediriger vers la page catalogue avec le terme de recherche
        window.location.href = `pages/catalogue.html?search=${encodeURIComponent(query)}`;
    }
}

// Initialisation des composants
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bibliothèque Moderne - Chargement terminé');
});