const BASE_URL = "https://deckofcardsapi.com/api/deck"

const pointsEl = document.getElementById("points")
let points = 0

const values = {
    "ACE": 11,
    "JACK": 10,
    "KING": 10,
    "QUEEN": 10,
    "10": 10,
    "9" : 9,
    "8" : 8,
    "7" : 7,
    "6" : 6,
    "5" : 5,
    "4" : 4,
    "3" : 3,
    "2" : 2
}


let deckId = undefined

const newDeckBtn = document.getElementById("newDeckBtn")
const hitBtn = document.getElementById("hitBtn")

const pickedCardsEl = document.getElementById("pickedCards")

hitBtn.disabled = true

function getNewDeck(){
    fetch(BASE_URL + "/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(deckData => {
            deckId = deckData.deck_id
            newDeckBtn.disabled = true
            hitBtn.disabled = false
        })
}

let isFirst = true
function pickCard(){
    if(isFirst){
        pickOneCard()
        pickOneCard()
        isFirst = false
    }else{
        pickOneCard()
    }
}

function pickOneCard(){
    if(!deckId){
        console.error("Nincs paklink!")
        return
    }

    let kep1 = document.createElement("img")
    let hatlap = "https://deckofcardsapi.com/static/img/back.png"
    kep1.src = hatlap

    pickedCardsEl.appendChild(kep1)

    fetch(BASE_URL + `/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(jsonRes => {
        kep1.src = jsonRes.cards[0].image
        let current = values[jsonRes.cards[0].value]
        if(jsonRes.cards[0].value == "ACE" && points + current > 21){
            current = 1
        }

        points += current
        pointsEl.innerText = points
        
    })
}

function test(){
    if(points > 21){
        alert("Vesztettél!")
        hitBtn.disabled = true
        newDeckBtn.disabled = false
        pickedCardsEl.innerHTML = ""
}}