import {StyledLabel, StyledOption, StyledSelect, StyledSelectContainer} from '../../pages/Admin/styles/Admin.styles';
import {monthEnumList} from '../../utils/data.util';

type AdminGridSelectInputProps = {
    label: string,
    selectName: string,
    selectValue: any,
    changeHandler: (event: any) => void
}

export const AdminGridSelectInputComponent = (props: AdminGridSelectInputProps) => {
    return <>
        <StyledLabel htmlFor={props.selectName}>{props.label}</StyledLabel>
        <StyledSelectContainer>
            <StyledSelect name={props.selectName} id={props.selectName} value={props.selectValue} onChange={props.changeHandler}>
                {monthEnumList().map((key: any, value) =>
                    <StyledOption key={key}
                                  value={value}>{key}</StyledOption>)}
            </StyledSelect>
        </StyledSelectContainer>
    </>
}
