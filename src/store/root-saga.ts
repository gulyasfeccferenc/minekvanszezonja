import { all, call } from 'redux-saga/effects';
import {plantsSaga} from './plant/plant.saga';

export function* rootSaga() {
    yield all([call(plantsSaga)])
}
