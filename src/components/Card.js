
function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="element">
            <div 
                className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }}>
                <button className="element__delete" type="button"></button>
            </div>
            <div className="element__description">
                <h3 className="element__title">{props.card.name}</h3>
                <div className="element__column">
                    <button className="element__like" type="button"></button>
                    <p className="element__counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;