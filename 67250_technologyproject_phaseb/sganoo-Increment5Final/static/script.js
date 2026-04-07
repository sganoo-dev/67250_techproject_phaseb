
var TICKET_PRICES = { general: 18, student: 18, member: 18 };


function toggleNav() {
    document.getElementById("myLinks").classList.toggle("responsive");
}

function changeImage(element) {
    var main = document.getElementById('mainImage');
    if (!main) return;
    main.style.opacity = '0';
    setTimeout(function () {
        main.src = element.src;
        main.alt = element.alt;
        main.style.opacity = '1';
    }, 200);
    document.querySelectorAll('.thumb').forEach(function (t) { t.classList.remove('active'); });
    element.classList.add('active');
}


function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.classList.remove('nav-active');
        if (link.getAttribute('href').split('/').pop() === currentPage) {
            link.classList.add('nav-active');
        }
    });
}


function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('field-invalid');
    if (error) error.textContent = message;
}

function clearError(fieldId) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('field-invalid');
    if (error) error.textContent = '';
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function updateTicketPrice() {
    var qty       = parseInt((document.getElementById('ticketQuantity') || {}).value) || 1;
    var type      = (document.getElementById('ticketType') || {}).value || 'general';
    var display   = document.getElementById('totalPrice');
    if (display) display.textContent = qty * (TICKET_PRICES[type] || 18);
}


function validateTicketForm() {
    var valid = true;

    clearError('visitDate');
    if (!document.getElementById('visitDate').value) {
        showError('visitDate', 'Please select a visit date.'); valid = false;
    }

    clearError('ticketType');
    if (!document.getElementById('ticketType').value) {
        showError('ticketType', 'Please select a ticket type.'); valid = false;
    }

    clearError('ticketQuantity');
    var qty = parseInt(document.getElementById('ticketQuantity').value);
    if (!qty || qty < 1 || qty > 10) {
        showError('ticketQuantity', 'Please enter a quantity between 1 and 10.'); valid = false;
    }

    clearError('email');
    if (!validateEmail((document.getElementById('email') || {}).value || '')) {
        showError('email', 'Please enter a valid email address.'); valid = false;
    }

    clearError('zipCode');
    var zip = (document.getElementById('zipCode') || {}).value || '';
    if (zip && !/^\d{5}$/.test(zip)) {
        showError('zipCode', 'Zip code must be exactly 5 digits.'); valid = false;
    }

    return valid;
}


function validateDonationForm() {
    var valid = true;

    clearError('donorName');
    if (!((document.getElementById('donorName') || {}).value || '').trim()) {
        showError('donorName', 'Please enter your name.'); valid = false;
    }

    clearError('donorEmail');
    if (!validateEmail((document.getElementById('donorEmail') || {}).value || '')) {
        showError('donorEmail', 'Please enter a valid email address.'); valid = false;
    }

    clearError('donationAmount');
    var amt = (document.getElementById('donationAmount') || {}).value || '';
    if (!amt) { showError('donationAmount', 'Please select a donation amount.'); valid = false; }

    if (amt === 'other') {
        clearError('customAmount');
        var custom = parseInt((document.getElementById('customAmount') || {}).value);
        if (!custom || custom < 1) {
            showError('customAmount', 'Please enter an amount greater than $0.'); valid = false;
        }
    }

    return valid;
}


document.addEventListener("DOMContentLoaded", function () {

    /* Image fade transition */
    var mainImg = document.getElementById('mainImage');
    if (mainImg) mainImg.style.transition = 'opacity 0.2s ease';

    
    setActiveNav();

    /* Footer year */
    document.querySelectorAll('#copyYear').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    
    if (typeof $ !== 'undefined') {
        $('#membershipFAQ .accordion-header').on('click', function () {
            var $content = $(this).next('.accordion-content');
            var isOpen   = $(this).hasClass('open');
            $('#membershipFAQ .accordion-header').removeClass('open').attr('aria-expanded', 'false');
            $('#membershipFAQ .accordion-content').slideUp(250);
            if (!isOpen) {
                $(this).addClass('open').attr('aria-expanded', 'true');
                $content.slideDown(250);
            }
        });
    }

   
    document.querySelectorAll('#exhibitionsAccordion .accordion-header').forEach(function (header) {
        header.addEventListener('click', function () {
            var content = this.nextElementSibling;
            var isOpen  = this.classList.contains('open');
            document.querySelectorAll('#exhibitionsAccordion .accordion-header').forEach(function (h) {
                h.classList.remove('open');
                h.setAttribute('aria-expanded', 'false');
                h.nextElementSibling.style.display = 'none';
            });
            if (!isOpen) {
                this.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
                content.style.display = 'block';
            }
        });
    });

    
    if (document.getElementById('map') && typeof L !== 'undefined') {
        var map = L.map('map').setView([52.3584, 4.8811], 15);
        /* OpenStreetMap tile layer */
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([52.3584, 4.8811]).addTo(map)
            .bindPopup('<b>MonoMuse</b><br>The Van Gogh Experience<br>Museumplein 6, Amsterdam')
            .openPopup();
    }

    
    var qtyInput  = document.getElementById('ticketQuantity');
    var typeInput = document.getElementById('ticketType');
    if (qtyInput)  qtyInput.addEventListener('input',  updateTicketPrice);
    if (typeInput) typeInput.addEventListener('change', updateTicketPrice);

    
    var ticketForm = document.getElementById('checkoutForm');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateTicketForm()) return;
            var qty   = parseInt(document.getElementById('ticketQuantity').value);
            var type  = document.getElementById('ticketType').value;
            var total = qty * (TICKET_PRICES[type] || 18);
            localStorage.setItem('ticketTotal',    total);
            localStorage.setItem('ticketQuantity', qty);
            localStorage.setItem('ticketType',     type);
            localStorage.setItem('visitDate',      document.getElementById('visitDate').value);
            window.location.href = 'confirmation.html';
        });
    }

    
    ['finalTotal','finalQty','finalDate'].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var keys = { finalTotal: 'ticketTotal', finalQty: 'ticketQuantity', finalDate: 'visitDate' };
        el.textContent = localStorage.getItem(keys[id]) || '';
    });
    var finalType = document.getElementById('finalType');
    if (finalType) {
        var t = localStorage.getItem('ticketType') || 'general';
        finalType.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    }

    var donationSelect = document.getElementById('donationAmount');
    if (donationSelect) {
        donationSelect.addEventListener('change', function () {
            var cg = document.getElementById('customAmountGroup');
            if (cg) cg.style.display = this.value === 'other' ? 'block' : 'none';
        });
    }

    
    var donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateDonationForm()) return;
            alert('Thank you for your donation! A receipt will be sent to your email.');
            donationForm.reset();
            var cg = document.getElementById('customAmountGroup');
            if (cg) cg.style.display = 'none';
        });
    }

    
    ['visitDate','ticketType','ticketQuantity','email','zipCode',
     'donorName','donorEmail','donationAmount','customAmount'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener('input',  function () { clearError(id); });
            el.addEventListener('change', function () { clearError(id); });
        }
    });

});
