import { Fragment } from "react";

interface InputProps{
    placeholder?: string;
    defaultValue?: string;
    onChange?: (value :string ) => void;
}
export function InputComponent({placeholder,defaultValue, onChange }: InputProps) {
    return (
        <Fragment>
            <input
                placeholder={placeholder}
                value={defaultValue}
                onChange={
                    (event) => onChange ? onChange(event.target.value): null
                }
            />
        </Fragment>
    )
}