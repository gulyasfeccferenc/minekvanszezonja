import {Loading} from '@nextui-org/react';
import {useSelector} from 'react-redux';
import {selectCurrentPlantsMap, selectIsPlantsLoading} from '../store/plant/plant.selector';

export const HomeComponent = () => {
    const isPlantsLoading = useSelector(selectIsPlantsLoading);
    const plantsMap = useSelector(selectCurrentPlantsMap);

    return (<>
        {isPlantsLoading ? <Loading type="points" /> : <ul>
            {Object.keys(plantsMap).map((plant: any) => <li key={plant.toString()}>{plant.toString()}</li>)}
        </ul>}
    </>);
}
