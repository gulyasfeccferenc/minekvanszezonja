import {Table} from '@nextui-org/react';
import {IPlantItemRow, PlantItem} from '../../store/plant/plant.types';
import {useNavigate} from 'react-router-dom';
import {Key} from 'react';
import {MonthConverter} from '../../utils/data.util';

type AdminItemListingProps = {
    categoryItems: PlantItem[]|undefined;
}

export const AdminItemListingComponent = (props: AdminItemListingProps) => {
    console.info('props', props);
    let navigate = useNavigate();
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
    const rows: any = props.categoryItems || [];

    const renderCell = (plant: IPlantItemRow, columnKey: Key) => {
        const cellValue = plant[columnKey];
        console.info('columnKey', columnKey);
        switch (columnKey) {
            case 'freshFrom':
            case 'freshTo':
            case 'storedTo':
            case 'storedFrom':
                return MonthConverter(cellValue);

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
