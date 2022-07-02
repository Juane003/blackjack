import { useEffect, useState } from "react"
import { getCards, cardValues } from "../../utils/cardUtils";
import Button from "../Button/Button";
import Card from "../Card/Card";
import Display from "../Display/Display";

const Deck = () => {
    const [hand, setHand] = useState([]);
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchCards = async () => {
            const cardObject = await getCards(2);
            setHand(cardObject.cards);
            setResult(cardObject.cards.map(element => element.value))
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
        const cardObject = await getCards(1);
        setHand((old) => [...old, cardObject.cards[0]]);
        setResult((old) => [...old, cardObject.cards[0].value]);
    }

    return (
        <div>
            <Button text={"Draw a card"} onClick={handleClick}/>
            <Display text={count}/>
            {hand.map((element, index) => <Card src={element.image} key={index} />)}
        </div>
    );
}

export default Deck;