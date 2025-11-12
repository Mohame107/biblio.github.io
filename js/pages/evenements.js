// Données des événements
const eventsData = {
    upcoming: [
        {
            id: 1,
            title: "Club de Lecture : L'Étranger",
            type: "club-lecture",
            date: "2024-01-15",
            time: "18:30",
            duration: "2h",
            location: "Salle de conférence",
            description: "Discussion autour du livre 'L'Étranger' d'Albert Camus. Ouvert à tous les passionnés de littérature. Venez partager vos impressions et analyses dans une ambiance conviviale.",
            maxParticipants: 25,
            currentParticipants: 18,
            speaker: "Dr. Marie Dubois, spécialiste de la littérature française",
            requirements: "Avoir lu le livre",
            image: "club-lecture"
        },
        {
            id: 2,
            title: "Atelier d'Écriture Créative",
            type: "atelier",
            date: "2024-01-22",
            time: "14:00",
            duration: "3h",
            location: "Espace créatif",
            description: "Apprenez les techniques d'écriture créative avec notre auteur en résidence. Exercices pratiques, conseils personnalisés et partage d'expériences.",
            maxParticipants: 15,
            currentParticipants: 12,
            speaker: "Jean-Luc Martin, auteur publié",
            requirements: "Matériel fourni",
            image: "atelier-ecriture"
        },
        {
            id: 3,
            title: "Rencontre avec Marie Laurent",
            type: "rencontre",
            date: "2024-02-05",
            time: "19:00",
            duration: "2h",
            location: "Auditorium",
            description: "Rencontre exclusive avec Marie Laurent, auteure de 'Le Mystère du Temps'. Échange avec l'auteure suivie d'une séance de dédicaces.",
            maxParticipants: 100,
            currentParticipants: 67,
            speaker: "Marie Laurent, auteure à succès",
            requirements: "Entrée libre",
            image: "rencontre-auteur"
        },
        {
            id: 4,
            title: "Conférence : L'IA et la Littérature",
            type: "conference",
            date: "2024-02-12",
            time: "17:00",
            duration: "1h30",
            location: "Amphithéâtre",
            description: "Exploration des impacts de l'intelligence artificielle sur la création littéraire et l'édition. Débat avec des experts du domaine.",
            maxParticipants: 80,
            currentParticipants: 45,
            speaker: "Prof. Alain Petit, chercheur en IA",
            requirements: "Inscription recommandée",
            image: "conference-ia"
        }
    ],
    past: [
        {
            id: 5,
            title: "Soirée Poésie Moderne",
            type: "club-lecture",
            date: "2023-12-10",
            time: "19:00",
            duration: "2h",
            location: "Salon littéraire",
            description: "Lecture et discussion autour des poètes contemporains. Moments d'échange et de partage poétique.",
            maxParticipants: 20,
            currentParticipants: 15,
            speaker: "Élise Moreau, poète",
            requirements: "Aucun",
            image: "poesie"
        },
        {
            id: 6,
            title: "Atelier de Reliure",
            type: "atelier",
            date: "2023-11-25",
            time: "10:00",
            duration: "4h",
            location: "Atelier artisanat",
            description: "Initiation aux techniques traditionnelles de reliure. Chaque participant repart avec son carnet personnalisé.",
            maxParticipants: 12,
            currentParticipants: 10,
            speaker: "Pierre Lefebvre, artisan relieur",
            requirements: "Matériel inclus",
            image: "reliure"
        }
    ]
};

let currentEventType = 'all';

document.addEventListener('DOMContentLoaded', function() {
    initializeEvenements();
    setupEventListeners();
});

function initializeEvenements() {
    renderEvents('upcoming', eventsData.upcoming);
    renderEvents('past', eventsData.past);
    setupNewsletter();
}

function setupEventListeners() {
    // Filtres d'événements
    document.querySelectorAll('.event-filter').forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            document.querySelectorAll('.event-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Filtrer les événements
            currentEventType = this.dataset.type;
            filterEvents();
        });
    });
}

function filterEvents() {
    let filteredUpcoming, filteredPast;
    
    if (currentEventType === 'all') {
        filteredUpcoming = eventsData.upcoming;
        filteredPast = eventsData.past;
    } else {
        filteredUpcoming = eventsData.upcoming.filter(event => event.type === currentEventType);
        filteredPast = eventsData.past.filter(event => event.type === currentEventType);
    }
    
    renderEvents('upcoming', filteredUpcoming);
    renderEvents('past', filteredPast);
}

