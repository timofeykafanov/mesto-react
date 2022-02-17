import { useContext, useEffect, useState } from "react";
import api from "../utils/Api.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});

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
            setCurrentUser(user);
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />

            <Main
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
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
                    placeholder={currentUser.name}
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
                    placeholder={currentUser.about}
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
        </CurrentUserContext.Provider>
    );
}

export default App;