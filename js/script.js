let otraCarta = document.querySelector("#btnJugar")
let carta = document.querySelector("#carta")
let baraja = document.querySelector("#baraja")
let palos = ["corazones","picas","treboles","diamantes"]
let cartas = []
let jugada = []

otraCarta.onclick=sacarCarta
mezclarCartas()
function mezclarCartas(){
    palos.forEach(palo=>{
        for(let j=1;j<14;j++){
            let carta={
                palo: palo,
                valor: j>10?10:j,
                imagen: palo+"_"+j+".svg"
            }
            cartas.push(carta)
        }
    })
    cartas.sort(()=>Math.random()-0.5)
    sacarCarta()
}

function sacarCarta(){
    carta.src="./images/baraja/" + cartas[0].imagen
    let mini=carta.cloneNode()
    mini.classList.add("mini")
    document.querySelector(".jugada").appendChild(mini)
    jugada.push(cartas.shift())
    comprobarJugada()
    if(cartas.length==0)mezclar()
}

function comprobarJugada(){
    //let puntos=jugada.reduce((a,b)=>a+Number(b.valor))
    let puntos=jugada.map(c=>c.valor).reduce((a,b) => a+b)
    if(puntos==21)
        mostrarResultado("GANADOR")
    else if(puntos>21)
        mostrarResultado("PERDEDOR")
    document.querySelector("#puntos").textContent=puntos
}

function mostrarResultado(res){
    let modal = document.querySelector(".modal")
    modal.querySelector("#resultado").textContent=res
    modal.classList.remove("modal-hidden")
}

document.querySelector(".modal button[name='cancelar']").onclick=()=>{
    modal.classList.add("modal-hidden")
    mezclarCartas()
}