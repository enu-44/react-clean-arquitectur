
import { AllUsersUseCase } from '@application/users';
import { test, describe, beforeEach, jest } from '@jest/globals'
import { Container } from 'inversify';

describe('All users usecase', () => {
    let container: Container;
    let allUsersUseCase: AllUsersUseCase;
    beforeEach(() => {
        container = new Container();
        // Configura tus dependencias, en este caso UserRepository
       // container.bind<UserRepository>(USER_SYMBOLS.USER_REPOSITORY).toConstantValue({
          //list: jest.fn(), // Mockear el método list
        //});
        allUsersUseCase = container.get(AllUsersUseCase);
    });
    
    test('when should return a successful', async () => {
        // Arranque
  
        // Act

        // Assert
      });
})
