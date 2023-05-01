// ==================== CONSTANTS ==================== //
const boton = document.querySelector(".game-restart")
const condicionDeJuego = document.querySelector('.game-notification'),
  espacioDeJuego = ["", "", "", "", "", "", "", "", ""],
  formasDeGanar = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],

  ganador = () => `El jugador ${jugador} ha ganado!`,
  empate = () => `El juego ha terminado en empate!`,
  alerta = () => ``



// ==================== VARIABLES ==================== //
let partida = true,
  jugador = "O"
let X = 0;
let O = 0;
let player1 = prompt('nombre del jugador 1')
let player2 = prompt('nombre del jugador 2')

// ==================== FUNCTIONS ==================== //

function base() {
  document.querySelector('.player1').innerText = player1
  document.querySelector('.player2').innerText = player2
  boton.style.display = "none";
  mensajeeee(alerta())
  llamado()
}

function llamado() {
  document.querySelector('.game-container').addEventListener('click', pulsacion)
  document.querySelector('.game-restart').addEventListener('click', resetear)
 
}

function mensajeeee(message) {
  condicionDeJuego.innerHTML = message
  
}

function resetear() {
  partida = true
  jugador = "X"
  reintentar()
  mensajeeee(alerta())
  document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "")
  
}

function pulsacion(click_zeldaEvent /** Type Event **/) {
  const click_zelda = click_zeldaEvent.target
  if (click_zelda.classList.contains('game-cell')) {
    const click_zeldaIndex = Array.from(click_zelda.parentNode.children).indexOf(click_zelda)
    if (espacioDeJuego[click_zeldaIndex] !== '' || !partida) {
      return false
    }

    zelda_jugador(click_zelda, click_zeldaIndex)
    validacion()
  }
}

function zelda_jugador(click_zelda /** object HTML **/, click_zeldaIndex) {
  espacioDeJuego[click_zeldaIndex] = jugador // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
  click_zelda.innerHTML = jugador // Agrega en el HTML el valor del jugador
}

function validacion() {
  let ronda = false
  for (let i = 0; i < formasDeGanar.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
    const winCondition = formasDeGanar[i] // Guarda la combinación por ejemplo: [0, 1, 2]
    let position1 = espacioDeJuego[winCondition[0]],
      position2 = espacioDeJuego[winCondition[1]],
      position3 = espacioDeJuego[winCondition[2]] // Almacena el valor del estado actual del juego según las posiciones de winCondition

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; // Si hay algún valor vacio nadie ha ganado aún
    }
    if (position1 === position2 && position2 === position3) {
      ronda = true
       // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
      break
    }
  }

  if(ronda){
    if(jugador =="X") {X++
      localStorage.setItem("jugador1", X)
      document.querySelector('#equis').textContent = X
    }
    
    else if (jugador == "O"){O++
      localStorage.setItem("jugador2", O)
      document.querySelector('#circulo').textContent = O
    }
    
}
  if (ronda) {
    mensajeeee(ganador())
    partida = false
    boton.style.display = "block";
    return
  }

document.querySelector("#equis").innerText = X
document.querySelector("#circulo").innerText = O

  let roundDraw = !espacioDeJuego.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
  if (roundDraw) {
    mensajeeee(empate())
    partida = false
    boton.style.display = "block";
    return
  }
  eta()
}

function eta() {
  jugador = jugador === "X" ? "O" : "X"
  mensajeeee(alerta())
}

function reintentar() {
  let i = espacioDeJuego.length
  while (i--) {
    espacioDeJuego[i] = ''
    boton.style.display = "none";
  }
}

function guardado_1(){
  let juga_1 = localStorage.getItem('jugador1');
  document.querySelector('#equis').textContent = juga_1
}

function guardado_2(){
  let juga_2 = localStorage.getItem('jugador2');
  document.querySelector('#circulo').textContent = juga_2
}

O = localStorage.getItem('jugador2');
X = localStorage.getItem('jugador1');
base()
guardado_1()
guardado_2()