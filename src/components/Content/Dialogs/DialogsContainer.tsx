import { connect } from 'react-redux';
import { DialogsIntitialStateType, messagesActions } from '../../../redux/messages_reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { AppStateType } from '../../../redux/redux_store';
import { getMessagesPage } from '../../../redux/selectors/dialogs_selectors';

type MapStatePropsType = {
    messagesPage: DialogsIntitialStateType
}

type MapDispatchPropsType = {
    sendMessage: (text: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: getMessagesPage(state),
    }
}


export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
        mapStateToProps, 
        {sendMessage: messagesActions.sendMessage}),
    withAuthRedirect
)(Dialogs);