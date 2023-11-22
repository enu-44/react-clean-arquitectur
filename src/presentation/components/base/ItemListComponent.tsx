import CheckIcon  from "@presentation/assets/icons/CheckIcon";
import DeleteIcon from "@presentation/assets/icons/DeleteIcon";
import { Fragment } from "react";

interface ItemListProps {
    text: string;
    completed: boolean;
    onComplete: () => void;
    onDelete: () => void;
}
export function ItemListComponent({text, completed, onComplete, onDelete }: ItemListProps) {
    return (
        <Fragment>
            <li className="item-list bg-white">
                <CheckIcon className="icon-button" width="38" height="38" fill={completed ? 'green' : 'gray'} onClick={onComplete} />
                <p
                    className={`item-list-p  ${completed ?  "item-list-p--complete": ""} `}
                >
                    {text}
                </p>
                <DeleteIcon className="icon-button" width="38" height="38" onClick={onDelete} />
            </li>
        </Fragment>
    );
}