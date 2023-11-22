import React from "react";
import { TextareaComponent } from '@presentation/components/base/TextareaComponent'
import { FlatButtonComponent } from '@presentation/components/base/buttons/FlatButtonComponent'
import { CreateTaskRequestDom } from "@domain/tasks/models/task-request.dom";

interface TaskFormProps{
    onCancel?: () => void;
    onAdd?: (newTask: CreateTaskRequestDom) => void;
}

export function TaskForm({ onCancel, onAdd}: TaskFormProps) {
    const [newTaskValue, setTaskValue] = React.useState('')
    
    const onSubmit = () => {
        if (onAdd) onAdd(new CreateTaskRequestDom(newTaskValue))
        setTaskValue("")
    }
    const onChange = (value: string) => setTaskValue(value)
    return (
        <form onSubmit={onSubmit}>
            <label> Excribe tu nueva tarea</label>
            <TextareaComponent placeholder="Crear formulario de cliente" onChange={onChange}></TextareaComponent>
            <div className="form-group">
                <FlatButtonComponent label="Cancelar"  onClick={onCancel} />
                <FlatButtonComponent label="Agregar" className="bg-primary bg-lighten-1 white" onClick={onSubmit} />
            </div>
        </form>
    )
}