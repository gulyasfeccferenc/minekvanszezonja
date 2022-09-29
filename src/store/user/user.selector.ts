import {createSelector} from 'reselect';
import {UserState} from './user.reducer';
import {RootState} from '../store';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectUserIsAdminReducer = (state: RootState): UserState => state.user;

export const selectLoginInProgress = (state: RootState): boolean => state.user.isLoading;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser);

export const selectIsUserAdmin = createSelector(
    selectUserIsAdminReducer,
    (user) => user.currentUser?.isAdmin
)
