import { Fragment } from "react";
interface ButtonProps{
    label?: string;
    onClick?: () => void;
}
export function FlatButtonComponent({label, onClick }: ButtonProps) {
    return (
        <Fragment>
            <button className="floating-button" type="button" onClick={onClick}>{label}</button>
        </Fragment>
    )
}