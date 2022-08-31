import {AnyAction} from 'redux';
import {setCurrentUser} from './user.action';
import {UserData} from '../../utils/firebase/firebase.utils';

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
    if(setCurrentUser.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }
    return state;
}
