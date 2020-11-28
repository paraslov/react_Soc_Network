import { connect } from 'react-redux';
import Sidebar from './Sidebar';

let mapStateToProps = (state) => {
	return {
		dialogsData: state.messagesPage.dialogsData,
	}
}

let SidebarConteiner = connect(mapStateToProps)(Sidebar);

export default SidebarConteiner;