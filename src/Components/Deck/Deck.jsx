import "./deck.css";
import Card from "../Card/Card";

const Deck = ( {cardList} ) => {
    return (
        <div className="container">
            {cardList.map((element, index) => <Card className='card' src={element.image} key={index} />)}
        </div>
    );
}

export default Deck;