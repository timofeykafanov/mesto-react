import Card from "./Card.js";

function Main(props) {
    return (
        <main className="content">
        <section className="profile">
            <div className="profile__person">
                <div
                    className="profile__avatar"
                    onClick={props.onEditAvatar}
                    style={{ backgroundImage: `url(${props.avatar})` }}
                ></div>
                <div className="profile__info">
                    <div className="profile__row">
                        <p className="profile__name">{props.name}</p>
                        <button
                            className="profile__edit-button"
                            onClick={props.onEditProfile}
                            type="button"
                        ></button>
                    </div>
                    <p className="profile__about">{props.description}</p>
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
                <Card key={card._id} card={card} onCardClick={props.onCardClick} />
            ))}
        </section>
        </main>
    );
}

export default Main;