import { USER_ACTION_TYPES } from './user.types';
import {createAction, withMatcher} from '../../utils/reducer/reducer.utils';
import {User} from 'firebase/auth';


export const setCurrentUser = withMatcher((user: User) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

