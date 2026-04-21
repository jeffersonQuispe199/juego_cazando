// Referencia al canvas y su contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Variables de posición
let gatoX = canvas.width / 2;
let gatoY = canvas.height / 2;
let comidaX = Math.random() * (canvas.width - 40);
let comidaY = Math.random() * (canvas.height - 40);

// Variables de estado
let puntos = 0;
let tiempo = 10;
let intervaloTiempo;
let juegoActivo = false;
let tiempoMaximo = 10;

// Constantes de tamaño
const ALTO_GATO = 50;  // Ajustado para que se vea mejor la imagen
const ANCHO_GATO = 50; 
const ALTO_COMIDA = 40;
const ANCHO_COMIDA = 40;

// --- NUEVA SECCIÓN: CARGA DE IMAGEN ---
const imagenGato = new Image();
imagenGato.src = "gato.png"; // Asegúrate de que el archivo se llame exactamente así
// --------------------------------------

function graficarGato() {
    // Dibujamos la imagen en lugar del rectángulo
    if (imagenGato.complete) {
        ctx.drawImage(imagenGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
    } else {
        // Respaldo visual por si la imagen tarda en cargar
        ctx.fillStyle = "#f33c0f";
        ctx.fillRect(gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
    }
}

function crearComida() {
    ctx.fillStyle = "#27b83f";
    ctx.fillRect(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
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

// Movimientos
function moverIzquierda() {
    if (!juegoActivo) return;
    gatoX -= 15; // Aumenté un poco la velocidad para que sea más fluido
    actualizarPantalla();
}

function moverDerecha() {
    if (!juegoActivo) return;
    gatoX += 15;
    actualizarPantalla();
}

function moverArriba() {
    if (!juegoActivo) return;
    gatoY -= 15;
    actualizarPantalla();
}

function moverAbajo() {
    if (!juegoActivo) return;
    gatoY += 15;
    actualizarPantalla();
}

function detectarColision() {
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    ) {
        puntos++;
        document.getElementById("puntos").innerText = puntos;
        
        // Lógica de dificultad: el tiempo se vuelve más corto cada vez
        if (tiempoMaximo > 3) tiempoMaximo--; 
        tiempo = tiempoMaximo;
        document.getElementById("tiempo").innerText = tiempo; 
        
        comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
        comidaY = Math.random() * (canvas.height - ALTO_COMIDA);
        
        if (puntos >= 10) { // Subí la meta a 10 puntos
            finalizarJuego("¡Nivel Completado!"); 
        }
    }
}

function restarTiempo() {
    if (!juegoActivo) return;
    tiempo--;
    document.getElementById("tiempo").innerText = tiempo;
    
    if (tiempo <= 0) {
        finalizarJuego("Game Over"); 
    }
}

function iniciarJuego() {
    if (juegoActivo) return;
    juegoActivo = true;
    
    // Reiniciar valores por si acaso
    puntos = 0;
    tiempo = 10;
    
    actualizarPantalla();
    // IMPORTANTE: Cambié 15000 a 1000 para que el tiempo baje cada segundo
    intervaloTiempo = setInterval(restarTiempo, 1000); 
}

function finalizarJuego(msg) {
    juegoActivo = false;
    clearInterval(intervaloTiempo);
    document.getElementById("mensaje").innerText = msg;
    setTimeout(() => alert(msg), 100); // Un pequeño delay para que se vea el último movimiento
}

function reiniciarJuego() {
    location.reload();
}

window.onload = () => {
    // Dibujamos el estado inicial una vez que cargue la página
    actualizarPantalla();
};