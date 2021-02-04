import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux_store';
import { getDialogsData } from '../../redux/selectors/dialogs_selectors';
import Sidebar from './Sidebar';

let mapStateToProps = (state: AppStateType) => {
	return {
		dialogsData: getDialogsData(state),
	}
}

let SidebarConteiner = connect(mapStateToProps)(Sidebar);

export default SidebarConteiner;