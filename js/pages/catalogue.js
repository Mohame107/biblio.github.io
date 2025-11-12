// Données du catalogue
const catalogueBooks = [
    {
        id: 1,
        title: "L'Étranger",
        author: "Albert Camus",
        category: "fiction",
        year: 1942,
        coverColor: "#e3f2fd",
        iconColor: "#2196f3",
        status: "available",
        isNew: false
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        category: "fiction",
        year: 1949,
        coverColor: "#f3e5f5",
        iconColor: "#9c27b0",
        status: "available",
        isNew: true
    },
    {
        id: 3,
        title: "Le Petit Prince",
        author: "Antoine de Saint-Exupéry",
        category: "fiction",
        year: 1943,
        coverColor: "#e8f5e8",
        iconColor: "#4caf50",
        status: "reserved",
        isNew: false
    },
    {
        id: 4,
        title: "Les Misérables",
        author: "Victor Hugo",
        category: "fiction",
        year: 1862,
        coverColor: "#fff3e0",
        iconColor: "#ff9800",
        status: "available",
        isNew: false
    },
    {
        id: 5,
        title: "Madame Bovary",
        author: "Gustave Flaubert",
        category: "fiction",
        year: 1857,
        coverColor: "#fce4ec",
        iconColor: "#ec407a",
        status: "unavailable",
        isNew: false
    },
    {
        id: 6,
        title: "Le Comte de Monte-Cristo",
        author: "Alexandre Dumas",
        category: "fiction",
        year: 1844,
        coverColor: "#e0f2f1",
        iconColor: "#26a69a",
        status: "available",
        isNew: false
    },
    {
        id: 7,
        title: "Une Brève Histoire du Temps",
        author: "Stephen Hawking",
        category: "science",
        year: 1988,
        coverColor: "#e8eaf6",
        iconColor: "#3f51b5",
        status: "available",
        isNew: true
    },
    {
        id: 8,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "histoire",
        year: 2011,
        coverColor: "#f3e5f5",
        iconColor: "#9c27b0",
        status: "available",
        isNew: false
    }
];

// État de la pagination
let currentPage = 1;
const booksPerPage = 8;
let filteredBooks = [...catalogueBooks];

document.addEventListener('DOMContentLoaded', function() {
    initializeCatalogue();
    setupEventListeners();
    applyUrlParameters();
});

function initializeCatalogue() {
    renderBooks();
    updateResultsCount();
    renderPagination();
}

function setupEventListeners() {
    // Recherche
    const searchInput = document.getElementById('catalogue-search');
    const searchButton = document.getElementById('search-btn');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Filtres
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('author-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
}

function applyUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        document.getElementById('catalogue-search').value = decodeURIComponent(searchQuery);
        performSearch();
    }
}

function performSearch() {
    const searchQuery = document.getElementById('catalogue-search').value.toLowerCase();
    applyFilters(searchQuery);
}

function applyFilters(searchQuery = null) {
    const categoryFilter = document.getElementById('category-filter').value;
    const authorFilter = document.getElementById('author-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    const query = searchQuery || document.getElementById('catalogue-search').value.toLowerCase();
    
    // Filtrer les livres
    filteredBooks = catalogueBooks.filter(book => {
        const matchesSearch = !query || 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query);
        
        const matchesCategory = !categoryFilter || book.category === categoryFilter;
        const matchesAuthor = !authorFilter || book.author.toLowerCase().includes(authorFilter);
        
        return matchesSearch && matchesCategory && matchesAuthor;
    });
    
    // Trier les livres
    filteredBooks.sort((a, b) => {
        switch(sortFilter) {
            case 'author':
                return a.author.localeCompare(b.author);
            case 'date':
                return b.year - a.year;
            case 'title':
            default:
                return a.title.localeCompare(b.title);
        }
    });
    
    currentPage = 1;
    renderBooks();
    updateResultsCount();
    renderPagination();
}

function renderBooks() {
    const grid = document.getElementById('catalogue-grid');
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);
    
    grid.innerHTML = booksToShow.map(book => `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-cover" style="background-color: ${book.coverColor};">
                <i class="fas fa-book fa-3x" style="color: ${book.iconColor};"></i>
                ${book.isNew ? '<span class="book-badge">Nouveau</span>' : ''}
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-category">${getCategoryLabel(book.category)} • ${book.year}</div>
                <div class="book-status status-${book.status}">
                    ${getStatusLabel(book.status)}
                </div>
                <div class="book-actions">
                    <button class="btn btn-primary btn-small view-details">Détails</button>
                    <button class="btn btn-outline btn-small reserve-book" 
                            ${book.status !== 'available' ? 'disabled' : ''}>
                        ${book.status === 'reserved' ? 'Réservé' : 'Réserver'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Ajouter les écouteurs d'événements
    addBookEventListeners();
}

function getCategoryLabel(category) {
    const categories = {
        'fiction': 'Fiction',
        'science': 'Science',
        'histoire': 'Histoire',
        'biographie': 'Biographie',
        'romance': 'Romance',
        'fantastique': 'Fantastique'
    };
    return categories[category] || category;
}

function getStatusLabel(status) {
    const statusLabels = {
        'available': 'Disponible',
        'reserved': 'Réservé',
        'unavailable': 'Indisponible'
    };
    return statusLabels[status] || status;
}

function addBookEventListeners() {
    // Boutons détails
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookId = bookCard.dataset.bookId;
            const book = catalogueBooks.find(b => b.id == bookId);
            showBookDetails(book);
        });
    });
    
    // Boutons réservation
    document.querySelectorAll('.reserve-book:not(:disabled)').forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookId = bookCard.dataset.bookId;
            const book = catalogueBooks.find(b => b.id == bookId);
            reserveBook(book);
        });
    });
}

function showBookDetails(book) {
    alert(`Détails du livre:\n\nTitre: ${book.title}\nAuteur: ${book.author}\nCatégorie: ${getCategoryLabel(book.category)}\nAnnée: ${book.year}\nStatut: ${getStatusLabel(book.status)}`);
}

function reserveBook(book) {
    if (book.status === 'available') {
        if (confirm(`Voulez-vous réserver le livre "${book.title}" ?`)) {
            alert(`Livre "${book.title}" réservé avec succès!\n\nVous avez 7 jours pour venir le récupérer à la bibliothèque.`);
            // En production, ici on mettrait à jour le statut du livre
        }
    }
}

function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    countElement.textContent = `${filteredBooks.length} livre${filteredBooks.length > 1 ? 's' : ''} trouvé${filteredBooks.length > 1 ? 's' : ''}`;
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Bouton précédent
    paginationHTML += `
        <button class="pagination-prev" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Pages
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="pagination-page ${i === currentPage ? 'active' : ''}">
                ${i}
            </button>
        `;
    }
    
    // Bouton suivant
    paginationHTML += `
        <button class="pagination-next" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
    
    // Écouteurs d'événements pour la pagination
    document.querySelector('.pagination-prev')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderBooks();
            renderPagination();
        }
    });
    
    document.querySelector('.pagination-next')?.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderBooks();
            renderPagination();
        }
    });
    
    document.querySelectorAll('.pagination-page').forEach((button, index) => {
        button.addEventListener('click', () => {
            currentPage = index + 1;
            renderBooks();
            renderPagination();
        });
    });
}