import { useTask } from './hooks/use-task';
import { ItemLoadingComponent } from '@presentation/components/base/loading/ItemLoadingComponent'
import { EmptyComponent } from '@presentation/components/base/EmptyComponent'
import { FlatButtonComponent } from '@presentation/components/base/buttons/FloatingButtonComponent'
import { ModalComponent } from '@presentation/components/base/ModalComponent'
import { TaskForm } from '@presentation/components/task/TaskForm'
import { TaskSearch } from '@presentation/components/task/TaskSearch'
import { TaskList } from '@presentation/components/task/TaskList'
import { CreateTaskRequestDom, TaskDom } from '@domain/tasks'
function App() {
  const {
    tasks,
    loading,
    openModal,
    error,
    completeTask,
    allTasks,
    searchTasks,
    deleteTask,
    addTask,
    setOpenModal } = useTask();
  return (
    <>
      <h1>Lista de tareas</h1>
      <TaskSearch onChange={(query: string) => query ? searchTasks(query): allTasks()} />
      {loading && (
        <>
          <ItemLoadingComponent />
          <ItemLoadingComponent />
          <ItemLoadingComponent />
        </>
      )}
      {(!loading && tasks.length === 0) && <EmptyComponent />}
      <TaskList
        items={tasks}
        onDelete={(_: TaskDom) => deleteTask(_.id)}
        onComplete={(_: TaskDom) => completeTask(_.id)} />
      <FlatButtonComponent label='+' onClick={() => setOpenModal(state => !state)} />
      {openModal && (
        <ModalComponent>
          <TaskForm onAdd={(request: CreateTaskRequestDom) => {
            addTask(request)
            setOpenModal(false)
          }} onCancel={() => setOpenModal(false)}/>
        </ModalComponent>
      )}
    </>
  )
}
export default App