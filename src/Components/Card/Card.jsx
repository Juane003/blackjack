import "./card.css";
const Card = ({src, value}) => {
    return(
        <div>
            <img src={src} className='card'/>
        </div>
    );
}

export default Card;