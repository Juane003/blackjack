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

  const handleDrawClick = async () => {
      const cardObject = await getCards(1, deckId);
      const { card } = deserializedCard(cardObject)

      setHand((old) => [...old, card]);
      setResult((old) => [...old, card.value]);
  }

  const limit = count >= 21 ? true : false

  const handleStop = () => {
    setStop(true);
  }

  return(
    <div>
      <Button text={"Draw a card"} onClick={handleDrawClick} disabled={limit || stop}/>
      <Button text={"Stop"} onClick={handleStop}/>
      <Display text={count}/>
      <Deck cardList={hand}/>
    </div>
  )
}

export default Gameboard;