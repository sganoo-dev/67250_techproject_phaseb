function toggleNav() {
    var x = document.getElementById("myLinks");
    if (x.className === "nav-links") {
        x.className += " responsive";
    } else {
        x.className = "nav-links";
    }
}

function changeImage(element) {
    document.getElementById('mainImage').src = element.src;
    document.getElementById('mainImage').alt = element.alt;
    
    var thumbs = document.getElementsByClassName('thumb');
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove('active');
    }
    element.classList.add('active');
}

$(document).ready(function(){
    $(".accordion-header").click(function(){
        $(this).next(".accordion-content").slideToggle(300);
        $(".accordion-content").not($(this).next()).slideUp(300);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    
    if (document.getElementById('map')) {
        var lat = 52.3584; 
        var lng = 4.8811;
        var zoom = 15;

        var map = L.map('map').setView([lat, lng], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup('<b>MonoMuse</b><br>The Van Gogh Experience.')
            .openPopup();
    }

    const quantityInput = document.getElementById('ticketQuantity');
    const priceDisplay = document.getElementById('totalPrice');
    const ticketForm = document.getElementById('checkoutForm');

    if (quantityInput && priceDisplay) {
        quantityInput.addEventListener('input', function() {
            let quantity = parseInt(this.value) || 0;
            let total = quantity * 18;
            priceDisplay.textContent = total;
        });
    }

    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let quantity = parseInt(quantityInput.value) || 0;
            let total = quantity * 18;
            
            localStorage.setItem('ticketTotal', total);
            window.location.href = 'confirmation.html';
        });
    }

    const finalTotalDisplay = document.getElementById('finalTotal');
    if (finalTotalDisplay) {
        let savedTotal = localStorage.getItem('ticketTotal') || 0;
        finalTotalDisplay.textContent = savedTotal;
    }
});