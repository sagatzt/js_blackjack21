let jugador=document.querySelector("input[name='jugador']")
let imgCarta = document.querySelector("#img-carta")
let imgJugada=document.querySelector(".img-jugada")
let modal = document.querySelector(".modal")
let alert = document.querySelector(".alert")

let palos = ["corazones","picas","treboles","diamantes"]
let cartas=[],jugada=[]

//boton sacar carta
document.querySelector("#btnSacarCarta").onclick=sacarCarta
//boton me planto
document.querySelector("#btnMePlanto").onclick=()=>{
    document.querySelector("#btnSacarCarta").setAttribute("disabled",true)
    let puntos=jugada.map(c=>c.valor).reduce((a,b)=>a+b)
    if(puntos+cartas[0].valor<=21)
        mostrarMensaje(`Sabía que eras un cobarde. El siguiente valor era ${cartas[0].valor}. Tu pierdes.`)
    else
        mostrarMensaje(`Esta vez te ha salido bien. El siguiente valor era ${cartas[0].valor}. Tu ganas.`)
}
//link del menu de navegacion: reiniciar
document.querySelector("#lnkReiniciar").onclick=reiniciarPartida


/////////////////////////////////////////////////////
//comienza el juego
mezclarCartas()

function mezclarCartas(){
    palos.forEach(palo=>{
        for(let j=1;j<14;j++)
            cartas.push({palo: palo, valor: j>10?10:j, imagen: palo+"_"+j+".svg"})
    })
    cartas=cartas.sort(()=>Math.random()-0.5)
    sacarCarta()
}

function sacarCarta(){
    jugada.push(cartas.shift())
    imgCarta.src="./images/baraja/" + jugada[jugada.length-1].imagen
    let miniCarta=imgCarta.cloneNode()
    miniCarta.classList.add("mini")
    imgJugada.appendChild(miniCarta)
    comprobarJugada()
}

function comprobarJugada(){
    let puntos=jugada.map(c=>c.valor).reduce((a,b)=>a+b)
    document.querySelector("#puntos").textContent=puntos
    if(cartas.length==0) mezclarCartas()
    if(puntos==21)
        mostrarMensaje(`${puntos} puntos. Enhorabuena! por fin ganas una.`)
    else if(puntos>21)
        mostrarMensaje(`${puntos} puntos. Eres un paquete.`) 
    else{
        //mostrar una frase de animo
    }   
}

function reiniciarPartida(){
    //if(confirm("¿Deseas guardar esta partida?")) guardarPartida()
    while(imgJugada.firstChild)
        imgJugada.removeChild(imgJugada.firstChild)
    jugada=[]
    document.querySelector("#btnSacarCarta").removeAttribute("disabled")
    alert.classList.remove("mostrar")
    mezclarCartas()
}

function guardarPartida(){
    let jugadasDe=JSON.parse(localStorage.getItem(jugador.value))
    if(jugadasDe==null) jugadasDe=[]
    jugadasDe.push(jugada)
    localStorage.setItem(jugador.value,JSON.stringify(jugadasDe))
}

// Con esta función se muestra el mensaje 
function mostrarMensaje(texto) {
    alert.querySelector(".texto").innerHTML=texto
    alert.classList.add("mostrar")
}
alert.querySelector(".close").onclick=()=>alert.classList.remove("mostrar")
