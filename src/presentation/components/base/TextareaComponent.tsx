import { Fragment } from "react";

interface TextareaProps{
    placeholder?: string;
    defaultValue?: string;
    onChange?: (value :string ) => void;
}
export function TextareaComponent({placeholder,defaultValue, onChange }: TextareaProps) {
    return (
        <Fragment>
            <textarea
                placeholder={placeholder}
                value={defaultValue}
                onChange={
                    (event) => onChange != null ? onChange(event.target.value):null
                } />
        </Fragment>
    )
}