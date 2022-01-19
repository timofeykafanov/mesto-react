import { useEffect, useState } from "react";
import api from "../utils/Api.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    };

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
        <Header />

        <Main
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            name={userName}
            description={userDescription}
            avatar={userAvatar}
            cards={cards}
            onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
            name="add"
            title="Новое место"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
        >
            <input
                type="text"
                className="popup__input popup__input_type_place"
                id="place-input"
                name="place"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
            />
            <span className="popup__input-error place-input-error"></span>
            <input
                type="url"
                className="popup__input popup__input_type_link"
                id="link-input"
                name="link"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
        >
            <input
                type="text"
                className="popup__input popup__input_type_name"
                id="name-input"
                name="name"
                minLength="2"
                maxLength="40"
                required
                placeholder={userName}
            />
            <span className="popup__input-error name-input-error"></span>
            <input
                type="text"
                className="popup__input popup__input_type_about"
                id="about-input"
                name="about"
                minLength="2"
                maxLength="200"
                required
                placeholder={userDescription}
            />
            <span className="popup__input-error about-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
        >
            <input
                type="url"
                className="popup__input popup__input_type_avatar"
                id="avatar-input"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="popup__input-error avatar-input-error"></span>
            <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="delete" title="Вы уверены?" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </>
    );
}

export default App;