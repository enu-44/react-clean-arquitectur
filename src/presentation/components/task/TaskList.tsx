import { TaskDom } from "@domain/tasks";
import { ItemListComponent } from '@presentation/components/base/ItemListComponent'
interface TaskListProps {
    items: TaskDom[];
    onComplete: (task: TaskDom) => void;
    onDelete: (task: TaskDom) => void;
}
export function TaskList({ items = [], onComplete, onDelete }: TaskListProps) {
    return (
        <>
            {items.map(task => (
                <ItemListComponent
                    key={task.id}
                    text={task.name}
                    completed={task.completed}
                    onComplete={() =>  onComplete(task)}
                    onDelete={() => onDelete(task)}
                />
            ))}
        </>
    )
}