const deserializedDeck = (deck) => ({
        deckId:  deck.deck_id,
        cards: deck.cards,
    })

const deserializedCard = (card) => ({
    card: card.cards[0]
})

const cardValues = (array) => {
    let value = 0;
    array.map((element) => {
        switch(element) { 
            case "JACK":
            case "QUEEN":
            case "KING":
                value += 10;
                break;
            case "ACE":
                value += 11;
                break;
            default:
                value += parseInt(element);
                break;
        }
    });
    return value;
}

const getCards = async(amount, deckId = 'new') => {
    const URL = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${amount}`;
    try{
        const cards = await fetch(URL);
        return await cards.json();
    } catch(error) {
        console.log(error);
    }
}

export { getCards, cardValues, deserializedDeck, deserializedCard };