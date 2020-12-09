import { connect } from 'react-redux';
import { sendMessageActionCreator, updateMessageTextActionCreator } from '../../../redux/messages_reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect'
import { compose } from 'redux';

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


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);