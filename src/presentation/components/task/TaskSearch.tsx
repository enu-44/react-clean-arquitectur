import { InputComponent } from '@presentation/components/base/InputComponent';
interface TaskSearchProps {
    onChange: (query: string) => void;
}
export function TaskSearch({ onChange }: TaskSearchProps) {
    return (
        <>
            <InputComponent placeholder='Buscar tarea...' onChange={onChange}/>
        </>
    )
}