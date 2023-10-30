import 'reflect-metadata'
import { ContainerModule } from 'inversify'
import { UserImplRepository } from './user-impl.repository'
import { AllUsersUseCase } from '../application/queries/all-users.usecase'
import { USER_SYMBOLS, UserRepository } from '../domain'

const userModule = new ContainerModule((bind) => {
  bind<UserRepository>(USER_SYMBOLS.USER_REPOSITORY)
    .to(UserImplRepository)
    .inSingletonScope()
  bind<AllUsersUseCase>(USER_SYMBOLS.USER_LIST)
  .to(AllUsersUseCase)
  .inSingletonScope()
})
export { userModule }
