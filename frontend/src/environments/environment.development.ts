import {EnvironmentInterface} from "./environment-interface";

export const environment: EnvironmentInterface = {
  production: false,
  //apiUrl: 'http://89.110.90.133:8000/api/v1',
  apiUrl: 'http://localhost:8000/api/v1',
  securedApiUrl: 'http://localhost:8000/secured/api/v1',
};
