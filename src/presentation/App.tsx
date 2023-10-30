import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useUser } from './hooks/use-user';

function App() {
  const {
    users,
    loading,
    error } = useUser();
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {loading && <p>Cargando datos del usuario...</p>}
        {error && <p>Ocurrio un error</p>}
        {users && (
          <div>
            <h2>Datos del Usuario:</h2>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  )
}
export default App
