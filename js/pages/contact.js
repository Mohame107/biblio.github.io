// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Validation en temps réel
    setupRealTimeValidation();
}

function setupRealTimeValidation() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Retirer les classes d'erreur lors de la saisie
            if (this.classList.contains('invalid')) {
                this.classList.remove('invalid');
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    });
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';
    
    // Réinitialiser l'état
    field.classList.remove('valid', 'invalid');
    
    switch(field.id) {
        case 'contact-name':
            if (value.length < 2) {
                errorMessage = 'Le nom doit contenir au moins 2 caractères';
                isValid = false;
            } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
                errorMessage = 'Le nom contient des caractères invalides';
                isValid = false;
            }
            break;
            
        case 'contact-email':
            if (!isValidEmail(value)) {
                errorMessage = 'Veuillez entrer une adresse email valide';
                isValid = false;
            }
            break;
            
        case 'contact-subject':
            if (!value) {
                errorMessage = 'Veuillez sélectionner un sujet';
                isValid = false;
            }
            break;
            
        case 'contact-message':
            if (value.length < 10) {
                errorMessage = 'Le message doit contenir au moins 10 caractères';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = 'Le message ne peut pas dépasser 1000 caractères';
                isValid = false;
            }
            break;
    }
    
    // Mettre à jour l'état visuel
    if (isValid && value) {
        field.classList.add('valid');
    } else if (!isValid) {
        field.classList.add('invalid');
    }
    
    // Afficher le message d'erreur
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function submitForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Afficher l'état de chargement
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simuler l'envoi (remplacer par une vraie requête AJAX en production)
    setTimeout(() => {
        // Récupérer les données du formulaire
        const formDataObj = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value,
            newsletter: document.getElementById('newsletter-optin').checked
        };
        
        // Afficher le message de succès
        showSuccessMessage(formDataObj);
        
        // Réinitialiser le formulaire
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Réinitialiser les états de validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
        
    }, 2000);
}

function showSuccessMessage(formData) {
    const subjectLabels = {
        'information': 'Demande d\'information',
        'problem': 'Problème technique',
        'suggestion': 'Suggestion',
        'partnership': 'Partenariat',
        'other': 'Autre'
    };
    
    const subject = subjectLabels[formData.subject] || formData.subject;
    
    let message = `Merci ${formData.name} !\n\n`;
    message += `Votre message a été envoyé avec succès.\n\n`;
    message += `Récapitulatif :\n`;
    message += `• Sujet : ${subject}\n`;
    message += `• Email : ${formData.email}\n`;
    message += `• Newsletter : ${formData.newsletter ? 'Oui' : 'Non'}\n\n`;
    message += `Nous vous répondrons dans les plus brefs délais.`;
    
    alert(message);
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer l'état de l'item actuel
            item.classList.toggle('active');
        });
    });
    
    // Ouvrir le premier item par défaut
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

// Animation d'apparition des éléments
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-card, .contact-form-container, .map-section, .faq-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser les styles d'animation
    const animatedElements = document.querySelectorAll('.info-card, .contact-form-container, .map-section, .faq-section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Déclencher l'animation au chargement
    setTimeout(animateOnScroll, 100);
    
    // Et au scroll
    window.addEventListener('scroll', animateOnScroll);
});