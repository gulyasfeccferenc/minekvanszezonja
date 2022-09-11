import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {selectPlants} from '../store/plant/plant.selector';
import {Card, Col, Container, Grid, Loading, Text} from '@nextui-org/react';
import {PlantItem, Plants} from '../store/plant/plant.types';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

export const PlantDetailComponent: React.FC<{}> = () => {
    const [currentPlant, setCurrentPlant] = useState<PlantItem>();
    let { plantId, categoryId } = useParams();
    const plantsMap = useSelector(selectPlants);
    const navigate = useNavigate();
    let currentPlantCategory: Plants|undefined;
    //let currentPlant: PlantItem|undefined;
    useEffect(() => {
        currentPlantCategory = plantsMap.filter( (plant: Plants) => plant.id === categoryId )[0]; //TODO: Put these selection into redux
        let filteredPlant;
        if (currentPlantCategory && currentPlantCategory.items) {
            filteredPlant = currentPlantCategory.items.filter((plant: PlantItem) => plant.id == plantId)[0];
        }
        if (filteredPlant) {
            setCurrentPlant(filteredPlant);
        } else {
            navigate('/not-found');
        }
    }, [plantsMap]);

    return (<Container>
        { currentPlant != undefined ? <>
        <Text h1 css={{ m: 'auto', textAlign: 'center' }}>{currentPlant.name}</Text>
        <Grid.Container gap={1}>
            <Grid xs={12} md={6}>
                <Card css={{ $$cardColor: '$colors$secondary', p: 0, maxWidth: 400 }}>
                    <Card.Body css={{p: 0, minHeight: 200}}>
                        <Card.Image
                            src={currentPlant.imgUrl}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            alt={currentPlant?.name}
                        />
                    </Card.Body>
                   <Card.Footer
                        isBlurred
                        css={{
                            position: "absolute",
                            bgBlur: "#0f111466",
                            borderTop: "$borderWeights$light solid $gray800",
                            bottom: 0,
                            zIndex: 1,
                        }}
                    >
                        <Col>
                            <Text>🧺{currentPlant.freshFrom}-{currentPlant.freshTo}</Text>
                            <Text>🫙 {currentPlant.storedFrom}-{currentPlant.storedTo}</Text>
                        </Col>
                    </Card.Footer>
                </Card>
            </Grid>
            <Grid xs={12} md={6}>
                <Grid xs={12}>
                    <Text>Remekül tárolható {currentPlant.storedFrom}-tól {currentPlant.storedTo}</Text>
                </Grid>
                <Grid xs={12}>
                    <Text>Magyarországon szezonális, frissen kapható {currentPlant.freshFrom}-tól {currentPlant.freshTo}</Text>
                </Grid>
            </Grid>
            <Grid xs={12} md={12}>
                <Text>{currentPlant.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto doloribus dolorum enim et expedita id iste itaque, laudantium numquam perferendis perspiciatis placeat possimus quisquam sequi sit soluta unde.</Text>
            </Grid>
        </Grid.Container></> : <Loading></Loading>}
    </Container>);
}
