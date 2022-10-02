import {useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {selectPlants} from '../../store/plant/plant.selector';
import {useNavigate} from 'react-router-dom';
import {PlantCategory, Plants} from '../../store/plant/plant.types';
import {Button, Collapse, Container, Grid, Input, Text, Textarea} from '@nextui-org/react';
import {HeaderContainer, StyledOption, StyledSelect, StyledSelectContainer} from './Admin.styles';
import {useState} from 'react';
import {AdminItemListingComponent} from './AdminItemListing.component';

export const AdminCategoryEditComponent = () => {
    let { categoryId } = useParams();
    const plantsMap = useSelector(selectPlants);
    const navigate = useNavigate();
    let currentPlantCategory: Plants = plantsMap.filter( (plantCategory: Plants) => plantCategory.id === categoryId )[0];
    const [category, setCategory] = useState<PlantCategory>((currentPlantCategory?.category.toString().toUpperCase() as PlantCategory));

    if ('new' == categoryId) {
        currentPlantCategory = {
            id: '',
            title: '',
            description: '',
            imgUrl: '',
            category: PlantCategory.FRUIT
        }
    }
    if (!currentPlantCategory) {
        navigate('/not-found');
        return (<></>)
    }


    const handleSelect = (e: any) => {
        setCategory(e.target.value as PlantCategory);
    }

    return <>
        <HeaderContainer>
            <Button light css={{alignSelf: 'center'}} onPress={() => navigate('/admin')} color="warning">🔙 Back to listing</Button>
            <Text h1 css={{display: 'inline-block'}}>{currentPlantCategory.title || 'New item'}</Text>
            <Button shadow css={{alignSelf: 'center'}} onPress={() => navigate('new')}>Add item</Button>
        </HeaderContainer>
        <Collapse.Group accordion={false}>
            <Collapse title="Category settings" expanded>
                <Container css={{backgroundColor: "var(--nextui-colors-backgroundAlpha)"}} fluid>
            <Grid.Container gap={2} justify="center">
                <Grid md={4} xs={12}>
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
                <Grid md={8} xs={12}>
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
                <Grid md={4} xs={12}></Grid>
                <Grid md={8} xs={12}>
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
                <Grid md={4} xs={12}></Grid>
                <Grid md={8} xs={12}>
                    <StyledSelectContainer>
                        <StyledSelect name="plantCategory" id="plantCategory" value={category} onChange={handleSelect}>
                            {Object.entries(PlantCategory).map(([key, value]) =>
                                <StyledOption key={key}
                                              value={key}>{value}</StyledOption>)}
                        </StyledSelect>
                    </StyledSelectContainer>
                </Grid>
                <Grid md={12} xs={12} direction="row-reverse">
                    <Button shadow color="secondary" onPress={() => console.log('handle saving')}>💾 Save item</Button>
                </Grid>
            </Grid.Container>
        </Container>
            </Collapse>
            <Collapse title="Category items" expanded>
                <AdminItemListingComponent categoryItems={currentPlantCategory.items}></AdminItemListingComponent>
            </Collapse>
        </Collapse.Group>
    </>
}
