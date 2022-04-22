//grab our elements that we will be using
let startBtn = document.getElementById('start-btn')
let counter = document.getElementById('counter')
let goBtn = document.getElementById('go-btn')
let resetBtn = document.getElementById('reset-btn')
let closeBtn = document.getElementById('close-btn')
let wordInput = document.getElementById('word-input')
let theForm = document.getElementById('the-form')
let goodList = document.getElementById('good-list')
let badList = document.getElementById('bad-list')
let nonList = document.getElementById('non-list')
let goodCount = document.getElementById('good-word-count')
let badCount = document.getElementById('bad-word-count')
let nonCount = document.getElementById('non-word-count')
let scoreDisplay = document.getElementById('score')
let popUp = document.querySelector('.popup')

let goodCountNum = 0
let badCountNum = 0
let nonCountNum = 0
let score = 0
let countdownInterval

counter.innerHTML = 5
//disable submit word function until timer has started
goBtn.disabled = true

//event handlers

//start button begins the countdown clock and enables the submit functionality for the form
//once the timer is up it disables the ability to input words from the form
startBtn.addEventListener('click', ()=> {
    goBtn.removeAttribute('disabled')
    resetBtn.disabled = true
    let count = 5
    startBtn.disabled = true
    countdownInterval = setInterval(() =>{
        if (count == 0) {
            clearInterval(countdownInterval)
            startBtn.removeAttribute('disabled')
            resetBtn.removeAttribute('disabled')
            goBtn.disabled = true
            finalizeGame()
            setTimeout(() => {
                counter.innerHTML = 5
                count = 5
            }, 1000)
        } else {
            counter.innerHTML = count -= 1
        }
    }, 1000)
})


//submit button takes words from the form and utilized ajax to send to our /submit route
//with the result the handler calls 'addToList' to display the word as either 'good' or 'bad'
goBtn.addEventListener('click', async (e)=> {
    e.preventDefault()
    try {
        let word = wordInput.value
        theForm.reset()
        let res = await axios.post('http://127.0.0.1:5000/submit', {'word': word})

        if (Object.keys(res.data)[0] == 'ok') {
            addToList(goodList, Object.values(res.data)[0])
            goodCount.innerText = goodCountNum += 1
        } else if (Object.keys(res.data)[0] == 'not-on-board'){
            addToList(badList, Object.values(res.data)[0])
            badCount.innerText = badCountNum += 1
        }
        else {
            addToList(nonList, Object.values(res.data)[0])
            nonCount.innerText = nonCountNum += 1
        }
    } catch(e) {
        console.log('error in axios', e)
    }
})

closeBtn.addEventListener('click',  ()=> {
    popUp.style.top = `-200%`
    window.location.replace("http://127.0.0.1:5000/");
})


//UI function to add to word lists based on response from /submit
//good words are words that are in the grid
//bad words are not words and words that are not in the grid
function addToList(list, word) {
    var li = document.createElement("li")
    li.innerText = word
    list.appendChild(li)

    if (list === goodList) {
        scoreDisplay.innerHTML = score += word.length
    }
}

async function finalizeGame() {
    try {
        await axios.get('http://127.0.0.1:5000/finalize')
        popUp.style.top = `10%`
    } catch(e) {
    console.log('error updating game count', e)
    }

}
