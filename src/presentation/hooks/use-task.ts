import React, { useState } from 'react'
import { di } from '@di/index';
import { Failure, NoParams, NoResult } from '@core/index';
import { AllTasksUseCase } from '@application/task/queries/all-tasks.usecase';
import { CreateTaskRequestDom, TASK_SYMBOLS, TaskDom } from '@domain/tasks';
import { CompleteTaskUseCase } from '@application/task/commands/complete-task.usecase';
import { DeleteTaskUseCase } from '@application/task/commands/delete-task.usecase';
import { SearchTasksUseCase } from '@application/task/queries/search-tasks.usecase';
import { CreateTaskUseCase } from '@application/task/commands/create-task.usecase';

function useTask() {
    const allTaskssUseCase = di.get<AllTasksUseCase>(TASK_SYMBOLS.TASK_LIST);
    const completeTaskssUseCase = di.get<CompleteTaskUseCase>(TASK_SYMBOLS.TASK_COMPLETE);
    const deleteTaskssUseCase = di.get<DeleteTaskUseCase>(TASK_SYMBOLS.TASK_DELETE);
    const searchTaskssUseCase = di.get<SearchTasksUseCase>(TASK_SYMBOLS.TASK_SEARCH);
    const createTaskssUseCase = di.get<CreateTaskUseCase>(TASK_SYMBOLS.TASK_CREATE);

    const [tasks, setTasks] = useState<TaskDom[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<boolean>(false); 
    const [openModal, setOpenModal] = React.useState(false);

    React.useEffect(() => {
        allTasks()
    }, [allTaskssUseCase]) 

    const searchTasks = async (query: string) => {
        setLoading(true)
        const result = await searchTaskssUseCase?.execute(query)
        result.fold((data: TaskDom[]) => setTasks(data), (_: Failure) => setError(true))
        setLoading(false)
    };

    const allTasks = async () => {
        const result = await allTaskssUseCase?.execute(NoParams)
        result.fold((data: TaskDom[]) => setTasks(data), (_: Failure) => setError(true))
        setLoading(false)
    };

    const completeTask = async (id: number) => {
        const result = await completeTaskssUseCase.execute(id)
        result.fold((_: NoResult) => allTasks(), (_: Failure) => setError(true))
    };
    
    const deleteTask = async (id: number) => {
        const result = await deleteTaskssUseCase.execute(id)
        result.fold((_: NoResult) => allTasks(), (_: Failure) => setError(true))
    };

    const addTask = async (newTask: CreateTaskRequestDom) => {
        setLoading(true)
        const result = await createTaskssUseCase?.execute(newTask)
        result.fold((_: TaskDom) => allTasks(), (_: Failure) => setError(true))
    };
    
    return {
        tasks,
        loading,
        error,
        openModal,
        setOpenModal,
        completeTask,
        deleteTask,
        searchTasks,
        allTasks,
        addTask
    };
}
export { useTask }