function renderEvents(section, events) {
    const grid = document.getElementById(section === 'upcoming' ? 'upcoming-events' : 'past-events');
    
    if (events.length === 0) {
        grid.innerHTML = `
            <div class="no-events">
                <i class="fas fa-calendar-times fa-3x"></i>
                <p>Aucun événement ${section === 'upcoming' ? 'à venir' : 'passé'} dans cette catégorie</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = events.map(event => `
        <div class="event-card" data-event-id="${event.id}">
            ${section === 'past' ? '<span class="past-badge">Terminé</span>' : ''}
            <div class="event-header">
                <div class="event-date">
                    <div class="event-day">${formatDay(event.date)}</div>
                    <div class="event-month">${formatMonth(event.date)}</div>
                    <div class="event-time">${event.time}</div>
                </div>
                <div class="event-basic-info">
                    <div class="event-title">${event.title}</div>
                    <span class="event-type">${getEventTypeLabel(event.type)}</span>
                </div>
            </div>
            <div class="event-body">
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-clock"></i>
                        <span>${event.duration}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-user"></i>
                        <span>${event.speaker}</span>
                    </div>
                    ${section === 'upcoming' ? `
                    <div class="event-detail">
                        <i class="fas fa-users"></i>
                        <span>${event.currentParticipants}/${event.maxParticipants} participants</span>
                    </div>
                    ` : ''}
                </div>
                <div class="event-actions">
                    ${section === 'upcoming' ? `
                    <button class="btn btn-primary register-btn" 
                            ${event.currentParticipants >= event.maxParticipants ? 'disabled' : ''}>
                        ${event.currentParticipants >= event.maxParticipants ? 'Complet' : "S'inscrire"}
                    </button>
                    ` : ''}
                    <button class="btn btn-outline details-btn">Plus d'infos</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Ajouter les écouteurs d'événements
    addEventListeners(section);
}

function formatDay(dateString) {
    const date = new Date(dateString);
    return date.getDate();
}

function formatMonth(dateString) {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const date = new Date(dateString);
    return months[date.getMonth()];
}

function getEventTypeLabel(type) {
    const types = {
        'club-lecture': 'Club de lecture',
        'atelier': 'Atelier',
        'rencontre': 'Rencontre d\'auteur',
        'conference': 'Conférence'
    };
    return types[type] || type;
}

function addEventListeners(section) {
    // Boutons d'inscription (uniquement pour les événements à venir)
    if (section === 'upcoming') {
        document.querySelectorAll('.register-btn:not(:disabled)').forEach(button => {
            button.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const eventId = eventCard.dataset.eventId;
                const event = eventsData.upcoming.find(e => e.id == eventId);
                registerForEvent(event);
            });
        });
    }
    
    // Boutons détails
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventId = eventCard.dataset.eventId;
            const event = [...eventsData.upcoming, ...eventsData.past].find(e => e.id == eventId);
            showEventDetails(event);
        });
    });
}

function registerForEvent(event) {
    if (confirm(`Voulez-vous vous inscrire à l'événement "${event.title}" ?`)) {
        alert(`Inscription confirmée !\n\nÉvénement: ${event.title}\nDate: ${formatFullDate(event.date)} à ${event.time}\nLieu: ${event.location}\n\nVous recevrez un email de confirmation.`);
    }
}

function formatFullDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

function showEventDetails(event) {
    const isPast = new Date(event.date) < new Date();
    
    const detailsHTML = `
        <strong>Date:</strong> ${formatFullDate(event.date)} à ${event.time}<br>
        <strong>Durée:</strong> ${event.duration}<br>
        <strong>Lieu:</strong> ${event.location}<br>
        <strong>Intervenant:</strong> ${event.speaker}<br>
        <strong>Type:</strong> ${getEventTypeLabel(event.type)}<br>
        ${!isPast ? `<strong>Places:</strong> ${event.currentParticipants}/${event.maxParticipants} participants<br>` : ''}
        <strong>Description:</strong><br>${event.description}
    `;
    
    alert(`Détails de l'événement:\n\n${event.title}\n\n${detailsHTML}`);
}

function setupNewsletter() {
    const newsletterForm = document.querySelector('.events-newsletter .newsletter-form');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterButton = newsletterForm.querySelector('button');
    
    newsletterButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = newsletterInput.value;
        
        if (validateEmail(email)) {
            alert(`Merci ! Vous êtes maintenant inscrit à notre newsletter événements avec l'adresse: ${email}`);
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