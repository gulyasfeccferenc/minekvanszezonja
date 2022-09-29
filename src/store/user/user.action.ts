import { USER_ACTION_TYPES } from './user.types';
import {createAction} from '../../utils/reducer/reducer.utils';
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
    UserData,
} from '../../utils/firebase/firebase.utils';


export const setCurrentUser = (user: UserData) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const userCheckStart = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const userSignInStarted = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const userSignInSuccess = (user: UserData) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const userSignInFailed = (error: any) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const checkUserSession = () => async (dispatch: any) => {
    dispatch(userSignInStarted());
    try {
        onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user).then(authedUser => {
                    if(authedUser) {
                        dispatch(userSignInSuccess(authedUser));
                    }
                });
            } else {
                dispatch(userSignInFailed({}));
            }
        });
    } catch (error) {
        dispatch(userSignInFailed(error));
    }
}
