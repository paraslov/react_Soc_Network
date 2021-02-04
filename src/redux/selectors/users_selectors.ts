import { createSelector } from "reselect";
import { AppStateType } from "../redux_store";

const getUsersState = (state: AppStateType) => {
	return state.usersPage.users;
}

// export const getUsersStateSelector = (state) => {       // wrong complicated selector
//     return getUsersState().fiter( u => true);
// }

export const getUsersSelector = createSelector( getUsersState, (users) => {
        return users.filter(u=>true);
    })

export const getUsersPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize;
}
export const getPortionSize = (state: AppStateType) => {
	return state.usersPage.portionSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
	return state.usersPage.totalUsersCount;
}
export const getUsersCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage;
}
export const getUsersIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching;
}
export const getUsersFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress;
}

// pageSize: state.usersPage.pageSize,
// 	totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 			isFetching: state.usersPage.isFetching,
// 				followingInProgress: state.usersPage.followingInProgress,