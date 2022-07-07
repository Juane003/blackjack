import { useEffect, useState } from "react"
import { getCards, cardValues, deserializedDeck, deserializedCard } from "../../utils/cardUtils";
import Button from "../Button/Button";
import Deck from "../Deck/Deck";
import Display from "../Display/Display";
import './gameboard.css';

const Gameboard = () => {
  const [hand, setHand] = useState([]);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [deckId, setDeckId] = useState(null);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    let isAce = false;
    const prevVal = count;
    if (result.includes("ACE")) {
      isAce = true;
      if (isAce && prevVal + count + 11 > 21) {
        setCount(cardValues(result) - 10);    
      }
    }    
    setCount(cardValues(result));
  }, [result])

  if (!hand) {
      return null;
  }

  const handleStart = () => {
    const fetchCards = async () => {
      const cardObject = await getCards(2);
      const {cards, deckId} = deserializedDeck(cardObject);

      setHand(cards);
      setResult(cards.map(element => element.value));
      setDeckId(deckId);
    };
    fetchCards();
  }

  const handleDrawClick = async () => {
    const cardObject = await getCards(1, deckId);
    const { card } = deserializedCard(cardObject);
    
    setHand((old) => [...old, card]);
    setResult((old) => [...old, card.value]);
  }

  const handleReset = () => {
    if (count >= 21) {
      setHand([]);
      setResult([]);  
     }
  }

  const handleStop = () => {
    setStop(true);
  }

  return(
    <div className="board">
      <Button className="" text={"Draw a card"} onClick={hand.length === 0 ? handleStart : count > 21 ? handleReset : handleDrawClick}/>
      <Button className="" text={"Stop"} onClick={handleStop}/>
      <Display text={count}/>
      <Deck cardList={hand} className="flex"/>
    </div>
  )
}

export default Gameboard;