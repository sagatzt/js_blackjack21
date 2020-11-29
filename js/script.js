let carta = document.querySelector("#carta")
let baraja = document.querySelector("#baraja")
let modal = document.querySelector(".modal")
let jugadaCartas=document.querySelector(".jugada-cartas")

let palos = ["corazones","picas","treboles","diamantes"]
let cartas=[],jugada=[], puntos=0

//boton modal reiniciar
modal.querySelector("button[name='btnReiniciar']").onclick=()=>{
    console.log("hola")
    modal.classList.add("modal-hidden")
    reiniciarPartida()
}
//boton sacar carta
document.querySelector("#btnSacarCarta").onclick=sacarCarta
//boton me planto
document.querySelector("#btnMePlanto").onclick=()=>{
    document.querySelector("#btnSacarCarta").setAttribute("disabled",true)
}


//comienza el juego
mezclarCartas()

function mezclarCartas(){
    palos.forEach(palo=>{
        for(let j=1;j<14;j++)
            cartas.push({palo: palo, valor: j>10?10:j, imagen: palo+"_"+j+".svg"})
    })
    cartas.sort(()=>Math.random()-0.5)
    sacarCarta()
}

function sacarCarta(){
    carta.src="./images/baraja/" + cartas[0].imagen
    let miniCarta=carta.cloneNode()
    miniCarta.classList.add("mini")
    puntos+=cartas[0].valor
    document.querySelector("#puntos").textContent=puntos
    jugadaCartas.appendChild(miniCarta)
    cartas.shift()
    if(cartas.length==0) mezclarCartas()
    comprobarJugada()
}

function comprobarJugada(){
    if(puntos>=21){
        let res=puntos==21?"HAS GANADO":"HAS PERDIDO"
        modal.querySelector("#resultado").textContent=res    
        modal.classList.remove("modal-hidden")
    }
}

function reiniciarPartida(){
    while(jugadaCartas.firstChild)
        jugadaCartas.removeChild(jugadaCartas.firstChild)
    puntos=0
    mezclarCartas()
}

