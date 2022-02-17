import { useEffect, useState } from "react";
import api from "../utils/Api.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
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

    function handleUpdateUser(inputValues) {
        api.setUserInfo(inputValues)
        .then((res) => {
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closeAllPopups();
        })
    }

    function handleUpdateAvatar(inputValue) {
        api.setUserAvatar(inputValue)
        .then((res) => {
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closeAllPopups();
        })
    }

    function handleAddPlaceSubmit(inputValues) {
        api.setCard(inputValues)
        .then((newCard) => {
            setCards([newCard, ...cards]);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            closeAllPopups();
        })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card)
        .then(() => {
            setCards(cards.filter((elem) => elem !== card));
        })
    }

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
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                setCards={setCards}
            />

            <Footer />

            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} /> 

            <PopupWithForm name="delete" title="Вы уверены?" />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;