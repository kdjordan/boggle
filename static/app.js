let startBtn = document.getElementById('start-btn')
let counter = document.getElementById('counter')
let goBtn = document.getElementById('go-btn')
let wordInput = document.getElementById('word-input')
let theForm = document.getElementById('the-form')
let goodList = document.getElementById('good-list')
let badList = document.getElementById('bad-list')
let goodCount = document.getElementById('good-word-count')
let badCount = document.getElementById('bad-word-count')
let goodCountNum = 0
let badCountNum = 0

let countdownInterval
console.log(goodCount.innerText)
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

goBtn.addEventListener('click', async (e)=> {
    e.preventDefault()
    try {
        let word = wordInput.value
        theForm.reset()
        let res = await axios.post('http://127.0.0.1:5000/submit', {'word': word})

        if (Object.keys(res.data)[0] == 'ok') {
            console.log('append to good', Object.values(res.data)[0])
            addToList(goodList, Object.values(res.data)[0])
            goodCount.innerText = goodCountNum += 1
        } else {
            console.log('append to bad', Object.values(res.data)[0])
            addToList(badList, Object.values(res.data)[0])
            badCount.innerText = badCountNum += 1
            console.log('bad count', badCountNum)
        }
    } catch(e) {
        console.log('error in axios', e)
    }
})

//UI function to add to word lists
function addToList(list, word) {
    var li = document.createElement("li")
    li.innerText = word
    list.appendChild(li)
}
