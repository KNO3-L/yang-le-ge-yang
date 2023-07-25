function clickCard() {
    if (this.canclick) {
        if (myCards.childElementCount < 7) {
            toCanclick(this)
            palyarea.removeChild(this)
            myCards_addCard(this)
        }
        if (palyarea.childElementCount == 0) {
            alert('游戏结束:你赢了')
            location.reload()
        }

    }
}

function myCards_addCard(e) {
    e.removeEventListener("click", clickCard)
    l = []
    for (v of myCards.childNodes) {
        l.push(v.className)
    }
    e.style.position = "static"

    if (l.indexOf(e.className) != -1) {
        myCards.insertBefore(e, myCards.childNodes[l.indexOf(e.className)])
    }
    else { myCards.appendChild(e) }
    threeCards()
    if (myCards.childElementCount == 7) {
        alert("游戏结束:你输了")
        location.reload()
    }
}

function threeCards() {
    cards = myCards.childNodes
    d = {}
    for (let i = 1; i < cards.length; i++) {
        let cardName = cards[i].className
        if (!d[cardName]) {
            d[cardName] = 0
        }
        d[cardName] += 1
        if (d[cardName] == 3) {
            for (let j = 0; j < 3; j++) {
                // console.log(cards, i)
                myCards.removeChild(cards[i--])
            }
            break
        }
    }
}

function toCanclick(e) {
    //console.log(e.under)
    for (v of e.under) {
        v.on--
        if (v.on == 0) {
            v.style.filter = "none"
            v.canclick = true
        }
        // console.log(v.on)
    }
}

const myCards = document.getElementById("myCards")
const palyarea = document.getElementById('playarea')
const playCards = document.getElementsByClassName('card')

let cards = []
//生成卡片
for (let i = 0; i < 40; i++) {

    className = `card card${Math.floor(Math.random() * 7) + 1}`
    for (let j = 0; j < 3; j++) {
        let card = document.createElement("div")
        card.className = className
        card.under = []
        card.on = 0
        card.canclick = true
        cards.push(card)
    }
}
let times = cards.length
// 放置卡片
for (let i = 0; i < times; i++) {
    card = cards[Math.floor(Math.random() * cards.length)]

    if (i < 15) {
        card.top = document.body.clientHeight * .7 * .8
        card.left = 10 + 3 * i
    }
    else if (i < 30) {
        card.top = document.body.clientHeight * .7 * .8
        card.left = document.body.clientWidth * .9 - 10 - 3 * (i - 10)
    }
    else if (i < 70) {
        card.left = 41 * ((i - 30) % Math.ceil(document.body.clientWidth * .9 / 41)) + document.body.clientWidth * .9 % 41 / 2
        card.top = parseInt((i - 30) / Math.ceil(document.body.clientWidth * .9 / 41)) * 41

    }

    else if (i < 110) {
        card.left = 41 * ((i - 70) % (Math.ceil(document.body.clientWidth * .9 / 41) - 1)) + document.body.clientWidth * .9 % 41 / 2 + 20.5
        card.top = parseInt((i - 70) / Math.ceil(document.body.clientWidth * .9 / 41)) * 41 + 20.5
    }

    else if (i < 118) {
        card.left = 41 * ((i - 108) % (Math.ceil(document.body.clientWidth * .9 / 41) - 2)) + document.body.clientWidth * .9 % 41 / 2 + 41
        card.top = parseInt((i - 110) / Math.ceil(document.body.clientWidth * .9 / 41)) * 41 + 41
    }

    else {
        card.left = document.body.clientWidth * .9 / 2 + (i - 118) * 41 - 21
        card.top = document.body.clientHeight * .7 * .35
    }

    card.style.top = card.top + "px"
    card.style.left = card.left + "px"
    card.style.zIndex = toString(i)

    for (v of playarea.childNodes) {
        if (Math.abs(v.top - card.top) < 40 && Math.abs(v.left - card.left) < 40) {
            card.under.push(v)
            v.on++
            v.style.filter = "grayscale(80%)"
            v.canclick = false
        }
    }
    playarea.appendChild(card)
    cards.splice(cards.indexOf(card), 1)
}

for (v of playCards) {
    v.addEventListener("click", clickCard)
}
// bgm = document.getElementById("bgm")
// bgm.play()
