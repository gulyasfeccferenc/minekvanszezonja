import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {selectPlants} from '../../store/plant/plant.selector';
import {useNavigate} from 'react-router-dom';
import {PlantCategory, Plants} from '../../store/plant/plant.types';
import {Button, Container, Grid, Input, Row, Text, Textarea} from '@nextui-org/react';
import {HeaderContainer, StyledOption, StyledSelect, StyledSelectContainer} from './Admin.styles';
import {useState} from 'react';

export const AdminCategoryEditComponent = () => {
    let { categoryId } = useParams();
    const plantsMap = useSelector(selectPlants);
    const navigate = useNavigate();
    let currentPlantCategory: Plants = plantsMap.filter( (plantCategory: Plants) => plantCategory.id === categoryId )[0];
    const [category, setCategory] = useState<PlantCategory>((currentPlantCategory.category.toString().toUpperCase() as PlantCategory));
    if (!currentPlantCategory) {
        navigate('/not-found');
        return (<></>)
    }


    const handleSelect = (e: any) => {
        setCategory(e.target.value as PlantCategory);
    }

    return <>
        <HeaderContainer><Text h1 css={{display: 'inline-block'}}>{currentPlantCategory.title}</Text>
        <Button shadow css={{alignSelf: 'center'}} onPress={() => navigate('new')}>Add item</Button></HeaderContainer>

        <Container css={{backgroundColor: "var(--nextui-colors-backgroundAlpha)"}}>
            <Grid.Container gap={2} justify="center">
                <Grid xs={4}>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        value={currentPlantCategory.imgUrl}
                        label="Plant category image"
                        placeholder="ImageURL"
                    />
                </Grid>
                <Grid xs={8}>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        value={currentPlantCategory.title}
                        label="Plant category name"
                        placeholder="E.g.: Alma"
                    />
                </Grid>
                <Grid xs={4}></Grid>
                <Grid xs={8}>
                    <Textarea
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        value={currentPlantCategory.description}
                        label="Plant category description"
                        placeholder="Your definitive description of the category. Only plain text for now"
                    />
                </Grid>
                <Grid xs={4}></Grid>
                <Grid xs={8}>
                    {/*<Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        value={currentPlantCategory.category}
                        label="Plant category tags"
                        placeholder="E.g.: Fruit"
                    />*/}
                    <StyledSelectContainer>
                        <StyledSelect name="plantCategory" id="plantCategory" value={category} onChange={handleSelect}>
                            {Object.entries(PlantCategory).map(([key, value]) =>
                                <StyledOption key={key}
                                              value={key}>{value}</StyledOption>)}
                        </StyledSelect>
                    </StyledSelectContainer>
                </Grid>
            </Grid.Container>
        </Container>
    </>
}
