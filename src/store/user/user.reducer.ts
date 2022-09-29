import {AnyAction} from 'redux';
import {setCurrentUser} from './user.action';
import {UserData} from '../../utils/firebase/firebase.utils';
import {USER_ACTION_TYPES} from './user.types';

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state: any = INITIAL_STATE, action: AnyAction) => {
    if(action.type === USER_ACTION_TYPES.SET_CURRENT_USER) {
        return {
            ...state,
            currentUser: action.payload
        }
    } else if (action.type === USER_ACTION_TYPES.CHECK_USER_SESSION) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === USER_ACTION_TYPES.GOOGLE_SIGN_IN_START) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === USER_ACTION_TYPES.SIGN_IN_SUCCESS) {
        return {
            ...state,
            currentUser: action.payload,
            isLoading: false
        }
    } else if (action.type === USER_ACTION_TYPES.SIGN_IN_FAILED) {
        return {
            ...state,
            currentUser: null,
            isLoading: false
        }
    } else if (action.type === USER_ACTION_TYPES.SIGN_OUT_START) {
        return {
            ...state,
            currentUser: {},
            isLoading: false,
        }
    }
    return state;
}
