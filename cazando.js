// Referencia al canvas y su contexto para poder dibujar en 2D 
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Variables de posición (coordenadas X e Y) 
let gatoX = canvas.width / 2; // Inicia en el centro horizontal
let gatoY = canvas.height / 2; // Inicia en el centro vertical
let comidaX = Math.random() * (canvas.width - 40); // Posición aleatoria inicial 
let comidaY = Math.random() * (canvas.height - 40);

// Variables de control de estado y puntaje 
let puntos = 0;
let tiempo = 10;
let intervaloTiempo; // Guardará el setInterval para poder detenerlo 
let juegoActivo = false;

// Constantes de tamaño para los personajes 
const ALTO_GATO = 40;
const ANCHO_GATO = 60;
const ALTO_COMIDA = 40;
const ANCHO_COMIDA = 40;

// Función para dibujar al "Gato" (un rectángulo naranja) 
function graficarGato() {
    ctx.fillStyle = "#f33c0f";
    ctx.fillRect(gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

// Función para dibujar la "Comida" (un rectángulo verde) 
function crearComida() {
    ctx.fillStyle = "#27b83f";
    ctx.fillRect(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

// Borra todo el contenido del canvas para redibujar en la nueva posición 
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función central que refresca la pantalla tras cada movimiento o cambio 
function actualizarPantalla() {
    limpiarCanva();
    graficarGato();
    crearComida();
    detectarColision(); // Verifica si hubo contacto después de mover 
}

// Funciones de Movimiento 
function moverIzquierda() {
    if (!juegoActivo) return; // No permite mover si el juego terminó
    gatoX -= 10; // Resta 10 píxeles a la posición X 
    actualizarPantalla();
}

function moverDerecha() {
    if (!juegoActivo) return;
    gatoX += 10; // Suma 10 píxeles a X 
    actualizarPantalla();
}

function moverArriba() {
    if (!juegoActivo) return;
    gatoY -= 10; // Resta 10 píxeles a Y 
    actualizarPantalla();
}

function moverAbajo() {
    if (!juegoActivo) return;
    gatoY += 10; // Suma 10 píxeles a Y 
    actualizarPantalla();
}

// Lógica de Colisión 
function detectarColision() {
    // Comprueba si los rectángulos se superponen en sus ejes X e Y 
    if (
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY
    ) {
        puntos++; // Incrementa puntaje 
        document.getElementById("puntos").innerText = puntos; // Actualiza vista 
        
        // La comida desaparece y reaparece en otro lugar 
        comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
        comidaY = Math.random() * (canvas.height - ALTO_COMIDA);
        
        // Condición de victoria 
        if (puntos >= 6) {
            finalizarJuego("¡Ganaste!"); 
        }
    }
}

//  Temporizador 
function restarTiempo() {
    tiempo--; // Resta 1 al tiempo actual [cite: 57]
    document.getElementById("tiempo").innerText = tiempo; // Muestra en pantalla 
    
    // Condición de derrota 
    if (tiempo <= 0) {
        finalizarJuego("Game Over"); 
    }
}

// Inicia las mecánicas del juego
function iniciarJuego() {
    if (juegoActivo) return;
    juegoActivo = true;
    actualizarPantalla();
    // Ejecuta restarTiempo cada 1000ms (1 segundo) 
    intervaloTiempo = setInterval(restarTiempo, 1000); 
}

// Detiene el juego y muestra alertas 
function finalizarJuego(msg) {
    juegoActivo = false;
    clearInterval(intervaloTiempo); // Detiene el conteo regresivo 
    document.getElementById("mensaje").innerText = msg;
    alert(msg);
}

// Reinicia la aplicación 
function reiniciarJuego() {
    location.reload(); // Recarga la página para resetear todo
}

// Dispara el inicio al cargar la ventana
window.onload = iniciarJuego;