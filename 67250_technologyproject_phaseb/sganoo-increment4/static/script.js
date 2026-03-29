function greeting() {
    const greetingEl = document.getElementById("greeting");
    if (!greetingEl) return; 

    const hour = new Date().getHours();

    if (hour < 5 || hour >= 20) {
        greetingEl.innerHTML = "Good night!";
    } else if (hour < 12) {
        greetingEl.innerHTML = "Good morning!";
    } else if (hour < 18) {
        greetingEl.innerHTML = "Good afternoon!";
    } else {
        greetingEl.innerHTML = "Good evening!";
    }
}
greeting();

function addYear() {
    const yearEl = document.getElementById("copyYear");
    if (yearEl) {
        yearEl.innerHTML = "&copy; " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}

function ActiveNav() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (window.location.href.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });
}
ActiveNav();

if (typeof jQuery !== 'undefined') {
    $(document).ready(function() {
        $("#readLess").click(function(){
            $("#longIntro").hide(); 
            $("#readLess").hide();
            $("#readMore").show();
        });
        $("#readMore").click(function(){
            $("#longIntro").show(); 
            $("#readLess").show();
            $("#readMore").hide();
        });
    });
}

function revealForm() {
    const form = document.getElementById("ticketForm");
    if (form) form.style.display = "block";
}

function processPayment(event) {
    event.preventDefault(); 
    alert("Redirecting to payment system.");
}