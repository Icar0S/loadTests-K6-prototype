//import GetCustomer from "./tests/scenarios/Get-Customer.js";
import Login from "./tests/scenarios/auth/Login.js"
import { group, sleep } from 'k6';


export default () => {
  group('Endpoint Get Customer - Controller Customer - OnionArchitecture.Api', () => {
    //GetCustomer();
    Login();

  });

  sleep(1);
}