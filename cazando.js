let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

let gatoX = canvas.width / 2;
let gatoY = canvas.height / 2;
let comidaX = Math.random() * (canvas.width - 40);
let comidaY = Math.random() * (canvas.height - 40);

let puntos = 0;
let tiempo = 10;
let intervaloTiempo;
let juegoActivo = false;
let tiempoMaximo = 10;

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 40;
const ANCHO_COMIDA = 40;

// --- CARGA DE IMÁGENES ---
const imagenGato = new Image();
imagenGato.src = "gato.png"; 

const imagenComida = new Image();
imagenComida.src = "comida.jpg"; // Asegúrate de tener este archivo en tu carpeta
// -------------------------

function graficarGato() {
    if (imagenGato.complete) {
        ctx.drawImage(imagenGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
    } else {
        ctx.fillStyle = "#f33c0f";
        ctx.fillRect(gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
    }
}

function crearComida() {
    // Ahora dibujamos la imagen de la comida
    if (imagenComida.complete) {
        ctx.drawImage(imagenComida, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
    } else {
        // Respaldo verde por si no carga la imagen
        ctx.fillStyle = "#27b83f";
        ctx.fillRect(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
    }
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarPantalla() {
    limpiarCanva();
    graficarGato();
    crearComida();
    detectarColision();
}

// Movimientos (puedes ajustar la velocidad aquí)
function moverIzquierda() { if (juegoActivo) { gatoX -= 15; actualizarPantalla(); } }
function moverDerecha() { if (juegoActivo) { gatoX += 15; actualizarPantalla(); } }
function moverArriba() { if (juegoActivo) { gatoY -= 15; actualizarPantalla(); } }
function moverAbajo() { if (juegoActivo) { gatoY += 15; actualizarPantalla(); } }

function detectarColision() {
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    ) {
        puntos++;
        document.getElementById("puntos").innerText = puntos;
        
        if (tiempoMaximo > 3) tiempoMaximo--; 
        tiempo = tiempoMaximo;
        document.getElementById("tiempo").innerText = tiempo; 
        
        comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
        comidaY = Math.random() * (canvas.height - ALTO_COMIDA);
        
        if (puntos >= 10) {
            finalizarJuego("¡Nivel Completado!"); 
        }
    }
}

function restarTiempo() {
    if (!juegoActivo) return;
    tiempo--;
    document.getElementById("tiempo").innerText = tiempo;
    if (tiempo <= 0) finalizarJuego("Game Over"); 
}

function iniciarJuego() {
    if (juegoActivo) return;
    juegoActivo = true;
    puntos = 0;
    tiempo = 10;
    actualizarPantalla();
    intervaloTiempo = setInterval(restarTiempo, 1000); 
}

function finalizarJuego(msg) {
    juegoActivo = false;
    clearInterval(intervaloTiempo);
    document.getElementById("mensaje").innerText = msg;
    setTimeout(() => alert(msg), 100);
}

window.onload = () => {
    actualizarPantalla();
};