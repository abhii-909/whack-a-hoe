// const square = document.querySelectorAll('.square')
// const timeleft = document.querySelector('#time-left')
// let score = document.querySelector('#score')

// let result = 0
// let hitPosition
// let currentTime = 20
// let timerId = null

// function randomSquare() {
//     square.forEach(square => {
//         square.classList.remove('hoe')
//     })

//     let randomPosition = square[Math.floor(Math.random() * 9)]
//     randomPosition.classList.add('hoe')

//     hitPosition = randomPosition.id
// }

// square.forEach(square => {
//     square.addEventListener('mouseup', () => {
//         if(square.id === hitPosition){
//             result++
//             score.textContent = result
//             hitPosition = null
//         }
//     })
// })


// function moveHoe() {
//     timerId = setInterval(randomSquare, 500)
// }

// moveHoe()

// function countDown() {
//     currentTime--
//     timeleft.textContent = currentTime

//     if(currentTime === 0) {
//         clearInterval(countDowntimerId)
//         clearInterval(timerId)
//         alert('GAME OVER! Your final score is ' + result)
//     }
// }

// let countDowntimerId = setInterval(countDown, 1000)


const squares = document.querySelectorAll('.square')
const timeLeft = document.querySelector('#time-left')
const scoreElement = document.querySelector('#score')
const startButton = document.querySelector('#start-btn')
const difficultySelect = document.querySelector('#difficulty')

let result = 0
let hitPosition
let currentTime = 20
let timerId = null
let countDownTimerId = null
let gameActive = false
let moleSpeed = 800

// Difficulty settings
const difficultySettings = {
    easy: { speed: 1200, label: '😊 Easy' },
    normal: { speed: 800, label: '😐 Normal' },
    hard: { speed: 500, label: '😤 Hard' },
    insane: { speed: 300, label: '🔥 Insane' }
}

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('hoe')
    })

    let randomPosition = squares[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('hoe')
    hitPosition = randomPosition.id
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id === hitPosition && gameActive) {
            result++
            scoreElement.textContent = result
            hitPosition = null
            
            square.classList.remove('hoe')
            
            square.style.transform = 'scale(0.9)'
            setTimeout(() => {
                square.style.transform = 'scale(1)'
            }, 100)
        }
    })
})

function moveHoe() {
    timerId = setInterval(randomSquare, moleSpeed)
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime === 0) {
        endGame()
    }
}

function startGame() {
    // Reset game state
    result = 0
    currentTime = 20
    gameActive = true
    hitPosition = null
    
    const selectedDifficulty = difficultySelect.value
    moleSpeed = difficultySettings[selectedDifficulty].speed
    
    scoreElement.textContent = result
    timeLeft.textContent = currentTime
    startButton.textContent = '🎮 GAME RUNNING...'
    startButton.disabled = true
    difficultySelect.disabled = true
    
    if (timerId) clearInterval(timerId)
    if (countDownTimerId) clearInterval(countDownTimerId)
    
    squares.forEach(square => {
        square.classList.remove('hoe')
        square.style.transform = 'scale(1)'
    })
    
    moveHoe()
    countDownTimerId = setInterval(countDown, 1000)
}

function endGame() {
    gameActive = false
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    
    squares.forEach(square => {
        square.classList.remove('hoe')
        square.style.transform = 'scale(1)'
    })
    
    startButton.textContent = '🎮 START GAME'
    startButton.disabled = false
    difficultySelect.disabled = false
    
    let message = `GAME OVER! 🎯\n\nYour Score: ${result}\n`
    
    if (result >= 10) {
        message += "🏆 AMAZING! You're a Whack-a-Hoe Master!"
    } else if (result >= 5) {
        message += "🎉 Great job! You've got good reflexes!"
    } else {
        message += "💪 No problem! They make penty mistakes for you to practice!"
    }
    
    setTimeout(() => {
        alert(message)
    }, 500)
}

startButton.addEventListener('click', startGame)

difficultySelect.addEventListener('change', () => {
    if (!gameActive) {
        const selectedDifficulty = difficultySelect.value
        const setting = difficultySettings[selectedDifficulty]
        console.log(`Difficulty set to: ${setting.label} (${setting.speed}ms)`)
    }
})