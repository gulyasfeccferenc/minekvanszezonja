import {PlantItem, Plants} from "../../store/plant/plant.types";
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsPlantsLoading, selectPlants} from '../../store/plant/plant.selector';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Button, Container, Grid, Input, Loading, Progress, Text, Textarea} from '@nextui-org/react';
import {HeaderContainer} from './styles/Admin.styles';
import {AdminGridSelectInputComponent} from '../../components/Admin/AdminGridSelectInput.component';
import {updateSingleDocument} from '../../utils/firebase/firebase.utils';
import {savePlantItemFailed, savePlantItemStart, savePlantItemSuccess} from '../../store/plant/plant.action';


export const AdminItemEditComponent = () => {
    const [currentPlant, setCurrentPlant] = useState<PlantItem>({
        id: '',
        name: '',
        description: '',
        imgUrl: '',
        freshFrom: 0,
        freshTo: 0,
        storedFrom: 0,
        storedTo: 0,
    });
    const [currentPlantCategory, setCurrentPlantCategory] = useState<Plants>();
    const { plantId, categoryId } = useParams();
    const plantsMap = useSelector(selectPlants);
    const isLoading = useSelector(selectIsPlantsLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const plantCategoryTemp = plantsMap.filter( (plant: Plants) => plant.id == categoryId )[0];
        setCurrentPlantCategory(plantCategoryTemp); //TODO: Put these selection into redux
        let filteredPlant;
        if (plantCategoryTemp && plantCategoryTemp.items) {
            filteredPlant = plantCategoryTemp.items.filter((plant: PlantItem) => plant.id == plantId)[0];
        }
        if (filteredPlant) {
            setCurrentPlant(filteredPlant);
        } else if ('new' != plantId) {
            navigate('/not-found');
        }
    }, [plantsMap]);

    const handleSelectChange = (event: any) => {
        const { name, value } = event.target;
        const newPlant: PlantItem = {
            ...currentPlant
        }

        // @ts-ignore
        newPlant[name] = Number(value);
        setCurrentPlant(newPlant);
    }

    const updateModel = (event: any) => {
        const tempPlant = currentPlant;
        // @ts-ignore
        tempPlant[event.target.name] = event.target.value;
        setCurrentPlant(tempPlant);
    }

    const handleSave = () => {
        dispatch(savePlantItemStart(currentPlantCategory, currentPlant));
        const currentPlantCopy = currentPlant;
        currentPlantCopy.id = currentPlantCategory?.items?.length || 0;
        if (currentPlantCategory && currentPlantCategory.items) {
            currentPlantCategory.items = [...currentPlantCategory.items, currentPlantCopy];
        } else if (currentPlantCategory) {
            currentPlantCategory.items = [currentPlantCopy];
        }

        updateSingleDocument('plants', currentPlantCategory).then(response => {
            console.info('>>> Item successfully updated', response);
            dispatch(savePlantItemSuccess());
            navigate(currentPlantCopy.id.toString());
        }).catch(error => dispatch(savePlantItemFailed()));
    }

    return <>
        <HeaderContainer>
            <Button light css={{alignSelf: 'center'}} onPress={() => navigate('/admin/'+categoryId)} color="warning">🔙 Back to {categoryId}</Button>
            <Text h1 css={{display: 'inline-block'}}>{currentPlant?.name || 'New item'}</Text>
            <span style={{width: '200px'}}></span>
        </HeaderContainer>
        <Container css={{backgroundColor: "var(--nextui-colors-backgroundAlpha)"}} fluid>
            <Grid.Container gap={2} justify="center">
                <Grid md={4} xs={12}>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        name='imgUrl'
                        onChange={updateModel}
                        value={currentPlant.imgUrl}
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
                        name='name'
                        onChange={updateModel}
                        value={currentPlant.name}
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
                        name='description'
                        onChange={updateModel}
                        value={currentPlant?.description}
                        label="Plant category description"
                        placeholder="Your definitive description of the category. Only plain text for now"
                    />
                </Grid>
                <Grid md={4} xs={12}></Grid>
                <Grid md={4} xs={12} css={{flexDirection: 'column'}}>
                    <AdminGridSelectInputComponent
                        label="Fresh from"
                        selectName='freshFrom'
                        selectValue={currentPlant.freshFrom}
                        changeHandler={handleSelectChange}
                    ></AdminGridSelectInputComponent>
                </Grid>
                <Grid md={4} xs={12} css={{flexDirection: 'column'}}>
                    <AdminGridSelectInputComponent
                        label="Fresh until"
                        selectName='freshTo'
                        selectValue={currentPlant.freshTo}
                        changeHandler={handleSelectChange}
                    ></AdminGridSelectInputComponent>
                </Grid>
                <Grid md={4} xs={12}></Grid>
                <Grid md={8} xs={12}>
                    <Progress min={1}
                              max={24}
                              value={currentPlant.freshTo}
                              css={{paddingLeft: `${4.34783*(currentPlant.freshFrom-1)}%`}}
                              shadow
                              color="primary"
                              status="primary" />
                </Grid>
                <Grid md={4} xs={12}></Grid>
                <Grid md={4} xs={12} css={{flexDirection: 'column'}}>
                    <AdminGridSelectInputComponent
                        label="Store from"
                        selectName='storedFrom'
                        selectValue={currentPlant.storedFrom}
                        changeHandler={handleSelectChange}
                    ></AdminGridSelectInputComponent>
                </Grid>
                <Grid md={4} xs={12} css={{flexDirection: 'column'}}>
                    <AdminGridSelectInputComponent
                        label="Store until"
                        selectName='storedTo'
                        selectValue={currentPlant.storedTo}
                        changeHandler={handleSelectChange}
                    ></AdminGridSelectInputComponent>
                </Grid>
                <Grid md={4} xs={12}></Grid>
                <Grid md={8} xs={12}>
                    <Progress min={1}
                              max={24}
                              value={currentPlant.storedTo}
                              css={{paddingLeft: `${4.34783*(currentPlant.storedFrom-1)}%`}}
                              shadow
                              color="warning"
                              status="warning" />
                </Grid>
                <Grid md={12} xs={12} direction="row-reverse">
                    <Button shadow color="secondary" onPress={handleSave}>{ isLoading ? <Loading></Loading> : '💾 Save item'}</Button>
                </Grid>
            </Grid.Container>
        </Container></>
}
