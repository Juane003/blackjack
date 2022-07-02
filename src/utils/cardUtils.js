const highCard = ["JACK", "QUEEN", "KING"];
const cardValues = (array) => {
    let value = 0;
    array.map((element) => {
        switch(element) {
            case "1":
                value += 1;
                break;
            case "2":
                value += 2;
                break;
            case "3":
                value += 3;
                break;
            case "4":
                value += 4;
                break;
            case "5":
                value += 5;
                break;
            case "6":
                value += 6;
                break;
            case "7":
                value += 7;
                break;
            case "8":
                value += 8;
                break;
            case "9":
                value += 9;
                break; 
            case "10":
            case "JACK":
            case "QUEEN":
            case "KING":
                value += 10;
                break;
            case "ACE":
                value += 11;
                break;
        }
    });
    return value;
}

const getCards = async(amount) => {
    const URL = `https://www.deckofcardsapi.com/api/deck/new/draw/?count=${amount}`;
    try{
        const cards = await fetch(URL);
        return await cards.json();
    } catch(error) {
        console.log(error);
    }
}

export { getCards, cardValues };