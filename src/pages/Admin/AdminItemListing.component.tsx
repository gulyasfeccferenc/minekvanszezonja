import {Col, Row, Table, Tooltip} from '@nextui-org/react';
import {IPlantItemRow, PlantItem} from '../../store/plant/plant.types';
import {useNavigate} from 'react-router-dom';
import {Key} from 'react';
import {MonthConverter} from '../../utils/data.util';
import {DeleteIcon, EditIcon, EyeIcon, IconButton} from './Admin.styles';

type AdminItemListingProps = {
    categoryItems: PlantItem[]|undefined;
    category: string | undefined;
}

export const AdminItemListingComponent = (props: AdminItemListingProps) => {
    const columns = [
        {
            key: "name",
            label: "Name",
        },{
            key: "id",
            label: "ID",
        },
        {
            key: "freshFrom",
            label: "Fresh from",
        },
        {
            key: "freshTo",
            label: "Fresh until",
        },
        {
            key: "storedFrom",
            label: "Stored from",
        },
        {
            key: "storedTo",
            label: "Stored until",
        },
        { label: "ACTIONS", key: "actions" },
    ];
    const rows: any = props.categoryItems?.map((item, index) => {
        item.id = index;
        return item;
    }) || [];

    const navigate = useNavigate();
    const renderCell = (plant: IPlantItemRow, columnKey: Key) => {
        const cellValue = plant[columnKey];

        switch (columnKey) {
            case 'freshFrom':
            case 'freshTo':
            case 'storedTo':
            case 'storedFrom':
                return MonthConverter(cellValue);
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
                                <IconButton onClick={() => navigate(plant.id.toString())}>
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
    }

    const handleSorting = () => {};

    return <>
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
                {(item: IPlantItemRow) => (
                    <Table.Row key={item.key}>
                        {(columnKey: Key) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>
}
