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

// Enhanced mobile touch handling
squares.forEach(square => {
    const handleHit = (e) => {
        e.preventDefault()
        if (square.id === hitPosition && gameActive) {
            result++
            scoreElement.textContent = result
            hitPosition = null
            
            square.classList.remove('hoe')
            
            // Visual feedback
            square.style.transform = 'scale(0.9)'
            square.style.background = 'rgba(255, 255, 255, 0.2)'
            
            setTimeout(() => {
                square.style.transform = 'scale(1)'
                square.style.background = ''
            }, 150)
        }
    }
    
    // Use both click and touchstart for better mobile responsiveness
    square.addEventListener('click', handleHit)
    square.addEventListener('touchstart', handleHit, { passive: false })
    
    // Prevent context menu on long press for mobile
    square.addEventListener('contextmenu', (e) => {
        e.preventDefault()
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
        square.style.background = ''
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
        square.style.background = ''
    })
    
    // Reset button and difficulty selector
    startButton.textContent = '🎮 START GAME'
    startButton.disabled = false
    difficultySelect.disabled = false
    
    // Show results
    let message = `GAME OVER! 🎯\n\nYour Score: ${result}\n\n`
    
    if (result >= 15) {
        message += "🏆 LEGENDARY! You're a Whack-a-Hoe God!"
    } else if (result >= 10) {
        message += "🥇 AMAZING! You're a Whack-a-Hoe Master!"
    } else if (result >= 5) {
        message += "🎉 Great job! You've got good reflexes!"
    } else {
        message += "💪 No problem! They make plenty mistakes for you to practice!"
    }
    
    setTimeout(() => {
        alert(message)
    }, 500)
}

// Enhanced button event handling for mobile
startButton.addEventListener('click', startGame)
startButton.addEventListener('touchstart', (e) => {
    e.preventDefault()
    if (!startButton.disabled) {
        startGame()
    }
}, { passive: false })

// Prevent double-tap zoom on start button
startButton.addEventListener('touchend', (e) => {
    e.preventDefault()
})

difficultySelect.addEventListener('change', () => {
    if (!gameActive) {
        const selectedDifficulty = difficultySelect.value
        const setting = difficultySettings[selectedDifficulty]
        console.log(`Difficulty set to: ${setting.label} (${setting.speed}ms)`)
    }
})

// Prevent zoom on double tap for the entire game area
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault()
    }
})

let lastTouchEnd = 0
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime()
    if (now - lastTouchEnd <= 300) {
        e.preventDefault()
    }
    lastTouchEnd = now
}, false)

// Optional: Add haptic feedback for mobile devices (if supported)
function triggerHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50) // Vibrate for 50ms
    }
}

// You can call triggerHapticFeedback() when a hoe is hit for extra mobile feedback
squares.forEach(square => {
    square.addEventListener('touchstart', () => {
        if (square.id === hitPosition && gameActive) {
            triggerHapticFeedback()
        }
    })
})