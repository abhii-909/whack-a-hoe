const square = document.querySelectorAll('.square')
const hoe = document.querySelector('.hoe')
const timeleft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 20
let timerId = null

function randomSquare() {
    square.forEach(square => {
        square.classList.remove('hoe')
    })

    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('hoe')

    hitPosition = randomPosition.id
}

square.forEach(square => {
    square.addEventListener('mouseup', () => {
        if(square.id === hitPosition){
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})


function moveHoe() {
    timerId = setInterval(randomSquare, 500)
}

moveHoe()

function countDown() {
    currentTime--
    timeleft.textContent = currentTime

    if(currentTime === 0) {
        clearInterval(countDowntimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your final score is ' + result)
    }
}

let countDowntimerId = setInterval(countDown, 1000)