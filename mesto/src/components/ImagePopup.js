

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_figure ${card ? "popup_opened" : ""}`}>
            <div className="popup__box"> 
                <figure className="popup__figure">
                    <img className="popup__image" src={card.link} alt="#" />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
                <button className="popup__close" onClick={onClose} type="button"></button>
            </div>
        </div>
    )
}

export default ImagePopup;