const body = document.querySelector('body')

// Create grid
const grid = document.createElement('div')
grid.classList.add('container')
body.appendChild(grid)

// Buttons selectors
const blackColor = document.getElementById('black')
const rainbowColor = document.getElementById('rainbow')
const eraser = document.getElementById('eraser')
const clear = document.getElementById('clear')
const pickColor = document.getElementById('color')
const slider = document.querySelector('#size-range')
const labelSlider = document.getElementById('label-size-range')
const cellBorderBtn = document.getElementById('cell-border-btn')

// Color default value
let color = ''

let cellBorder = true

// Pen default value
let penDown = false
createGrid()

// Event listeners
cellBorderBtn.addEventListener('click', toggleCellBorder)

const cells = document.querySelectorAll('.cell')
cells.forEach(cell => {
  cell.addEventListener('mouseenter', draw)
})
grid.addEventListener('click', togglePen)
pickColor.addEventListener('change', setColor)

slider.addEventListener('input', () => {
  createGrid()
})
slider.addEventListener('mousemove', () => {
  labelSlider.textContent = slider.value
})
blackColor.addEventListener('click', setBlack)
rainbowColor.addEventListener('click', setRainbow)
eraser.addEventListener('click', erase)

clear.addEventListener('click', () => {
  const cells = document.querySelectorAll('.cell')

  cells.forEach(cell => {
    cell.style.backgroundColor = 'white'
  })
})

// Functions definition
function createGrid() {
  clearGrid()
  penDown = false
  grid.style.gridTemplateColumns = `repeat(${slider.value},1fr)`
  grid.style.gridTemplateRows = `repeat(${slider.value},1fr)`
  for (let i = 0; i < slider.value ** 2; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
  }
  const cells = document.querySelectorAll('.cell')
  cells.forEach(cell => {
    cell.addEventListener('mouseenter', draw)
  })
}

function setColor(e) {
  color = e.target.value
  console.log(color)
}

function draw(e) {
  if (penDown) {
    switch (color) {
      case 'black':
        e.target.style.backgroundColor = 'black'
        break
      case 'white':
        e.target.style.backgroundColor = 'white'
        break
      case 'rainbow':
        e.target.style.backgroundColor = `rgb(${Math.random() * 255},${
          Math.random() * 255
        },${Math.random() * 255})`
        break
      default:
        e.target.style.backgroundColor = `${color}`
        break
    }
  }
}

function toggleCellBorder() {
  const cells = document.querySelectorAll('.cell')
  cells.forEach(cell => {
    cell.classList.toggle('border-none')
  })
}

function togglePen() {
  penDown = penDown === false ? true : false
}
function setBlack() {
  color = 'black'
}
function setRainbow() {
  color = 'rainbow'
}
function erase() {
  color = 'white'
}

function clearGrid() {
  grid.innerHTML = ``
}
