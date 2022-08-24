import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { plantsReducer } from './plant/plant.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    plants: plantsReducer
})
