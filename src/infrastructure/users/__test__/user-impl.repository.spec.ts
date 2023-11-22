
import { test, describe, beforeEach } from '@jest/globals'
import { MockProxy, mock } from 'jest-mock-extended';
import { HttpClient, HttpClientResponse } from '@core/index';
import { UserImplRepository } from '../user-impl.repository';
import { UserDto } from '../dtos/user.dto';

describe('All users usecase', () => {
  let httpClientMock: MockProxy<HttpClient>; 
  beforeEach(() => {
    httpClientMock = mock<HttpClient>();
  });
    
  test('when should return a successful', async () => {
    // Prepare
    httpClientMock.get.mockReturnValue(Promise.resolve(<HttpClientResponse>{
        status: 200,
        data: [
            <UserDto>{}
        ]
    }));
    const repository = new UserImplRepository(httpClientMock);
    // Execute
    const result = await repository.list();
    // Assert
    expect(result.isRight()).toBe(true);
    expect(result.value?.length).toEqual(1);
  });
})
