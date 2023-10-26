import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { USER_SYMBOLS, UserResponseDom } from '../domain';
import { AllUsersUseCase } from '../application';
import { di } from '../di/app.container';
import { Failure, NoParams } from '../core';

function App() {
  const allUsersUseCase = di.get<AllUsersUseCase>(USER_SYMBOLS.USER_LIST);
  const [userData, setUserData] = useState<UserResponseDom[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<boolean>(false); 

  useEffect(() => {
    async function fetchData() {
      const resultData = await allUsersUseCase.execute(NoParams)
      resultData.fold((data: UserResponseDom[]) => {
        setUserData(data)
      }, (_: Failure) => setError(true))
      setLoading(false)
    }
    fetchData()
  },[allUsersUseCase])

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
        {userData && (
          <div>
            <h2>Datos del Usuario:</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  )
}

export default App
