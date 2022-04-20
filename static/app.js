let startBtn = document.getElementById('start-btn')
let counter = document.getElementById('counter')
let goBtn = document.getElementById('go-btn')
let wordInput = document.getElementById('word-input')
let  theForm = document.getElementById('the-form')

let countdownInterval

//event handlers
startBtn.addEventListener('click', ()=> {
    let count = 5
    countdownInterval = setInterval(() =>{
        if (count == 0) {
            clearInterval(countdownInterval)
            setTimeout(() => {
                counter.innerHTML = 5
                count = 5
            }, 1000)
        } else {
            counter.innerHTML = count -= 1
        }
    }, 1000)
})

goBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    console.log(wordInput.value)
    theForm.reset()

})
