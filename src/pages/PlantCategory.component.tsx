import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {selectPlants} from '../store/plant/plant.selector';
import {Card, Container, Grid, Row, Text} from '@nextui-org/react';
import {PlantItem, Plants} from '../store/plant/plant.types';
import {NavLink, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchPlantsAsync} from '../store/plant/plant.action';

export const PlantCategoryComponent: React.FC<{}> = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPlantsAsync());
    }, []);

    let { categoryId } = useParams();
    const plantsMap = useSelector(selectPlants);
    const navigate = useNavigate();
    let currentPlantCategory = plantsMap.filter( (plantCategory: Plants) => plantCategory.id == categoryId )[0];

    if (!currentPlantCategory) {
        navigate('/not-found');
        return (<></>)
    }
    return (<Container>
        <Text h1 css={{ m: 'auto', textAlign: 'center' }}>{currentPlantCategory.name}</Text>
        <Grid.Container gap={1}>
            <Grid xs={12} md={6}>
                <Card css={{ $$cardColor: '$colors$secondary', p: 0, maxWidth: 400 }}>
                    <Card.Body css={{p: 0}}>
                        <Card.Image
                            src={currentPlantCategory.imgurl}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            alt={currentPlantCategory?.name}
                        />
                    </Card.Body>
                </Card>
            </Grid>
            <Grid xs={12} md={6}>
                <Row>
                    <Text>{currentPlantCategory?.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto doloribus dolorum enim et expedita id iste itaque, laudantium numquam perferendis perspiciatis placeat possimus quisquam sequi sit soluta unde.</Text>
                </Row>
                <Row>
                    <ul>
                        {currentPlantCategory?.items?.map((plant: PlantItem) => <li key={plant.id}><NavLink to={`/plants/${currentPlantCategory.id}/${plant.id}`}>{plant.name}</NavLink></li>)}
                    </ul>
                </Row>
            </Grid>
        </Grid.Container>
    </Container>);
}
