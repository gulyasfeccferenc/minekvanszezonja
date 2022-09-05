import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {selectPlants} from '../store/plant/plant.selector';
import {Button, Card, Col, Container, Grid, Row, Spacer, Text} from '@nextui-org/react';
import {Plants} from '../store/plant/plant.types';
import {useNavigate} from 'react-router-dom';

export const PlantDetailComponent: React.FC<{}> = () => {
    let { plantId } = useParams();
    const plantsMap = useSelector(selectPlants);
    const navigate = useNavigate();
    let currentPlant = plantsMap.filter( (plant: Plants) => plant.id === plantId )[0];
    if (!currentPlant) {
        navigate('/not-found');
        return (<></>)
    }
    return (<Container>
        <Text h1 css={{ m: 'auto', textAlign: 'center' }}>{currentPlant.title}</Text>
        <Grid.Container gap={1}>
            <Grid xs={12} md={6}>
                <Card css={{ $$cardColor: '$colors$secondary', p: 0, maxWidth: 400 }}>
                    <Card.Body css={{p: 0}}>
                        <Card.Image
                            src={currentPlant.imgUrl}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            alt={currentPlant?.title}
                        />
                    </Card.Body>
                    { /*<Card.Footer
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
                            <Text h2 weight="bold" transform="uppercase" color="#ffffffAA">
                                {currentPlant.title}
                            </Text>
                        </Col>
                    </Card.Footer>*/}
                </Card>
            </Grid>
            <Grid xs={12} md={6}>
                <Text>{currentPlant.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto doloribus dolorum enim et expedita id iste itaque, laudantium numquam perferendis perspiciatis placeat possimus quisquam sequi sit soluta unde.</Text>
            </Grid>
        </Grid.Container>
    </Container>);
}
