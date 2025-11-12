// Données des nouveautés
const newBooksData = [
    {
        id: 1,
        title: "L'Intelligence Artificielle",
        author: "Jean Dupont",
        category: "science",
        description: "Une exploration approfondie des dernières avancées en intelligence artificielle et de leur impact sur notre société.",
        year: 2023,
        pages: 320,
        coverColor: "#e3f2fd",
        iconColor: "#2196f3",
        isNew: true
    },
    {
        id: 2,
        title: "Le Mystère du Temps",
        author: "Marie Laurent",
        category: "fiction",
        description: "Un thriller scientifique captivant qui explore les paradoxes temporels et les mystères de l'univers.",
        year: 2023,
        pages: 280,
        coverColor: "#f3e5f5",
        iconColor: "#9c27b0",
        isNew: true
    },
    {
        id: 3,
        title: "Voyage au Centre de la Terre",
        author: "Jules Verne",
        category: "fiction",
        description: "Réédition illustrée du classique de Jules Verne avec des annotations scientifiques modernes.",
        year: 2023,
        pages: 350,
        coverColor: "#e8f5e8",
        iconColor: "#4caf50",
        isNew: true
    },
    {
        id: 4,
        title: "L'Art de la Guerre Moderne",
        author: "Sun Tzu",
        category: "histoire",
        description: "Une adaptation contemporaine des principes stratégiques de Sun Tzu appliqués au monde moderne.",
        year: 2023,
        pages: 240,
        coverColor: "#fff3e0",
        iconColor: "#ff9800",
        isNew: true
    },
    {
        id: 5,
        title: "Les Algorithmes du Bonheur",
        author: "Sophie Martin",
        category: "science",
        description: "Comment les mathématiques et l'informatique peuvent nous aider à comprendre et à cultiver le bonheur.",
        year: 2023,
        pages: 290,
        coverColor: "#fce4ec",
        iconColor: "#ec407a",
        isNew: true
    },
    {
        id: 6,
        title: "Mémoires d'un Explorateur",
        author: "Alexandre Leclerc",
        category: "biographie",
        description: "Les aventures extraordinaires d'un explorateur moderne à travers les continents les plus reculés.",
        year: 2023,
        pages: 410,
        coverColor: "#e0f2f1",
        iconColor: "#26a69a",
        isNew: true
    },
    {
        id: 7,
        title: "La Révolution Quantique",
        author: "Dr. Michel Bernard",
        category: "science",
        description: "Comprendre les implications de la physique quantique sur notre quotidien et notre futur.",
        year: 2023,
        pages: 380,
        coverColor: "#e8eaf6",
        iconColor: "#3f51b5",
        isNew: true
    },
    {
        id: 8,
        title: "Échos du Passé",
        author: "Élise Moreau",
        category: "fiction",
        description: "Un roman historique poignant qui traverse les générations et les continents.",
        year: 2023,
        pages: 320,
        coverColor: "#fff8e1",
        iconColor: "#ffa000",
        isNew: true
    }
];

let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    initializeNouveautes();
    setupEventListeners();
});

function initializeNouveautes() {
    renderBooks(newBooksData);
    setupNewsletter();
}

function setupEventListeners() {
    // Filtres par catégorie
    document.querySelectorAll('.category-filter').forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            document.querySelectorAll('.category-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Filtrer les livres
            currentCategory = this.dataset.category;
            filterBooks();
        });
    });
}

function filterBooks() {
    let filteredBooks;
    
    if (currentCategory === 'all') {
        filteredBooks = newBooksData;
    } else {
        filteredBooks = newBooksData.filter(book => book.category === currentCategory);
    }
    
    renderBooks(filteredBooks);
}

function renderBooks(books) {
    const grid = document.getElementById('nouveautes-grid');
    
    grid.innerHTML = books.map(book => `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-cover" style="background: linear-gradient(135deg, ${book.coverColor} 0%, ${darkenColor(book.coverColor, 20)} 100%);">
                <i class="fas fa-book fa-3x" style="color: ${book.iconColor};"></i>
                <span class="new-badge">Nouveau</span>
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-description">${book.description}</div>
                <div class="book-meta">
                    <span class="book-category">${getCategoryLabel(book.category)}</span>
                    <span>${book.pages} pages</span>
                </div>
                <div class="book-actions">
                    <button class="btn btn-primary btn-small view-details">Détails</button>
                    <button class="btn btn-outline btn-small reserve-book">Réserver</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Ajouter les écouteurs d'événements
    addBookEventListeners();
}

function darkenColor(color, percent) {
    // Fonction simplifiée pour assombrir une couleur
    return color; // En production, implémenter la logique d'assombrissement
}

function getCategoryLabel(category) {
    const categories = {
        'fiction': 'Fiction',
        'science': 'Science',
        'histoire': 'Histoire',
        'biographie': 'Biographie'
    };
    return categories[category] || category;
}

function addBookEventListeners() {
    // Boutons détails
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookId = bookCard.dataset.bookId;
            const book = newBooksData.find(b => b.id == bookId);
            showBookDetails(book);
        });
    });
    
    // Boutons réservation
    document.querySelectorAll('.reserve-book').forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookId = bookCard.dataset.bookId;
            const book = newBooksData.find(b => b.id == bookId);
            reserveBook(book);
        });
    });
}

function showBookDetails(book) {
    const modalHTML = `
        <div class="book-details-modal">
            <h3>${book.title}</h3>
            <p><strong>Auteur:</strong> ${book.author}</p>
            <p><strong>Catégorie:</strong> ${getCategoryLabel(book.category)}</p>
            <p><strong>Année:</strong> ${book.year}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Description:</strong> ${book.description}</p>
        </div>
    `;
    
    // Créer une modale simple
    alert(`Détails du livre:\n\nTitre: ${book.title}\nAuteur: ${book.author}\nCatégorie: ${getCategoryLabel(book.category)}\nAnnée: ${book.year}\nPages: ${book.pages}\n\nDescription:\n${book.description}`);
}

function reserveBook(book) {
    if (confirm(`Voulez-vous réserver le livre "${book.title}" ?`)) {
        alert(`Livre "${book.title}" réservé avec succès!\n\nVous recevrez une notification dès qu'il sera disponible.`);
    }
}

function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterButton = newsletterForm.querySelector('button');
    
    newsletterButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = newsletterInput.value;
        
        if (validateEmail(email)) {
            alert(`Merci ! Vous êtes maintenant abonné à notre newsletter avec l'adresse: ${email}`);
            newsletterInput.value = '';
        } else {
            alert('Veuillez entrer une adresse email valide.');
        }
    });
    
    newsletterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            newsletterButton.click();
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}