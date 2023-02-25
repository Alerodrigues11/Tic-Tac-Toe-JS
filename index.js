// Variáveis Globais
const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''

function updateTitle() {
  
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
  // Inicializa as variáveis globais
  document.getElementById('start').innerText = 'Começar!'
  vBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  turnPlayer = 'player1'
  // Ajusta o título da página
  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
  updateTitle()
  // Limpa o tabuleiro
  boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.innerText = ''
    element.addEventListener('click', handleBoardClick)
  })
}

function getWinRegions() {
  // Verifica se existem três regiões iguais em sequência e devolve as regiões
  const winRegions = []

  if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

function handleBoardClick(ev) {
  // Obtém os índices da região clicada
  const region = ev.currentTarget.dataset.region // 0.1
  const rowColumnPair = region.split('.') // ["0", "1"]
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]
  // Marca a região clicada com o símbolo do jogador
  if (turnPlayer === 'player1') {
    ev.currentTarget.innerText = 'X'
    vBoard[row][column] = 'X'
    // Desabilita uma região do tabuleiro para que não seja mais clicável
    ev.currentTarget.removeEventListener('click', handleBoardClick)
    ev.currentTarget.style.cursor = 'default'
  } else {
    ev.currentTarget.innerText = 'O'
    vBoard[row][column] = 'O'
    ev.currentTarget.removeEventListener('click', handleBoardClick)
    ev.currentTarget.style.cursor = 'default'
  }

  console.clear()
  console.table(vBoard)
  const winRegions = getWinRegions()
  if (winRegions.length > 0) {
    // Pinta as regiões onde o jogador venceu e mostra seu nome na tela
    for(let i = 0; i < winRegions.length; i++) {
      document.querySelector('[data-region="' + winRegions[i] + '"').classList.add('win')
    }

    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + ' venceu!'

    boardRegions.forEach(function (element) {    
      element.removeEventListener('click', handleBoardClick)
      element.style.cursor = 'default'
    })

    document.getElementById('start').innerText = 'Recomeçar'

  } else if (vBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  } else {
    document.querySelector('h2').innerHTML = 'Empate'
  }
}

// Adiciona o evento no botão que inicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)