import {selectPlants} from '../../store/plant/plant.selector';
import {useSelector} from 'react-redux';
import {Button, Col, Row, Table, Text, Tooltip, User} from '@nextui-org/react';
import {Key} from 'react';
import { IPlantCategoryRow } from '../../store/plant/plant.types';
import {DeleteIcon, EditIcon, EyeIcon, HeaderContainer, IconButton, StyledBadge} from './Admin.styles';
import {useNavigate} from 'react-router-dom';

const AdminComponent = () => {
    const plantmap = useSelector(selectPlants);
    let rows: IPlantCategoryRow[] = plantmap;
    let navigate = useNavigate();
    const columns = [
        {
            key: "title",
            label: "Name",
        },
        {
            key: "category",
            label: "Categories",
        },
        { label: "ACTIONS", key: "actions" },
    ];

    const renderCell = (plant: IPlantCategoryRow, columnKey: Key) => {
        const cellValue = plant[columnKey];
        switch (columnKey) {
            case 'title':
                return (
                    <User squared src={plant.imgUrl} name={cellValue} css={{ p: 0 }}>
                        Plants in category: {plant.items?.length}
                    </User>
                );
            case 'category':
                return <StyledBadge>{cellValue}</StyledBadge>;

            case 'actions':
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Details">
                                <IconButton onClick={() => console.log("View plant", plant.id)}>
                                    <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Edit plant">
                                <IconButton onClick={() => navigate(plant.id)}>
                                    <EditIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete plant"
                                color="error"
                                onClick={() => console.log("Delete plant", plant.id)}
                            >
                                <IconButton>
                                    <DeleteIcon size={20} fill="#FF0080" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };

    const handleSorting = () => {};

    return <>
        <HeaderContainer>
            <Text h1 css={{display: 'inline-block'}}>Listing categories</Text>
            <Button shadow css={{alignSelf: 'center'}} onPress={() => navigate('new')}>Add category</Button>
        </HeaderContainer>
        <Table
            aria-label="Table listing all plant category"
            selectionMode="single"
            sticked
            lined
            striped={true}
            onSortChange={handleSorting}
            color={"primary"}
            css={{
                height: "auto",
                minWidth: "100%",
                backgroundColor: "var(--nextui-colors-backgroundAlpha)"
            }}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column
                        key={column.key}
                        allowsSorting={column.key !== "actions"}
                        hideHeader={column.key === "actions"}
                        align={column.key === "actions" ? "center" : "start"}
                    >
                        {column.label}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={rows}>
                {(item: IPlantCategoryRow) => (
                    <Table.Row key={item.key}>
                            {(columnKey: Key) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>;
}

export default AdminComponent;
