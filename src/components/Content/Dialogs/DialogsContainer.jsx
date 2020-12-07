import { connect } from 'react-redux';
import { sendMessageActionCreator, updateMessageTextActionCreator } from '../../../redux/messages_reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreator());
        },
        newMessageUpdate: (text) => {
            dispatch(updateMessageTextActionCreator(text))
        }

    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;