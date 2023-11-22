import { Fragment } from "react";

interface ButtonProps{
    label?: string;
    className?: string;
    onClick?: () => void;
}

export function FlatButtonComponent({label, className, onClick }: ButtonProps) {
    return (
        <Fragment>
            <button  className= {`flat-button  ${className && className}`}  type="button" onClick={onClick}>{label}</button>
        </Fragment>
    )
}