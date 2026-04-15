let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");
let gatoX = 0;
let gatoY =0;
let comidaX=0;
let comidaY=0;


const ALTO_GATO=40 ;
const ANCHO_GATO =60;
const ALTO_COMIDA=40;
const ANCHO_COMIDA=40;


function graficarGato(){
    ctx.fillStyle = "#f33c0f"
   ctx.fillRect(gatoX,gatoY,ANCHO_GATO,ALTO_GATO);



}
function crearComida(){
    ctx.fillStyle ="#27b83f";
    ctx.fillRect(comidaX,comidaY,ANCHO_COMIDA,ALTO_COMIDA);
}
function iniciarJuego(){
    graficarGato();
    crearComida();


}
 