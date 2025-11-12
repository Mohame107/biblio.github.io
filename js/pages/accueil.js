// Données des livres pour la page d'accueil
const newBooks = [
    {
        title: "L'Étranger",
        author: "Albert Camus",
        coverColor: "#e3f2fd",
        iconColor: "#2196f3"
    },
    {
        title: "1984",
        author: "George Orwell",
        coverColor: "#f3e5f5",
        iconColor: "#9c27b0"
    },
    {
        title: "Le Petit Prince",
        author: "Antoine de Saint-Exupéry",
        coverColor: "#e8f5e8",
        iconColor: "#4caf50"
    },
    {
        title: "Les Misérables",
        author: "Victor Hugo",
        coverColor: "#fff3e0",
        iconColor: "#ff9800"
    }
];

// Charger les livres dans la grille
document.addEventListener('DOMContentLoaded', function() {
    const booksGrid = document.querySelector('.books-grid');
    
    if (booksGrid) {
        booksGrid.innerHTML = newBooks.map(book => `
            <div class="book-card">
                <div class="book-cover" style="background-color: ${book.coverColor};">
                    <i class="fas fa-book fa-3x" style="color: ${book.iconColor};"></i>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-actions">
                        <button class="btn btn-primary btn-small">Détails</button>
                        <button class="btn btn-outline btn-small">Réserver</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Ajouter les écouteurs d'événements pour les boutons
        addBookEventListeners();
    }
});

function addBookEventListeners() {
    // Écouteurs pour les boutons de détails
    const detailButtons = document.querySelectorAll('.book-actions .btn-primary');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const title = bookCard.querySelector('.book-title').textContent;
            alert(`Détails du livre: ${title}`);
        });
    });
    
    // Écouteurs pour les boutons de réservation
    const reserveButtons = document.querySelectorAll('.book-actions .btn-outline');
    reserveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const title = bookCard.querySelector('.book-title').textContent;
            alert(`Réservation du livre: ${title}\n\nCette fonctionnalité sera implémentée prochainement!`);
        });
    });
}