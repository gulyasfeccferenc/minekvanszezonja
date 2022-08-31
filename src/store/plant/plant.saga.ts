import { all, call, put, takeLatest } from 'typed-redux-saga';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';
import {fetchPlantsFailed, fetchPlantsSuccess} from './plant.action';
import {PLANT_ACTION_TYPES} from './plant.types';


export function* fetchPlantsAsync() {
    try {
        const plantsArray = yield* call(getCategoriesAndDocuments, 'plants');
        yield* put(fetchPlantsSuccess(plantsArray))
    } catch (error) {
        yield* put(fetchPlantsFailed(error as Error))
    }
}

export function* onFetchPlants() {
    yield takeLatest(PLANT_ACTION_TYPES.FETCH_PLANTS_START, fetchPlantsAsync)
}

export function* plantsSaga() {
    yield all([call(onFetchPlants)])
}
