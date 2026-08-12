const cardData = [
    {
        id: "tecnologico",
        title: "Tecnológico",
        icon: "💻",
        points: [
            "Sin Apps para ver rutas en vivo.",
            "Recaudo exclusivo en efectivo.",
            "Falta de control GPS."
        ]
    },
    {
        id: "economico",
        title: "Económico",
        icon: "💰",
        points: [
            "Pasajes costosos para estudiantes.",
            "Mala cobertura exige pagar doble pasaje.",
            "Alto costo de mantenimiento.",
            "Precios del combustible."
        ]
    },
    {
        id: "legales",
        title: "Legales",
        icon: "⚖️",
        points: [
            "Normas de seguridad vial.",
            "Revisión técnico-mecánica.",
            "Licencias y documentos al día."
        ]
    },
    {
        id: "ecologico",
        title: "Ecológico",
        icon: "🌱",
        points: [
            "Cambio de buses antiguos.",
            "Congestión vehicular diaria.",
            "Urgencia por mejorar el aire."
        ]
    }
];

let reviewedCards = new Set();

function createCardHTML(data) {
    const pointsHTML = data.points.map(point => `<li>${point}</li>`).join('');
    
    return `
        <div class="card-scene" data-category="${data.id}" onclick="flipCard(this, '${data.id}')">
            <div class="card">
                <div class="card-face front">
                    <div class="card-icon">${data.icon}</div>
                    <h2 class="card-title">${data.title}</h2>
                </div>
                <div class="card-face back">
                    <h3>Puntos a memorizar:</h3>
                    <ul class="card-list">
                        ${pointsHTML}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = cardData.map(data => createCardHTML(data)).join('');
}

function flipCard(element, id) {
    const card = element.querySelector('.card');
    card.classList.toggle('is-flipped');
    
    // Registrar que se ha visto la tarjeta
    if (!reviewedCards.has(id)) {
        reviewedCards.add(id);
        updateProgress();
    }
}

function updateProgress() {
    const total = cardData.length;
    const current = reviewedCards.size;
    const percentage = (current / total) * 100;
    
    document.getElementById('progress-text').innerText = `${current}/${total}`;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    
    if (current === total) {
        setTimeout(() => {
            alert('¡Excelente! Has repasado todos los temas de tu parte. ¡Estás listo para la exposición!');
        }, 500);
    }
}

// Inicializar la app
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
});
