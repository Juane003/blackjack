import { useEffect, useState } from "react"
import { getCards, cardValues, deserializedDeck, deserializedCard } from "../../utils/cardUtils";
import "./deck.css";
import Button from "../Button/Button";
import Card from "../Card/Card";
import Display from "../Display/Display";

const Deck = () => {
    const [hand, setHand] = useState([]);
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0);
    const [deckId, setDeckId] = useState(null);


    useEffect(() => {
        const fetchCards = async () => {
            const cardObject = await getCards(2);
            const {cards, deckId} = deserializedDeck(cardObject);

            setHand(cards);
            setResult(cards.map(element => element.value));
            setDeckId(deckId);
        };

        fetchCards();
        
    }, []);

    useEffect(() => {
        setCount(cardValues(result));
    }, [result])

    if (!hand) {
        return null;
    }

    const handleClick = async () => {
        const cardObject = await getCards(1, deckId);
        const { card } = deserializedCard(cardObject)

        setHand((old) => [...old, card]);
        setResult((old) => [...old, card.value]);
    }

    return (
        <div className="container">
            <Button text={"Draw a card"} onClick={handleClick}/>
            <Display text={count}/>
            {hand.map((element, index) => <Card className='card' src={element.image} key={index} />)}
        </div>
    );
}

export default Deck;