var x = 5;
var y = 7;
var z = x + y;

console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;

console.log(C);

function sumnPrint(x1, x2) {
    console.log(x1 + x2);
}

sumnPrint(x, y);
sumnPrint(A, B);

if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}

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