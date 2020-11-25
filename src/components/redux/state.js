let store = {

//================= Inner props =========================

    _subscriber() { console.log('update')},
    _state: {
        profilePage: {
            postsData: [
                { message: 'Hi, wasup broh?', likeCounter: '13', id: '1' },
                { message: "It's my first post, lol", likeCounter: '27', id: '2' },
                { message: "Ulty approved it, maan", likeCounter: '41', id: '3' },
                { message: "Props was succesfully integrated!", likeCounter: '66', id: '4' }
            ],
            newPostText: '',
        },
        messagesPage: {
            dialogsData: [
                { name: 'Ultimezia', userId: '1', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpLLVsWJVpAKeGB9BzKCNasH2k-Ur9VMwTMQ&usqp=CAU' },
                { name: 'Estar', userId: '2', avatar: 'https://i.pinimg.com/originals/44/c8/04/44c804938ab73dbd4ab2859065f6d87f.jpg' },
                { name: 'Adel', userId: '3', avatar: 'https://animauxmignion.files.wordpress.com/2012/07/20120705-144133.jpg' },
                { name: 'Alexandra', userId: '4', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlu-f9vXRn4GK_-Z79Z6gNXeMZFjuAcxqUrg&usqp=CAU' },
                { name: 'Alexandra II', userId: '5', avatar: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/99/EP2402-CUSA05624_00-AV00000000000193/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720' },
                { name: 'JoyMe', userId: '6', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1gIPy2ZFVryg3q7VZfirsVVtMTzmfoG2P5Q&usqp=CAU' }
            ],
            messagesData: [
                { message: 'Why so?!', id: '1' },
                { message: 'Is that legal?!', id: '2' },
                { message: 'How are u?!', id: '3' },
                { message: 'Hi, buddy!', id: '4' }
            ],
            newMessageText: '',
        }
    },

//================= Initialization========================

    getState() {
        this.that = this;
        return this._state;
    },
    subscribe(observer) {
        this._subscriber = observer;
    },

// ===== Functions ========================================

    dispatch(action) {       
        if (action.type === 'ADD-POST') {
            let newPost = {
                message: this._state.profilePage.newPostText,
                likeCounter: 0,
                id: this._state.profilePage.postsData.length + 1,
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = '';
            this._subscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._subscriber(this._state);
        } else if (action.type === 'SEND-MESSAGE') {
            let newMessage = {
                message: this._state.messagesPage.newMessageText,
                id: this._state.messagesPage.messagesData.length + 1
            }
            this._state.messagesPage.messagesData.push(newMessage);
            this._state.messagesPage.newMessageText = '';
            this._subscriber(this._state);
        } else if (action.type === 'UPDATE-MESSAGE-TEXT') {
            this._state.messagesPage.newMessageText = action.newText;
            this._subscriber(this._state);
        }
    }
} 


export default store;