const BASE_URL = "https://deckofcardsapi.com/api/deck"
const newDeckUrl = BASE_URL + "new/shuffle/?deck_count=1"
let deckId = undefined

function getNewDeck(){
    fetch(newDeckUrl)
        .then(response => response.json())
        .then(deckData => {
            deckId = deckData.deck_id
        })
}

function pickCards(){
    if(!deckId){
        console.error("No deck id")
        return
    }
    fetch(BASE_URL + `/${deckId}/draw/?count=2`)
}