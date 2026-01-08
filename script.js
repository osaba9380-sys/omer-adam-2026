// --- 1. CONFIGURATION ---
const phoneNumber = "33600000000"; // REMPLACE PAR TON NUMÉRO (ex: 33612345678)

// --- 2. LOADER & GSAP (VERSION CORRIGÉE) ---
// On utilise DOMContentLoaded au lieu de load pour que ça aille plus vite
document.addEventListener("DOMContentLoaded", (event) => {
    
    // On force la disparition du loader après 1 seconde
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // On lance les animations du site
                initAnimations(); 
            }, 800);
        }
    }, 1000); 

});


// --- 4. AUDIO PLAYER ---
const audio = document.getElementById('audioSource');
const playBtn = document.getElementById('playPauseBtn');
const visualizer = document.getElementById('visualizer');
let isPlaying = false;

// Volume de départ doux
audio.volume = 0.5;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        visualizer.classList.remove('playing');
    } else {
        audio.play().then(() => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            visualizer.classList.add('playing');
        }).catch(err => console.log("Audio bloqué, interaction requise"));
    }
    isPlaying = !isPlaying;
}

// Lancer la musique au premier clic sur la page si ce n'est pas fait
document.addEventListener('click', () => {
    if (!isPlaying && audio.paused) {
        // Optionnel : décommenter si tu veux que ça parte tout seul au premier clic
        // toggleMusic();
    }
}, { once: true });


// --- 5. LOGIQUE PANIER & MAP ---
let cart = [];

// Interaction Map (Tooltip)
const zones = document.querySelectorAll('.clickable-zone');
const tooltip = document.getElementById('mapTooltip');

zones.forEach(zone => {
    zone.addEventListener('mousemove', (e) => {
        // Récupérer le nom de la zone via l'attribut onclick (hack rapide)
        // ou définir des data-attributes. Ici on simplifie.
        tooltip.style.display = 'block';
        tooltip.style.left = e.offsetX + 10 + 'px';
        tooltip.style.top = e.offsetY + 10 + 'px';
        
        let zoneName = "";
        if(zone.classList.contains('zone-gold')) zoneName = "Fosse Or";
        if(zone.classList.contains('zone-fosse')) zoneName = "Fosse Debout";
        if(zone.classList.contains('zone-cat1')) zoneName = "Catégorie 1";
        if(zone.classList.contains('zone-cat2')) zoneName = "Catégorie 2";
        
        tooltip.innerText = zoneName;
    });
    
    zone.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});

function addToCart(category, price) {
    cart.push({ category, price });
    updateCartUI();
    // Animation petit flash
    gsap.to(".cart-trigger", { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const countEl = document.querySelector('.cart-count');
    const itemsContainer = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    
    // Update count
    countEl.innerText = cart.length;

    // Render Items
    itemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align:center; color:#555; margin-top:50px;">Panier vide</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            itemsContainer.innerHTML += `
                <div class="cart-item-row">
                    <div>
                        <strong>${item.category}</strong><br>
                        <small style="color:#777">Concert 2026</small>
                    </div>
                    <div style="text-align:right">
                        <div>${item.price.toFixed(2)} €</div>
                        <i class="fas fa-trash" style="color:#ff4444; cursor:pointer; font-size:0.8rem; margin-top:5px;" onclick="removeFromCart(${index})"></i>
                    </div>
                </div>
            `;
        });
    }

    totalEl.innerText = total.toFixed(2) + " €";
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Ajoutez des places d'abord !");

    let msg = "Bonjour, je souhaite commander pour OMER ADAM - PARIS 2026 :%0A%0A";
    
    // Regrouper les items
    let summary = {};
    let total = 0;
    
    cart.forEach(item => {
        summary[item.category] = (summary[item.category] || 0) + 1;
        total += item.price;
    });

    for (const [cat, qty] of Object.entries(summary)) {
        msg += `🎫 ${cat} x${qty}%0A`;
    }

    msg += `%0A💰 TOTAL ESTIMÉ : ${total.toFixed(2)} €%0A%0AMerci de m'envoyer le lien de paiement.`;

    window.open(`https://wa.me/${+33652245525}?text=${msg}`, '_blank');

}


function startExperience() {
    var audio = document.getElementById("audioSource");
    var welcome = document.getElementById("welcome-screen");
    var loader = document.getElementById("siteLoader");
    
    // NOUVEAU : On récupère l'icône du bouton et le visualiseur
    var btnIcon = document.querySelector("#playPauseBtn i"); 
    var visualizer = document.getElementById("visualizer");

    // ÉTAPE 1 : On lance la musique
    if(audio) audio.play();

    // ÉTAPE 2 : ON MET À JOUR LE BOUTON (C'est ça qui manquait !)
    if(btnIcon) {
        btnIcon.classList.remove("fa-play"); // On enlève le triangle "Play"
        btnIcon.classList.add("fa-pause");   // On met les barres "Pause"
    }
    if(visualizer) {
        visualizer.classList.add("playing"); // On active l'animation des barres
    }

    // ÉTAPE 3 : On cache l'écran d'accueil
    if(welcome) {
        welcome.style.opacity = "0";
        setTimeout(() => { welcome.style.display = "none"; }, 500);
    }

    // ÉTAPE 4 : On gère le Loader
    setTimeout(function() {
        if(loader) {
            loader.style.opacity = "0";
            setTimeout(() => { loader.style.display = "none"; }, 1000);
        }
    }, 3000); 

    
}
