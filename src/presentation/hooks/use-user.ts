import React, { useState } from 'react'
import { di } from '@di/index';
import { AllUsersUseCase } from '@application/index';
import { USER_SYMBOLS, UserResponseDom } from '@domain/index';
import { Failure, NoParams } from '@core/index';

function useUser() {
    const allUsersUseCase = di.get<AllUsersUseCase>(USER_SYMBOLS.USER_LIST);
    const [users, setUsers] = useState<UserResponseDom[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<boolean>(false); 

    React.useEffect(() => {
        async function fetchData() {
            const resultData = await allUsersUseCase?.execute(NoParams)
            resultData.fold((data: UserResponseDom[]) => setUsers(data), (_: Failure) => setError(true))
            setLoading(false)
        }
        fetchData()
    })
    return {
        users,
        loading,
        error
    };
}
export { useUser }