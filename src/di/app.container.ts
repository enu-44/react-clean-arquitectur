import { Container } from "inversify";
import { userModule } from "../infraestructure/user.module";
import { RequestInterceptor } from "../core/infraestructure/interceptor/request-interceptor";

// Crear un nuevo contenedor de Inversify
const di = new Container();
di.bind<RequestInterceptor>(RequestInterceptor)
.to(RequestInterceptor)
    .inSingletonScope()

// Cargar módulos en el contenedor
di.load(userModule);

export { di };