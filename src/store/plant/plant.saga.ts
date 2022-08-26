import { all, call, put, takeLatest } from 'redux-saga/effects';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';
import {fetchPlantsFailed, fetchPlantsStart, fetchPlantsSuccess} from './plant.action';
import {PLANT_ACTION_TYPES} from './plant.types';


export function* fetchPlantsAsync() {
    try {
        // @ts-ignore
        const plantsArray = yield call(getCategoriesAndDocuments, 'plants');
        yield put(fetchPlantsSuccess(plantsArray))
    } catch (error) {
        yield put(fetchPlantsFailed(error))
    }
}

export function* onFetchPlants() {
    yield takeLatest(PLANT_ACTION_TYPES.FETCH_PLANTS_START, fetchPlantsAsync)
}

export function* plantsSaga() {
    yield all([call(onFetchPlants)])
}
