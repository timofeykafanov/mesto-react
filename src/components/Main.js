import { useContext } from "react";

import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            props.setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card)
        .then(() => {
            props.setCards(props.cards.filter((elem) => elem !== card));
        })
    }

    return (
        <main className="content">
        <section className="profile">
            <div className="profile__person">
                <div
                    className="profile__avatar"
                    onClick={props.onEditAvatar}
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                ></div>
                <div className="profile__info">
                    <div className="profile__row">
                        <p className="profile__name">{currentUser.name}</p>
                        <button
                            className="profile__edit-button"
                            onClick={props.onEditProfile}
                            type="button"
                        ></button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
            </div>
                <button
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                    type="button"
                ></button>
        </section>

        <section className="elements">
            {props.cards.map((card) => (
                <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike} />
            ))}
        </section>
        </main>
    );
}

export default Main;