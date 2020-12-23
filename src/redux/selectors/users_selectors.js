import { createSelector } from "reselect";

const getUsersState = (state) => {
	return state.usersPage.users;
}

// export const getUsersStateSelector = (state) => {       // wrong complicated selector
//     return getUsersState().fiter( u => true);
// }

export const getUsersSelector = createSelector( getUsersState, (users) => {
        return users.filter(u=>true);
    })

export const getUsersPageSize = (state) => {
	return state.usersPage.pageSize;
}
export const getPortionSize = (state) => {
	return state.usersPage.portionSize;
}
export const getTotalUsersCount = (state) => {
	return state.usersPage.totalUsersCount;
}
export const getUsersCurrentPage = (state) => {
	return state.usersPage.currentPage;
}
export const getUsersIsFetching = (state) => {
	return state.usersPage.isFetching;
}
export const getUsersFollowingInProgress = (state) => {
	return state.usersPage.followingInProgress;
}

// pageSize: state.usersPage.pageSize,
// 	totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 			isFetching: state.usersPage.isFetching,
// 				followingInProgress: state.usersPage.followingInProgress,