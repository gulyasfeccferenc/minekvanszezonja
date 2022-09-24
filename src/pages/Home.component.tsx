import {Card, Grid, Loading, Row, Text} from '@nextui-org/react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {selectIsPlantsLoading, selectPlants} from '../store/plant/plant.selector';
import {fetchPlantsAsync} from '../store/plant/plant.action';
import {useEffect} from 'react';

export const HomeComponent = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPlantsAsync());
    }, []);
    const isPlantsLoading = useSelector(selectIsPlantsLoading);
    const plantsMap = useSelector(selectPlants);

    let navigate = useNavigate();
    return (
        <Grid.Container gap={2} justify="flex-start">
        {isPlantsLoading ? <Loading type="points" /> : <>
            {Object.keys(plantsMap).map((plant: string, index: number) =>
                <Grid xs={6} sm={3} key={index}>
                    <Card isPressable onClick={() => {navigate(`/plants/${plantsMap[plant].id}`)}}>
                        <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                src={plantsMap[plant].imgUrl}
                                objectFit="cover"
                                width="100%"
                                height={140}
                                alt={plantsMap[plant].title}
                            />
                        </Card.Body>
                        <Card.Footer css={{ justifyItems: "flex-start" }}>
                            <Row wrap="wrap" justify="space-between" align="center">
                                <Text b>{plantsMap[plant].title}</Text>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>)}
            </> }
        </Grid.Container>
    );
}
